import { useLenis } from "./hooks/useLenis";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Hero from "./sections/Hero";
import About from "./sections/About";
import AdoptionCats from "./sections/AdoptionCats";
import HowItWorks from "./sections/HowItWorks";
import Nutrition from "./sections/Nutrition";
import FAQ from "./sections/FAQ";
import "./App.css";

export default function App() {
  useLenis();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Nutrition />
        <AdoptionCats />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}