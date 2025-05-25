'use client'

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, LogOut, Home, PlusCircle, ShoppingBag, List, Settings, 
  Menu, X, User, Calendar, Users, ArrowLeft, Save, Image
} from 'lucide-react';


export default function Detais({ params }) {
  const router = useRouter();
  const { id } = use(params);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [room, setRoom] = useState(null);
  

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
  return(
    <>
        <h1>{id}</h1>

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
    </>
  )
}
