'use client'

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, 
  Menu, X, User, Calendar, Users, ArrowLeft, Camera
} from 'lucide-react';

export default function EditRoom({ params }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
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
    
    setTimeout(() => {
      console.log('Room updated:', room);
      setSaving(false);
      router.push('/dashboard/rooms');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-slate-900 bg-opacity-70 backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-gradient-to-br from-indigo-900 to-blue-800 shadow-xl transform transition-all ease-in-out duration-300">
          <div className="flex items-center justify-between h-16 px-6 border-b border-indigo-700/50">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Home size={15} className="text-indigo-700" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">
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
              <MobileSidebarItem icon={<Users size={20} />} text="Clients" href="/dashboard/clients" />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
              <MobileSidebarItem icon={<Calendar size={20} />} text="Réservations" href="/dashboard/orders/create" />
              <MobileSidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
            </div>
          </nav>
          <div className="flex-shrink-0 flex border-t border-indigo-700/30 p-4">
            <button
              onClick={() => router.push('/login')}
              className="flex items-center text-white hover:text-gray-200 transition-colors w-full rounded-lg hover:bg-white/10 p-2"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72">
          <div className={`flex flex-col h-0 flex-1 bg-gradient-to-br from-indigo-900 to-blue-800 shadow-lg transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-indigo-700/50">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Home size={15} className="text-indigo-700" />
                </div>
                <h1 className="ml-3 text-xl font-bold text-white">
                  Maison d'hôte
                </h1>
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center bg-white/10 rounded-xl p-4 border border-white/10 shadow-xl">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <User size={18} className="text-indigo-700" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Admin</p>
                    <p className="text-xs text-indigo-200">Propriétaire</p>
                  </div>
                </div>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                <SidebarItem icon={<Home size={18} />} text="Dashboard" href="/dashboard" />
                <SidebarItem icon={<List size={18} />} text="Mes Chambres" href="/dashboard/rooms" active={true} />
                <SidebarItem icon={<PlusCircle size={18} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
                <SidebarItem icon={<Users size={18} />} text="Clients" href="/dashboard/clients" />
                <SidebarItem icon={<ShoppingBag size={18} />} text="Commandes" href="/dashboard/orders" />
                <SidebarItem icon={<Calendar size={18} />} text="Réservations" href="/dashboard/orders/create" />
                <SidebarItem icon={<Settings size={18} />} text="Paramètres" href="/dashboard/settings" />
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-indigo-700/30 p-4">
              <button
                onClick={() => router.push('/login')}
                className="flex items-center text-white hover:text-gray-200 transition-colors group w-full rounded-lg hover:bg-white/10 p-2"
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
        <div className={`relative z-10 flex-shrink-0 flex h-16 bg-white shadow transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <button className="p-2.5 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1 ring-2 ring-white"></span>
              </button>
              <div className="bg-indigo-600 text-white pl-3 pr-4 py-1.5 rounded-full flex items-center shadow-lg hover:bg-indigo-700 transition-colors">
                <div className="w-6 h-6 rounded-full bg-white text-indigo-600 flex items-center justify-center mr-2 shadow-sm">
                  <User size={14} />
                </div>
                <span className="text-sm font-medium">Propriétaire</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className={`flex-1 relative overflow-y-auto focus:outline-none p-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="sm:px-0 max-w-4xl mx-auto">
            <div className="bg-white shadow rounded-xl overflow-hidden">
              {/* Heading with image */}
              <div className="relative h-48 bg-indigo-900">
                <div className="absolute inset-0 overflow-hidden">
                  {room.imageUrl && (
                    <img 
                      src={room.imageUrl} 
                      alt={room.name}
                      className="w-full h-full object-cover opacity-50"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-blue-900/80"></div>
                </div>
                <div className="absolute top-4 left-4">
                  <Link
                    href="/dashboard/rooms"
                    className="flex items-center text-white bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-lg backdrop-blur-sm"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Retour
                  </Link>
                </div>
                <div className="absolute bottom-4 left-6">
                  <h1 className="text-3xl font-bold text-white">Modifier la chambre</h1>
                  <p className="text-indigo-100 mt-1">#{room.id} - {room.name}</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
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
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm px-4 py-2.5"
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
                      rows="3" 
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm px-4 py-2.5"
                      placeholder="Décrivez les caractéristiques de la chambre"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm px-4 py-2.5 pl-10"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">F</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                        Capacité (personnes)*
                      </label>
                      <div className="relative">
                        <input 
                          type="number" 
                          name="capacity" 
                          id="capacity" 
                          required
                          min="1"
                          value={room.capacity}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm px-4 py-2.5 pl-10"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Users size={16} className="text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      URL de l'image*
                    </label>
                    <div className="relative">
                      <input 
                        type="url" 
                        name="imageUrl" 
                        id="imageUrl" 
                        required
                        value={room.imageUrl}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm px-4 py-2.5 pl-10"
                        placeholder="https://exemple.com/image.jpg"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Camera size={16} className="text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {room.imageUrl && (
                    <div className="mt-2">
                      <p className="block text-sm font-medium text-gray-700 mb-2">Aperçu de l'image:</p>
                      <div className="h-48 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                        <img 
                          src={room.imageUrl} 
                          alt="Aperçu" 
                          className="h-full w-full object-cover"
                          onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=Image+non+valide"}
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
                    <Link
                      href="/dashboard/rooms"
                      className="px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      Annuler
                    </Link>
                    <button
                      type="submit"
                      disabled={saving}
                      className={`px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {saving ? (
                        <span className="flex items-center">
                          <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                          Enregistrement...
                        </span>
                      ) : 'Enregistrer les modifications'}
                    </button>
                  </div>
                </div>
              </form>
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
      className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ${
        active 
          ? 'bg-white text-indigo-700 shadow-md' 
          : 'text-indigo-100 hover:bg-white/10 hover:text-white'
      }`}
    >
      <div className={`mr-3 p-1.5 rounded-md transition-colors ${active ? 'bg-indigo-100/20' : 'group-hover:bg-white/10 bg-transparent'}`}>
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
      className={`group flex items-center px-3 py-2.5 text-base font-medium rounded-lg transition-all duration-150 ${
        active 
          ? 'bg-white text-indigo-700 shadow-md' 
          : 'text-indigo-100 hover:bg-white/10 hover:text-white'
      }`}
    >
      <div className={`mr-3 p-1.5 rounded-md transition-colors ${active ? 'bg-indigo-100/20' : 'group-hover:bg-white/10 bg-transparent'}`}>
        {icon}
      </div>
      {text}
    </Link>
  );
}