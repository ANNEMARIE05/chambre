"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart, Users, Star, Search } from 'lucide-react';

const chambres = [
  {
    id:1,
    titre: "Chambre Deluxe",
    description: "Élégance et confort dans un espace moderne avec vue pittoresque.",
    commodites: ["Climatisation", "TV écran plat", "WiFi gratuit", "Petit-déjeuner inclus"],
    image: "https://img.freepik.com/photos-premium/chambres-hotel-modernes-elegantes_1417-8488.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    prix: "45 000 FCFA",
    duree: "nuit",
    capacite: 2,
    notation: 4.8,
    disponible: true
  },
  {
    id:2,
    titre: "Suite Familiale",
    description: "Spacieuse et conviviale, idéale pour les séjours en famille.",
    commodites: ["2 lits doubles", "Climatisation", "TV écran plat", "Mini-bar", "WiFi gratuit"],
    image: "https://img.freepik.com/photos-gratuite/chambre-hotel-dans-complexe-luxe_53876-138105.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    prix: "70 000 FCFA",
    duree: "jour",
    capacite: 4,
    notation: 4.9,
    disponible: true
  },
  {
    id:3,
    titre: "Studio Confort",
    description: "Ambiance chaleureuse avec des finitions modernes et fonctionnelles.",
    commodites: ["Grand lit", "Climatisation", "TV écran plat", "WiFi gratuit"],
    image: "https://img.freepik.com/photos-gratuite/interieur-moderne-confortable-chambre-hotel_1232-1822.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    prix: "60 000 FCFA",
    duree: "nuit",
    capacite: 2,
    notation: 4.7,
    disponible: false
  },
  {
    id:4,
    titre: "Chambre Économique",
    description: "Simplicité et confort à prix abordable pour les voyageurs.",
    commodites: ["Lit double", "Climatisation", "WiFi gratuit"],
    image: "https://img.freepik.com/photos-gratuite/petit-interieur-chambre-hotel-lit-double-salle-bain_1262-12489.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    prix: "30 000 FCFA",
    duree: "nuit",
    capacite: 2,
    notation: 4.5,
    disponible: true
  },
  {
    id:5,
    titre: "Studio Premium",
    description: "Luxe contemporain avec des finitions haut de gamme et vue panoramique.",
    commodites: ["Lit king-size", "Climatisation", "TV écran plat", "Jacuzzi", "WiFi gratuit"],
    image: "https://img.freepik.com/photos-premium/rendering-3d-magnifique-suite-chambre-luxe-contemporaine-dans-hotel-television_1029473-137979.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    prix: "60 000 FCFA",
    duree: "jour",
    capacite: 2,
    notation: 5.0,
    disponible: true
  },
  {
    id:6,
    titre: "Suite Junior",
    description: "Élégance discrète avec un espace de vie séparé pour plus de confort.",
    commodites: ["Lit queen-size", "Salon", "Climatisation", "TV écran plat", "WiFi gratuit"],
    image: "https://img.freepik.com/photos-gratuite/interieur-moderne-confortable-chambre-hotel_1232-1823.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    prix: "50 000 FCFA",
    duree: "nuit",
    capacite: 3,
    notation: 4.6,
    disponible: true
  }
];

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={`${
            i < fullStars 
              ? 'text-yellow-400 fill-yellow-400' 
              : i === fullStars && hasHalfStar 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function DashUser() {
  const [favorites, setFavorites] = useState([]);
  const [filteredChambres, setFilteredChambres] = useState(chambres);
  const [searchTerm, setSearchTerm] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle room filtering
  useEffect(() => {
    let result = chambres;
    
    if (searchTerm) {
      result = result.filter(room => 
        room.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (capacityFilter) {
      const capacity = parseInt(capacityFilter);
      result = result.filter(room => room.capacite >= capacity);
    }
    
    setFilteredChambres(result);
  }, [searchTerm, capacityFilter]);
  
  const toggleFavorite = (index) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter(i => i !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className={`fixed w-full z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-6'
      }`}>
        <div className="mx-auto container max-w-7xl flex justify-between items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Maison d'hôte</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <Link href="/dashUser" className="text-purple-600 font-semibold hover:text-purple-700 relative group">
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/dashUser/commandesUser" className="hover:text-purple-600 transition relative group">
              Mes commandes
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/favoris" className="hover:text-purple-600 transition relative group">
              Favoris
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
          
          <div className='flex items-center space-x-4'>
            <Link href="/auth/login" className="text-red-500 hover:text-red-600 transition font-medium hidden md:block">
              Déconnexion
            </Link>
            <Link href="/reserver">
              <button className={`${
                isScrolled 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-white text-purple-600 hover:bg-purple-600 hover:text-white'
              } font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md`}>
                Commander
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-24 md:pt-40 pb-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="mx-auto container max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Découvrez nos chambres</h2>
            <p className="text-gray-600">Une sélection d'espaces élégants conçus pour votre confort et votre bien-être</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-md mb-8">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Rechercher par nom ou description..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
            
            <div className="md:w-48">
              <select
                className="w-full py-3 px-4 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none appearance-none bg-white transition"
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
              >
                <option value="">Capacité</option>
                <option value="1">1+ personne</option>
                <option value="2">2+ personnes</option>
                <option value="3">3+ personnes</option>
                <option value="4">4+ personnes</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChambres.map((room, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition duration-500 transform hover:-translate-y-2 ${!room.disponible ? 'opacity-70' : ''}`}
              >
                <div className="relative">
                  <img
                    src={room.image}
                    alt={room.titre}
                    className="w-full h-64 object-cover"
                  />
                  <button 
                    onClick={() => toggleFavorite(index)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition hover:bg-white"
                  >
                    <Heart 
                      size={18} 
                      className={`${
                        favorites.includes(index) ? 'text-red-500 fill-red-500' : 'text-gray-600'
                      } transition-colors`} 
                    />
                  </button>
                  {!room.disponible && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Non disponible
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{room.titre}</h3>
                    <RatingStars rating={room.notation} />
                  </div>
                  
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  
                  <div className="flex items-center text-gray-700 mb-4">
                    <Users size={18} className="mr-2 text-purple-500" />
                    <span>{room.capacite} {room.capacite > 1 ? 'personnes' : 'personne'}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.commodites.slice(0, 3).map((item, i) => (
                      <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                    {room.commodites.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{room.commodites.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-lg">
                      <span className="font-bold text-purple-600">{room.prix}</span>
                      <span className="text-gray-500 text-sm">/{room.duree}</span>
                    </div>
                    
                    <Link href={`dashUser/details/${room.id}`}>
                      <button 
                        className={`${
                          room.disponible 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'bg-gray-400 cursor-not-allowed'
                        } text-white font-semibold py-2 px-5 rounded-lg transition duration-300`}
                        disabled={!room.disponible}
                      >
                        Détails
                      </button>
                    </Link>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
            {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="mx-auto container max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-3">Maison d'hôte</h3>
              <p className="text-gray-400 max-w-xs">Votre oasis de confort et d'élégance au cœur de la ville.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-3">Navigation</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/userpage" className="hover:text-white transition">Accueil</Link></li>
                  <li><Link href="/commandesUser" className="hover:text-white transition">Mes commandes</Link></li>
                  <li><Link href="/favoris" className="hover:text-white transition">Favoris</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Informations</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
                  <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                  <li><Link href="/about" className="hover:text-white transition">À propos</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Légal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/conditions" className="hover:text-white transition">Conditions</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition">Confidentialité</Link></li>
                  <li><Link href="/cookies" className="hover:text-white transition">Cookies</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Maison d'hôte. Tous droits réservés.</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}