# Tailwind CSS - Documentação

## Instalação e Configuração

O Tailwind CSS foi instalado e configurado no projeto com os seguintes passos:

1. Instalação das dependências:

```bash
npm install -D tailwindcss postcss autoprefixer
```

2. Criação dos arquivos de configuração:
   - `tailwind.config.ts`: Configuração principal do Tailwind
   - `postcss.config.js`: Configuração do PostCSS
   - Atualização do `globals.css` com as diretivas do Tailwind

## Como Usar o Tailwind CSS

### Classes Utilitárias

O Tailwind CSS funciona através de classes utilitárias que podem ser aplicadas diretamente nos elementos HTML. Exemplos:

```html
<!-- Espaçamento -->
<div class="p-4 m-2">Conteúdo</div>

<!-- Cores -->
<div class="bg-blue-500 text-white">Conteúdo</div>

<!-- Flexbox -->
<div class="flex items-center justify-between">Conteúdo</div>

<!-- Responsividade -->
<div class="w-full md:w-1/2 lg:w-1/3">Conteúdo</div>
```

### Cores Personalizadas

Adicionamos uma paleta de cores personalizada no `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        // ... outras variações
      },
    },
  },
}
```

Uso:

```html
<div class="bg-primary-500 text-primary-100">Conteúdo</div>
```

## Melhores Práticas

1. **Componentização**
   - Crie componentes reutilizáveis para elementos que se repetem
   - Use a diretiva `@apply` para extrair classes comuns em componentes

2. **Responsividade**
   - Use os prefixos responsivos: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
   - Comece com o design mobile primeiro

3. **Manutenção**
   - Evite classes muito longas
   - Use comentários para separar grupos de classes
   - Considere extrair classes comuns para componentes

4. **Performance**
   - Use o modo JIT (Just-In-Time) do Tailwind
   - Remova classes não utilizadas com o PurgeCSS

5. **Acessibilidade**
   - Use classes de foco e hover apropriadas
   - Mantenha contraste adequado entre texto e fundo

## Recursos Adicionais

- [Documentação Oficial do Tailwind CSS](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/) - Componentes prontos
- [Tailwind Play](https://play.tailwindcss.com/) - Ambiente de teste online

## Exemplos de Uso no Projeto

### Botões

```html
<button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500">
  Botão Primário
</button>
```

### Cards

```html
<div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
  <h3 class="text-xl font-bold text-gray-800">Título</h3>
  <p class="mt-2 text-gray-600">Conteúdo do card</p>
</div>
```

### Formulários

```html
<input 
  type="text" 
  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
  placeholder="Digite algo..."
/>
```
