
import Header from "./components/Header";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Breeds from "./sections/Breeds";
import Nutrition from "./sections/Nutrition";
import Adoption from "./sections/Adoption";
import FAQ from "./sections/FAQ";
import Footer from "./components/Footer";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  useLenis();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Nutrition />
        <Breeds />
        <Adoption />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
