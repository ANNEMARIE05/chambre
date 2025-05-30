"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart, Users, Star, Search, Menu, X, HomeIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const chambres = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

// Slides pour le carousel
const heroSlides = [
  {
    image: "https://img.freepik.com/photos-gratuite/chambre-hotel-luxe-moderne-chambre-coucher-confortable_105762-1783.jpg?w=1380&t=st=1746485126~exp=1746485726~hmac=fb2a9f94b5af26b12b3db4ccd9ef0fa6ca1b21c3aee5c5ae7ca3d9a4dab9b651",
    title: "Un séjour chaleureux et confortable",
    description: "Découvrez nos chambres accueillantes"
  },
  {
    image: "https://img.freepik.com/photos-premium/arriere-plan-violet-fonce_1170794-468523.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    title: "Détente et bien-être",
    description: "Profitez de notre espace détente pour un moment de relaxation"
  },
  {
    image: "https://img.freepik.com/photos-premium/rendering-3d-magnifique-suite-chambre-luxe-contemporaine-dans-hotel-television_1029473-137979.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    title: "Une expérience culinaire unique",
    description: "Savourez notre petit-déjeuner fait maison"
  }
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

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
              ? 'text-amber-400 fill-amber-400' 
              : i === fullStars && hasHalfStar 
                ? 'text-amber-400 fill-amber-400' 
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  
  // Handle scroll effects and observer setup
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.dataset.section]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe sections
    document.querySelectorAll('[data-section]').forEach(section => {
      observer.observe(section);
    });
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);
  
  // Automatic carousel slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
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
    
    window.location.href = `/auth/login`;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-purple-100 selection:text-purple-800">
      {/* Header & Navigation - Déplacé en tant qu'élément fixe avant le slider */}
      <header className={`${isScrolled ? 'bg-white/95 shadow-md' : 'bg-white shadow-md'} py-4 fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300`}>
        <div className="mx-auto container max-w-7xl flex justify-between items-center px-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <HomeIcon size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent">Maison d'Hôte</h1>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-medium">
            {["Accueil", "Chambres",  "À propos", "Contact"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Link 
                  href={item === "Accueil" ? "/" : `/homepage/${item.toLowerCase().replace(" ", "-")}`} 
                  className={`text-gray-700 hover:text-purple-600 relative group transition-colors duration-300 ${item === "Accueil" ? 'text-purple-600' : ''}`}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </nav>
          
          {/* Login/Register Buttons for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Link href="/auth/login">
                <button className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">
                  Connexion
                </button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Link href="/auth/register">
                <button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-lg">
                  Inscription
                </button>
              </Link>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="md:hidden text-gray-700 hover:text-purple-600 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 shadow-lg absolute w-full z-50 overflow-hidden"
            >
              <div className="container mx-auto py-4 px-6">
                <motion.nav 
                  className="flex flex-col space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {["Accueil", "Chambres", "À propos", "Contact"].map((item, i) => (
                    <motion.div key={item} variants={fadeIn}>
                      <Link 
                        href={item === "Accueil" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                        className="text-gray-800 hover:text-purple-600 font-medium py-2 border-b border-gray-100 block transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div variants={fadeIn} className="flex space-x-4 pt-2">
                    <Link 
                      href="/auth/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-1/2"
                    >
                      <button className="w-full border border-purple-500 text-purple-600 hover:bg-purple-50 font-medium py-2 px-4 rounded-lg transition duration-300">
                        Connexion
                      </button>
                    </Link>
                    <Link 
                      href="/auth/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-1/2"
                    >
                      <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                        Inscription
                      </button>
                    </Link>
                  </motion.div>
                </motion.nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Carousel Section - Déplacé après la navbar */}
      <section className="relative h-[80vh] overflow-hidden relative h-[80vh] overflow-hidden">
        {/* Carousel Slides */}
        <div className="h-full relative">
          {heroSlides.map((slide, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0,
                zIndex: index === currentSlide ? 10 : 0 
              }}
              transition={{ 
                opacity: { duration: 1, ease: "easeInOut" }
              }}
              className="absolute inset-0"
            >
              {/* Image with overlay */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50 z-10"></div>
                <motion.img 
                  initial={{ scale: 1.05 }}
                  animate={{ 
                    scale: index === currentSlide ? 1 : 1.05
                  }}
                  transition={{ duration: 6 }}
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="relative z-20 flex items-center justify-center h-full px-6">
                <div className="text-center max-w-3xl">
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: index === currentSlide ? 1 : 0,
                      y: index === currentSlide ? 0 : 30
                    }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: index === currentSlide ? 1 : 0,
                      y: index === currentSlide ? 0 : 30
                    }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-200 mb-8"
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: index === currentSlide ? 1 : 0,
                      y: index === currentSlide ? 0 : 30
                    }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                  >
                    <Link href="#rooms">
                      <button className="bg-white text-purple-700 hover:bg-purple-50 font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300">
                        Voir nos chambres
                      </button>
                    </Link>
                    <Link href="/auth/login">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300">
                        Réserver
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Indicator dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Section with staggered animation - Simplifié */}
      <section id="rooms" className="py-16 bg-gray-50" data-section="rooms">
        <div className="mx-auto container max-w-6xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.rooms ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos chambres</h2>
            <p className="text-gray-600">Des espaces accueillants conçus pour votre confort</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.rooms ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm mb-8"
          >
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Rechercher une chambre..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <div className="md:w-48">
              <select
                className="w-full py-2 px-4 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none appearance-none bg-white transition-all duration-300"
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
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible.rooms ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredChambres.map((room, index) => (
              <motion.div 
                key={index} 
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${!room.disponible ? 'opacity-70' : ''}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.titre}
                    className="w-full h-52 object-cover"
                  />
                  <button 
                    onClick={() => toggleFavorite(index)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center transition hover:bg-white shadow-md"
                  >
                    <Heart 
                      size={16} 
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
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{room.titre}</h3>
                    <div className="font-bold text-purple-600">
                      {room.prix}
                      <span className="text-xs text-gray-500 font-normal">/{room.duree}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Users size={14} className="text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">{room.capacite} {room.capacite > 1 ? 'personnes' : 'personne'}</span>
                    </div>
                    <RatingStars rating={room.notation} />
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {room.commodites.slice(0, 3).map((item, i) => (
                      <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                    {room.commodites.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        +{room.commodites.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleRoomClick(room.id)}
                    disabled={!room.disponible}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-300 ${
                      room.disponible 
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {room.disponible ? 'Réserver' : 'Indisponible'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {filteredChambres.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-100 rounded-lg p-8 text-center my-8"
            >
              <p className="text-gray-600">Aucune chambre ne correspond à votre recherche.</p>
              <button 
                className="mt-3 text-purple-600 hover:text-purple-800 font-medium" 
                onClick={() => {setSearchTerm(''); setCapacityFilter('');}}
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Services Section - Simplifié */}
      <section className="py-16 bg-white" data-section="services">
        <div className="mx-auto container max-w-6xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.services ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos services</h2>
            <p className="text-gray-600">Découvrez notre gamme de services pour un séjour parfait</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible.services ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Service de chambre",
                description: "Profitez d'un service de chambre disponible 24h/24 pour répondre à tous vos besoins pendant votre séjour. Menu complet disponible à toute heure.",
                image: "https://img.freepik.com/photos-gratuite/femme-chambre-faisant-lit-dans-chambre-hotel_171337-12691.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740"
              },
              {
                title: "WiFi haut débit",
                description: "Connexion internet haute vitesse gratuite disponible dans tout l'établissement, pour rester connecté pendant votre séjour, que ce soit pour le travail ou les loisirs.",
                image: "https://img.freepik.com/photos-gratuite/gros-plan-telephone-dans-mains-symbole-wifi_23-2148295840.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740"
              },
              {
                title: "Service de blanchisserie",
                description: "Notre service de blanchisserie rapide assure l'entretien de vos vêtements pendant votre séjour avec repassage et nettoyage à sec disponibles.",
                image: "https://img.freepik.com/photos-gratuite/femme-afro-americaine-joyeuse-serviettes-dans-mains-pres-machine-laver-dans-blanchisserie-libre-service_627829-4655.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740"
              }
            ].map((service, index) => (
              <motion.div 
                key={index} 
                variants={cardVariants}
                className="bg-gray-50 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-indigo-600" data-section="cta">
        <div className="mx-auto container max-w-6xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.cta ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Réservez dès maintenant</h2>
            <p className="text-white/90 text-lg mb-8">
              Profitez d'une expérience de séjour inoubliable dans notre maison d'hôte
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth/register">
                <button className="bg-white text-purple-700 hover:bg-purple-50 font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300">
                  Créer un compte
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="bg-purple-800/30 hover:bg-purple-800/40 text-white border border-white/30 font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300">
                  Se connecter
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto container max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <HomeIcon size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Maison d'Hôte</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Un havre de paix pour vos séjours, alliant confort moderne et hospitalité chaleureuse.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
              <ul className="text-gray-400 space-y-2">
                {["Accueil", "Chambres",  "À propos", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="hover:text-purple-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="text-gray-400 space-y-2">
                <li>123 Rue Exemple, Ville</li>
                <li>+123 456 7890</li>
                <li>info@maisondehote.com</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3">Abonnez-vous pour recevoir nos offres</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="py-2 px-3 bg-gray-800 text-white rounded-l-lg outline-none border-none flex-grow"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-r-lg transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Maison d'Hôte. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}