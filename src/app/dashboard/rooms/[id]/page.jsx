'use client'

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, Menu, X } from 'lucide-react';

export default function EditRoom({ params }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [room, setRoom] = useState(null);

  // Dans une vraie application, ces données viendraient d'une API
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar pour mobile (hidden par défaut) */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-purple-800 shadow-xl">
          <div className="flex items-center justify-between h-16 px-6 bg-purple-900">
            <span className="font-bold text-xl text-white">Maison d'hôte</span>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto pt-5 pb-4">
            <div className="px-2 space-y-1">
              <MobileSidebarItem icon={<Home size={20} />} text="Dashboard" href="/dashboard" />
              <MobileSidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" active={true} />
              <MobileSidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" />
              <MobileSidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
            </div>
          </nav>
          <div className="flex-shrink-0 flex border-t border-purple-700 p-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-white hover:text-gray-200"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-purple-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-purple-900">
              <span className="font-bold text-xl text-white">Maison d'hôte</span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-2">
                <SidebarItem icon={<Home size={20} />} text="Dashboard" href="/dashboard" />
                <SidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" active={true} />
                <SidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
                <SidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
                <SidebarItem icon={<ShoppingBag size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" />
                <SidebarItem icon={<Settings size={20} />} text="Paramètres" href="/dashboard/settings" />
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-purple-700 p-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center text-white hover:text-gray-200"
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
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
          <button
            type="button"
            className="px-4 text-gray-500 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900 ml-4">Dashboard</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <Bell size={20} />
              </button>
              <div className="ml-3">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Propriétaire
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-3">
            <div className="sm:px-0">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Modifier la chambre</h1>
                <Link
                    href="/dashboard/rooms"
                    className="text-purple-600 hover:text-purple-800"
                >
                    Retour à la liste
                </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom de la chambre*
                    </label>
                    <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    required
                    value={room.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-3 py-2"
                    placeholder="Ex: Chambre Deluxe"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description*
                    </label>
                    <textarea 
                    name="description" 
                    id="description" 
                    required
                    value={room.description}
                    onChange={handleChange}
                    rows="3" 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-3 py-2"
                    placeholder="Décrivez les caractéristiques de la chambre"
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700">
                        Prix par nuit (FCFA)*
                    </label>
                    <input 
                        type="number" 
                        name="pricePerNight" 
                        id="pricePerNight" 
                        required
                        min="0"
                        value={room.pricePerNight}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-3 py-2"
                    />
                    </div>

                    <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-3 py-2"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                    URL de l'image*
                    </label>
                    <input 
                    type="url" 
                    name="imageUrl" 
                    id="imageUrl" 
                    required
                    value={room.imageUrl}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-3 py-2"
                    placeholder="https://exemple.com/image.jpg"
                    />
                </div>

                {room.imageUrl && (
                    <div className="mt-2">
                    <p className="block text-sm font-medium text-gray-700 mb-1">Aperçu de l'image:</p>
                    <div className="h-40 w-64 rounded-md overflow-hidden">
                        <img 
                        src={room.imageUrl} 
                        alt="Aperçu" 
                        className="h-full w-full object-cover"
                        onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=Image+non+valide"}
                        />
                    </div>
                    </div>
                )}

                <div className="flex justify-end">
                    <Link
                    href="/dashboard/rooms"
                    className="mr-4 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                    Annuler
                    </Link>
                    <button
                    type="submit"
                    disabled={saving}
                    className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                    {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>
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
      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        active 
          ? 'bg-purple-900 text-white' 
          : 'text-purple-100 hover:bg-purple-700 hover:text-white'
      }`}
    >
      <div className="mr-3">{icon}</div>
      {text}
    </Link>
  );
}

function MobileSidebarItem({ icon, text, href, active = false }) {
  return (
    <Link
      href={href}
      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
        active 
          ? 'bg-purple-900 text-white' 
          : 'text-purple-100 hover:bg-purple-700 hover:text-white'
      }`}
    >
      <div className="mr-4">{icon}</div>
      {text}
    </Link>
  );
}
