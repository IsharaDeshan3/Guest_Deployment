import type { Metadata } from "next";
import ContactClientPage from "./ContactClientPage";

export const metadata: Metadata = {
  title: "Contact ISARA Residence",
  description:
    "Get in touch with ISARA Residence in Polonnaruwa via WhatsApp, email, or map directions. Ask about rooms, check-in details, and local travel help.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact ISARA Residence",
    description:
      "Message us directly for bookings, directions, and travel support in Polonnaruwa.",
    url: "/contact",
    images: [
      {
        url: "/polonnaruwa-stupas.jpg",
        width: 1200,
        height: 630,
        alt: "Contact ISARA Residence in Polonnaruwa",
      },
    ],
  },
  twitter: {
    title: "Contact ISARA Residence",
    description: "Reach ISARA Residence for bookings, directions, and support.",
    images: ["/polonnaruwa-stupas.jpg"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What time is check-in and check-out?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in or late check-out can be arranged subject to availability.",
      },
    },
    {
      "@type": "Question",
      name: "How far is ISARA Residence from the ancient city?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ISARA Residence is about 5 minutes from the archaeological site of Polonnaruwa.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide transportation services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Airport transfers, tuk-tuk rentals, and guided tours can be arranged.",
      },
    },
    {
      "@type": "Question",
      name: "Is breakfast included in the room rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A Sri Lankan breakfast is included with all room bookings, with local and international options.",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ContactClientPage />
    </>
  );
}
