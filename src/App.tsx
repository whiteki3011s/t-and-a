import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Letter from './pages/Letter';
import Gallery from './pages/Gallery';
import ToDo from './pages/ToDo';

export default function App() {
  return (
    <div className="w-full bg-black selection:bg-romantic-red selection:text-white text-white font-sans relative flex flex-col min-h-[100dvh]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/todo" element={<ToDo />} />
      </Routes>
    </div>
  );
}
