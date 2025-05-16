import Link from "next/link";

export default function Login() {
    return (
        <div
            className="min-h-screen bg-center flex items-center justify-center p-6 text-gray-800 bg-cover"
            style={{ backgroundImage: `url("https://img.freepik.com/photos-gratuite/chambre-luxe-style-moderne-interieur-chambre-hotel-illustration-ia-generative_1258-151612.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740")`}}
        >
        <div className="w-full max-w-md mx-auto rounded-lg shadow-lg bg-white p-8 space-y-6">
          <div className="text-center">
              <Link href="/"><h2 className="text-3xl font-bold text-gray-800 mb-2">Reserve Chambre</h2></Link>
            <p className="text-gray-600">
                Pas de compte ?{" "}
              <Link href="/register" className="text-purple-600 hover:text-purple-800">S'inscrire ici</Link>
            </p>
          </div>
  
          <form className="space-y-4">
  
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg border-gray-200"
                placeholder="Entrer votre email"
              />
            </div>
  
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg border-gray-200"
                placeholder="Entrer votre mot de passe"
              />
            </div>

            <Link href="/userpage">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                Se connecter
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
  