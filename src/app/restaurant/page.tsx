import AnimationRepair from "@/components/AnimationRepair";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Restaurant - Isara Guest",
  description: "Restaurant under repair",
};

export default function RestaurantPage() {
  return (
    <main className="relative min-h-screen text-nature-900 font-sans selection:bg-nature-300 selection:text-nature-900">
      {/* blurred background image from public/restaurant-bg.jpg */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.17), rgba(0, 0, 0, 0.17)), url('/restaurant-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
        }}
      />

      <Navigation />

      <div className="max-w-6xl mx-auto px-6 pt-36 pb-16">
        <div className="mt-24 flex items-center justify-center">
          <AnimationRepair />
        </div>
      </div>
    </main>
  );
}
