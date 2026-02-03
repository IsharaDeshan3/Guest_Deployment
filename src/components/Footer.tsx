import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-nature-950/90 text-nature-50 border-t border-nature-800/60">
      {/* Soft glow accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-nature-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-nature-400/10 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-nature-300/5 blur-2xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-4">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-nature-300/80">
              <span className="h-[1px] w-8 bg-nature-400/60" />
              Isara Residence
            </p>
            <h2 className="font-serif text-3xl text-nature-50">
              Stay in the heart of Polonnaruwa
            </h2>
            <p className="text-sm text-nature-200 leading-relaxed">
              Sanctuary near the ancient city—wrapped in nature, crafted for
              calm, and ready with warm Sri Lankan hospitality.
            </p>
            <div className="flex items-center gap-3 text-sm text-nature-200/90">
              <MapPin className="h-4 w-4 text-nature-300" />
              Polonnaruwa, Sri Lanka
            </div>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-nature-200">
                Connect
              </h3>
              <a
                href="mailto:isararesidence@gmail.com"
                className="group flex items-center gap-3 text-sm text-nature-200/90 transition hover:text-nature-50 min-h-11"
              >
                <Mail className="h-4 w-4 text-nature-300 group-hover:text-nature-200" />
                isararesidence@gmail.com
              </a>
              <a
                href="https://wa.me/+94714723538"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-nature-200/90 transition hover:text-nature-50 min-h-11"
              >
                <Phone className="h-4 w-4 text-nature-300 group-hover:text-nature-200" />
                +94 71 472 3538
              </a>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-nature-200">
                Explore
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-nature-200/90">
                {[
                  { label: "About", href: "/about" },
                  { label: "Rooms", href: "/rooms" },
                  { label: "Locations", href: "/locations" },
                  { label: "Restaurant", href: "/restaurant" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="transition hover:text-nature-50 inline-flex items-center min-h-11"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-nature-200">
                Social
              </h3>
              <div className="flex items-center gap-4 text-nature-200/90">
                <a
                  href="https://www.facebook.com/share/1FjNHpbboi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-full bg-nature-800/60 h-11 w-11 flex items-center justify-center transition hover:bg-nature-700/70"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-nature-200 group-hover:text-nature-50" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-full bg-nature-800/60 h-11 w-11 flex items-center justify-center transition hover:bg-nature-700/70"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-nature-200 group-hover:text-nature-50" />
                </a>
              </div>
              <p className="text-sm text-nature-300/80">
                Follow along for travel moments and seasonal offers.
              </p>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-nature-700/60 to-transparent" />

        <div className="flex flex-col gap-3 text-sm text-nature-300/90 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-nature-200">Design & created by</span>
            <span className="font-semibold text-nature-50">
              Kynasoft Sri Lanka
            </span>
            <span className="text-nature-200">— made with</span>
            <Heart className="h-4 w-4 text-nature-300" aria-hidden />
            <span className="text-nature-200">love</span>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-nature-400">
            <span>© {new Date().getFullYear()} Isara Residence</span>
            <span className="h-[1px] w-8 bg-nature-700" />
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
