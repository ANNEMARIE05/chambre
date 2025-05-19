'use client'

import { 
  Calendar
} from 'lucide-react';

export default function Booking() {
  const bookings = [
    {
      id: 1,
      roomName: "Suite Royale",
      startDate: "2025-05-22",
      endDate: "2025-05-25",
      status: "confirmée",
      price: 660
    },
    {
      id: 2,
      roomName: "Chambre Élégance",
      startDate: "2025-06-15",
      endDate: "2025-06-20",
      status: "en attente",
      price: 600
    }
  ];
    return(
        <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Mes réservations</h2>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center">
                <Calendar size={18} className="mr-2" />
                Nouvelle réservation
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Chambre</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Dates</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Prix</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Statut</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{booking.roomName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{booking.price}€</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            booking.status === 'confirmée' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <button className="text-indigo-600 hover:text-indigo-900">Détails</button>
                            {booking.status === 'en attente' && (
                              <button className="text-red-600 hover:text-red-900">Annuler</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {bookings.length === 0 && (
                <div className="py-12 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune réservation</h3>
                  <p className="mt-1 text-sm text-gray-500">Commencez par créer une nouvelle réservation.</p>
                  <div className="mt-6">
                    <button
                      onClick={() => setActiveTab('rooms')}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Calendar className="-ml-1 mr-2 h-5 w-5" />
                      Réserver une chambre
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
    )
}