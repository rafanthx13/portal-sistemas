'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MainPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Portal de Sistemas</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Olá, {user?.email}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card de Sistemas */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Sistemas</h2>
                <span className="text-2xl">🖥️</span>
              </div>
              <p className="text-gray-600 mb-4">
                Gerencie todos os sistemas disponíveis no portal, incluindo cadastro, edição e remoção.
              </p>
              <button
                onClick={() => router.push('/main/systems')}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                Acessar Sistemas
              </button>
            </div>

            {/* Card de Usuários */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Usuários</h2>
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-gray-600 mb-4">
                Gerencie os usuários do portal, incluindo permissões e níveis de acesso.
              </p>
              <button
                onClick={() => router.push('/main/users')}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                Acessar Usuários
              </button>
            </div>

            {/* Card de Relatórios */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Relatórios</h2>
                <span className="text-2xl">📊</span>
              </div>
              <p className="text-gray-600 mb-4">
                Visualize relatórios e estatísticas sobre o uso dos sistemas e usuários.
              </p>
              <button
                onClick={() => router.push('/main/reports')}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                Acessar Relatórios
              </button>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
