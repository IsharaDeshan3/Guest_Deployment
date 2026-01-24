export type NearbyLocation = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  visitMinutes?: number;
  description: {
    en: string;
    si: string;
  };
  images: string[];
};

export const guesthouseOrigin = {
  name: "Isara Residence",
  lat: 7.9439,
  lng: 80.9992,
};

export const nearbyLocations: NearbyLocation[] = [
  {
    id: "deepa_uyana",
    name: "Deepa Uyana",
    lat: 7.9434375,
    lng: 80.9994375,
    visitMinutes: 45,
    description: {
      en: "Deepa Uyana, or \"Island Garden,\" is a historical pleasure garden located on the promontory of the Parakrama Samudra. Attributed to the reign of King Parakramabahu I (1153–1186 AD), this tranquil area was once part of the royal complex designed for leisure and retreat. Although few ancient structures remain, its strategic position jutting into the \"Sea of Parakrama\" offers breathtaking views of the massive reservoir, itself a testament to ancient hydraulic engineering. It serves as a serene reminder of the city's golden age when water management and landscape architecture flourished together.",
      si: "දීප උයන හෙවත් \"දූපත් උද්‍යානය\" යනු පරාක්‍රම සමුද්‍රයට නෙරා ගිය බිම් තීරයේ පිහිටි ඓතිහාසික රාජකීය විනෝද උද්‍යානයකි. මහා පරාක්‍රමබාහු රජු (ක්‍රි.ව. 1153–1186) විසින් ඉදිකත බව සැලකෙන මෙය, රජුගේ විවේකය සඳහා වෙන්වූ අලංකාර උද්‍යාන සංකීර්ණයක කොටසක් විය. අතීත ගොඩනැගිලි අද දක්නට නොලැබුනද, පරාක්‍රම සමුද්‍රයේ අසිරිය විඳගැනීමට හැකි මෙම ස්ථානය පුරාණ ජල තාක්ෂණයේ සහ භූමි අලංකරණයේ විශිෂ්ටත්වය කියාපායි.",
    },
    images: [
      "/images/locations/deepa_uyana/1.jpg",
      "/images/locations/deepa_uyana/2.jpg",
    ],
  },
  {
    id: "vatadage",
    name: "Polonnaruwa Vatadage",
    lat: 7.94722222,
    lng: 81.00111111,
    visitMinutes: 45,
    description: {
      en: "The Polonnaruwa Vatadage is a masterpiece of ancient Sri Lankan architecture, situated within the Dalada Maluwa (Tooth Relic Terrace). Believed to be built by King Parakramabahu I and later embellished by King Nissanka Malla, this circular relic house was designed to protect the sacred Tooth Relic of the Buddha. The structure features concentric stone terraces with intricate moonstones, guardstones, and four seated Buddha statues facing the cardinal directions. Its artistic stone carvings are considered some of the finest in the country, symbolizing the spiritual heart of the ancient kingdom.",
      si: "පොළොන්නරුව වටදාගෙය, දළදා මළුව තුළ පිහිටි ශ්‍රී ලාංකීය වාස්තු විද්‍යාවේ අග්‍රගන්‍ය නිර්මාණයකි. පරාක්‍රමබාහු රජු විසින් ඉදිකර පසුව නිශ්ශංක මල්ල රජු විසින් වැඩි දියුණු කරන ලදැයි සැලකෙන මෙය, දළදා වහන්සේ ආරක්ෂා කිරීම උදෙසා නිර්මාණය විය. කවය ආකාර වේදිකා, සඳකඩපහණ, මුරගල් සහ සිව් දිශාවට මුහුණලන බුද්ධ ප්‍රතිමා වලින් සමන්විත මෙය පුරාණ රාජධානියේ ආගමික හදවත බඳුය.",
    },
    images: [
      "/images/locations/vatadage/1.jpg",
      "/images/locations/vatadage/2.jpg",
      "/images/locations/vatadage/3.jpg",
    ],
  },
  {
    id: "hatadage",
    name: "Hatadage",
    lat: 7.94774,
    lng: 81.00153,
    visitMinutes: 30,
    description: {
      en: "The Hatadage, built by King Nissanka Malla (1187–1196 AD), is an ancient relic shrine named for the tradition that it was constructed in sixty (hata) hours. Located directly opposite the Vatadage, it once housed the Sacred Tooth Relic. The walls consist of massive stone slabs, originally adorned with wood and clay superstructures. Near its entrance lies the \"Gal Pota\" (Stone Book), a massive stone inscription describing the king's virtues and lineage, further emphasizing the site's historical significance as a center of royal power and piety.",
      si: "හටදාගෙය යනු නිශ්ශංක මල්ල රජු (ක්‍රි.ව. 1187–1196) විසින් දළදා වහන්සේ තැන්පත් කිරීම සඳහා ඉදි කළ පුදබිමයි. මෙය පැය හැටකින් (60) නිම කරන ලද බවත්, එනිසා \"හටදාගෙය\" ලෙස නම් වූ බවත් ජනප්‍රවාදයේ සඳහන් වේ. වටදාගෙයට මුහුණලා පිහිටි මෙහි බිත්ති දැවැන්ත ගල් පුවරු වලින් නිමවා ඇති අතර, අසල පිහිටි \"ගල් පොත\" සෙල්ලිපිය රජුගේ විස්තර හා වංශකතාව හෙළි කරයි.",
    },
    images: [
      "/images/locations/hatadage/1.jpg",
      "/images/locations/hatadage/2.jpg",
    ],
  },
  {
    id: "nissanka_latha",
    name: "Nissanka Latha Mandapaya",
    lat: 7.94753611,
    lng: 81.00114167,
    visitMinutes: 20,
    description: {
      en: "The Nissanka Latha Mandapaya is a unique structure built by King Nissanka Malla for listening to the chanting of Pirith (Buddhist scriptures). Unlike traditional solid columns, the stone pillars here are carved to resemble lotus stalks, swaying gently in the breeze, crowned with budding lotus capitals. This architectural marvel sits within a stone railing and showcases the king's penchant for flamboyant and distinct artistic styles, deviating from the classic Anuradhapura tradition to create something truly ornamental.",
      si: "නිශ්ශංක ලතා මණ්ඩපය යනු පිරිත් ශ්‍රවණය සඳහා නිශ්ශංක මල්ල රජු විසින් ඉදිකරන ලද සුවිශේෂී ගොඩනැගිල්ලකි. මෙහි ඇති ගල් කණු, සුළඟට සෙලවෙන නෙළුම් දඬු ආකාරයට වක්කරමින් නිර්මාණය කර ඇති අතර, ඉහළින් පිපුණු නෙළුම් මල් කැටයම් දැකිය හැක. සාම්ප්‍රදායික ගෘහ නිර්මාණ ශිල්පයෙන් බැහැරවූ මෙම අලංකාර නිර්මාණය රජුගේ කලාකාමීත්වය මනාව පෙන්නුම් කරයි.",
    },
    images: [
      "/images/locations/nissanka_latha/1.jpg",
      "/images/locations/nissanka_latha/2.jpg",
    ],
  },
  {
    id: "rankoth_vehera",
    name: "Rankoth Vehera",
    lat: 7.95821,
    lng: 81.0034,
    visitMinutes: 35,
    description: {
      en: "Rankoth Vehera is the largest stupa in Polonnaruwa and the fourth largest in Sri Lanka, constructed by King Nissanka Malla. Modeling it after the colossal Ruwanwelisaya in Anuradhapura, the king named it \"Ruwanveli,\" though it is now known as Rankoth Vehera (\"Gold Pinnacled Stupa\"). Rising 55 meters high, this brick structure is surrounded by four vahalkadas (frontispieces) and numerous smaller shrines. Inscriptions near one of the vahalkadas record the king's supervision of the construction, seated on a stone platform to watch his work rise.",
      si: "රන්කොත් වෙහෙර යනු පොළොන්නරුවේ පිහිටි විශාලතම ස්තූපය වන අතර ශ්‍රී ලංකාවේ සිව්වන විශාලතම ස්තූපයයි. නිශ්ශංක මල්ල රජු විසින් අනුරාධපුර රුවන්වැලිසෑය ආදර්ශයට ගනිමින් මෙය නිර්මාණය කර ඇති අතර, එකල මෙය හැඳින්වූයේද \"රුවන්වැලි\" නමිනි. අඩි 180ක් පමණ උසැති මෙම ගඩොල් නිර්මාණය වටා වාහල්කඩ සහ කුඩා කුටි පිහිටා ඇත. රජු ගල් ආසනයක හිඳ මෙහි වැඩ කටයුතු නිරීක්ෂණය කළ බව සෙල්ලිපි වල සඳහන් වේ.",
    },
    images: [
      "/images/locations/rankoth_vehera/1.jpg",
      "/images/locations/rankoth_vehera/2.jpg",
    ],
  },
  {
    id: "gal_vihara",
    name: "Gal Vihara",
    lat: 7.96588,
    lng: 81.00497,
    visitMinutes: 60,
    description: {
      en: "Gal Vihara, originally named Uttararama, is the pinnacle of Sinhalese rock carving, commissioned by King Parakramabahu I. The site features four magnificent Buddha statues carved from a single face of granite gneiss: a large seated Buddha in meditation, a smaller seated Buddha inside a cave (Vidyadhara Guha), a standing Buddha with crossed arms (often debated as Ananda Thero, but likely the Buddha himself representing sorrow or enlightenment), and a colossal 14-meter reclining Buddha depicting the Parinirvana. These masterpieces capture profound serenity and are globally renowned for their fluidity and detail.",
      si: "ගල් විහාරය හෙවත් උත්තරාරාමය, මහා පරාක්‍රමබාහු රජුගේ අනුග්‍රහයෙන් නිර්මාණය වූ සිංහල ගල් කැටයම් කලාවේ අග්‍රඵලයයි. තනි ගල් පර්වතයකින් නෙළා ඇති මෙහි සමාධි මුද්‍රාවෙන් වැඩ සිටින බුද්ධ රූපයක්, විද්‍යාධර ගුහාව තුළ ඇති කුඩා බුද්ධ රූපයක්, හිටි පිළිමයක් සහ පරිනිර්වාණය දැක්වෙන සැතපෙන පිළිමයක් ඇතුළත් වේ. මෙම ප්‍රතිමා වල දක්නට ලැබෙන ශාන්ත භාවය සහ සියුම් කැටයම් ලොව පුරා ගෞරවාදරයට පාත්‍ර වී ඇත.",
    },
    images: [
      "/images/locations/gal_vihara/1.jpg",
      "/images/locations/gal_vihara/2.jpg",
    ],
  },
  {
    id: "satmahal",
    name: "Satmahal Prasada",
    lat: 7.94795,
    lng: 81.00185,
    visitMinutes: 25,
    description: {
      en: "Satmahal Prasada is a rare seven-storied stepped pyramid located in the Dalada Maluwa sector. Its unusual design differs significantly from traditional Sri Lankan stupas, resembling architectural styles found in Cambodia (Wat Kukut) or Thailand (Wat Cham Thewi). This suggests strong cultural or diplomatic links between Polonnaruwa and Southeast Asian kingdoms during the 12th century. Though its original function remains a mystery, it is believed to be a stupa enshrining relics, with each diminishing story originally adorned with deity figures.",
      si: "සත්මහල් ප්‍රාසාදය යනු දළදා මළුවේ පිහිටි සුවිශේෂී සත් මහල් පිරමීඩාකාර ගොඩනැගිල්ලකි. සාම්ප්‍රදායික ස්තූප නිර්මාණ වලට වඩා වෙනස් වූ මෙය කාම්බෝජයේ හෝ තායිලන්තයේ දක්නට ලැබෙන වාස්තු විද්‍යා ලක්ෂණ පෙන්නුම් කරයි. මෙය 12 වන සියවසේදී අග්නිදිග ආසියානු රටවල් සමඟ තිබූ සබඳතා තහවුරු කරන්නකි. මෙහි මුල් අරමුණ අපැහැදිලි වුවත්, මෙය ධාතු නිදන් කළ ස්තූපයක් ලෙස සැලකේ.",
    },
    images: [
      "/images/locations/satmahal/1.jpg",
      "/images/locations/satmahal/2.jpg",
    ],
  },
  {
    id: "parakramabahu_statue",
    name: "Statue of Parakramabahu I",
    lat: 7.92627,
    lng: 80.99484,
    visitMinutes: 20,
    description: {
      en: "Standing near the Potgul Vehera, this iconic 12th-century stone statue is popularly believed to depict King Parakramabahu I, the great builder of Polonnaruwa. The figure, carved into a rock boulder, holds an object that resembles a yoke (symbolizing sovereignty) or an ola-leaf manuscript (symbolizing scholarship). Standing 11.5 feet tall, the statue radiates majesty, strength, and dignity. Some scholars argue it represents a sage like Pulasti or Agastya, but its royal bearing and proximity to the king's works keep the popular legend alive.",
      si: "පොත්ගුල් වෙහෙර අසල පිහිටි මෙම විශිෂ්ට ගල් ප්‍රතිමාව, පොළොන්නරුව රාජධානිය ගොඩනැගූ මහා පරාක්‍රමබාහු රජුගේ යැයි සාම්ප්‍රදායිකව විශ්වාස කෙරේ. අඩි 11.5ක් පමණ උසැති මෙම ප්‍රතිමාව අතේ වියගහක් හෝ පුස්කොළ පොතක් දරා සිටින බවක් පෙනේ. ඇතැම් උගතුන් මෙය පුලස්ති ඍෂිවරයාගේ යැයි මත පළ කළද, එහි ඇති රාජකීය ලීලාව නිසා එය පරාක්‍රමබාහු රජුගේ බවට බොහෝ දෙනා පිළිගනිති.",
    },
    images: ["/images/locations/parakramabahu_statue/1.jpg"],
  },
  {
    id: "royal_palace",
    name: "Royal Palace",
    lat: 7.9434781,
    lng: 80.9979259,
    visitMinutes: 50,
    description: {
      en: "The Royal Palace of King Parakramabahu I, known as the \"Palace of Seven Stories\" (Vaijayanta Prasada), was once a colossal structure with a thousand chambers, according to the Chronicles. Today, massive brick walls of three stories remain, hinting at its original grandeur. The complex included spacious halls and likely had wooden upper floors that were destroyed by fire during the invasion of Kalinga Magha. The thick walls preserve traces of plaster and holes for floor beams, offering a glimpse into the immense scale of medieval royal living.",
      si: "මහා පරාක්‍රමබාහු රජුගේ රාජ මාළිගාව හෙවත් \"වෛජයන්ත ප්‍රාසාදය\", මහාවංශයට අනුව කාමර දහසකින් හා මහල් හතකින් යුක්ත විය. කාලිංග මාඝ ආක්‍රමණයේදී ගින්නෙන් විනාශ වුවද, අදටත් ඉතිරිව ඇති දැවැන්ත ගඩොල් බිත්ති තුනක කොටස් එහි අතීත ප්‍රෞඩත්වය කියාපායි. ලී බාල්ක සඳහා වූ කුහර සහ බදාම කොටස්, මධ්‍යකාලීන රාජකීය වාස්තු විද්‍යාවේ විශාලත්වය සාක්ෂි දරයි.",
    },
    images: ["/images/locations/royal_palace/1.jpg"],
  },
  {
    id: "council_chamber",
    name: "Council Chamber",
    lat: 7.9427429,
    lng: 81.001874,
    visitMinutes: 25,
    description: {
      en: "The Council Chamber of King Parakramabahu I is a rectangular structure situated on a high stone platform in front of the Royal Palace. It served as the king's audience hall for state affairs. The base is adorned with friezes of elephants, lions, and dwarfs. The entrance is guarded by two beautiful lion statues. The roof was once supported by stone pillars which remain today; historically, ministers sat at specific pillars assigned by rank, showcasing the organized administrative hierarchy of the Polonnaruwa kingdom.",
      si: "රාජ සභා මණ්ඩපය, පරාක්‍රමබාහු රජුගේ මාළිගාව ඉදිරිපිට උස් පීඨිකාවක් මත පිහිටා ඇත. රාජ්‍ය කටයුතු සාකච්ඡා කිරීම සඳහා භාවිතා වූ මෙහි පාදම ඇතුන්, සිංහයන් සහ වාමන රූප කැටයම් වලින් අලංකාර කර ඇත. පිවිසුම අසල සිංහ රූප දෙකක් ඇති අතර, වහලය දැරූ ගල් කණු අදටත් ශේෂව පවතී. අතීතයේ අමාත්‍යවරුන් තරාතිරම අනුව අදාළ කණු අසල අසුන් ගත් බව පැවසේ.",
    },
    images: [
      "/images/locations/council_chamber/1.jpg",
      "/images/locations/council_chamber/2.jpg",
    ],
  },
  {
    id: "archaeological_museum",
    name: "Archaeological Museum",
    lat: 7.9418009,
    lng: 80.9989762,
    visitMinutes: 60,
    description: {
      en: "The Polonnaruwa Archaeological Museum is an essential starting point for any visit, located near the Parakrama Samudra rest house. It houses a rich collection of artifacts recovered from the ancient city, including surgical instruments, bronze statues of Hindu deities (evidence of religious tolerance and Chola influence), ceramic items, and architectural models. The museum provides context to the ruins, displaying reconstructions of how the massive buildings like the Royal Palace and Thuparama might have looked in their prime.",
      si: "පරාක්‍රම සමුද්‍රය අසල පිහිටි පොළොන්නරුව පුරාවිද්‍යා කෞතුකාගාරය, පුරාවිද්‍යා නරඹන්නන් අනිවාර්යයෙන්ම යා යුතු ස්ථානයකි. මෙහි ශල්‍ය වෛද්‍ය උපකරණ, හින්දු දේව ප්‍රතිමා, මැටි බඳුන් සහ වාස්තු විද්‍යාත්මක ආකෘති ඇතුළු වටිනා පුරාවස්තු රැසක් තැන්පත් කර ඇත. නටබුන් බවට පත්ව ඇති රාජ මාළිගා සහ ස්තූප අතීතයේ තිබූ ආකාරය පිළිබඳ අවබෝධයක් ලබා ගැනීමට මෙහි ඇති ආකෘති උපකාරී වේ.",
    },
    images: [
      "/images/locations/archaeological_museum/1.jpg",
      "/images/locations/archaeological_museum/2.jpg",
    ],
  },
  {
    id: "kumara_pokuna",
    name: "Kumara Pokuna",
    lat: 7.9421856,
    lng: 81.0024224,
    visitMinutes: 20,
    description: {
      en: "Located just outside the royal citadel, Kumara Pokuna (\"Prince's Pond\") was the royal bath constructed by King Parakramabahu I. The pond is designed in a geometric shape with stepped sides leading down to the water. Fresh water was channeled from the canal through dragon-mouthed spouts (makara sohi), showcasing the sophisticated hydraulic network that cooled the water before it entered the bath. Adjacent to the pond are the ruins of a changing room, reflecting the luxury and attention to detail in royal life.",
      si: "කුමාර පොකුණ යනු රාජ මාළිගා සංකීර්ණයට පහළින් පිහිටි, පරාක්‍රමබාහු රජු විසින් කරවූ රාජකීය ස්නාන තටාකයයි. පියගැට පෙළකින් ජලය වෙත බැසීමට සකසා ඇති මෙය ජ්‍යාමිතික හැඩයකින් යුක්තය. ඇල මාර්ගයෙන් ගෙන එන ජලය මකර කටවල් හරහා පොකුණට පිරවීමට සලස්වා තිබීමෙන් එකල ජල තාක්ෂණයේ දියුණුව පැහැදිලි වේ. පොකුණ අසල ඇඳුම් මාරු කිරීමේ කාමරයක නටබුන් ද දැකගත හැකිය.",
    },
    images: [
      "/images/locations/kumara_pokuna/1.jpg",
      "/images/locations/kumara_pokuna/2.jpg",
    ],
  },
  {
    id: "pabalu_vehera",
    name: "Pabalu Vehera",
    lat: 7.9494843,
    lng: 81.0042715,
    visitMinutes: 30,
    description: {
      en: "Pabalu Vehera is a stupa traditionally attributed to Queen Rupavati, one of the consorts of King Parakramabahu I. Its name, \"Bead Stupa,\" possibly derives from the many glass beads found in the vicinity during excavations. The structure is unique for its extensive use of brick and its slightly different shape compared to other stupas in the complex. It stands as a testament to the patronage of royal women in the religious landscape of medieval Sri Lanka.",
      si: "පබළු වෙහෙර, පරාක්‍රමබාහු රජුගේ බිසවක වූ රූපවතී දේවිය විසින් කරවූ බව සැලකේ. කැණීම් වලදී මෙම ප්‍රදේශයෙන් වීදුරු පබළු විශාල ප්‍රමාණයක් හමුවීම නිසා මීට \"පබළු වෙහෙර\" යැයි නම ලැබී ඇත. ගඩොල් භාවිතා කරමින් නිර්මාණය කර ඇති මෙය, පොළොන්නරුවේ අනෙක් ස්තූප වලට වඩා තරමක් වෙනස් හැඩයක් ගනී. මෙය මධ්‍යකාලීන කාන්තාවන්ගේ ආගමික දායකත්වය කියාපාන ස්මාරකයකි.",
    },
    images: [
      "/images/locations/pabalu_vehera/1.jpg",
      "/images/locations/pabalu_vehera/2.jpg",
    ],
  },
  {
    id: "lankatilaka_temple",
    name: "Lankatilaka Temple",
    lat: 7.9628366,
    lng: 81.0036267,
    visitMinutes: 45,
    description: {
      en: "Lankatilaka is a massive \"Gedige\" style image house built by King Parakramabahu I. It is renowned for its towering brick walls, which originally stood possibly five stories high. Inside, a colossal standing Buddha statue (now headless) dominates the narrow aisle. The exterior walls are decorated with elaborate stucco figures of deities and architectural motifs. Even in its ruined state, Lankatilaka evokes a sense of awe, being one of the largest religious edifices of the Polonnaruwa period.",
      si: "ලංකාතිලක විහාරය යනු පරාක්‍රමබාහු රජු විසින් ඉදිකළ \"ගෙඩිගේ\" සම්ප්‍රදායේ විශාල ප්‍රතිමා ගෘහයකි. අඩි 50කට වඩා උසැති මෙහි ගඩොල් බිත්ති සහ ඇතුළත වූ දැවැන්ත හිටි බුද්ධ ප්‍රතිමාවේ කොටස් අදටත් දැකගත හැක. පිටත බිත්ති අලංකාර බදාම රූප සහ කැටයම් වලින් සරසා ඇත. පොළොන්නරුව යුගයේ විශාලතම ආගමික ගොඩනැගිල්ලක් වන මෙය නරඹන්නන් තුළ විස්මය දනවන නිර්මාණයකි.",
    },
    images: [
      "/images/locations/lankatilaka_temple/1.jpg",
      "/images/locations/lankatilaka_temple/2.jpg",
    ],
  },
  {
    id: "kiri_vehera_polonnaruwa",
    name: "Kiri Vehera (Polonnaruwa)",
    lat: 7.9632806,
    lng: 81.0036212,
    visitMinutes: 25,
    description: {
      en: "Kiri Vehera is the second largest stupa in Polonnaruwa and is the best-preserved unrestored stupa in Sri Lanka. It dates back to the reign of King Parakramabahu I and is believed to have been built by his queen, Subhadra. The original lime plaster remains largely intact, giving it a milky white appearance, hence the name \"Milk Stupa.\" It was originally known as \"Rupa Vehera.\" Its pristine condition provides the clearest picture of what these ancient domes looked like centuries ago.",
      si: "කිරි වෙහෙර පොළොන්නරුවේ දෙවන විශාලතම ස්තූපය වන අතර, ප්‍රතිසංස්කරණය නොකළද හොඳින්ම සුරැකි ස්තූපයයි. පරාක්‍රමබාහු රජුගේ බිසවක වූ සුභද්‍රා දේවිය විසින් මෙය කරවූ බව කියැවේ. මෙහි ආලේප කර තිබූ හුණු බදාම තට්ටුව අදටත් සුදු පැහැයෙන් දිස්වන නිසා \"කිරි වෙහෙර\" ලෙස හැඳින්වේ. මෙය මුලින් \"රූප වෙහෙර\" ලෙසද හඳුන්වා ඇත.",
    },
    images: ["/images/locations/kiri_vehera_polonnaruwa/1.jpg"],
  },
  {
    id: "alahan_pirivena",
    name: "Alahana Pirivena",
    lat: 7.9619459,
    lng: 81.0035101,
    visitMinutes: 50,
    description: {
      en: "Spanning over 80 hectares, the Alahana Pirivena was the largest monastic university complex in Polonnaruwa, established by King Parakramabahu I. The name implies \"Cremation Monastery,\" as it was built on ground previously used for royal funerals. The site includes the Lankatilaka, Kiri Vehera, and the Baddhasima Prasada (Chapter House). It served as the center of Buddhist education and discipline, housing thousands of monks in a meticulously planned landscape of terraces and stupas.",
      si: "අක්කර 80කට වඩා පැතිරී ඇති ආලාහන පිරිවෙන, පරාක්‍රමබාහු රජු විසින් ඉදි කළ පොළොන්නරුවේ විශාලතම විශ්වවිද්‍යාල පිරිවෙනයි. රාජකීය ආදාහන කටයුතු සිදු කළ භූමියක ඉදි කළ නිසා මෙයට \"ආලාහන පිරිවෙන\" යැයි කියනු ලැබේ. ලංකාතිලකය, කිරි වෙහෙර සහ බද්ධසීමා ප්‍රාසාදය මෙහි අන්තර්ගතය. දහස් ගණන් භික්ෂූන් වහන්සේලා වැඩ විසූ මෙය එකල බෞද්ධ අධ්‍යාපනයේ මධ්‍යස්ථානය විය.",
    },
    images: ["/images/locations/alahan_pirivena/1.jpg"],
  },
  {
    id: "tivanka_image_house",
    name: "Tivanka Image House",
    lat: 7.9786914,
    lng: 81.006039,
    visitMinutes: 40,
    description: {
      en: "The Tivanka Image House is famous for its rare 12th-century frescoes and the specific posture of its Buddha statue. \"Tivanka\" means \"thrice-bent,\" referring to the statue's body curving at the shoulder, waist, and knee. While the statue is damaged, the inner walls preserve vibrant murals depicting the Jataka tales (lives of the Buddha), showing distinct artistic influence from the Ajanta caves in India. It is the only structure where such extensive Polonnaruwa-era paintings can still be clearly seen.",
      si: "තිවංක පිළිම ගෙය එහි ඇති 12 වන සියවසේ බිතු සිතුවම් සහ විශේෂ බුද්ධ ප්‍රතිමාව නිසා ප්‍රසිද්ධය. \"තිවංක\" යනු \"තුන් තැනකින් නැමුණු\" යන්නයි; මෙහි බුද්ධ ප්‍රතිමාව උරහිස, ඉඟටිය සහ දණහිස යන ස්ථානවලින් නැමී ඇති බැවින් එම නම ලැබී ඇත. ජාතක කතා සහ බුද්ධ චරිතය නිරූපණය කරන විචිත්‍රවත් බිතු සිතුවම් මෙහි දක්නට ලැබෙන අතර, ඒවා පොළොන්නරුව යුගයේ චිත්‍ර කලාවට හොඳම උදාහරණයකි.",
    },
    images: [
      "/images/locations/tivanka_image_house/1.jpg",
      "/images/locations/tivanka_image_house/2.jpg",
    ],
  },
  {
    id: "lotus_pond",
    name: "Lotus Pond",
    lat: 7.9748478,
    lng: 81.0039995,
    visitMinutes: 20,
    description: {
      en: "The Lotus Pond (Nelum Pokuna) is a small but exquisitely designed stone bath shaped like a full-blown eight-petaled lotus flower. Built from cut granite, it is often associated with the Jetavana Vihara complex. Though small compared to other tanks, its artistic merit lies in its symmetry and elegance. It likely served the monks of the nearby monastery. It is a fine example of the stone-crafting precision of the Polonnaruwa artisans.",
      si: "නෙළුම් පොකුණ යනු අට පෙති නෙළුම් මලක හැඩයට කළු ගලින් නිර්මාණය කළ කුඩා නමුත් ඉතා අලංකාර පොකුණකි. ජේතවන විහාර සංකීර්ණයට අයත් මෙය භික්ෂූන් වහන්සේලාගේ ප්‍රයෝජනය සඳහා නිමවා ඇත. ප්‍රමාණයෙන් කුඩා වුවද, එහි ඇති සමමිතික බව සහ කලාත්මක නිමාව පෞරාණික ගල් වඩුවන්ගේ කුසලතාව මනාව පෙන්නුම් කරයි.",
    },
    images: [
      "/images/locations/lotus_pond/1.jpg",
      "/images/locations/lotus_pond/2.jpg",
    ],
  },
];
