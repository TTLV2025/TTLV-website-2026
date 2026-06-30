import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Credentials } from "@/components/credentials";
import { Services } from "@/components/services";
import { OrderForm } from "@/components/order-form";
import { Underwriters } from "@/components/underwriters";
import { LocationSection } from "@/components/location-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <Credentials />
      <Services />
      <OrderForm />
      <Underwriters />
      <LocationSection />
      <Footer />
    </>
  );
}
