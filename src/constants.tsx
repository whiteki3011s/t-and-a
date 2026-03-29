import React from 'react';
import { 
  Flower, 
  Heart, 
  Cookie, 
  ToyBrick, 
  Handshake, 
  Users, 
  Smile, 
  CalendarHeart 
} from 'lucide-react';

export interface LoveDay {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  imageUrl?: string;
}

export const LOVE_DAYS: LoveDay[] = [
  {
    id: 1,
    title: "Rose Day",
    date: "Feb 7",
    description: "A single rose speaks what a thousand words cannot. When this journey began, I had no idea how deeply your roots would intertwine with mine. You entered my life like an unexpected bloom in the quietest season, turning my world vibrant with your mere presence. Every rose I see now holds the reflection of your smile and the tender fragrance of our love.",
    icon: <Flower className="w-8 h-8" />,
    color: "#b11226",
    imageUrl: "/rose.png"
  },
  {
    id: 2,
    title: "Propose Day",
    date: "Feb 8",
    description: "The moment the heart meets undeniable courage. A silent promise was made in my chest long before it ever reached my lips—a vow to walk beside you, hand in hand, through the highest peaks and the lowest valleys. You are the easiest and most profound choice I've ever made in my life.",
    icon: <Heart className="w-8 h-8" />,
    color: "#b11226",
    imageUrl: "/propose.png"
  },
  {
    id: 3,
    title: "Chocolate Day",
    date: "Feb 9",
    description: "Our bond has been sweetened by countless moments of sheer joy, rich and deeply comforting like the finest cocoa. Even in life's bitter moments, you are the sweetness that balances everything out. I treasure the little memories we've melted down together, meant to be savored for a lifetime.",
    icon: <Cookie className="w-8 h-8" />,
    color: "#b11226",
    imageUrl: "/chocolate.png"
  },
  {
    id: 4,
    title: "Teddy Day",
    date: "Feb 10",
    description: "A soft, enduring reminder of the warmth we share when the world feels entirely too cold. When I am not around to wrap you in my arms, I want you to feel the comfort of my thoughts holding you tight. You are my safe haven, my peace, and my favorite retreat at the end of every exhausting day.",
    icon: <ToyBrick className="w-8 h-8" />, 
    color: "#b11226",
    imageUrl: "/teddy.png"
  },
  {
    id: 5,
    title: "Promise Day",
    date: "Feb 11",
    description: "Vows that aren't merely spoken in the quiet of the night, but built as the unshakeable foundation of our shared future. I promise to grow with you, to be the calm in your storms, and to relentlessly choose you, today and every single tomorrow. Our love story is the only promise I intend to keep forever.",
    icon: <Handshake className="w-8 h-8" />,
    color: "#b11226",
    imageUrl: "/promise.png"
  },
  {
    id: 6,
    title: "Hug Day",
    date: "Feb 12",
    description: "The absolute safest place in the entirety of the world is found within your arms. It's a silent, profound language of comfort that heals parts of me I didn't know were broken. Wrapping my arms around you feels exactly like finally coming home after a long, weary journey.",
    icon: <Users className="w-8 h-8" />,
    color: "#b11226",
    imageUrl: "/hug.png"
  },
  {
    id: 7,
    title: "Kiss Day",
    date: "Feb 13",
    description: "Sealing our story with a touch that speaks profoundly of passion, deep respect, and an unyielding affection. Every kiss is a deliberate pause in time, a quiet whisper against the chaos of the world exactly affirming where I belong. It's the simplest gesture containing the universe's greatest magic.",
    icon: <Smile className="w-8 h-8" />,
    color: "#b11226",
    imageUrl: "/kiss.png"
  },
  {
    id: 8,
    title: "Valentine's Day",
    date: "Feb 14",
    description: "The grand culmination of our devoted week, and the majestic celebration of a love that remarkably refuses to stop growing. Nine months of laughter, shared tears, and building an empire of memories together. You are my forever Valentine, Tanya, the beautiful reality that surpasses all my dreams.",
    icon: <CalendarHeart className="w-8 h-8" />,
    color: "#b11226",
    imageUrl: "/valentine.png"
  }
];
