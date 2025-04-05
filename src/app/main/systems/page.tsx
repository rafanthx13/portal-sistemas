'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

// Interface para o sistema
interface System {
  id: string;
  name: string;
  url: string;
  icon: string;
  category: string;
  tags: string[];
  responsible: string;
  description: string;
  techStack: string;
  expirationDate?: string;
  dependencies?: string;
  status: 'Ativo' | 'Inativo';
  accessLevel: 'Público' | 'Restrito' | 'Específico por Departamento';
  createdAt: string;
}

export default function SystemsPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [systems, setSystems] = useState<System[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  // Carregar sistemas ao montar o componente
  useEffect(() => {
    fetchSystems();
  }, []);

  // Função para buscar sistemas
  const fetchSystems = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/systems', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao carregar sistemas');
      }

      setSystems(data);

      // Extrair categorias únicas para o filtro
      const uniqueCategories = Array.from(new Set(data.map((system: System) => system.category))) as string[];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Erro ao carregar sistemas:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao carregar os sistemas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para excluir um sistema
  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este sistema?')) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:8000/systems/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao excluir sistema');
      }

      // Atualizar a lista de sistemas
      setSystems(prev => prev.filter(system => system.id !== id));
    } catch (err) {
      console.error('Erro ao excluir sistema:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao excluir o sistema. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar sistemas com base na pesquisa e categoria
  const filteredSystems = systems.filter(system => {
    const matchesSearch = system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         system.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         system.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === '' || system.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Portal de Sistemas</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/main')}
                className="text-gray-600 hover:text-gray-800"
              >
                Voltar
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Sistemas</h2>
              <button
                onClick={() => router.push('/main/systems/new')}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                Novo Sistema
              </button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {/* Filtros */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Pesquisar
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nome, descrição ou tags"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Filtrar por Categoria
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Todas as categorias</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lista de Sistemas */}
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredSystems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum sistema encontrado.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nível de Acesso
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSystems.map(system => (
                      <tr key={system.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-primary-100 rounded-md">
                              <span className="text-primary-600 text-lg">{system.icon}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{system.name}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{system.url}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {system.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            system.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {system.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {system.accessLevel}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => router.push(`/main/systems/${system.id}`)}
                            className="text-primary-600 hover:text-primary-900 mr-4"
                          >
                            Ver
                          </button>
                          <button
                            onClick={() => router.push(`/main/systems/${system.id}/edit`)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(system.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
