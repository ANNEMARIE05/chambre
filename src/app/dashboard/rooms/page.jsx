'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, Menu, X } from 'lucide-react';

export default function RoomsList() {
      const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Chambre Deluxe",
      description: "Une chambre spacieuse avec vue sur le jardin",
      pricePerNight: 120,
      capacity: 2,
      imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
    },
    {
      id: 2,
      name: "Suite Familiale",
      description: "Parfaite pour les familles, avec deux chambres communicantes",
      pricePerNight: 200,
      capacity: 4,
      imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    }
  ]);

  const deleteRoom = (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette chambre ?")) {
      // Dans une vraie application, une requête API serait effectuée ici
      setRooms(rooms.filter(room => room.id !== id));
    }
  };
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                <SidebarItem icon={<Home size={20} />} text="Dashboard" href="/dashboard"  />
                <SidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" active={true}/>
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
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Mes chambres</h1>
              <Link
                href="/dashboard/rooms/add"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Ajouter une chambre
              </Link>
            </div>

            {rooms.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Vous n'avez encore aucune chambre.</p>
                <Link
                  href="/dashboard/rooms/add"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Ajouter votre première chambre
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chambre
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix / nuit
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacité
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rooms.map((room) => (
                      <tr key={room.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-md object-cover" src={room.imageUrl} alt={room.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{room.name}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{room.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{room.pricePerNight} €</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{room.capacity} personnes</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/dashboard/rooms/${room.id}`}
                            className="text-purple-600 hover:text-purple-900 mr-4"
                          >
                            Modifier
                          </Link>
                          <button
                            onClick={() => deleteRoom(room.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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



