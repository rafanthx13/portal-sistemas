'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validações básicas
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      // Preparar os dados para envio
      const userData = {
        email,
        password,
        confirmPassword
      };

      // Fazer a requisição para o backend
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se o servidor retornou um erro
        throw new Error(data.message || 'Erro ao cadastrar usuário');
      }

      // Cadastro bem-sucedido
      console.log('Cadastro realizado com sucesso:', data);

      // Redirecionar para a página de login
      router.push('/login?registered=true');
    } catch (err) {
      // Tratamento de erros
      console.error('Erro no cadastro:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao cadastrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Portal de Sistemas
        </h1>
        <hr className="border-t border-gray-300 mb-8" />

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Cadastro de Usuário
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-primary-600 hover:text-primary-500">
              Faça login
            </Link>
          </p>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-500 mt-4 block">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
