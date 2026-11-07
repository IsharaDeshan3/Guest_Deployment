"use client";

import { useState, useEffect, useId, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import {
  Send,
  Mail,
  Phone,
  Facebook,
  MapPin,
  Clock,
  Sparkles,
  Wifi,
  Coffee,
  Users,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import {
  ISARA_WHATSAPP_DISPLAY,
  buildRoomWhatsAppUrl,
  buildEventWhatsAppUrl,
  buildGeneralWhatsAppUrl,
} from "@/lib/whatsapp";

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
  eventDate: string;
  attendees: string;
  eventType: string;
  message: string;
  website_hp: string;
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const formId = useId();

  const [scrollY, setScrollY] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<FormDataState | null>(null);

  // Initialize form with query params if available
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    phone: "",
    inquiryType: searchParams.get("type") || "room_booking",
    checkIn: searchParams.get("checkin") || "",
    checkOut: searchParams.get("checkout") || "",
    guests: searchParams.get("guests") || "2",
    roomType: searchParams.get("room") || "Deluxe Double Room",
    eventDate: searchParams.get("eventDate") || "",
    attendees: searchParams.get("attendees") || "",
    eventType: searchParams.get("eventType") || "Small Party",
    message: "",
    website_hp: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAccommodation = formData.inquiryType === "room_booking";
  const isEvent = ["small_party", "meeting", "gathering", "other_event"].includes(
    formData.inquiryType
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    // Client-side date check
    if (isAccommodation && formData.checkIn && formData.checkOut) {
      const inDate = new Date(formData.checkIn);
      const outDate = new Date(formData.checkOut);
      if (outDate <= inDate) {
        setStatus("error");
        setStatusMessage("Check-out date must be after your check-in date.");
        return;
      }
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage(
          data.message ||
            "Your inquiry has been sent to ISARA Residence! We will get back to you shortly."
        );
        setSubmittedData({ ...formData });
      } else {
        setStatus("error");
        setStatusMessage(
          data.error ||
            "Unable to submit inquiry. Please try again or message us directly via WhatsApp."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Network error. Please try again or reach out directly on WhatsApp at +94 70 680 1910."
      );
    }
  };

  // Generate WhatsApp link for current/submitted inquiry
  const getWhatsAppLink = (dataToUse: FormDataState) => {
    if (dataToUse.inquiryType === "room_booking") {
      return buildRoomWhatsAppUrl({
        name: dataToUse.name,
        checkIn: dataToUse.checkIn,
        checkOut: dataToUse.checkOut,
        guests: dataToUse.guests,
        roomType: dataToUse.roomType,
        message: dataToUse.message,
      });
    } else if (["small_party", "meeting", "gathering", "other_event"].includes(dataToUse.inquiryType)) {
      return buildEventWhatsAppUrl({
        name: dataToUse.name,
        eventDate: dataToUse.eventDate,
        attendees: dataToUse.attendees,
        eventType: dataToUse.eventType || dataToUse.inquiryType,
        message: dataToUse.message,
      });
    }
    return buildGeneralWhatsAppUrl(
      `Hello ISARA Residence! My name is ${dataToUse.name || "a guest"}. ${dataToUse.message || "I would like to inquire about accommodation in Polonnaruwa."}`
    );
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "isararesidence@gmail.com",
      href: "mailto:isararesidence@gmail.com",
      color: "from-nature-400 to-nature-600",
    },
    {
      icon: Phone,
      label: "WhatsApp / Call",
      value: ISARA_WHATSAPP_DISPLAY,
      href: "https://wa.me/94727263590",
      color: "from-nature-500 to-nature-700",
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "ISARA Residence Official",
      href: "https://www.facebook.com/profile.php?id=61566264627335",
      color: "from-nature-600 to-nature-800",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "No 26, 25th Mile Post, Bendiwewa, Polonnaruwa, Sri Lanka",
      subValue: "Roadside & lake view",
      href: "https://maps.app.goo.gl/SrRATsz9uvcrRsc66",
      color: "from-nature-500 to-nature-700",
    },
  ];

  const confirmedFeatures = [
    {
      icon: Sparkles,
      title: "Parakrama Samudra View",
      description: "Enjoy peaceful breezes and scenic views of Parakrama Samudra reservoir from our backyard.",
    },
    {
      icon: MapPin,
      title: "Roadside & Ancient City Access",
      description: "Convenient roadside setting located just ~5 minutes from Polonnaruwa historical UNESCO sites.",
    },
    {
      icon: Wifi,
      title: "Free High-Speed Wi-Fi",
      description: "Reliable wireless internet access across all rooms and guest spaces.",
    },
    {
      icon: Coffee,
      title: "Optional Fresh Breakfast",
      description: "Authentic Sri Lankan breakfast available freshly prepared upon request.",
    },
    {
      icon: Users,
      title: "Parties & Meeting Hosting",
      description: "Accommodating facilities for small parties, business meetings, and intimate gatherings.",
    },
    {
      icon: Clock,
      title: "Clear Check-in Schedule",
      description: "Check-in from 3:00 PM (15:00) and check-out until 10:00 AM (10:00) for seamless stays.",
    },
  ];

  const visibleFaqs = [
    {
      q: "What are your check-in and check-out times?",
      a: "Check-in time is at 3:00 PM (15:00) and check-out time is at 10:00 AM (10:00). Please let us know your estimated arrival time so we can prepare your room.",
    },
    {
      q: "Is breakfast included in the room rate?",
      a: "Breakfast is optional and freshly prepared upon request. It is not automatically included in room rates, giving you the flexibility to choose each morning.",
    },
    {
      q: "How far is ISARA Residence from Polonnaruwa Ancient City?",
      a: "ISARA Residence is located roadside, approximately 5 minutes drive from the primary archaeological sites and ruins of Polonnaruwa.",
    },
    {
      q: "What view does the property offer?",
      a: "The property features a tranquil garden and a scenic view of the historic Parakrama Samudra reservoir from our backyard.",
    },
    {
      q: "Can I host a small party or meeting here?",
      a: "Yes! ISARA Residence accommodates small parties, business meetings, and private gatherings. Please select the event inquiry option or message us on WhatsApp with your requirements.",
    },
    {
      q: "Is Free Wi-Fi provided?",
      a: "Yes, complimentary high-speed Wi-Fi is available throughout the guest house for all staying guests.",
    },
  ];

  return (
    <main className="min-h-screen bg-nature-950 text-nature-50 font-sans selection:bg-nature-300 selection:text-nature-900 relative overflow-hidden">
      <Navigation />

      {/* Parallax Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-nature-900/95 via-nature-800/90 to-nature-950/95 z-10" />
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="relative w-full h-full opacity-100">
            <Image
              src="/polonnaruwa-stupas.jpg"
              alt="Polonnaruwa historic stupas near ISARA Residence"
              fill
              className="object-cover object-bottom"
              quality={85}
            />
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative z-20 pt-36 pb-12 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center space-x-2 px-5 py-2 rounded-full bg-nature-700/30 border border-nature-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-nature-400 rounded-full animate-pulse" />
              <span className="text-nature-300 text-xs font-semibold tracking-widest uppercase">
                Direct Contact & Inquiries
              </span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-nature-50 leading-tight mb-4">
            Connect With{" "}
            <span className="bg-gradient-to-r from-nature-200 via-nature-300 to-nature-400 bg-clip-text text-transparent italic">
              ISARA Residence
            </span>
          </h1>

          <p className="text-nature-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Inquire about room reservations, small parties, meetings, or seamless Polonnaruwa accommodation booking. We respond promptly via WhatsApp and email to help you compare properties and plan your stay.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Contact Methods - Left Side */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-serif text-2xl text-nature-100 mb-6">Reach Out Directly</h2>

            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-2xl bg-nature-800/40 backdrop-blur-sm border border-nature-600/30 hover:border-nature-500/60 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-nature-900/40"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${method.color} shadow-lg shrink-0`}
                    >
                      <Icon className="w-5 h-5 text-nature-50" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-nature-200 font-medium text-sm mb-0.5 group-hover:text-nature-100 transition-colors">
                        {method.label}
                      </h3>
                      <p className="text-nature-100 font-semibold text-sm sm:text-base truncate">
                        {method.value}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}

            {/* Quick WhatsApp Bar */}
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-600/30 backdrop-blur-sm text-center">
              <p className="text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-2">
                Instant Response
              </p>
              <p className="text-xs text-nature-200 mb-4 leading-relaxed">
                Prefer messaging on WhatsApp? Chat with our team for availability and personalized inquiries.
              </p>
              <a
                href={getWhatsAppLink(formData)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Google Business Profile Box */}
            <div className="p-6 rounded-2xl bg-nature-800/40 border border-nature-600/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-base text-white">Google Business Profile</span>
              </div>
              <p className="text-xs text-nature-300 mb-4 leading-relaxed">
                Verified Polonnaruwa guest house listing with authentic location, photos, and guest feedback.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://share.google/PkngMsYACMUGvRtBP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs text-white font-medium transition-all"
                >
                  <span>View on Google</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Form - Right Side */}
          <div className="lg:col-span-3">
            <div className="p-6 sm:p-10 rounded-3xl bg-nature-800/40 backdrop-blur-xl border border-nature-600/30 shadow-2xl relative overflow-hidden">
              <h2 className="font-serif text-2xl sm:text-3xl text-nature-50 mb-2">
                Send an Inquiry
              </h2>
              <p className="text-nature-300 text-xs sm:text-sm mb-6">
                Fill out the form below. We will send an email confirmation and are also available for direct WhatsApp follow-up.
              </p>

              {/* Status Notifications */}
              {status === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-6 p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-100"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-200 text-sm">
                        Inquiry Received!
                      </h4>
                      <p className="text-xs mt-1 text-emerald-200/90 leading-relaxed">
                        {statusMessage}
                      </p>
                      {submittedData && (
                        <div className="mt-4 pt-3 border-t border-emerald-800/60 flex flex-wrap gap-2">
                          <a
                            href={getWhatsAppLink(submittedData)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-all"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Continue on WhatsApp</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setStatus("idle");
                              setStatusMessage("");
                            }}
                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-nature-200 transition-colors"
                          >
                            Submit Another Inquiry
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-rose-100 text-xs leading-relaxed flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-rose-200">Unable to Submit: </span>
                    {statusMessage}
                  </div>
                </div>
              )}

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden from legitimate users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor={`${formId}-hp`}>Leave empty</label>
                  <input
                    id={`${formId}-hp`}
                    type="text"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website_hp}
                    onChange={(e) =>
                      setFormData({ ...formData, website_hp: e.target.value })
                    }
                  />
                </div>

                {/* Inquiry Type Selector */}
                <div>
                  <label
                    htmlFor={`${formId}-type`}
                    className="block text-nature-200 font-medium mb-1.5 text-xs uppercase tracking-wider"
                  >
                    Inquiry Type <span className="text-nature-400">*</span>
                  </label>
                  <select
                    id={`${formId}-type`}
                    value={formData.inquiryType}
                    onChange={(e) =>
                      setFormData({ ...formData, inquiryType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-nature-900/70 border border-nature-600/40 text-nature-50 text-sm focus:border-nature-400 focus:outline-none transition-all"
                    required
                  >
                    <option value="room_booking" className="bg-nature-900 text-white">
                      Room Booking Inquiry
                    </option>
                    <option value="general_inquiry" className="bg-nature-900 text-white">
                      General Inquiry
                    </option>
                    <option value="small_party" className="bg-nature-900 text-white">
                      Small Party / Celebration
                    </option>
                    <option value="meeting" className="bg-nature-900 text-white">
                      Meeting / Business Gathering
                    </option>
                    <option value="gathering" className="bg-nature-900 text-white">
                      Private Gathering
                    </option>
                    <option value="other_event" className="bg-nature-900 text-white">
                      Other Custom Event
                    </option>
                  </select>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`${formId}-name`}
                      className="block text-nature-200 font-medium mb-1.5 text-xs uppercase tracking-wider"
                    >
                      Full Name <span className="text-nature-400">*</span>
                    </label>
                    <input
                      id={`${formId}-name`}
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-nature-900/70 border border-nature-600/40 text-nature-50 text-sm placeholder-nature-500 focus:border-nature-400 focus:outline-none transition-all"
                      required
                      minLength={2}
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-email`}
                      className="block text-nature-200 font-medium mb-1.5 text-xs uppercase tracking-wider"
                    >
                      Email Address <span className="text-nature-400">*</span>
                    </label>
                    <input
                      id={`${formId}-email`}
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="e.g. guest@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-nature-900/70 border border-nature-600/40 text-nature-50 text-sm placeholder-nature-500 focus:border-nature-400 focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label
                    htmlFor={`${formId}-phone`}
                    className="block text-nature-200 font-medium mb-1.5 text-xs uppercase tracking-wider"
                  >
                    Phone / WhatsApp Number <span className="text-nature-400">*</span>
                  </label>
                  <input
                    id={`${formId}-phone`}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="e.g. +94 72 72 63 590"
                    className="w-full px-4 py-3 rounded-xl bg-nature-900/70 border border-nature-600/40 text-nature-50 text-sm placeholder-nature-500 focus:border-nature-400 focus:outline-none transition-all"
                    required
                  />
                </div>

                {/* Conditional Fields: Accommodation */}
                {isAccommodation && (
                  <div className="p-4 rounded-2xl bg-nature-900/50 border border-nature-700/50 space-y-4">
                    <p className="text-xs uppercase tracking-widest text-nature-300 font-semibold">
                      Stay Details
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor={`${formId}-checkin`}
                          className="block text-nature-200 text-xs mb-1"
                        >
                          Check-in Date (from 15:00)
                        </label>
                        <input
                          id={`${formId}-checkin`}
                          type="date"
                          value={formData.checkIn}
                          onChange={(e) =>
                            setFormData({ ...formData, checkIn: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-nature-950 border border-nature-700 text-nature-50 text-xs focus:border-nature-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`${formId}-checkout`}
                          className="block text-nature-200 text-xs mb-1"
                        >
                          Check-out Date (until 10:00)
                        </label>
                        <input
                          id={`${formId}-checkout`}
                          type="date"
                          value={formData.checkOut}
                          onChange={(e) =>
                            setFormData({ ...formData, checkOut: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-nature-950 border border-nature-700 text-nature-50 text-xs focus:border-nature-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor={`${formId}-guests`}
                          className="block text-nature-200 text-xs mb-1"
                        >
                          Number of Guests
                        </label>
                        <select
                          id={`${formId}-guests`}
                          value={formData.guests}
                          onChange={(e) =>
                            setFormData({ ...formData, guests: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-nature-950 border border-nature-700 text-nature-50 text-xs focus:border-nature-400 focus:outline-none"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5+">5+ Guests (Family)</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor={`${formId}-room`}
                          className="block text-nature-200 text-xs mb-1"
                        >
                          Preferred Room Type
                        </label>
                        <select
                          id={`${formId}-room`}
                          value={formData.roomType}
                          onChange={(e) =>
                            setFormData({ ...formData, roomType: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-nature-950 border border-nature-700 text-nature-50 text-xs focus:border-nature-400 focus:outline-none"
                        >
                          <option value="Deluxe Double Room">Deluxe Double Room (AC)</option>
                          <option value="Double Room Non AC">Double Room Non AC</option>
                          <option value="Family Room">Family Room (AC)</option>
                          <option value="Any Available">Any Available Room</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Conditional Fields: Events & Gatherings */}
                {isEvent && (
                  <div className="p-4 rounded-2xl bg-nature-900/50 border border-nature-700/50 space-y-4">
                    <p className="text-xs uppercase tracking-widest text-nature-300 font-semibold">
                      Event / Gathering Details
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor={`${formId}-eventdate`}
                          className="block text-nature-200 text-xs mb-1"
                        >
                          Proposed Event Date
                        </label>
                        <input
                          id={`${formId}-eventdate`}
                          type="date"
                          value={formData.eventDate}
                          onChange={(e) =>
                            setFormData({ ...formData, eventDate: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-nature-950 border border-nature-700 text-nature-50 text-xs focus:border-nature-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`${formId}-attendees`}
                          className="block text-nature-200 text-xs mb-1"
                        >
                          Estimated Attendance
                        </label>
                        <input
                          id={`${formId}-attendees`}
                          type="text"
                          value={formData.attendees}
                          onChange={(e) =>
                            setFormData({ ...formData, attendees: e.target.value })
                          }
                          placeholder="e.g. 10 - 25 people"
                          className="w-full px-4 py-2.5 rounded-xl bg-nature-950 border border-nature-700 text-nature-50 text-xs focus:border-nature-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label
                    htmlFor={`${formId}-message`}
                    className="block text-nature-200 font-medium mb-1.5 text-xs uppercase tracking-wider"
                  >
                    Message / Special Requests
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your travel plans, breakfast requests, or event details..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-nature-900/70 border border-nature-600/40 text-nature-50 text-sm placeholder-nature-500 focus:border-nature-400 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-nature-600 to-nature-700 hover:from-nature-500 hover:to-nature-600 text-white font-semibold uppercase tracking-wider text-xs transition-all shadow-lg hover:shadow-nature-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>
                      {status === "submitting" ? "Sending..." : "Submit Inquiry by Email"}
                    </span>
                    <Send className="w-4 h-4" />
                  </button>

                  <a
                    href={getWhatsAppLink(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 border border-emerald-400/30"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>

                <p className="text-nature-400 text-[11px] text-center sm:text-left pt-2 leading-relaxed">
                  We respect your privacy. Inquiries are sent directly to ISARA Residence management.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmed Features Section */}
      <section className="relative z-20 py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-nature-400 font-semibold mb-2">
            Why Guests Choose Us
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-nature-50">
            Confirmed Amenities & Setting
          </h2>
          <p className="text-nature-300 text-xs sm:text-sm max-w-xl mx-auto mt-2">
            Authentic hospitality in Polonnaruwa with genuine facilities and scenic lakeside backyard views.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {confirmedFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-nature-800/30 backdrop-blur-sm border border-nature-600/20 hover:border-nature-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nature-500 to-nature-700 flex items-center justify-center mb-4 shadow-md">
                  <Icon className="w-6 h-6 text-nature-50" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-nature-100 mb-2">{item.title}</h3>
                <p className="text-nature-300 text-xs leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Genuine Google Reviews & Ratings Section */}
      <section className="relative z-20 py-16 px-6 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-nature-800/60 to-nature-900/60 border border-nature-600/30 backdrop-blur-md text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white mb-4">
            <span className="text-blue-400 font-bold">G</span>
            <span>Google Business Profile</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-nature-50 mb-3">
            Guest Feedback on Google
          </h2>
          <p className="text-nature-200 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-6">
            We value genuine reviews from travelers who have stayed with us. Read transparent guest feedback or share your own experience directly on our Google Business Profile.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://share.google/PkngMsYACMUGvRtBP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-nature-950 font-semibold text-xs uppercase tracking-wider hover:bg-nature-100 transition-all shadow-lg"
            >
              <span>Read Reviews on Google</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href="https://share.google/PkngMsYACMUGvRtBP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs uppercase tracking-wider transition-all"
            >
              <span>Write a Google Review</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Visible Frequently Asked Questions matching FAQPage schema */}
      <section className="relative z-20 py-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-nature-50 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-nature-200 text-xs sm:text-sm">
            Important practical information about your stay at ISARA Residence
          </p>
        </div>

        <div className="space-y-4">
          {visibleFaqs.map((faq, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-nature-800/30 backdrop-blur-sm border border-nature-600/20"
            >
              <h3 className="text-base font-bold text-nature-100 mb-2">{faq.q}</h3>
              <p className="text-nature-300 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-20 pb-20 px-6 max-w-4xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-nature-700/30 to-nature-800/30 border border-nature-500/30 backdrop-blur-xl">
          <h2 className="font-serif text-2xl sm:text-3xl text-nature-50 mb-3">
            Plan Your Stay in Polonnaruwa
          </h2>
          <p className="text-nature-200 text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Check availability on Booking.com or message us on WhatsApp for personalized bookings.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/94727263590"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Chat on WhatsApp
            </a>
            <a
              href="https://www.booking.com/hotel/lk/isara-guest-polonnaruwa.en-gb.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all"
            >
              View on Booking.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-nature-950 flex items-center justify-center text-nature-200">
          Loading contact information...
        </div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
