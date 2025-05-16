import Link from 'next/link';

const chambres = [
  {
    titre: "Chambre Deluxe",
    description: "2 lits doubles, climatisation, TV écran plat, petit-déjeuner inclus, WiFi gratuit.",
    image: "https://img.freepik.com/photos-premium/chambres-hotel-modernes-elegantes_1417-8488.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    prix: "45 000 FCFA / nuit",
  },
  {
    titre: "Suite Familiale",
    description: "2 lits doubles, climatisation, TV écran plat, petit-déjeuner inclus, WiFi gratuit.",
    image: "https://img.freepik.com/photos-gratuite/chambre-hotel-dans-complexe-luxe_53876-138105.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    prix: "70 000 FCFA / Jour",
  },
  {
    titre: "Studio Confort",
    description: "2 lits doubles, climatisation, TV écran plat, petit-déjeuner inclus, WiFi gratuit.",
    image: "https://img.freepik.com/photos-gratuite/interieur-moderne-confortable-chambre-hotel_1232-1822.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    prix: "60 000 FCFA / nuit",
  },
  {
    titre: "Chambre Économique",
    description: "2 lits doubles, climatisation, TV écran plat, petit-déjeuner inclus, WiFi gratuit.",
    image: "https://img.freepik.com/photos-gratuite/petit-interieur-chambre-hotel-lit-double-salle-bain_1262-12489.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    prix: "30 000 FCFA / nuit",
  },{
    titre: "Studio Confort",
    description: "2 lits doubles, climatisation, TV écran plat, petit-déjeuner inclus, WiFi gratuit.",
    image: "https://img.freepik.com/photos-premium/rendering-3d-magnifique-suite-chambre-luxe-contemporaine-dans-hotel-television_1029473-137979.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    prix: "60 000 FCFA / Jour",
  },
  {
    titre: "Chambre Économique",
    description: "2 lits doubles, climatisation, TV écran plat, petit-déjeuner inclus, WiFi gratuit.",
    image: "https://img.freepik.com/photos-gratuite/interieur-moderne-confortable-chambre-hotel_1232-1823.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
    prix: "30 000 FCFA / nuit",
  }
];

export default function UserPage() {
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
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Chambres disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chambres.map((room, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <img
                src={room.image}
                alt={room.titre}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{room.titre}</h3>
                <p className="text-gray-600 mt-2">{room.description}</p>
                <div className="mt-4 text-lg text-purple-600 font-semibold">{room.prix}</div>
                <Link href="/ReservationPage">
                    <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300">
                        Détail
                    </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
