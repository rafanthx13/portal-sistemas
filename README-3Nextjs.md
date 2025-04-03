# Next.js - Guia Detalhado

## O que é Next.js?

Next.js é um framework React de código aberto desenvolvido pela Vercel que permite a criação de aplicações web modernas e performáticas. Ele adiciona uma camada de abstração sobre o React, fornecendo recursos adicionais e otimizações.

## Diferenças entre Next.js e React

### React

- Biblioteca JavaScript para construção de interfaces
- Focado apenas na camada de UI
- Necessita de configurações adicionais para:
    - Roteamento
    - SSR (Server-Side Rendering)
    - Otimização de imagens
    - Geração de sites estáticos
    - API Routes

### Next.js

- Framework completo baseado no React
- Fornece todas as funcionalidades necessárias "out of the box":
    - Roteamento baseado em arquivos
    - SSR e SSG nativos
    - Otimização automática de imagens
    - API Routes integradas
    - Compilação e bundling otimizados

## Principais Vantagens do Next.js

1. **Roteamento Baseado em Arquivos**
   - Estrutura de diretórios define as rotas
   - Exemplo: `pages/about.tsx` → `/about`
   - Suporte a rotas dinâmicas: `pages/[id].tsx`
   - Roteamento aninhado automático

2. **Renderização Híbrida**
   - SSR (Server-Side Rendering)
   - SSG (Static Site Generation)
   - ISR (Incremental Static Regeneration)
   - CSR (Client-Side Rendering) quando necessário

3. **Otimização de Performance**
   - Code splitting automático
   - Prefetching de rotas
   - Otimização de imagens
   - Compressão e minificação

4. **API Routes**
   - Criação de endpoints API sem servidor separado
   - Exemplo: `pages/api/users.ts`
   - Integração com banco de dados
   - Autenticação serverless

5. **TypeScript First**
   - Suporte nativo a TypeScript
   - Tipagem automática para rotas
   - Melhor desenvolvimento e manutenção

## Padrões e Convenções no Next.js

### 1. Estrutura de Diretórios

```
src/
  ├── app/              # App Router (novo)
  │   ├── layout.tsx    # Layout principal
  │   ├── page.tsx      # Página inicial
  │   └── [slug]/       # Rotas dinâmicas
  ├── components/       # Componentes reutilizáveis
  ├── lib/             # Utilitários e configurações
  ├── styles/          # Arquivos de estilo
  └── types/           # Definições de tipos
```

### 2. Convenções de Nomenclatura

- **Páginas**: `page.tsx` (App Router) ou `index.tsx` (Pages Router)
- **Layouts**: `layout.tsx`
- **Componentes**: PascalCase (ex: `Button.tsx`)
- **Hooks**: `use` prefix (ex: `useAuth.ts`)
- **Utilitários**: camelCase (ex: `formatDate.ts`)

### 3. Padrões de Componentes

```typescript
// Componente com Props tipadas
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button = ({ children, variant = 'primary', onClick }: ButtonProps) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### 4. Padrões de Dados

```typescript
// Busca de dados no servidor
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

// Geração estática
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data }, revalidate: 60 };
}
```

### 5. Padrões de Estilização

- Uso de CSS Modules ou Tailwind CSS
- Estilos globais em `globals.css`
- Componentes estilizados com classes utilitárias

## Boas Práticas no Next.js

1. **Separação de Responsabilidades**
   - Componentes puros para UI
   - Lógica de negócio em hooks
   - Dados em serviços separados

2. **Otimização de Imagens**

   ```typescript
   import Image from 'next/image';
   
   <Image
     src="/profile.jpg"
     alt="Profile"
     width={500}
     height={500}
     priority
   />
   ```

3. **Gerenciamento de Estado**
   - Context API para estado global
   - SWR ou React Query para dados remotos
   - Estado local com useState

4. **Segurança**
   - Validação de dados no servidor
   - Proteção de rotas
   - Sanitização de inputs

5. **Performance**
   - Lazy loading de componentes
   - Otimização de imagens
   - Code splitting
   - Caching estratégico

## Exemplos de Uso

### 1. Rota Dinâmica

```typescript
// pages/[id].tsx
export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(post => ({ params: { id: post.id } })),
    fallback: false
  };
}
```

### 2. API Route

```typescript
// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const users = await getUsers();
    res.status(200).json(users);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
```

## Recursos para Aprofundamento

- [Documentação Oficial Next.js](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Next.js Blog](https://nextjs.org/blog)
