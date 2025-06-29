import { CarouselSection, HeroSection, Nav, TextContent } from "./sections";
import "./styles/main.scss";

function App() {
  return (
    <main className="relative">
      <Nav />
      <HeroSection />
      <TextContent />
      <CarouselSection />
    </main>
  );
}

export default App;
