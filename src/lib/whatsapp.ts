/**
 * Official WhatsApp Click-to-Chat utility for ISARA Residence
 * Business Number: +94 70 680 1910 -> 94706801910
 */

export const ISARA_WHATSAPP_NUMBER = "94706801910";
export const ISARA_WHATSAPP_DISPLAY = "+94 70 680 1910";
export const ISARA_EMAIL = "isararesidence@gmail.com";

export interface RoomInquiryParams {
  name?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number | string;
  roomType?: string;
  message?: string;
}

export interface EventInquiryParams {
  name?: string;
  eventDate?: string;
  attendees?: number | string;
  eventType?: string;
  message?: string;
}

export function buildRoomWhatsAppUrl(params: RoomInquiryParams): string {
  const lines: string[] = ["Hello ISARA Residence! I would like to inquire about a room booking:"];

  if (params.name) lines.push(`• Name: ${params.name}`);
  if (params.roomType) lines.push(`• Room: ${params.roomType}`);
  if (params.checkIn) lines.push(`• Check-in: ${params.checkIn}`);
  if (params.checkOut) lines.push(`• Check-out: ${params.checkOut}`);
  if (params.guests) lines.push(`• Guests: ${params.guests}`);
  if (params.message) lines.push(`• Note: ${params.message}`);

  lines.push("\nPlease let me know availability and details. Thank you!");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${ISARA_WHATSAPP_NUMBER}?text=${text}`;
}

export function buildEventWhatsAppUrl(params: EventInquiryParams): string {
  const lines: string[] = ["Hello ISARA Residence! I would like to inquire about hosting an event / gathering:"];

  if (params.name) lines.push(`• Name: ${params.name}`);
  if (params.eventType) lines.push(`• Event Type: ${params.eventType}`);
  if (params.eventDate) lines.push(`• Date: ${params.eventDate}`);
  if (params.attendees) lines.push(`• Estimated Attendees: ${params.attendees}`);
  if (params.message) lines.push(`• Requirements: ${params.message}`);

  lines.push("\nPlease let me know your availability and facility options. Thank you!");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${ISARA_WHATSAPP_NUMBER}?text=${text}`;
}

export function buildGeneralWhatsAppUrl(message?: string): string {
  const defaultText = "Hello ISARA Residence! I would like to inquire about accommodation in Polonnaruwa.";
  const text = encodeURIComponent(message || defaultText);
  return `https://wa.me/${ISARA_WHATSAPP_NUMBER}?text=${text}`;
}

export const getWhatsAppRoomUrl = buildRoomWhatsAppUrl;
export const getWhatsAppEventUrl = (params?: EventInquiryParams) => buildEventWhatsAppUrl(params || {});
export const getWhatsAppGeneralUrl = buildGeneralWhatsAppUrl;

