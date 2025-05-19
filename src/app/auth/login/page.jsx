"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, EyeOff, UserIcon, Lock, LogIn, Home, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animateBackground, setAnimateBackground] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animation au chargement de la page
  useEffect(() => {
    setAnimateBackground(true);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simuler un temps de chargement
    setTimeout(() => {
      setLoading(false);
      // Redirection vers dashUser après le chargement
      router.push("/dashUser");
    }, 1500);
  };

  return (
    <div
      className={`min-h-screen bg-center flex items-center justify-center p-6 bg-cover relative overflow-hidden transition-all duration-1000 ${
        animateBackground ? "bg-opacity-100" : "bg-opacity-0"
      }`}
      style={{
        backgroundImage: `url("https://img.freepik.com/photos-premium/rendering-3d-magnifique-suite-chambre-luxe-contemporaine-dans-hotel-television_1029473-137979.jpg?uid=R99967860&ga=GA1.1.295640253.1746478949&semt=ais_hybrid&w=740")`,
      }}
    >
      {/* Overlay animé */}
      <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-1000 ${
        animateBackground ? "opacity-100" : "opacity-0"
      }`}></div>

      {/* Éléments décoratifs animés */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-600 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-60 h-60 bg-pink-600 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className={`w-full max-w-md relative z-10 mx-auto rounded-2xl shadow-2xl bg-white/90 p-8 space-y-6 backdrop-blur-md transition-all duration-700 transform ${
        animateBackground ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}>
        {/* Logo et titre avec animation */}
        <Link href="/">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-14 w-14 bg-gradient-to-br from-purple-600 to-indigo-800 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
              <Home size={30} className="text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent hover:bg-size-200 animate-gradient">
              Maison d'hôte
            </h1>
          </div>
          <p className="mt-3 text-gray-600 italic opacity-80 font-light">
            Découvrez le confort et l'élégance
          </p>
        </div>
        </Link>

        {/* Formulaire de connexion */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1 group">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1 group-hover:text-purple-600 transition-colors">
              <Mail size={16} className="text-purple-600" />
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none group-hover:border-purple-300"
                placeholder="Entrez votre email"
                required
              />
            </div>
          </div>

          <div className="space-y-1 group">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-1 group-hover:text-purple-600 transition-colors">
              <Lock size={16} className="text-purple-600" />
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none group-hover:border-purple-300"
                placeholder="Entrez votre mot de passe"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-all cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer hover:text-purple-600 transition-colors">
                Se souvenir de moi
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className="text-purple-600 hover:text-purple-800 font-medium transition-colors relative group">
                Mot de passe oublié ?
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:-translate-y-0.5"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Connexion en cours...
              </div>
            ) : (
              <>
                <LogIn size={18} className="animate-pulse" />
                Se connecter
              </>
            )}
          </button>

          <Link href="/dashboard" className="block">
            <button
              type="button"
              className="w-full bg-gray-700 text-white py-3 mt-2 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg transform hover:-translate-y-0.5"
            >
              <UserIcon size={18} />
              Accès administrateur
            </button>
          </Link>
        </form>

        {/* Lien d'inscription avec animation */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            Pas encore de compte ?{" "}
            <Link href="/auth/register" className="text-purple-600 hover:text-purple-800 font-medium transition-colors relative inline-block group">
              S'inscrire ici
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Ajoutez ce style global dans votre fichier globals.css ou directement dans un balise style dans le layout
/* 
@layer utilities {
  .animate-blob {
    animation: blob-bounce 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
  
  .bg-size-200 {
    background-size: 200% 200%;
  }
  
  @keyframes blob-bounce {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}
*/