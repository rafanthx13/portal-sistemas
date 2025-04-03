# Portal de Sistemas - Documentação Inicial

## Comandos Utilizados para Criação do Projeto

O projeto foi criado usando o seguinte comando:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Este comando configura o projeto com:

- TypeScript
- Tailwind CSS
- ESLint
- App Router (novo sistema de roteamento do Next.js)
- Diretório src/
- Alias de importação @/*

## Como Executar o Projeto

1. Instale as dependências:

```bash
npm install
```

2. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

3. Acesse a aplicação em:

```
http://localhost:3000
```

## Estrutura do Projeto

- `/src/app`: Contém as páginas da aplicação
- `/src/components`: Componentes reutilizáveis
- `/public`: Arquivos estáticos
- `tailwind.config.ts`: Configuração do Tailwind CSS
- `tsconfig.json`: Configuração do TypeScript
- `next.config.js`: Configuração do Next.js
