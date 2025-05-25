"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart, Users, Star, Search, Menu, X, HomeIcon, ChevronDown } from 'lucide-react';
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

const pageTransition = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } }
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

export default function ChambreLists() {
  const [favorites, setFavorites] = useState([]);
  const [filteredChambres, setFilteredChambres] = useState(chambres);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state
  const [isVisible, setIsVisible] = useState({});
  const [sortOption, setSortOption] = useState('default');
  const [filterOptions, setFilterOptions] = useState({
    capacity: '',
    available: 'all',
    priceRange: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  
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
  
  // Handle room filtering
  useEffect(() => {
    let result = chambres;
    
    // Search filtering
    if (searchTerm) {
      result = result.filter(room => 
        room.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Capacity filtering
    if (filterOptions.capacity) {
      const capacity = parseInt(filterOptions.capacity);
      result = result.filter(room => room.capacite >= capacity);
    }
    
    // Availability filtering
    if (filterOptions.available !== 'all') {
      const isAvailable = filterOptions.available === 'available';
      result = result.filter(room => room.disponible === isAvailable);
    }
    
    // Price range filtering
    if (filterOptions.priceRange) {
      const [min, max] = filterOptions.priceRange.split('-').map(price => parseInt(price));
      result = result.filter(room => {
        const roomPrice = parseInt(room.prix.replace(/\D/g, ''));
        return roomPrice >= min && (max ? roomPrice <= max : true);
      });
    }
    
    // Sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => parseInt(a.prix.replace(/\D/g, '')) - parseInt(b.prix.replace(/\D/g, '')));
        break;
      case 'price-desc':
        result.sort((a, b) => parseInt(b.prix.replace(/\D/g, '')) - parseInt(a.prix.replace(/\D/g, '')));
        break;
      case 'rating-desc':
        result.sort((a, b) => b.notation - a.notation);
        break;
      case 'capacity-desc':
        result.sort((a, b) => b.capacite - a.capacite);
        break;
      default:
        // Default sorting (by id)
        result.sort((a, b) => a.id - b.id);
    }
    
    setFilteredChambres(result);
  }, [searchTerm, sortOption, filterOptions]);
  
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

  const resetFilters = () => {
    setSearchTerm('');
    setSortOption('default');
    setFilterOptions({
      capacity: '',
      available: 'all',
      priceRange: ''
    });
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 font-sans selection:bg-purple-100 selection:text-purple-800"
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header & Navigation */}
      <header className={`${isScrolled ? 'bg-white/95 shadow-md' : 'bg-white shadow-md'} py-4 fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300`}>
        <div className="mx-auto container max-w-7xl flex justify-between items-center px-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Link href="/">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                <HomeIcon size={22} className="text-white" />
              </div>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent">Maison d'Hôte</h1>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-medium">
            {["Accueil", "Chambres", "À propos", "Contact"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Link 
                  href={item === "Accueil" ? "/" : `/homepage/${item.toLowerCase().replace(" ", "-")}`} 
                  className={`text-gray-700 hover:text-purple-600 relative group transition-colors duration-300 ${item === "Chambres" ? 'text-purple-600' : ''}`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-purple-400 transition-all duration-300 ${item === "Chambres" ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
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
                        className={`text-gray-800 hover:text-purple-600 font-medium py-2 border-b border-gray-100 block transition-colors duration-300 ${item === "Chambres" ? 'text-purple-600' : ''}`}
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

      {/* Main Content - Chambres List */}
      <main className="pt-16 pb-16">
        {/* Page Title */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-600 py-12 mb-12">
          <div className="container mx-auto max-w-6xl px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-white mb-3">Nos Chambres</h1>
              <p className="text-white/90 max-w-2xl mx-auto">
                Découvrez notre sélection de chambres confortables et élégantes pour un séjour inoubliable
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-6">
          {/* Search and Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Box */}
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Rechercher une chambre..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
                
                {/* Sort Dropdown */}
                <div className="md:w-64">
                  <select
                    className="w-full py-3 px-4 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none appearance-none bg-white transition-all duration-300"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="default">Trier par</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="rating-desc">Meilleure notation</option>
                    <option value="capacity-desc">Capacité maximum</option>
                  </select>
                </div>
                
                {/* Filter Button */}
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-300"
                >
                  Filtres
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} 
                  />
                </button>
              </div>
              
              {/* Advanced Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-100 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Capacity Filter */}
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Capacité</label>
                        <select
                          className="w-full py-2 px-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none appearance-none bg-white transition-all duration-300"
                          value={filterOptions.capacity}
                          onChange={(e) => setFilterOptions({...filterOptions, capacity: e.target.value})}
                        >
                          <option value="">Tous</option>
                          <option value="1">1+ personne</option>
                          <option value="2">2+ personnes</option>
                          <option value="3">3+ personnes</option>
                          <option value="4">4+ personnes</option>
                        </select>
                      </div>
                      
                      {/* Availability Filter */}
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Disponibilité</label>
                        <select
                          className="w-full py-2 px-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none appearance-none bg-white transition-all duration-300"
                          value={filterOptions.available}
                          onChange={(e) => setFilterOptions({...filterOptions, available: e.target.value})}
                        >
                          <option value="all">Tous</option>
                          <option value="available">Disponible</option>
                          <option value="unavailable">Non disponible</option>
                        </select>
                      </div>
                      
                      {/* Price Range Filter */}
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Fourchette de prix</label>
                        <select
                          className="w-full py-2 px-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none appearance-none bg-white transition-all duration-300"
                          value={filterOptions.priceRange}
                          onChange={(e) => setFilterOptions({...filterOptions, priceRange: e.target.value})}
                        >
                          <option value="">Tous les prix</option>
                          <option value="0-30000">Jusqu'à 30 000 FCFA</option>
                          <option value="30000-50000">30 000 - 50 000 FCFA</option>
                          <option value="50000-70000">50 000 - 70 000 FCFA</option>
                          <option value="70000-">Plus de 70 000 FCFA</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <button 
                        onClick={resetFilters}
                        className="text-purple-600 hover:text-purple-800 font-medium transition duration-300"
                      >
                        Réinitialiser les filtres
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mb-6 text-gray-600"
          >
            {filteredChambres.length === 0 ? (
              <p>Aucune chambre ne correspond à votre recherche</p>
            ) : (
              <p>{filteredChambres.length} chambre{filteredChambres.length > 1 ? 's' : ''} trouvée{filteredChambres.length > 1 ? 's' : ''}</p>
            )}
          </motion.div>
          
          {/* Chambres Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredChambres.map((room, index) => (
              <motion.div 
                key={index} 
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg ${!room.disponible ? 'opacity-80' : ''}`}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={room.image}
                    alt={room.titre}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <button 
                    onClick={() => toggleFavorite(index)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center transition hover:bg-white shadow-md"
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
                      <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                        Non disponible
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{room.titre}</h3>
                    <div className="font-bold text-purple-600">
                      {room.prix}
                      <span className="text-xs text-gray-500 font-normal">/{room.duree}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{room.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Users size={16} className="text-gray-500 mr-1.5" />
                      <span className="text-sm text-gray-600">{room.capacite} {room.capacite > 1 ? 'personnes' : 'personne'}</span>
                    </div>
                    <RatingStars rating={room.notation} />
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-5">
                  {room.commodites.slice(0, 3).map((item, i) => (
      <span key={i} className="text-xs bg-purple-50 text-purple-700 rounded-full px-2.5 py-1">
        {item}
      </span>
    ))}
    {room.commodites.length > 3 && (
      <span className="text-xs bg-gray-50 text-gray-700 rounded-full px-2.5 py-1">
        +{room.commodites.length - 3}
      </span>
    )}
  </div>
                  
  <button 
    onClick={() => handleRoomClick(room.id)}
    className={`w-full py-2.5 rounded-lg font-medium transition duration-300 ${
      room.disponible 
        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-md' 
        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
    }`}
    disabled={!room.disponible}
  >
    {room.disponible ? 'Voir les détails' : 'Non disponible'}
  </button>
</div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Empty State */}
          {filteredChambres.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 bg-white rounded-lg shadow-sm mt-8"
            >
              <div className="mb-4 text-gray-400">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucune chambre trouvée</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Essayez de modifier vos critères de recherche ou de réinitialiser les filtres pour voir toutes nos chambres.
              </p>
              <button 
                onClick={resetFilters}
                className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-6 py-2 rounded-lg font-medium transition duration-300"
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </div>
      </main>

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
                {["Accueil", "Chambres", "À propos", "Contact"].map((item) => (
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
    </motion.div>
  );
}