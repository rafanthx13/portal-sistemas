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
  icon?: string;
  category?: string;
  tags: string[];
  responsible?: string;
  description?: string;
  techStack?: string;
  expirationDate?: string | null;
  dependencies?: string;
  status: 'Ativo' | 'Inativo';
  accessLevel: 'Público' | 'Restrito' | 'Específico por Departamento';
  createdAt: string;
}

export default function EditSystemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Estado do formulário
  const [formData, setFormData] = useState<Partial<System>>({
    name: '',
    url: '',
    icon: '',
    category: '',
    tags: [],
    responsible: '',
    description: '',
    techStack: '',
    expirationDate: null,
    dependencies: '',
    status: 'Ativo',
    accessLevel: 'Público'
  });

  // Carregar dados do sistema ao montar o componente
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

      setFormData(data);
    } catch (err) {
      console.error('Erro ao carregar detalhes do sistema:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao carregar os detalhes do sistema. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para lidar com mudanças nas tags
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess(false);

    // Remover campos vazios opcionais
    const dataToSubmit = {
      ...formData,
      icon: formData.icon || undefined,
      category: formData.category || undefined,
      responsible: formData.responsible || undefined,
      description: formData.description || undefined,
      techStack: formData.techStack || undefined,
      expirationDate: formData.expirationDate || null,
      dependencies: formData.dependencies || undefined,
    };

    try {
      const response = await fetch(`http://localhost:8000/systems/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSubmit)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar sistema');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/main/systems/${params.id}`);
      }, 2000);
    } catch (err) {
      console.error('Erro ao atualizar sistema:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao atualizar o sistema. Tente novamente.');
    } finally {
      setIsSaving(false);
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

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Portal de Sistemas</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push(`/main/systems/${params.id}`)}
                className="text-gray-600 hover:text-gray-800"
              >
                Voltar
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Editar Sistema</h2>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">
                Sistema atualizado com sucesso! Redirecionando...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações Básicas */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Básicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      maxLength={45}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                      URL *
                    </label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      maxLength={180}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                      Ícone
                    </label>
                    <input
                      type="text"
                      id="icon"
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Categoria
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (separadas por vírgula)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      value={formData.tags?.join(', ')}
                      onChange={handleTagsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Responsabilidade e Função */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Responsabilidade e Função</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="responsible" className="block text-sm font-medium text-gray-700 mb-1">
                      Responsável
                    </label>
                    <input
                      type="text"
                      id="responsible"
                      name="responsible"
                      value={formData.responsible}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 mb-1">
                      Stack Tecnológica
                    </label>
                    <input
                      type="text"
                      id="techStack"
                      name="techStack"
                      value={formData.techStack}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Metadados e Estado */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Metadados e Estado</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Expiração
                    </label>
                    <input
                      type="date"
                      id="expirationDate"
                      name="expirationDate"
                      value={formData.expirationDate || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="dependencies" className="block text-sm font-medium text-gray-700 mb-1">
                      Dependências
                    </label>
                    <input
                      type="text"
                      id="dependencies"
                      name="dependencies"
                      value={formData.dependencies}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="accessLevel" className="block text-sm font-medium text-gray-700 mb-1">
                      Nível de Acesso *
                    </label>
                    <select
                      id="accessLevel"
                      name="accessLevel"
                      value={formData.accessLevel}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="Público">Público</option>
                      <option value="Restrito">Restrito</option>
                      <option value="Específico por Departamento">Específico por Departamento</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push(`/main/systems/${params.id}`)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSaving}
                >
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
