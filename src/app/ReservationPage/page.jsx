import Link from "next/link";

export default function ReservationPage() {
    const chambre = {
        disponible: "Indisponible",
        titre: "Chambre Deluxe",
        description: "2 lits doubles, climatisation, TV écran plat, petit-déjeuner inclus, WiFi gratuit.",
        prix: 45000,
        image: "https://img.freepik.com/photos-premium/type-chambre-deluxe-pool-side-hotel-suvarnabhumi-ville_41418-2020.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
        reservations: [
            { debut: "2025-05-20", fin: "2025-05-22" }, 
            { debut: "2025-06-01", fin: "2025-06-03" },
        ],
    };
    
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4">
        <div className="mx-auto container max-w-7xl flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-purple-600">Reserve Chambre</h1>
          <nav className="space-x-6 text-gray-700 font-medium">
            <Link href="/userpage" className="text-purple-600 font-semibold hover:text-purple-700">Accueil</Link>
            <Link href="/commandesUser" className="hover:text-purple-600 transition">Mes commandes</Link>
          </nav>
          <div className='flex space-x-2'>
            <Link href="/login" className="text-red-500 mt-2">Déconnexion</Link>
            <Link href="/reserver">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 animate-pulse">
                    Commander
                </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto container max-w-7xl px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex p-12">
          <img src={chambre.image} alt={chambre.titre} className="w-full md:w-1/2 rounded-lg object-cover" />
          <div className="p-6 md:w-1/2">
            <span className="text-md text-red-500 line-through">{chambre.disponible}</span>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{chambre.titre}</h2>
            <p className="text-gray-600 mb-4">{chambre.description}</p>
            <p className="text-lg font-bold text-purple-600 mb-6">{chambre.prix} FCFA / nuit</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date de début</label>
              <input
                type="date"
                className="mt-1 w-full p-2 border rounded-md border-gray-300"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Date de fin</label>
              <input
                type="date"
                className="mt-1 w-full p-2 border rounded-md border-gray-300"
              />
            </div>

            <button
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Réserver la chambre
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
