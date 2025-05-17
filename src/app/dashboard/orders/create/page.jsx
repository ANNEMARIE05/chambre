'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, Menu, X, Calendar } from 'lucide-react';

export default function CreateOrder() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      available: true
    },
    {
      id: 2,
      name: "Suite Familiale",
      pricePerNight: 200,
      capacity: 4,
      available: true
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
    // Dans une application réelle, on enverrait les données à l'API
    alert("Commande créée avec succès !");
    router.push('/dashboard/orders');
  };

  // Calcul du prix total
  const calculateTotalPrice = () => {
    if (!formData.roomId || !formData.checkInDate || !formData.checkOutDate) return 0;
    
    const room = rooms.find(r => r.id === parseInt(formData.roomId));
    if (!room) return 0;
    
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    return nights * room.pricePerNight;
  };

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
              <MobileSidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" />
              <MobileSidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
              <MobileSidebarItem icon={<ShoppingBag size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" active={true} />
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
                <SidebarItem icon={<List size={20} />} text="Mes Chambres" href="/dashboard/rooms" />
                <SidebarItem icon={<PlusCircle size={20} />} text="Ajouter Chambre" href="/dashboard/rooms/add" />
                <SidebarItem icon={<ShoppingBag size={20} />} text="Commandes" href="/dashboard/orders" />
                <SidebarItem icon={<ShoppingBag size={20} />} text="Nouvelle Commande" href="/dashboard/orders/create" active={true} />
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
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Créer une nouvelle commande</h1>
                <p className="mt-1 text-sm text-gray-500">Remplissez les informations ci-dessous pour créer une nouvelle réservation</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section informations client */}
                <div className="rounded-md">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Informations du client</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Nom complet</label>
                      <input
                        type="text"
                        name="clientName"
                        id="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-3 py-2"
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
                        className="mt-1 px-4 py-3 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                        className="mt-1 px-4 py-3 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Section détails de la réservation */}
                <div className="rounded-md">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Détails de la réservation</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="roomId" className="block text-sm font-medium text-gray-700">Chambre</label>
                      <select
                        name="roomId"
                        id="roomId"
                        value={formData.roomId}
                        onChange={handleChange}
                        required
                        className="mt-1 px-4 py-3 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Sélectionnez une chambre</option>
                        {rooms.map(room => (
                          <option key={room.id} value={room.id} disabled={!room.available}>
                            {room.name} - {room.pricePerNight}€/nuit - Max: {room.capacity} pers.
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700">Nombre de personnes</label>
                      <input
                        type="number"
                        name="numberOfGuests"
                        id="numberOfGuests"
                        min="1"
                        max="10"
                        value={formData.numberOfGuests}
                        onChange={handleChange}
                        required
                        className="mt-1 px-4 py-3 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
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
                          className="focus:ring-purple-500 focus:border-purple-500 p-3 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
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
                          className="focus:ring-purple-500 focus:border-purple-500 p-3 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
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
                        className="mt-1 px-4 py-3 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Précisez toute demande spéciale pour cette réservation..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Section paiement */}
                <div className="rounded-md">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Informations de paiement</h2>
                  <div className="space-y-4">
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between">
                        <span className="text-base font-medium text-gray-900">Prix total (estimé)</span>
                        <span className="text-base font-medium text-gray-900">{calculateTotalPrice()} €</span>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Le prix final sera calculé en fonction de la durée exacte du séjour.</p>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex justify-end space-x-3">
                  <Link
                    href="/dashboard/orders"
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Annuler
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Créer la commande
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