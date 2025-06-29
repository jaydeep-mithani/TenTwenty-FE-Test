import { CarouselSection, HeroSection, Navbar, TextContent } from "./sections";
import "./styles/main.scss";

function App() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <TextContent />
      <CarouselSection />
    </main>
  );
}

export default App;
