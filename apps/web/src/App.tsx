import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryTiles } from './components/CategoryTiles';
import { MenuGrid } from './components/MenuGrid';
import { Workshops } from './components/Workshops';
import { SandGarden } from './components/SandGarden';
import { InfoStrip } from './components/InfoStrip';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-forest font-sans selection:bg-matcha-tint selection:text-matcha-dark">
      <Header />
      <main>
        <Hero />
        <CategoryTiles />
        <MenuGrid />
        <SandGarden />
        <Workshops />
        <InfoStrip />
      </main>
      <Footer />
    </div>
  );
}

export default App;
