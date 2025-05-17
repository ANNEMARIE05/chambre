'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, LogOut, Home, Calendar, ShoppingBag, List, Settings, 
  Menu, X, Search, Star, Coffee, Wifi, Wind, Tv, Users,
  ChevronRight, ArrowRight, Eye
} from 'lucide-react';

export default function UserDashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('available');
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Données pour les chambres disponibles avec les nouvelles informations
  const availableRooms = [
    { 
      id: 1, 
      titre: "Chambre Standard", 
      description: "Chambre confortable avec vue sur le jardin", 
      commodites: ["Lit double", "Climatisation", "TV écran plat", "WiFi gratuit"], 
      image: "https://img.freepik.com/photos-premium/illustration-interieur-chambre_252025-178399.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740", 
      prix: "45 000 FCFA", 
      duree: "jour", 
      capacite: 2, 
      notation: 4.5, 
      disponible: true 
    },
    { 
      id: 2, 
      titre: "Suite Familiale", 
      description: "Spacieuse et conviviale, idéale pour les séjours en famille.", 
      commodites: ["2 lits doubles", "Climatisation", "TV écran plat", "Mini-bar", "WiFi gratuit"], 
      image: "https://img.freepik.com/photos-premium/interieur-chambre-coucher-tridimensionnel-meubles-elegants-vue-jardin_817921-15101.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740", 
      prix: "70 000 FCFA", 
      duree: "jour", 
      capacite: 4, 
      notation: 4.9, 
      disponible: true 
    },
    { 
      id: 3, 
      titre: "Chambre Deluxe", 
      description: "Spacieuse avec balcon privé et vue sur la mer", 
      commodites: ["Lit King size", "Climatisation", "TV écran plat", "Mini-bar", "Balcon privé", "WiFi gratuit"], 
      image: "https://img.freepik.com/photos-gratuite/rendu-3d-belle-suite-chambre-luxe-dans-hotel-tv_105762-2125.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740", 
      prix: "60 000 FCFA", 
      duree: "jour", 
      capacite: 2, 
      notation: 4.8, 
      disponible: true 
    },
    { 
      id: 4, 
      titre: "Suite Présidentielle", 
      description: "Notre meilleure suite avec service personnalisé", 
      commodites: ["Lit King size", "Salon séparé", "Jacuzzi", "Climatisation", "TV écran plat", "Mini-bar", "WiFi gratuit"], 
      image: "https://img.freepik.com/photos-premium/rendu-3d-belle-suite-chambre-luxe-classique-hotel-television_105762-1038.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740", 
      prix: "120 000 FCFA", 
      duree: "jour", 
      capacite: 2, 
      notation: 5.0, 
      disponible: true 
    },
  ];

  // Données pour les réservations
  const myBookings = [
    { id: 101, roomName: "Chambre Deluxe", checkIn: "2025-05-20", checkOut: "2025-05-23", prix: "180 000 FCFA", status: "Confirmée" },
    { id: 102, roomName: "Suite Familiale", checkIn: "2025-06-15", checkOut: "2025-06-20", prix: "350 000 FCFA", status: "En attente" },
  ];

  // Filtrer les chambres selon le critère actif
  const getFilteredRooms = () => {
    if (activeFilter === 'all') return availableRooms;
    if (activeFilter === 'family') return availableRooms.filter(room => room.capacite >= 4);
    if (activeFilter === 'couple') return availableRooms.filter(room => room.capacite === 2);
    if (activeFilter === 'premium') return availableRooms.filter(room => room.notation >= 4.8);
    return availableRooms;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar pour mobile (hidden par défaut) */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-72 max-w-xs bg-purple-900 shadow-xl transform transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between h-20 px-6 bg-purple-950">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <Home size={16} className="text-purple-900" />
              </div>
              <span className="font-bold text-xl text-white">Maison d'hôte</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-3 p-3 bg-purple-800 bg-opacity-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
                <span className="font-semibold text-purple-900">JD</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Jean Dupont</h4>
                <p className="text-xs text-purple-200">jean.dupont@example.com</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto pt-2 pb-4">
            <div className="px-3 space-y-1">
              <MobileSidebarItem 
                icon={<Search size={20} />} 
                text="Chambres disponibles" 
                active={selectedTab === 'available'}
                onClick={() => {
                  setSelectedTab('available');
                  setIsSidebarOpen(false);
                }}
              />
              <MobileSidebarItem 
                icon={<Calendar size={20} />} 
                text="Mes réservations" 
                active={selectedTab === 'bookings'}
                onClick={() => {
                  setSelectedTab('bookings');
                  setIsSidebarOpen(false);
                }}
              />
              <MobileSidebarItem 
                icon={<Settings size={20} />} 
                text="Paramètres du compte" 
                active={selectedTab === 'settings'}
                onClick={() => {
                  setSelectedTab('settings');
                  setIsSidebarOpen(false);
                }}
              />
            </div>
          </nav>
          <div className="flex-shrink-0 flex border-t border-purple-700 p-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center w-full py-2 px-3 text-white rounded-lg bg-purple-800 hover:bg-purple-700 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72">
          <div className="flex flex-col h-0 flex-1 bg-purple-900">
            <div className="flex items-center h-20 flex-shrink-0 px-6 bg-purple-950">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <Home size={16} className="text-purple-900" />
                </div>
                <span className="font-bold text-xl text-white">Maison d'hôte</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-3 p-3 bg-purple-800 bg-opacity-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
                  <span className="font-semibold text-purple-900">JD</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">Jean Dupont</h4>
                  <p className="text-xs text-purple-200">jean.dupont@example.com</p>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-3 py-4 space-y-2">
                <SidebarItem 
                  icon={<Search size={20} />} 
                  text="Chambres disponibles" 
                  onClick={() => setSelectedTab('available')}
                  active={selectedTab === 'available'}
                />
                <SidebarItem 
                  icon={<Calendar size={20} />} 
                  text="Mes réservations" 
                  onClick={() => setSelectedTab('bookings')}
                  active={selectedTab === 'bookings'}
                />
                <SidebarItem 
                  icon={<Settings size={20} />} 
                  text="Paramètres du compte" 
                  onClick={() => setSelectedTab('settings')}
                  active={selectedTab === 'settings'}
                />
              </nav>
            </div>
            <div className="flex-shrink-0 flex p-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center w-full py-2 px-4 text-white rounded-lg bg-purple-800 hover:bg-purple-700 transition-colors"
              >
                <LogOut className="mr-3 h-5 w-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 h-screen overflow-auto">
        {/* Top navigation */}
        <div className={`relative z-10 flex-shrink-0 flex h-20 bg-white shadow-sm transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
          <button
            type="button"
            className="px-4 text-gray-600 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedTab === 'available' ? 'Chambres disponibles' : 
                selectedTab === 'bookings' ? 'Mes réservations' :
                'Paramètres du compte'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <button className="relative p-2 rounded-full text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-purple-600 rounded-full"></span>
              </button>
              <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center space-x-1">
                <div className="w-6 h-6 rounded-full bg-purple-200 flex items-center justify-center">
                  <span className="font-semibold text-xs text-purple-900">JD</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Jean</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
          {selectedTab === 'available' && (
            <div className="animate-fadeIn">
              <div className="flex flex-col space-y-6">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl overflow-hidden shadow-lg">
                  <div className="px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-6 md:mb-0">
                      <h2 className="text-2xl font-bold text-white mb-2">Trouvez votre chambre idéale</h2>
                      <p className="text-purple-100">Découvrez nos chambres disponibles et faites votre réservation.</p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-xl">
                      <div className="relative">
                        <input
                          type="date"
                          className="bg-white px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none w-full md:w-36"
                          placeholder="Date d'arrivée"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="date"
                          className="bg-white px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none w-full md:w-36"
                          placeholder="Date de départ"
                        />
                      </div>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                        <Search size={16} className="mr-2" />
                        Rechercher
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
                    <FilterButton
                      text="Toutes les chambres"
                      active={activeFilter === 'all'}
                      onClick={() => setActiveFilter('all')}
                    />
                    <FilterButton
                      text="Familiales"
                      active={activeFilter === 'family'}
                      onClick={() => setActiveFilter('family')}
                    />
                    <FilterButton
                      text="Couples"
                      active={activeFilter === 'couple'}
                      onClick={() => setActiveFilter('couple')}
                    />
                    <FilterButton
                      text="Premium"
                      active={activeFilter === 'premium'}
                      onClick={() => setActiveFilter('premium')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {getFilteredRooms().map(room => (
                    <RoomCard 
                      key={room.id}
                      id={room.id}
                      titre={room.titre}
                      prix={room.prix}
                      duree={room.duree}
                      capacite={room.capacite}
                      image={room.image}
                      notation={room.notation}
                      description={room.description}
                      commodites={room.commodites}
                      disponible={room.disponible}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'bookings' && (
            <div className="animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-8">
                  <h2 className="text-xl font-bold text-white">Vos réservations</h2>
                  <p className="text-purple-100 mt-1">Gérez vos séjours actuels et à venir</p>
                </div>
                
                <div className="px-6 py-4">
                  <div className="flex space-x-2 mb-4 overflow-x-auto scrollbar-hide">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
                      Toutes
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      À venir
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      Passées
                    </button>
                  </div>
                </div>
                
                {myBookings.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {myBookings.map(booking => (
                      <BookingItem 
                        key={booking.id}
                        id={booking.id}
                        roomName={booking.roomName}
                        checkIn={booking.checkIn}
                        checkOut={booking.checkOut}
                        prix={booking.prix}
                        status={booking.status}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 px-6">
                    <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <Calendar size={28} className="text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Pas de réservation</h3>
                    <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                      Vous n'avez pas encore de réservation. Commencez par chercher une chambre disponible.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => setSelectedTab('available')}
                        className="inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                      >
                        <Search className="mr-2 h-4 w-4" />
                        Voir les chambres disponibles
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-8">
                  <h3 className="text-xl font-bold text-white">Paramètres du compte</h3>
                  <p className="text-purple-100 mt-1">Gérez vos informations personnelles et préférences</p>
                </div>
                
                <div className="px-6 py-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet
                        </label>
                        <input 
                          type="text" 
                          defaultValue="Jean Dupont" 
                          className="w-full px-4 py-2 border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-colors" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Adresse email
                        </label>
                        <input 
                          type="email" 
                          defaultValue="jean.dupont@example.com" 
                          className="w-full px-4 py-2 border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-colors" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Numéro de téléphone
                        </label>
                        <input 
                          type="tel" 
                          defaultValue="+33 6 12 34 56 78" 
                          className="w-full px-4 py-2 border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-colors" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pays
                        </label>
                        <select className="w-full px-4 py-2 border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-colors">
                          <option>France</option>
                          <option>Belgique</option>
                          <option>Suisse</option>
                          <option>Canada</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-4">Sécurité du compte</h4>
                      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div>
                          <h5 className="font-medium text-gray-900">Mot de passe</h5>
                          <p className="text-sm text-gray-500">Dernière modification il y a 3 mois</p>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
                          Modifier
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-4">Préférences</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input 
                              id="notifications" 
                              type="checkbox" 
                              defaultChecked 
                              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" 
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="notifications" className="font-medium text-gray-700">Recevoir des notifications</label>
                            <p className="text-gray-500">Recevoir des emails pour les promotions et offres spéciales</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input 
                              id="newsletter" 
                              type="checkbox" 
                              defaultChecked 
                              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" 
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="newsletter" className="font-medium text-gray-700">Newsletter</label>
                            <p className="text-gray-500">Recevoir notre newsletter mensuelle</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 flex justify-end">
                  <button className="px-5 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Components
function SidebarItem({ icon, text, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-purple-800 text-white' 
          : 'text-purple-100 hover:bg-purple-800 hover:text-white'
      }`}
    >
      <div className={`mr-3 ${active ? 'text-white' : 'text-purple-300 group-hover:text-white'}`}>{icon}</div>
      {text}
    </button>
  );
}

function MobileSidebarItem({ icon, text, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center w-full px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-purple-800 text-white' 
          : 'text-purple-100 hover:bg-purple-800 hover:text-white'
      }`}
    >
      <div className={`mr-3 ${active ? 'text-white' : 'text-purple-300 group-hover:text-white'}`}>{icon}</div>
      {text}
    </button>
  );
}

function FilterButton({ text, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
        active 
          ? 'bg-purple-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {text}
    </button>
  );
}

function RoomCard({ id, titre, prix, duree, capacite, image, notation, description, commodites, disponible }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={titre} 
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} 
          />
        </div>
        <div className="absolute top-0 right-0 m-3 px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-lg shadow-md">
          {prix} / {duree}
        </div>
        {notation >= 4.8 && (
          <div className="absolute top-0 left-0 m-3 px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-lg shadow-md">
            TOP CHOIX
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{titre}</h3>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500" />
            <span className="ml-1 text-sm font-medium text-gray-600">{notation}</span>
          </div>
        </div>
        
        // Suite du composant RoomCard
        <div className="flex items-center mt-2 space-x-2">
          <div className="flex items-center text-sm text-gray-500">
            <Users size={14} className="mr-1" />
            <span>{capacite} personnes</span>
          </div>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
        
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {commodites.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md">
                {item === "WiFi gratuit" ? <Wifi size={12} className="mr-1" /> : 
                 item === "Climatisation" ? <Wind size={12} className="mr-1" /> :
                 item === "TV écran plat" ? <Tv size={12} className="mr-1" /> :
                 item === "Mini-bar" ? <Coffee size={12} className="mr-1" /> : null}
                {item}
              </div>
            ))}
            {commodites.length > 3 && (
              <div className="flex items-center px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md cursor-pointer hover:bg-gray-100">
                +{commodites.length - 3}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-5 flex items-center justify-between">
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="flex-1 mr-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            Réserver
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors">
            <Eye size={18} />
          </button>
        </div>
      </div>
      
      {/* Modal de réservation (caché par défaut) */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setIsBookingModalOpen(false)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Réserver {titre}
                    </h3>
                    
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date d'arrivée
                          </label>
                          <input 
                            type="date" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date de départ
                          </label>
                          <input 
                            type="date" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre de personnes
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500">
                          {[...Array(capacite)].map((_, i) => (
                            <option key={i} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Prix par nuit:</span>
                          <span className="font-medium">{prix}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Taxes:</span>
                          <span className="font-medium">5 000 FCFA</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-purple-600">{prix}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirmer la réservation
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsBookingModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingItem({ id, roomName, checkIn, checkOut, prix, status }) {
  // Formater les dates
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  // Déterminer la couleur du statut
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Confirmée':
        return 'bg-green-100 text-green-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Annulée':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col mb-4 md:mb-0">
          <div className="flex items-center">
            <h4 className="font-medium text-gray-900">{roomName}</h4>
            <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(status)}`}>
              {status}
            </span>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-1" />
            <span>{formatDate(checkIn)} - {formatDate(checkOut)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between md:justify-end">
          <div className="mr-6 md:mr-10">
            <div className="text-xs text-gray-500">Montant total</div>
            <div className="font-medium text-gray-900">{prix}</div>
          </div>
          
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Détails
            </button>
            {status === 'En attente' && (
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Annuler
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles globaux à ajouter dans votre fichier CSS global
// .animate-fadeIn {
//   animation: fadeIn 0.5s ease-in-out;
// }
// 
// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }
//
// .scrollbar-hide {
//   -ms-overflow-style: none;  /* IE and Edge */
//   scrollbar-width: none;  /* Firefox */
// }
// .scrollbar-hide::-webkit-scrollbar {
//   display: none;  /* Chrome, Safari and Opera */
// }