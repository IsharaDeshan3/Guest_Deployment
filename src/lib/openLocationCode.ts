const CODE_ALPHABET = "23456789CFGHJMPQRVWX";
const SEPARATOR = "+";
const SEPARATOR_POSITION = 8;
const PADDING = "0";

const PAIR_RESOLUTIONS = [20.0, 1.0, 0.05, 0.0025, 0.000125];

function clipLatitude(lat: number) {
  return Math.min(90, Math.max(-90, lat));
}

function normalizeLongitude(lng: number) {
  while (lng < -180) lng += 360;
  while (lng >= 180) lng -= 360;
  return lng;
}

function alphabetIndex(ch: string): number {
  const idx = CODE_ALPHABET.indexOf(ch);
  if (idx === -1) throw new Error(`Invalid Plus Code character: ${ch}`);
  return idx;
}

export function isFullPlusCode(code: string): boolean {
  const clean = code.toUpperCase().trim();
  const sep = clean.indexOf(SEPARATOR);
  return sep === SEPARATOR_POSITION;
}

export function isShortPlusCode(code: string): boolean {
  const clean = code.toUpperCase().trim();
  const sep = clean.indexOf(SEPARATOR);
  return sep !== -1 && sep < SEPARATOR_POSITION;
}

export function encodePlusCode(
  lat: number,
  lng: number,
  codeLength = 10
): string {
  let latitude = clipLatitude(lat);
  let longitude = normalizeLongitude(lng);

  if (latitude === 90) latitude = 90 - 1e-12;

  latitude += 90;
  longitude += 180;

  const pairs = Math.min(5, Math.floor(codeLength / 2));

  let code = "";
  for (let i = 0; i < pairs; i++) {
    const placeValue = PAIR_RESOLUTIONS[i];

    const latDigit = Math.floor(latitude / placeValue);
    const lngDigit = Math.floor(longitude / placeValue);

    latitude -= latDigit * placeValue;
    longitude -= lngDigit * placeValue;

    code += CODE_ALPHABET[latDigit];
    code += CODE_ALPHABET[lngDigit];

    if (code.length === SEPARATOR_POSITION) code += SEPARATOR;
  }

  // Pad if needed
  if (code.length < SEPARATOR_POSITION + 1) {
    while (code.length < SEPARATOR_POSITION) code += PADDING;
    code += SEPARATOR;
  }

  return code;
}

export type PlusCodeArea = {
  latitudeLo: number;
  longitudeLo: number;
  latitudeHi: number;
  longitudeHi: number;
  latitudeCenter: number;
  longitudeCenter: number;
};

export function decodePlusCode(code: string): PlusCodeArea {
  const clean = code
    .toUpperCase()
    .trim()
    .replace(new RegExp(`\\${SEPARATOR}`, "g"), "")
    .replace(new RegExp(PADDING, "g"), "");

  if (clean.length < 2) throw new Error("Plus Code too short");

  const pairLength = Math.min(clean.length, 10);
  const pairs = Math.floor(pairLength / 2);

  let lat = 0;
  let lng = 0;

  for (let i = 0; i < pairs; i++) {
    const latVal = alphabetIndex(clean[i * 2]);
    const lngVal = alphabetIndex(clean[i * 2 + 1]);

    lat += latVal * PAIR_RESOLUTIONS[i];
    lng += lngVal * PAIR_RESOLUTIONS[i];
  }

  // Determine the final pair resolution.
  const resolution = PAIR_RESOLUTIONS[pairs - 1];

  const latitudeLo = lat - 90;
  const longitudeLo = lng - 180;
  const latitudeHi = latitudeLo + resolution;
  const longitudeHi = longitudeLo + resolution;

  return {
    latitudeLo,
    longitudeLo,
    latitudeHi,
    longitudeHi,
    latitudeCenter: (latitudeLo + latitudeHi) / 2,
    longitudeCenter: (longitudeLo + longitudeHi) / 2,
  };
}

export function recoverNearestPlusCode(
  shortCode: string,
  referenceLat: number,
  referenceLng: number
): string {
  const code = shortCode.toUpperCase().trim();
  const sep = code.indexOf(SEPARATOR);
  if (sep === -1) throw new Error("Not a Plus Code (missing '+')");

  // Already full.
  if (sep === SEPARATOR_POSITION) return code;

  // Must be a short code.
  if (sep > SEPARATOR_POSITION) throw new Error("Invalid Plus Code separator position");

  const refCode = encodePlusCode(referenceLat, referenceLng, 10);

  const prefixLength = SEPARATOR_POSITION - sep;
  const recovered = refCode.slice(0, prefixLength) + code;

  const area = decodePlusCode(recovered);

  // The size of the area defined by the missing prefix.
  const resolutionIndex = Math.max(0, prefixLength / 2 - 1);
  const resolution = PAIR_RESOLUTIONS[resolutionIndex];

  let lat = area.latitudeCenter;
  let lng = area.longitudeCenter;

  const latDiff = lat - referenceLat;
  if (latDiff > resolution / 2) lat -= resolution;
  else if (latDiff < -resolution / 2) lat += resolution;

  const lngDiff = lng - referenceLng;
  if (lngDiff > resolution / 2) lng -= resolution;
  else if (lngDiff < -resolution / 2) lng += resolution;

  return encodePlusCode(lat, lng, 10);
}
