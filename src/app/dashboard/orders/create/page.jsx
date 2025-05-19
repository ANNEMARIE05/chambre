'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, 
  Menu, X, User, Calendar, Star, 
  CreditCard, Users, Check, Coffee, Wifi, Tv,
  MapPin, 
} from 'lucide-react';

export default function AddRoom() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  // Effet pour animer le chargement initial
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    roomId: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    specialRequests: '',
    paymentMethod: 'card'
  });
  
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Chambre Deluxe",
      pricePerNight: 120,
      capacity: 2,
      available: true,
      description: "Chambre élégante avec vue sur le jardin, lit double et salle de bain privée",
      image: "/api/placeholder/500/300",
      amenities: ["Wifi Gratuit", "Petit-déjeuner inclus", "Smart TV", "Climatisation"],
      rating: 4.8,
      size: "28m²"
    },
    {
      id: 2,
      name: "Suite Familiale",
      pricePerNight: 200,
      capacity: 4,
      available: true,
      description: "Spacieuse suite pour familles avec deux chambres, idéale pour les longs séjours",
      image: "/api/placeholder/500/300",
      amenities: ["Wifi Gratuit", "Petit-déjeuner inclus", "Smart TV", "Mini-bar", "Salon"],
      rating: 4.9,
      size: "42m²"
    },
    {
      id: 3,
      name: "Suite Royale",
      pricePerNight: 350,
      capacity: 2,
      available: true,
      description: "Notre meilleure suite avec vue panoramique, jacuzzi et service personnalisé",
      image: "/api/placeholder/500/300",
      amenities: ["Wifi Gratuit", "Petit-déjeuner inclus", "Smart TV", "Jacuzzi", "Service en chambre 24h/24"],
      rating: 5.0,
      size: "56m²"
    }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Réservation créée avec succès !");
    // router.push('/dashboard/orders');
  };

  const calculateTotalPrice = () => {
    if (!formData.roomId || !formData.checkInDate || !formData.checkOutDate) return 0;
    
    const room = rooms.find(r => r.id === parseInt(formData.roomId));
    if (!room) return 0;
    
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    return nights * room.pricePerNight;
  };

  // Format date to local string
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Get selected room
  const selectedRoom = formData.roomId ? rooms.find(r => r.id === parseInt(formData.roomId)) : null;
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar pour mobile (hidden par défaut) */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-slate-900 bg-opacity-60 backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 shadow-xl transform transition-all ease-in-out duration-300">
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700/50">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-300 shadow-lg shadow-violet-600/20">
                <Home size={15} className="text-white" />
              </div>
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
                Maison d'hôte
              </h1>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto pt-5 pb-4">
            <div className="px-3 space-y-1">
              <MobileSidebarItem icon={<Home size={20} />} text="Dashboard" href="/dashboard" />
              <MobileSidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" />
              <MobileSidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
              <MobileSidebarItem icon={<Calendar size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" active={true} />
              <MobileSidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
            </div>
          </nav>
          <div className="flex-shrink-0 flex border-t border-indigo-800/30 p-4">
            <button
              onClick={() => router.push('/login')}
              className="flex items-center text-white hover:text-gray-200 transition-colors w-full rounded-lg hover:bg-white/5 p-2"
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
          <div className={`flex flex-col h-0 flex-1 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 shadow-lg transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-slate-700/50">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-300 shadow-lg shadow-violet-600/20">
                  <Home size={15} className="text-white" />
                </div>
                <h1 className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
                  Maison d'hôte
                </h1>
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 shadow-xl">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/20">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Admin</p>
                    <p className="text-xs text-slate-300">Propriétaire</p>
                  </div>
                </div>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                <SidebarItem icon={<Home size={20} />} text="Dashboard" href="/dashboard" />
                <SidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" />
                <SidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
                <SidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
                <SidebarItem icon={<Calendar size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" active={true} />
                <SidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-slate-700/30 p-4">
              <button
                onClick={() => router.push('/login')}
                className="flex items-center text-white hover:text-gray-200 transition-colors group w-full rounded-lg hover:bg-white/5 p-2"
              >
                <div className="p-2 rounded-md group-hover:bg-white/10 transition-colors">
                  <LogOut className="h-5 w-5" />
                </div>
                <span className="ml-3">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 h-screen overflow-auto">
        {/* Top navigation */}
        <div className={`relative z-10 flex-shrink-0 flex h-16 bg-white shadow-md transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1"></span>
              </button>
              <div className="bg-gradient-to-r from-teal-100 to-teal-50 text-teal-800 pl-3 pr-4 py-1.5 rounded-full flex items-center shadow-sm border border-teal-200 hover:from-teal-50 hover:to-teal-100 transition-colors">
                <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center mr-2 shadow-sm">
                  <User size={14} />
                </div>
                <span className="text-sm font-medium">Propriétaire</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className={`flex-1 relative overflow-y-auto focus:outline-none p-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="max-w-6xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6">
                <h1 className="text-2xl font-bold text-white">Créer une nouvelle réservation</h1>
                <p className="text-indigo-100 mt-2">Remplissez les informations pour enregistrer un nouveau séjour</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Section informations client */}
                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                      <h2 className="text-lg font-medium text-indigo-800 flex items-center">
                        <User size={20} className="mr-2" />
                        Informations du client
                      </h2>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Nom complet</label>
                          <input
                            type="text"
                            name="clientName"
                            id="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            required
                            className="mt-1 px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                            placeholder="Jean Dupont"
                          />
                        </div>
                        <div>
                          <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            name="clientEmail"
                            id="clientEmail"
                            value={formData.clientEmail}
                            onChange={handleChange}
                            required
                            className="mt-1 px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                            placeholder="exemple@email.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                          <input
                            type="tel"
                            name="clientPhone"
                            id="clientPhone"
                            value={formData.clientPhone}
                            onChange={handleChange}
                            required
                            className="mt-1 px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                            placeholder="+33 6 12 34 56 78"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section détails de la réservation */}
                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                      <h2 className="text-lg font-medium text-indigo-800 flex items-center">
                        <Calendar size={20} className="mr-2" />
                        Détails du séjour
                      </h2>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="roomId" className="block text-sm font-medium text-gray-700">Chambre</label>
                          <select
                            name="roomId"
                            id="roomId"
                            value={formData.roomId}
                            onChange={handleChange}
                            required
                            className="mt-1 px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                          >
                            <option value="">Sélectionnez une chambre</option>
                            {rooms.map(room => (
                              <option key={room.id} value={room.id} disabled={!room.available}>
                                {room.name} - {room.pricePerNight}€/nuit
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700">Nombre de personnes</label>
                          <select
                            name="numberOfGuests"
                            id="numberOfGuests"
                            value={formData.numberOfGuests}
                            onChange={handleChange}
                            required
                            className="mt-1 px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                          >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'personne' : 'personnes'}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">Date d'arrivée</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="date"
                              name="checkInDate"
                              id="checkInDate"
                              value={formData.checkInDate}
                              onChange={handleChange}
                              required
                              className="focus:ring-indigo-500 focus:border-indigo-500 p-3 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">Date de départ</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="date"
                              name="checkOutDate"
                              id="checkOutDate"
                              value={formData.checkOutDate}
                              onChange={handleChange}
                              required
                              className="focus:ring-indigo-500 focus:border-indigo-500 p-3 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">Demandes spéciales</label>
                          <textarea
                            name="specialRequests"
                            id="specialRequests"
                            rows="3"
                            value={formData.specialRequests}
                            onChange={handleChange}
                            className="mt-1 px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                            placeholder="Précisez toute demande spéciale pour cette réservation..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    {/* Image de la chambre sélectionnée */}
                    {selectedRoom && (
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
                        <h2 className="text-lg font-medium text-gray-900 flex items-center">
                          <Check size={20} className="mr-2 text-green-500" />
                          Chambre sélectionnée
                        </h2>
                        
                        <div className="mt-4">
                          <div className="overflow-hidden rounded-lg">
                            <img 
                              src={selectedRoom.image} 
                              alt={selectedRoom.name} 
                              className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between items-center">
                              <h3 className="text-xl font-bold text-gray-900">{selectedRoom.name}</h3>
                              <div className="flex items-center bg-indigo-100 px-2 py-1 rounded-md">
                                <Star size={16} className="text-yellow-500 fill-current" />
                                <span className="ml-1 text-sm font-medium text-indigo-800">{selectedRoom.rating}/5</span>
                              </div>
                            </div>
                            
                            <p className="mt-2 text-gray-600">{selectedRoom.description}</p>
                            
                            <div className="mt-3 flex items-center text-sm text-gray-500">
                              <MapPin size={16} className="mr-1 text-indigo-600" />
                              <span>{selectedRoom.size}</span>
                              <span className="mx-1">•</span>
                              <Users size={16} className="mr-1 text-indigo-600" />
                              <span>Max {selectedRoom.capacity} personnes</span>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              {selectedRoom.amenities.map((amenity, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-600">
                                  {amenity.includes("Wifi") && <Wifi size={14} className="mr-1 text-indigo-500" />}
                                  {amenity.includes("déjeuner") && <Coffee size={14} className="mr-1 text-indigo-500" />}
                                  {amenity.includes("TV") && <Tv size={14} className="mr-1 text-indigo-500" />}
                                  {!amenity.includes("Wifi") && !amenity.includes("déjeuner") && !amenity.includes("TV") && 
                                    <Check size={14} className="mr-1 text-indigo-500" />}
                                  <span>{amenity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Résumé de la réservation */}
                  <div className="lg:col-span-1">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 sticky top-6">
                      <h2 className="text-lg font-medium text-blue-800 flex items-center">
                        <CreditCard size={20} className="mr-2" />
                        Récapitulatif
                      </h2>
                      
                      <div className="mt-6 space-y-4">
                        {formData.roomId ? (
                          <div className="flex justify-between items-center py-2 border-b border-blue-100">
                            <div className="flex items-center">
                              <MapPin size={16} className="text-blue-600 mr-2" />
                              <span className="text-gray-700">Chambre</span>
                            </div>
                            <span className="font-medium text-gray-900">
                              {rooms.find(r => r.id === parseInt(formData.roomId))?.name}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center py-2 border-b border-blue-100 text-gray-500 italic">
                            <MapPin size={16} className="text-blue-400 mr-2" />
                            <span>Sélectionnez une chambre</span>
                          </div>
                        )}
                        
                        {formData.checkInDate && formData.checkOutDate ? (
                          <>
                            <div className="flex justify-between items-center py-2 border-b border-blue-100">
                              <div className="flex items-center">
                                <Calendar size={16} className="text-blue-600 mr-2" />
                                <span className="text-gray-700">Dates</span>
                              </div>
                              <span className="font-medium text-gray-900">
                                {formatDate(formData.checkInDate)} - {formatDate(formData.checkOutDate)}
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center py-2 border-b border-blue-100">
                              <div className="flex items-center">
                                <Clock size={16} className="text-blue-600 mr-2" />
                                <span className="text-gray-700">Durée</span>
                              </div>
                              <span className="font-medium text-gray-900">
                                {Math.ceil((new Date(formData.checkOutDate) - new Date(formData.checkInDate)) / (1000 * 60 * 60 * 24))} nuits
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center py-2 border-b border-blue-100 text-gray-500 italic">
                            <Calendar size={16} className="text-blue-400 mr-2" />
                            <span>Dates de séjour non définies</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center py-2 border-b border-blue-100">
                          <div className="flex items-center">
                            <Users size={16} className="text-blue-600 mr-2" />
                            <span className="text-gray-700">Voyageurs</span>
                          </div>
                          <span className="font-medium text-gray-900">
                            {formData.numberOfGuests} {formData.numberOfGuests === 1 ? 'personne' : 'personnes'}
                          </span>
                        </div>
                        
                        <div className="pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">Prix par nuit</span>
                            <span className="font-medium text-gray-900">
                              {formData.roomId ? `${rooms.find(r => r.id === parseInt(formData.roomId))?.pricePerNight} €` : '—'}
                            </span>
                          </div>
                          
                          {formData.checkInDate && formData.checkOutDate && formData.roomId && (
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-700">
                                {Math.ceil((new Date(formData.checkOutDate) - new Date(formData.checkInDate)) / (1000 * 60 * 60 * 24))} nuits
                              </span>
                              <span className="font-medium text-gray-900">
                                {Math.ceil((new Date(formData.checkOutDate) - new Date(formData.checkInDate)) / (1000 * 60 * 60 * 24)) *
                                  (formData.roomId ? rooms.find(r => r.id === parseInt(formData.roomId))?.pricePerNight : 0)} €
                              </span>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center pt-4 mt-4 border-t border-blue-100">
                            <span className="font-semibold text-gray-900">Total</span>
                            <span className="text-lg font-bold text-blue-800">
                              {calculateTotalPrice()} €
                            </span>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Mode de paiement</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div 
                              className={`border rounded-lg p-3 flex items-center cursor-pointer transition-colors ${formData.paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                              onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                            >
                              <CreditCard size={18} className={`mr-2 ${formData.paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-500'}`} />
                              <span className={`text-sm ${formData.paymentMethod === 'card' ? 'font-medium text-blue-800' : 'text-gray-600'}`}>Carte</span>
                            </div>
                            <div 
                              className={`border rounded-lg p-3 flex items-center cursor-pointer transition-colors ${formData.paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                              onClick={() => setFormData({...formData, paymentMethod: 'cash'})}
                            >
                              <ShoppingBag size={18} className={`mr-2 ${formData.paymentMethod === 'cash' ? 'text-blue-600' : 'text-gray-500'}`} />
                              <span className={`text-sm ${formData.paymentMethod === 'cash' ? 'font-medium text-blue-800' : 'text-gray-600'}`}>Espèces</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                        >
                          <ShoppingBag className="mr-2 h-5 w-5" />
                          Confirmer la réservation
                        </button>
                        
                        <Link 
                          href="/dashboard/orders"
                          className="mt-4 w-full border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center justify-center"
                        >
                          <X className="mr-2 h-5 w-5" />
                          Annuler
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Components
function SidebarItem({ icon, text, href, active = false }) {
  return (
    <Link
      href={href}
      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
        active 
          ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-md' 
          : 'text-slate-200 hover:bg-white/10 hover:text-white'
      }`}
    >
      <div className={`mr-3 p-1 rounded-md transition-colors ${active ? 'bg-white/20' : 'group-hover:bg-white/10 bg-transparent'}`}>
        {icon}
      </div>
      {text}
    </Link>
  );
}

function MobileSidebarItem({ icon, text, href, active = false }) {
  return (
    <Link
      href={href}
      className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all duration-150 ${
        active 
          ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-md' 
          : 'text-slate-200 hover:bg-white/10 hover:text-white'
      }`}
    >
      <div className={`mr-3 p-1 rounded-md transition-colors ${active ? 'bg-white/20' : 'group-hover:bg-white/10 bg-transparent'}`}>
        {icon}
      </div>
      {text}
    </Link>
  );
}