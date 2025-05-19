"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart, Users, Star, Search, Menu, X, HomeIcon } from 'lucide-react';

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

export default function Homepage() {
  const [favorites, setFavorites] = useState([]);
  const [filteredChambres, setFilteredChambres] = useState(chambres);
  const [searchTerm, setSearchTerm] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state
  
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
    if (!isLoggedIn) {
      window.location.href = "/auth/login";
      return;
    }
    
    if (favorites.includes(index)) {
      setFavorites(favorites.filter(i => i !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };
  
  const handleRoomClick = (roomId) => {
    if (!isLoggedIn) {
        window.location.href = `/homepage/details/${roomId}`;
      return;
    }
    
    window.location.href = `/dashUser/details/${roomId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header & Navigation */}
      <header className={`fixed w-full z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-6'
      }`}>
        <div className="mx-auto container max-w-7xl flex justify-between items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
              <HomeIcon size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Maison d'hôte</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-medium">
            <Link href="/" className="text-purple-600 font-semibold hover:text-purple-700 relative group">
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300 text-white"></span>
            </Link>
            <Link href="/services" className="hover:text-purple-600 transition relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300 text-white"></span>
            </Link>
            <Link href="/about" className="hover:text-purple-600 transition relative group">
              À propos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300 text-white"></span>
            </Link>
            <Link href="/contact" className="hover:text-purple-600 transition relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300 text-white"></span>
            </Link>
          </nav>
          
          {/* Login/Register Buttons for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login">
              <button className={`${
                isScrolled 
                  ? 'text-gray-700 hover:text-purple-600' 
                  : 'text-white hover:text-purple-200'
              } font-medium transition duration-300`}>
                Connexion
              </button>
            </Link>
            <Link href="/auth/register">
              <button className={`${
                isScrolled 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-white text-purple-600 hover:bg-purple-600 hover:text-white'
              } font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md`}>
                Inscription
              </button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-purple-600 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute w-full">
            <div className="container mx-auto py-4 px-6">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-white hover:text-purple-600 font-medium py-2 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link 
                  href="/services" 
                  className="text-white hover:text-purple-600 font-medium py-2 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  href="/about" 
                  className="text-white hover:text-purple-600 font-medium py-2 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  À propos
                </Link>
                <Link 
                  href="/contact" 
                  className="text-white hover:text-purple-600 font-medium py-2 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex space-x-4 pt-2">
                  <Link 
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-1/2"
                  >
                    <button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium py-2 px-4 rounded-lg transition">
                      Connexion
                    </button>
                  </Link>
                  <Link 
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-1/2"
                  >
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition">
                      Inscription
                    </button>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-28 md:pt-40 pb-20 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 text-white">
        <div className="mx-auto container max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Découvrez le confort et l'élégance
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-10">
              Une expérience hôtelière unique au cœur de la ville
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#rooms">
                <button className="bg-white text-purple-700 hover:bg-purple-50 font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1">
                  Découvrir nos chambres
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="bg-transparent hover:bg-purple-600 border-2 border-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1">
                  Réserver maintenant
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="w-full h-auto" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path 
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
              className="fill-gray-50"
            ></path>
          </svg>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-20 bg-gray-50">
        <div className="mx-auto container max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos chambres</h2>
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
                    
                    <button 
                      onClick={() => handleRoomClick(room.id)}
                      className={`${
                        room.disponible 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : 'bg-gray-400 cursor-not-allowed'
                      } text-white font-semibold py-2 px-5 rounded-lg transition duration-300`}
                      disabled={!room.disponible}
                    >
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto container max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos services exceptionnels</h2>
            <p className="text-gray-600">Découvrez tout ce que nous avons à offrir pour rendre votre séjour inoubliable</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">WiFi gratuit ultra rapide</h3>
              <p className="text-gray-600">Restez connecté avec notre WiFi haute vitesse disponible dans toutes les chambres et espaces communs.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Petit-déjeuner gourmet</h3>
              <p className="text-gray-600">Commencez votre journée avec notre délicieux petit-déjeuner préparé avec des ingrédients frais et locaux.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Service de conciergerie</h3>
              <p className="text-gray-600">Notre équipe est à votre disposition pour vous aider à organiser vos activités et répondre à vos besoins.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Spa & Bien-être</h3>
              <p className="text-gray-600">Détendez-vous et ressourcez-vous dans notre espace spa avec massages, sauna et soins personnalisés.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Service 24/7</h3>
              <p className="text-gray-600">Notre réception est ouverte 24h/24 et 7j/7 pour vous accueillir et vous assister à tout moment.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Salle de réunion</h3>
              <p className="text-gray-600">Des espaces modernes et équipés pour vos réunions professionnelles et événements.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto container max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Ce que disent nos clients</h2>
            <p className="text-gray-600">Découvrez les expériences vécues par nos clients lors de leur séjour</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-xl mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Marie Kouassi</h4>
                  <p className="text-sm text-gray-500">Séjour en avril 2025</p>
                </div>
              </div>
              <RatingStars rating={5.0} />
              <p className="text-gray-600 mt-4">
                "Une expérience exceptionnelle ! La chambre était impeccable et le personnel très attentionné. 
                Je recommande vivement cette maison d'hôte pour un séjour reposant et agréable."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl mr-4">
                  L
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Luc Diomandé</h4>
                  <p className="text-sm text-gray-500">Séjour en mars 2025</p>
                </div>
              </div>
              <RatingStars rating={4.8} />
              <p className="text-gray-600 mt-4">
                "L'emplacement est idéal, à proximité de tout. Les chambres sont spacieuses et confortables.
                Le petit-déjeuner était délicieux avec un large choix. Je reviendrai sans hésiter !"
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-xl mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Sophie Traoré</h4>
                  <p className="text-sm text-gray-500">Séjour en mai 2025</p>
                </div>
              </div>
              <RatingStars rating={4.7} />
              <p className="text-gray-600 mt-4">
                "Un havre de paix en plein centre-ville. Le service est impeccable et les installations modernes.
                J'ai particulièrement apprécié le spa et les différents soins proposés."
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/testimonials">
              <button className="text-purple-600 font-semibold hover:text-purple-800 transition">
                Voir tous les témoignages →
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="mx-auto container max-w-7xl px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Prêt à vivre une expérience inoubliable ?</h2>
            <p className="text-xl text-purple-100 mb-10">
              Réservez dès maintenant et profitez de nos offres spéciales pour votre prochain séjour
            </p>
            <Link href="/auth/register">
              <button className="bg-white text-purple-700 hover:bg-purple-50 font-bold py-4 px-10 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl">
                Réserver maintenant
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Maison d'hôte</h2>
              </div>
              <p className="mb-6">Une expérience hôtelière unique au cœur de la ville. Confort, élégance et service personnalisé.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.15l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Liens rapides</h3>
              <ul className="space-y-4">
                <li><Link href="/" className="hover:text-purple-400 transition">Accueil</Link></li>
                <li><Link href="/about" className="hover:text-purple-400 transition">À propos</Link></li>
                <li><Link href="/services" className="hover:text-purple-400 transition">Services</Link></li>
                <li><Link href="/contact" className="hover:text-purple-400 transition">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-purple-400 transition">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
              <ul className="space-y-4">
                <li><Link href="/services/rooms" className="hover:text-purple-400 transition">Chambres</Link></li>
                <li><Link href="/services/spa" className="hover:text-purple-400 transition">Spa & Bien-être</Link></li>
                <li><Link href="/services/restaurant" className="hover:text-purple-400 transition">Restaurant</Link></li>
                <li><Link href="/services/events" className="hover:text-purple-400 transition">Événements</Link></li>
                <li><Link href="/services/concierge" className="hover:text-purple-400 transition">Conciergerie</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Avenue des Flamboyants, Abidjan, Côte d'Ivoire</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+225 07 12 34 56 78</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@maisond'hote.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Maison d'hôte. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="hover:text-purple-400 transition">Conditions d'utilisation</Link>
              <Link href="/privacy" className="hover:text-purple-400 transition">Politique de confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}