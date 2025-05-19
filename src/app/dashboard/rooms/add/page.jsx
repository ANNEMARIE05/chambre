'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, 
  Menu, X, User, Calendar, DollarSign, TrendingUp, Star, Eye, Upload,Image, Clipboard, Heart,
  Users
} from 'lucide-react';

export default function RoomsAdd() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [room, setRoom] = useState({
    name: '',
    description: '',
    pricePerNight: '',
    capacity: '',
    imageUrl: ''
  });

  // Effet pour animer le chargement initial
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      console.log('Room added:', room);
      setLoading(false);
      router.push('/dashboard/rooms');
    }, 1000);
  };

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
              <MobileSidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" active={true} />
              <MobileSidebarItem icon={<Users size={20} />} text="Clients" href="/dashboard/clients" />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Reservations" href="/dashboard/orders" />
              <MobileSidebarItem icon={<Calendar size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" />
              <MobileSidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
            </div>
          </nav>
          <div className="flex-shrink-0 flex border-t border-indigo-800/30 p-4">
            <button
              onClick={() => router.push('/auth/login')}
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
                <SidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" active={true} />
                <SidebarItem icon={<Users size={20} />} text="Clients" href="/dashboard/clients" />
                <SidebarItem icon={<ShoppingBag size={20} />} text="Reservations" href="/dashboard/orders" />
                <SidebarItem icon={<Calendar size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" />
                <SidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-slate-700/30 p-4">
              <button
                onClick={() => router.push('/auth/login')}
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

          {/* Add Room Form */}
          <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <PlusCircle size={20} className="mr-2" />
                  Ajouter une nouvelle chambre
                </h2>
                <Link
                  href="/dashboard/rooms"
                  className="text-indigo-100 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150"
                >
                  Retour aux chambres
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column */}
                <div className="col-span-2 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom de la chambre*
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      required
                      value={room.name}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-500 focus:ring-opacity-20 sm:text-sm px-4 py-3 transition-shadow duration-200"
                      placeholder="Ex: Suite Royale"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea 
                      name="description" 
                      id="description" 
                      required
                      value={room.description}
                      onChange={handleChange}
                      rows="5" 
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-500 focus:ring-opacity-20 sm:text-sm px-4 py-3 transition-shadow duration-200"
                      placeholder="Décrivez les caractéristiques de la chambre, vue, équipements, etc."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700 mb-1">
                        Prix par nuit (FCFA)*
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="number" 
                          name="pricePerNight" 
                          id="pricePerNight" 
                          required
                          min="0"
                          value={room.pricePerNight}
                          onChange={handleChange}
                          className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-500 focus:ring-opacity-20 sm:text-sm px-4 py-3 transition-shadow duration-200"
                          placeholder="45000"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                        Capacité (personnes)*
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Users size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="number" 
                          name="capacity" 
                          id="capacity" 
                          required
                          min="1"
                          value={room.capacity}
                          onChange={handleChange}
                          className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-500 focus:ring-opacity-20 sm:text-sm px-4 py-3 transition-shadow duration-200"
                          placeholder="2"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      URL de l'image*
                    </label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Image size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="url" 
                        name="imageUrl" 
                        id="imageUrl" 
                        required
                        value={room.imageUrl}
                        onChange={handleChange}
                        className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-500 focus:ring-opacity-20 sm:text-sm px-4 py-3 transition-shadow duration-200"
                        placeholder="https://exemple.com/image.jpg"
                      />
                    </div>
                  </div>

                  {room.imageUrl ? (
                    <div className="mt-2">
                      <p className="block text-sm font-medium text-gray-700 mb-1">Aperçu de l'image:</p>
                      <div className="h-56 w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                        <img 
                          src={room.imageUrl} 
                          alt="Aperçu" 
                          className="h-full w-full object-cover"
                          onError={(e) => e.target.src = "/api/placeholder/400/320"}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="h-56 w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                      <div className="text-center p-4">
                        <Upload size={36} className="text-slate-300 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">L'aperçu de l'image apparaîtra ici</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                    <h3 className="text-sm font-medium text-indigo-800 flex items-center mb-2">
                      <Eye size={16} className="mr-1" /> Informations supplémentaires
                    </h3>
                    <ul className="text-sm text-indigo-700 space-y-1">
                      <li className="flex items-center">
                        <Heart size={14} className="mr-1 text-indigo-500" /> Les chambres avec image de qualité ont 78% plus de réservations
                      </li>
                      <li className="flex items-center">
                        <Star size={14} className="mr-1 text-indigo-500" /> Ajoutez une description détaillée pour améliorer la visibilité
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8 border-t border-slate-100 pt-6">
                <Link
                  href="/dashboard/rooms"
                  className="mr-4 px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                >
                  Annuler
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enregistrement...
                    </span>
                  ) : (
                    'Ajouter la chambre'
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, text, href, active }) => (
  <a
    href={href}
    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
      active
        ? 'bg-white/10 text-white'
        : 'text-gray-300 hover:bg-white/5 hover:text-white'
    }`}
  >
    <div className={`p-2 rounded-md ${active ? 'bg-white/10' : ''}`}>
      {icon}
    </div>
    <span className="ml-3">{text}</span>
  </a>
);

const MobileSidebarItem = ({ icon, text, href, active }) => (
  <a
    href={href}
    className={`flex items-center px-3 py-2 text-white rounded-lg transition-colors ${
      active
        ? 'bg-white/10'
        : 'hover:bg-white/5'
    }`}
  >
    {icon}
    <span className="ml-3">{text}</span>
  </a>
);