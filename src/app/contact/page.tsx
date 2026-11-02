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
      name: "What time is check-in and check-out at ISARA Residence?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Check-in time is from 3:00 PM (15:00) and check-out time is until 10:00 AM (10:00). Please contact us in advance if you need to coordinate arrival timing.",
      },
    },
    {
      "@type": "Question",
      name: "Is breakfast included in the room rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Breakfast is optional and provided upon request. It is not automatically included in every booking, allowing you full flexibility during your stay.",
      },
    },
    {
      "@type": "Question",
      name: "Can ISARA Residence host small parties, meetings, or gatherings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our property can accommodate small parties, corporate meetings, and private gatherings with backyard views overlooking Parakrama Samudra. You can submit an event inquiry through our contact form or directly via WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Is complimentary Wi-Fi available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, free Wi-Fi is available across the property for all staying guests and event attendees.",
      },
    },
    {
      "@type": "Question",
      name: "What views and setting does ISARA Residence feature?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ISARA Residence is situated roadside for easy road access, with scenic views of the ancient Parakrama Samudra reservoir visible right from the backyard.",
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
