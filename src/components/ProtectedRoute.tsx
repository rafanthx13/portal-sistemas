'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se não estiver carregando e não estiver autenticado, redirecionar para o login
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Mostrar um indicador de carregamento enquanto verifica a autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Se estiver autenticado, renderizar o conteúdo
  return isAuthenticated ? <>{children}</> : null;
}
