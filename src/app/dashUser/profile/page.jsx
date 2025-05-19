'use client';

import { useState } from 'react';
import { CreditCard } from 'lucide-react';

export default function Profile() {
  const [fullName, setFullName] = useState('Jean Dupont');
  const [email, setEmail] = useState('jean.dupont@exemple.com');
  const [phone, setPhone] = useState('+33 6 12 34 56 78');
  const [language, setLanguage] = useState('Français');
  const [currency, setCurrency] = useState('EUR (€)');
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-800">Mon profil</h2>

      {/* Profil */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-6 mb-6">
            <div className="h-24 w-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{fullName}</h3>
              <p className="text-gray-600">{email}</p>
              <p className="text-gray-600">{phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Infos personnelles */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Informations personnelles</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Préférences */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Préférences</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Langue</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    <option>Français</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Devise</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    <option>EUR (€)</option>
                    <option>USD ($)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <div className="flex items-center mt-4">
                  <input
                    id="newsletter"
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                    Recevoir les offres et promotions par email
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>

      {/* Moyens de paiement */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Moyens de paiement</h4>
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-16 bg-blue-100 rounded flex items-center justify-center mr-4">
                <CreditCard className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Visa se terminant par 4242</p>
                <p className="text-sm text-gray-500">Expire le 12/2026</p>
              </div>
            </div>
            <button className="text-indigo-600 hover:text-indigo-800">Modifier</button>
          </div>

          <button className="mt-4 text-indigo-600 hover:text-indigo-800 flex items-center">
            <span className="mr-2">Ajouter un nouveau moyen de paiement</span>
            <CreditCard size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
