# Estrutura do Projeto e Tecnologias Utilizadas

## Visão Geral

Este documento explica a estrutura do projeto Portal de Sistemas, as tecnologias utilizadas e como cada arquivo contribui para o funcionamento do sistema.

## Tecnologias Principais

### Next.js

Next.js é um framework React que oferece:

- Renderização do lado do servidor (SSR)
- Geração de sites estáticos (SSG)
- Roteamento baseado em arquivos
- Otimização de imagens
- API Routes

### TypeScript

TypeScript é um superset de JavaScript que adiciona:

- Tipagem estática
- Melhor autocompletar
- Detecção de erros em tempo de desenvolvimento
- Melhor manutenibilidade do código

### Tailwind CSS

Framework CSS utilitário que permite:

- Estilização rápida através de classes
- Design responsivo
- Personalização de temas
- Redução de CSS customizado

## Estrutura de Arquivos

### Arquivos de Configuração

1. `package.json`
   - Define as dependências do projeto
   - Scripts para execução (dev, build, start)
   - Metadados do projeto

2. `tsconfig.json`
   - Configurações do TypeScript
   - Define regras de compilação
   - Configura caminhos de importação

3. `tailwind.config.ts`
   - Configuração do Tailwind CSS
   - Define cores personalizadas
   - Configura plugins
   - Define quais arquivos devem ser processados

4. `postcss.config.js`
   - Configuração do PostCSS
   - Integração com Tailwind CSS
   - Configuração de autoprefixer

5. `.gitignore`
   - Define quais arquivos não devem ser versionados
   - Inclui node_modules, arquivos de build, etc.

6. `.editorconfig`
   - Padronização de estilo de código
   - Configurações de indentação
   - Configurações de charset e final de linha

### Arquivos de Aplicação

1. `src/app/layout.tsx`
   - Layout principal da aplicação
   - Define estrutura HTML base
   - Importa estilos globais
   - Pode conter providers globais

2. `src/app/globals.css`
   - Estilos globais da aplicação
   - Importa diretivas do Tailwind
   - Define variáveis CSS
   - Estilos base para dark/light mode

3. `src/app/page.tsx`
   - Página inicial da aplicação
   - Componente principal da rota '/'
   - Explica o propósito do Portal de Sistemas
   - Link para página de login

4. `src/app/login/page.tsx`
   - Página de login
   - Formulário de autenticação
   - Estado local para email e senha
   - Validação de formulário
   - Estilização com Tailwind

## Explicação Detalhada dos Componentes

### Página de Login (`login/page.tsx`)

```typescript
'use client';
```

- Indica que o componente é executado no cliente
- Necessário para usar hooks e interatividade

```typescript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
```

- Gerenciamento de estado com React Hooks
- Armazena valores dos campos do formulário

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Login attempt:', { email, password });
};
```

- Manipulador de evento do formulário
- Previne comportamento padrão do formulário
- Log dos dados de login (será substituído por autenticação real)

### Estilização com Tailwind

```html
className="min-h-screen bg-gray-100 flex items-center justify-center"
```

- `min-h-screen`: Altura mínima de 100vh
- `bg-gray-100`: Cor de fundo cinza claro
- `flex`: Layout flexbox
- `items-center justify-center`: Centralização vertical e horizontal

```html
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
```

- `w-full`: Largura total
- `px-4 py-2`: Padding horizontal e vertical
- `border`: Borda
- `rounded-lg`: Cantos arredondados
- `focus:ring-2`: Anel de foco com 2px
- `focus:ring-primary-500`: Cor do anel de foco usando nossa paleta personalizada

## Boas Práticas Implementadas

1. **Organização de Arquivos**
   - Separação clara entre páginas e componentes
   - Estrutura de diretórios intuitiva
   - Arquivos de configuração bem organizados

2. **TypeScript**
   - Tipagem forte para props e estados
   - Interfaces bem definidas
   - Melhor autocompletar e detecção de erros

3. **Tailwind CSS**
   - Classes utilitárias para estilização rápida
   - Design responsivo
   - Consistência visual
   - Cores personalizadas através do tema

4. **Next.js**
   - Roteamento baseado em arquivos
   - Componentes do lado do cliente quando necessário
   - Otimização de performance
   - Estrutura escalável

## Próximos Passos

1. Implementar autenticação real
2. Adicionar validação de formulário
3. Criar dashboard após login
4. Implementar gerenciamento de sistemas
5. Adicionar controle de acesso

## Recursos para Aprendizado

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [React Hooks](https://react.dev/reference/react)
- [Next.js App Router](https://nextjs.org/docs/app)
