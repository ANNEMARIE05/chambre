'use client'

import { 
  Coffee, Utensils, Wifi, Car, Map, ChevronRight,Search, Star
} from 'lucide-react';

export default function Rooms() {

  const rooms = [
    {
      id: 1,
      name: "Chambre Élégance",
      price: 120,
      rating: 4.8,
      image: "/api/placeholder/600/400",
      description: "Une chambre spacieuse et élégante avec vue sur le jardin",
      amenities: ["wifi", "breakfast", "parking"],
      available: true
    },
    {
      id: 2,
      name: "Suite Royale",
      price: 220,
      rating: 4.9,
      image: "/api/placeholder/600/400",
      description: "Suite luxueuse avec salon privé et balcon panoramique",
      amenities: ["wifi", "breakfast", "parking", "restaurant"],
      available: true
    },
    {
      id: 3,
      name: "Chambre Confort",
      price: 95,
      rating: 4.6,
      image: "/api/placeholder/600/400",
      description: "Chambre confortable pour un séjour agréable",
      amenities: ["wifi", "parking"],
      available: false
    }
  ];

  // Fonction pour afficher l'icône appropriée pour les commodités
  const getAmenityIcon = (amenity) => {
    switch(amenity) {
      case 'wifi': return <Wifi size={16} />;
      case 'breakfast': return <Coffee size={16} />;
      case 'restaurant': return <Utensils size={16} />;
      case 'parking': return <Car size={16} />;
      default: return null;
    }
  };

  return(
<div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Chambres disponibles</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher une chambre..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map(room => (
                <div key={room.id} className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${!room.available ? 'opacity-60' : ''}`}>
                  <div className="relative">
                    <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
                    <div className="absolute top-3 right-3 flex items-center space-x-2">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow">
                        <Star size={16} className="text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{room.rating}</span>
                      </div>
                    </div>
                    {!room.available && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transform -rotate-12 scale-110">
                          Non disponible
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-800">{room.name}</h3>
                      <div className="text-lg font-bold text-indigo-600">{room.price}€<span className="text-xs text-gray-500">/nuit</span></div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{room.description}</p>
                    <div className="flex items-center mt-4 space-x-3">
                      {room.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs">
                          {getAmenityIcon(amenity)}
                          <span className="ml-1 capitalize">{amenity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5">
                      <button
                        disabled={!room.available}
                        className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center ${
                          room.available 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {room.available ? 'Réserver maintenant' : 'Non disponible'}
                        {room.available && <ChevronRight size={18} className="ml-1" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}