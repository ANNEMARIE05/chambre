import Link from "next/link";


export default function Reserver() {
    const chambres = [
        {
          id: 1,
          nom: "Chambre Standard",
          prix: 30000,
          image: "https://img.freepik.com/photos-premium/chambres-hotel-modernes-elegantes_1417-8488.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
        },
        {
          id: 2,
          nom: "Chambre Deluxe",
          prix: 45000,
          image: "https://img.freepik.com/photos-premium/chambres-hotel-modernes-elegantes_1417-8488.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
        },
        {
          id: 3,
          nom: "Suite Présidentielle",
          prix: 80000,
          image: "https://img.freepik.com/photos-premium/chambres-hotel-modernes-elegantes_1417-8488.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740",
        },
    ];
      

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
        <div className="p-10">

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10 text-purple-600">Réserver une chambre</h2>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Choisir une chambre :</label>
                    <select className="w-full p-2 border rounded-md border-gray-300">
                        {chambres.map((chambre) => (
                        <option key={chambre.id} value={chambre.id}>
                            {chambre.nom} — {chambre.prix} FCFA / nuit
                        </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <img
                    src="https://img.freepik.com/photos-premium/chambres-hotel-modernes-elegantes_1417-8488.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740"
                    alt="chambre"
                    className="w-full h-[400px] rounded-md shadow-md"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block font-medium mb-1">Date de début :</label>
                    <input
                    type="date"
                    className="w-full p-2 border rounded-md border-gray-300"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Date de sortie :</label>
                    <input
                    type="date"
                    className="w-full p-2 border rounded-md border-gray-300"
                    />
                </div>
                </div>

                <div className="text-center text-lg font-semibold text-gray-700">
                    Prix total :{" "}
                    <span className="text-purple-600">
                        
                    </span>
                </div>

                <div className="mt-6 text-center">
                    <button
                        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg shadow"
                    >
                        Réserver
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
