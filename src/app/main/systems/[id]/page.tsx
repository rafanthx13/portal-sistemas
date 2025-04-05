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

export default function SystemDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { token } = useAuth();
  const [system, setSystem] = useState<System | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Carregar detalhes do sistema ao montar o componente
  useEffect(() => {
    fetchSystemDetails();
  }, [params.id]);

  // Função para buscar detalhes do sistema
  const fetchSystemDetails = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:8000/systems/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao carregar detalhes do sistema');
      }

      setSystem(data);
    } catch (err) {
      console.error('Erro ao carregar detalhes do sistema:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao carregar os detalhes do sistema. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !system) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <div className="text-red-600 mb-4">
              {error || 'Sistema não encontrado'}
            </div>
            <button
              onClick={() => router.push('/main/systems')}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Voltar para Lista de Sistemas
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Portal de Sistemas</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/main/systems')}
                className="text-gray-600 hover:text-gray-800"
              >
                Voltar
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Cabeçalho do Sistema */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-primary-100 rounded-md">
                    <span className="text-primary-600 text-2xl">{system.icon}</span>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{system.name}</h2>
                    <p className="text-sm text-gray-500">{system.url}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    system.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {system.status}
                  </span>
                  <button
                    onClick={() => router.push(`/main/systems/${system.id}/edit`)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                  >
                    Editar Sistema
                  </button>
                </div>
              </div>
            </div>

            {/* Detalhes do Sistema */}
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informações Básicas */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Básicas</h3>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Categoria</dt>
                      <dd className="mt-1 text-sm text-gray-900">{system.category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Tags</dt>
                      <dd className="mt-1 flex flex-wrap gap-2">
                        {system.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Nível de Acesso</dt>
                      <dd className="mt-1 text-sm text-gray-900">{system.accessLevel}</dd>
                    </div>
                  </dl>
                </div>

                {/* Responsabilidade e Função */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Responsabilidade e Função</h3>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Responsável</dt>
                      <dd className="mt-1 text-sm text-gray-900">{system.responsible}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Descrição</dt>
                      <dd className="mt-1 text-sm text-gray-900">{system.description}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Stack Tecnológica</dt>
                      <dd className="mt-1 text-sm text-gray-900">{system.techStack}</dd>
                    </div>
                  </dl>
                </div>

                {/* Metadados e Estado */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Metadados e Estado</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Data de Criação</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(system.createdAt).toLocaleDateString('pt-BR')}
                      </dd>
                    </div>
                    {system.expirationDate && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Data de Expiração</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {new Date(system.expirationDate).toLocaleDateString('pt-BR')}
                        </dd>
                      </div>
                    )}
                    {system.dependencies && (
                      <div className="md:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Dependências</dt>
                        <dd className="mt-1 text-sm text-gray-900">{system.dependencies}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
