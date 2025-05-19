'use client'

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, 
  Menu, X, User, Calendar, ArrowLeft, Save, Image
} from 'lucide-react';

export default function EditRoom({ params }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [room, setRoom] = useState(null);

  // Effet pour animer le chargement initial
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      const mockRoom = {
        id: parseInt(id),
        name: id === "1" ? "Chambre Deluxe" : "Suite Familiale",
        description: id === "1" 
          ? "Une chambre spacieuse avec vue sur le jardin" 
          : "Parfaite pour les familles, avec deux chambres communicantes",
        pricePerNight: id === "1" ? 120 : 200,
        capacity: id === "1" ? 2 : 4,
        imageUrl: id === "1" 
          ? "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
          : "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
      };
      setRoom(mockRoom);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Simuler un appel API
    setTimeout(() => {
      // Dans une vraie application, une requête API serait effectuée ici
      console.log('Room updated:', room);
      setSaving(false);
      router.push('/dashboard/rooms');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-gray-100">
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
              <MobileSidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" active={true} />
              <MobileSidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
              <MobileSidebarItem icon={<Calendar size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" />
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
                <SidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" active={true} />
                <SidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
                <SidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
                <SidebarItem icon={<Calendar size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" />
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
            {/* Page header with back button */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Link
                  href="/dashboard/rooms"
                  className="flex items-center justify-center p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors text-purple-700"
                >
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Modifier la chambre</h1>
              </div>
              <div className="bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-medium">
                ID: {room.id}
              </div>
            </div>

            {/* Main card */}
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100">
              {room.imageUrl && (
                <div className="w-full h-64 relative overflow-hidden bg-purple-100">
                  <img 
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-white text-3xl font-bold drop-shadow-md">{room.name}</h2>
                    <div className="flex items-center mt-2 space-x-3">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        {room.capacity} {room.capacity > 1 ? 'personnes' : 'personne'}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        {room.pricePerNight} FCFA/nuit
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left column - Details */}
                  <div className="space-y-6">
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
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-4 py-3 transition-colors"
                        placeholder="Ex: Chambre Deluxe"
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
                        rows="4" 
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-4 py-3 transition-colors"
                        placeholder="Décrivez les caractéristiques de la chambre"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700 mb-1">
                          Prix par nuit (FCFA)*
                        </label>
                        <div className="relative">
                          <input 
                            type="number" 
                            name="pricePerNight" 
                            id="pricePerNight" 
                            required
                            min="0"
                            value={room.pricePerNight}
                            onChange={handleChange}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-4 py-3 transition-colors"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">FCFA</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                          Capacité (personnes)*
                        </label>
                        <input 
                          type="number" 
                          name="capacity" 
                          id="capacity" 
                          required
                          min="1"
                          value={room.capacity}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-4 py-3 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right column - Image */}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        URL de l'image*
                      </label>
                      <div className="flex">
                        <div className="relative flex-grow">
                          <input 
                            type="url" 
                            name="imageUrl" 
                            id="imageUrl" 
                            required
                            value={room.imageUrl}
                            onChange={handleChange}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm pl-4 pr-10 py-3 transition-colors"
                            placeholder="https://exemple.com/image.jpg"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <Image size={18} className="text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {room.imageUrl && (
                      <div className="mt-4">
                        <p className="block text-sm font-medium text-gray-700 mb-2">Aperçu de l'image:</p>
                        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                          <img 
                            src={room.imageUrl} 
                            alt="Aperçu" 
                            className="h-full w-full object-cover"
                            onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=Image+non+valide"}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">L'image sera affichée en haut de la fiche de la chambre</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end space-x-4">
                  <Link
                    href="/dashboard/rooms"
                    className="px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                  >
                    Annuler
                  </Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className={`px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors flex items-center ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <Save size={18} className="mr-2" />
                    {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </button>
                </div>
              </form>
            </div>

            {/* Tips card */}
            <div className="mt-8 bg-blue-50 rounded-xl p-4 border border-blue-200 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Conseils pour une bonne description</h3>
                  <div className="mt-1 text-sm text-blue-700">
                    <p>Assurez-vous d'inclure les éléments importants comme la vue, la superficie, les équipements et les services inclus pour donner une image claire aux clients.</p>
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