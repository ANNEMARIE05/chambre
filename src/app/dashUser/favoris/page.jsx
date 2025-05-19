import { 
     Heart
  } from 'lucide-react';

export default function Favoris() {
    return(
        <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Mes favoris</h2>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                      <Heart className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun favori</h3>
                      <p className="mt-1 text-sm text-gray-500">Ajoutez des chambres à vos favoris pour les retrouver facilement.</p>
                      <div className="mt-6">
                        <button
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Découvrir les chambres
                        </button>
                      </div>
                    </div>
                  </div>
    )
}