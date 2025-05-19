'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, 
  Menu, X, User, Calendar, DollarSign, TrendingUp, Star, Eye, 
  Users
} from 'lucide-react';

export default function RoomsList() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Chambre Deluxe",
      description: "Une chambre spacieuse avec vue sur le jardin",
      pricePerNight: 70000,
      capacity: 2,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
    },
    {
      id: 2,
      name: "Suite Familiale",
      description: "Parfaite pour les familles, avec deux chambres communicantes",
      pricePerNight: 60000,
      capacity: 4,
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    }
  ]);
  
  // Effet pour animer le chargement initial
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const initiateDeleteRoom = (id) => {
    setRoomToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteRoom = () => {
    // Dans une vraie application, une requête API serait effectuée ici
    setRooms(rooms.filter(room => room.id !== roomToDelete));
    setShowDeleteModal(false);
    setRoomToDelete(null);
  };

  const cancelDeleteRoom = () => {
    setShowDeleteModal(false);
    setRoomToDelete(null);
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
              <MobileSidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" active={true} />
              <MobileSidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
              <MobileSidebarItem icon={<Users size={20} />} text="Clients" href="/dashboard/clients" />
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
                <SidebarItem icon={<Users size={20} />} text="Clients" href="/dashboard/clients" />
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
          <div className="sm:px-0">
            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Mes chambres</h1>
                  <p className="text-gray-500 mt-1">Gérez vos chambres disponibles</p>
                </div>
                <Link
                  href="/dashboard/rooms/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Ajouter une chambre
                </Link>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-4 border border-violet-100 shadow-sm">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-violet-100 text-violet-600 mr-4">
                      <Home size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-violet-700 font-medium">Total des chambres</p>
                      <p className="text-2xl font-bold text-violet-900">{rooms.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100 shadow-sm">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-teal-100 text-teal-600 mr-4">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-teal-700 font-medium">Revenu mensuel</p>
                      <p className="text-2xl font-bold text-teal-900">255,400 FCFA</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100 shadow-sm">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-600 mr-4">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-amber-700 font-medium">Taux d'occupation</p>
                      <p className="text-2xl font-bold text-amber-900">68%</p>
                    </div>
                  </div>
                </div>
              </div>

              {rooms.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Home className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg mb-4">Vous n'avez encore aucune chambre.</p>
                  <Link
                    href="/dashboard/rooms/add"
                    className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Ajouter votre première chambre
                  </Link>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200">
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
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Note
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rooms.map((room, index) => (
                        <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12 relative rounded-lg overflow-hidden shadow-sm">
                                <img className="h-12 w-12 object-cover transition-transform duration-500 hover:scale-110" src={room.imageUrl} alt={room.name} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900">{room.name}</div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">{room.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{room.pricePerNight} FCFA</div>
                            <div className="text-xs text-gray-500">par nuit</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{room.capacity} personnes</div>
                            <div className="flex mt-1">
                              {Array.from({ length: room.capacity }).map((_, i) => (
                                <User key={i} size={12} className="text-gray-400 mr-0.5" />
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900 mr-2">{room.rating}</div>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={14} 
                                    className={i < Math.floor(room.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                                  />
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Link
                                href={`/dashboard/rooms/${room.id}`}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                              >
                                <Eye size={16} className="mr-1.5" />
                                Voir
                              </Link>
                              <button
                                onClick={() => initiateDeleteRoom(room.id)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md bg-red-50 text-sm font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                              >
                                <X size={16} className="mr-1.5" />
                                Supprimer
                              </button>
                            </div>
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

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={cancelDeleteRoom}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Supprimer cette chambre</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Êtes-vous sûr de vouloir supprimer cette chambre? Cette action est irréversible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDeleteRoom}
                >
                  Supprimer
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={cancelDeleteRoom}
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