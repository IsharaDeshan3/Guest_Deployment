"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import {
  Send,
  Mail,
  Phone,
  Facebook,
  MapPin,
  Clock,
  Users,
  Star,
  Award,
  Heart,
  Shield,
} from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
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
      label: "WhatsApp",
      value: "+94 71 472 3538",
      href: "https://wa.me/+94714723538",
      color: "from-nature-500 to-nature-700",
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "Visit our page",
      href: "https://www.facebook.com/share/1FjNHpbboi/",
      color: "from-nature-600 to-nature-800",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Polonnaruwa, Sri Lanka",
      href: "https://www.google.com/maps/place/ISARA+Guest/@7.9594659,80.9914946,17z/data=!3m1!4b1!4m9!3m8!1s0x3afb43d75ab1f0eb:0x6d25b5afcb9fa2d7!5m2!4m1!1i2!8m2!3d7.9594659!4d80.9940749!16s%2Fg%2F11ltgmx7dv?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D",
      color: "from-nature-500 to-nature-700",
    },
  ];

  const whyChooseUs = [
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance to ensure your stay is perfect",
    },
    {
      icon: Users,
      title: "Local Expertise",
      description:
        "Deep knowledge of Polonnaruwa's hidden gems and attractions",
    },
    {
      icon: Star,
      title: "5-Star Reviews",
      description: "Consistently rated excellent by our satisfied guests",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for exceptional hospitality and service",
    },
    {
      icon: Heart,
      title: "Personal Touch",
      description: "Every guest is treated like family at Isara",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your safety and comfort are our top priorities",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      country: "United Kingdom",
      text: "An absolutely magical experience! The location is perfect for exploring the ancient city, and the staff went above and beyond to make our stay memorable.",
      rating: 5,
    },
    {
      name: "Marco Rossi",
      country: "Italy",
      text: "The blend of modern comfort and traditional Sri Lankan hospitality was perfect. Highly recommend for anyone visiting Polonnaruwa!",
      rating: 5,
    },
    {
      name: "Yuki Tanaka",
      country: "Japan",
      text: "Beautiful property with stunning views. The peaceful atmosphere and excellent service made this our favorite stop in Sri Lanka.",
      rating: 5,
    },
  ];

  return (
    <main className="min-h-screen bg-nature-950 text-nature-50 font-sans selection:bg-nature-300 selection:text-nature-900 relative overflow-hidden">
      <Navigation />

      {/* Parallax Background with Real Images */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-nature-900/95 via-nature-800/90 to-nature-950/95 z-10"></div>

        {/* Layer 1: Distant ruins - slowest parallax */}

        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="relative w-full h-full opacity-100">
            <Image
              src="/polonnaruwa-stupas.jpg"
              alt="Polonnaruwa stupas"
              fill
              className="object-cover object-bottom"
              quality={85}
            />
          </div>
        </div>
        <div
          className="absolute inset-0 z-[1]"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="relative w-full h-full opacity-100">
            <Image
              src="/polonnaruwa-ruins-distant.png"
              alt="Polonnaruwa ruins background"
              fill
              className="object-cover object-bottom"
              priority
              quality={85}
            />
          </div>
        </div>

        {/* Layer 2: Temple stupas - medium parallax */}

        {/* Layer 3: Foreground nature/trees - fastest parallax */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="relative w-full h-full opacity-100">
            <Image
              src="/polonnaruwa-nature.png"
              alt="Polonnaruwa nature"
              fill
              className="object-cover object-bottom"
              quality={85}
            />
          </div>
        </div>

        {/* Animated floating orbs - above images */}
        <div className="absolute inset-0 z-[3]">
          <div className="absolute top-0 left-0 w-96 h-96 bg-nature-400/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-0 right-0 w-80 h-80 mobL:w-[500px] mobL:h-[500px] bg-nature-500/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-nature-300/5 rounded-full blur-2xl animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        {/* Magical tone shift overlay */}
        <div className="absolute inset-0 magical-tone-shift opacity-15 z-[4]"></div>

        {/* Decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015] z-[5]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Ancient script decorative element */}
        <div
          className="absolute top-20 right-10 text-nature-600/5 text-9xl font-serif rotate-12 z-[6]"
          style={{ transform: `translateY(${scrollY * 0.2}px) rotate(12deg)` }}
        >
          ශ්‍රී
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24 md:py-32 relative z-20">
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6 animate-fadeIn">
              <div className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-nature-700/30 border border-nature-500/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-nature-400 rounded-full animate-pulse"></div>
                <span className="text-nature-300 text-sm font-medium tracking-widest uppercase">
                  Let&apos;s Connect
                </span>
              </div>
            </div>

            <h1
              className="font-serif text-4xl mobS:text-5xl tablet:text-6xl laptop:text-7xl text-nature-50 leading-tight mb-6 animate-fadeIn"
              style={{ animationDelay: "0.1s" }}
            >
              We&apos;d Love to
              <span className="block bg-gradient-to-r from-nature-300 via-nature-400 to-nature-500 bg-clip-text text-transparent">
                Hear From You
              </span>
            </h1>

            <p
              className="text-nature-200 text-base mobL:text-lg tablet:text-xl max-w-2xl mx-auto leading-relaxed animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              Whether you&apos;re planning your stay or just have a question,
              we&apos;re here to help make your Polonnaruwa experience
              unforgettable.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Contact Methods - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              <h3
                className="font-serif text-2xl text-nature-100 mb-8 animate-fadeIn"
                style={{ animationDelay: "0.3s" }}
              >
                Reach Out Directly
              </h3>

              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={method.label}
                      href={method.href}
                      target={
                        method.href.startsWith("http") ? "_blank" : "_self"
                      }
                      rel="noopener noreferrer"
                      className="group block p-6 rounded-2xl bg-nature-800/40 backdrop-blur-sm border border-nature-600/30 hover:border-nature-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-nature-500/10 animate-fadeIn"
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${method.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <Icon
                            className="w-6 h-6 text-nature-50"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-nature-200 font-medium mb-1 group-hover:text-nature-100 transition-colors">
                            {method.label}
                          </h4>
                          <p className="text-nature-400 text-sm group-hover:text-nature-300 transition-colors">
                            {method.value}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Send className="w-5 h-5 text-nature-400" />
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Decorative Element */}
              <div
                className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-nature-700/20 to-nature-800/20 border border-nature-600/20 backdrop-blur-sm animate-fadeIn"
                style={{ animationDelay: "0.8s" }}
              >
                <p className="text-nature-300 text-sm leading-relaxed italic">
                  &quot;Nestled in the heart of ancient Polonnaruwa, we&apos;re
                  just moments away from Sri Lanka&apos;s most treasured
                  historical sites.&quot;
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <div className="w-8 h-[2px] bg-gradient-to-r from-nature-500 to-transparent"></div>
                  <span className="text-nature-400 text-xs uppercase tracking-wider">
                    Isara Residence
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div
              className="lg:col-span-3 animate-fadeIn"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="p-8 md:p-12 rounded-3xl bg-nature-800/40 backdrop-blur-xl border border-nature-600/30 shadow-2xl shadow-nature-900/50 relative overflow-hidden">
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-nature-500/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-nature-600/10 to-transparent rounded-tr-full"></div>

                <div className="relative z-10">
                  <h3 className="font-serif text-3xl text-nature-50 mb-2">
                    Send us a Message
                  </h3>
                  <p className="text-nature-300 mb-8">
                    We typically respond within 24 hours
                  </p>

                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div className="group">
                      <label className="block text-nature-200 font-medium mb-2 text-sm uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="w-full px-6 py-4 rounded-xl bg-nature-900/60 border border-nature-600/40 text-nature-50 placeholder-nature-500 focus:border-nature-500 focus:ring-2 focus:ring-nature-500/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                    </div>

                    {/* Email Input */}
                    <div className="group">
                      <label className="block text-nature-200 font-medium mb-2 text-sm uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 rounded-xl bg-nature-900/60 border border-nature-600/40 text-nature-50 placeholder-nature-500 focus:border-nature-500 focus:ring-2 focus:ring-nature-500/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                    </div>

                    {/* Message Input */}
                    <div className="group">
                      <label className="block text-nature-200 font-medium mb-2 text-sm uppercase tracking-wider">
                        Your Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about your plans or ask us anything..."
                        rows={5}
                        className="w-full px-6 py-4 rounded-xl bg-nature-900/60 border border-nature-600/40 text-nature-50 placeholder-nature-500 focus:border-nature-500 focus:ring-2 focus:ring-nature-500/20 focus:outline-none transition-all duration-300 resize-none backdrop-blur-sm"
                        required
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="group tap-target w-full md:w-auto px-6 py-4 tablet:px-10 tablet:py-5 rounded-xl bg-gradient-to-r from-nature-600 to-nature-700 hover:from-nature-500 hover:to-nature-600 text-nature-50 font-semibold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-nature-600/30 hover:shadow-2xl hover:shadow-nature-500/40 hover:scale-[1.02] flex items-center justify-center space-x-3 relative overflow-hidden"
                    >
                      <span className="relative z-10">Send Message</span>
                      <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />

                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-nature-500 to-nature-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>

                    {/* Privacy Notice */}
                    <p className="text-nature-400 text-xs text-center md:text-left mt-6">
                      By submitting this form, you agree to our privacy policy.
                      We respect your privacy and will never share your
                      information.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom decorative element */}
          <div
            className="mt-20 flex justify-center animate-fadeIn"
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center space-x-4 px-8 py-4 rounded-full bg-nature-800/30 backdrop-blur-sm border border-nature-600/20">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nature-400 to-nature-600 border-2 border-nature-800"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nature-500 to-nature-700 border-2 border-nature-800"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nature-600 to-nature-800 border-2 border-nature-800"></div>
              </div>
              <span className="text-nature-300 text-sm">
                Join hundreds of satisfied guests
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative z-20 py-16 mobL:py-20 tablet:py-24 laptop:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 tablet:mb-16">
            <h2 className="font-serif text-3xl mobS:text-4xl tablet:text-5xl laptop:text-6xl text-nature-50 mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-nature-300 to-nature-500 bg-clip-text text-transparent">
                Isara Residence
              </span>
            </h2>
            <p className="text-nature-200 text-base mobL:text-lg max-w-2xl mx-auto">
              Experience the perfect blend of comfort, culture, and hospitality
              in the heart of ancient Polonnaruwa
            </p>
          </div>

          <div className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group p-6 tablet:p-8 rounded-2xl bg-nature-800/30 backdrop-blur-sm border border-nature-600/20 hover:border-nature-500/40 transition-all duration-500 tablet:hover:scale-[1.03] hover:shadow-2xl hover:shadow-nature-500/10"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: "fadeInUp 0.8s ease-out both",
                  }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-nature-500 to-nature-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon
                      className="w-7 h-7 text-nature-50"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-nature-100 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-nature-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-20 py-16 mobL:py-20 tablet:py-24 laptop:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 tablet:mb-16">
            <h2 className="font-serif text-3xl mobS:text-4xl tablet:text-5xl laptop:text-6xl text-nature-50 mb-6">
              What Our{" "}
              <span className="bg-gradient-to-r from-nature-300 to-nature-500 bg-clip-text text-transparent">
                Guests Say
              </span>
            </h2>
            <p className="text-nature-200 text-base mobL:text-lg max-w-2xl mx-auto">
              Don&apos;t just take our word for it - hear from travelers
              who&apos;ve experienced Isara firsthand
            </p>
          </div>

          <div className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="p-6 tablet:p-8 rounded-2xl bg-nature-800/30 backdrop-blur-sm border border-nature-600/20 hover:border-nature-500/40 transition-all duration-500 tablet:hover:scale-[1.03]"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  animation: "fadeInUp 0.8s ease-out both",
                }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-nature-400 text-nature-400"
                    />
                  ))}
                </div>
                <p className="text-nature-200 leading-relaxed mb-6 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="border-t border-nature-600/30 pt-4">
                  <p className="text-nature-100 font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-nature-400 text-sm">
                    {testimonial.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-20 py-16 mobL:py-20 tablet:py-24 laptop:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 tablet:mb-16">
            <h2 className="font-serif text-3xl mobS:text-4xl tablet:text-5xl laptop:text-6xl text-nature-50 mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-nature-300 to-nature-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-nature-200 text-base mobL:text-lg">
              Quick answers to common questions about your stay
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "What time is check-in and check-out?",
                a: "Check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in or late check-out can be arranged subject to availability.",
              },
              {
                q: "How far is Isara Residence from the ancient city?",
                a: "We're just 5 minutes from the archaeological site, making us the perfect base for exploring Polonnaruwa's ancient wonders.",
              },
              {
                q: "Do you provide transportation services?",
                a: "Yes! We offer airport transfers, tuk-tuk rentals, and can arrange guided tours of the area with experienced local guides.",
              },
              {
                q: "Is breakfast included in the room rate?",
                a: "A delicious Sri Lankan breakfast is included with all our room bookings, featuring local and international options.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 tablet:p-8 rounded-2xl bg-nature-800/30 backdrop-blur-sm border border-nature-600/20 hover:border-nature-500/40 transition-all duration-300"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: "fadeInUp 0.8s ease-out both",
                }}
              >
                <h3 className="text-xl font-bold text-nature-100 mb-3">
                  {faq.q}
                </h3>
                <p className="text-nature-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-20 py-16 mobL:py-20 tablet:py-24 laptop:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 mobL:p-10 tablet:p-12 laptop:p-16 rounded-3xl bg-gradient-to-br from-nature-700/30 to-nature-800/30 backdrop-blur-xl border border-nature-500/30 shadow-2xl">
            <h2 className="font-serif text-3xl mobS:text-4xl tablet:text-5xl text-nature-50 mb-6">
              Ready to Experience Polonnaruwa?
            </h2>
            <p className="text-nature-200 text-base mobL:text-lg mb-8 max-w-2xl mx-auto">
              Book your stay at Isara Residence today and discover the magic of
              Sri Lanka&apos;s ancient kingdom
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/+94714723538"
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target inline-flex items-center justify-center px-6 py-4 tablet:px-10 tablet:py-5 rounded-xl bg-gradient-to-r from-nature-500 to-nature-600 hover:from-nature-400 hover:to-nature-500 text-nature-50 font-semibold uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl tablet:hover:scale-105"
              >
                Book Now
              </a>
              <a
                href="#contact-form"
                className="tap-target inline-flex items-center justify-center px-6 py-4 tablet:px-10 tablet:py-5 rounded-xl bg-nature-800/40 backdrop-blur-sm border border-nature-500/40 hover:border-nature-400/60 text-nature-100 font-semibold uppercase tracking-wider transition-all duration-300 tablet:hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out both;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(45, 69, 64, 0.3);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(116, 159, 150, 0.5);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(116, 159, 150, 0.7);
        }
      `}</style>
    </main>
  );
}
