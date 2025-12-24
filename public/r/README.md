# TermCN Registry

Terminal-inspired shadcn/ui component registry.

## 🚀 Instalação via CLI

### Instalar o tema completo

```bash
npx shadcn@latest add https://your-domain.com/r/termcn.json
```

### Instalar componentes individuais

```bash
# Button
npx shadcn@latest add https://your-domain.com/r/styles/termcn/button.json

# Card
npx shadcn@latest add https://your-domain.com/r/styles/termcn/card.json

# Input
npx shadcn@latest add https://your-domain.com/r/styles/termcn/input.json

# Badge
npx shadcn@latest add https://your-domain.com/r/styles/termcn/badge.json

# Alert
npx shadcn@latest add https://your-domain.com/r/styles/termcn/alert.json

# Separator
npx shadcn@latest add https://your-domain.com/r/styles/termcn/separator.json
```

## 📦 Componentes Disponíveis

| Componente | URL | Descrição |
|------------|-----|-----------|
| Button | `/r/styles/termcn/button.json` | 9 variantes + 4 tamanhos |
| Card | `/r/styles/termcn/card.json` | Container com 6 subcomponentes |
| Input | `/r/styles/termcn/input.json` | Input de texto estilizado |
| Badge | `/r/styles/termcn/badge.json` | 7 variantes de tags |
| Alert | `/r/styles/termcn/alert.json` | 5 níveis de severidade |
| Separator | `/r/styles/termcn/separator.json` | Horizontal/vertical |

## 🎨 Características do Tema

- **Fonte**: JetBrains Mono (monospace)
- **Border Radius**: 0px (bordas nítidas)
- **Shadows**: Nenhuma
- **Colors**: OKLCH color space
- **ANSI Colors**: 16 cores de terminal (8 standard + 8 bright)
- **Dark Mode**: Suporte nativo

## 📖 Deploy

Para hospedar este registry:

### Opção 1: Vercel (Recomendado)

1. Faça push para o GitHub
2. Importe no Vercel
3. Deploy automático
4. Use a URL: `https://seu-projeto.vercel.app/r/termcn.json`

### Opção 2: Netlify

1. Faça push para o GitHub
2. Importe no Netlify
3. Build settings:
   - Build command: `pnpm build`
   - Publish directory: `dist`
4. Use a URL: `https://seu-projeto.netlify.app/r/termcn.json`

### Opção 3: GitHub Pages

1. Configure GitHub Pages para servir a pasta `public`
2. Use a URL: `https://seu-usuario.github.io/seu-repo/r/termcn.json`

## 🔧 Atualizar Registry

Se você modificar os componentes em `registry/ui/`, execute:

```bash
pnpm generate-registry
```

Isso irá regenerar todos os arquivos JSON em `public/r/styles/termcn/`.

## 📚 Documentação

- [QUICK_START.md](../../QUICK_START.md) - Guia rápido
- [registry/README.md](../../registry/README.md) - Docs dos componentes
- [REGISTRY_SETUP.md](../../REGISTRY_SETUP.md) - Como publicar

## 🌐 Estrutura de URLs

Após deploy, seus usuários poderão acessar:

```
https://seu-dominio.com/
├── r/
│   ├── termcn.json              # Tema completo
│   └── styles/termcn/
│       ├── index.json           # Lista de todos os componentes
│       ├── button.json          # Componente button
│       ├── card.json            # Componente card
│       ├── input.json           # Componente input
│       ├── badge.json           # Componente badge
│       ├── alert.json           # Componente alert
│       └── separator.json       # Componente separator
```

## 💡 Exemplo de Uso

1. Usuário cria um novo projeto:
```bash
npx create-next-app@latest my-app
cd my-app
```

2. Inicializa shadcn/ui:
```bash
npx shadcn@latest init
```

3. Instala o tema TermCN:
```bash
npx shadcn@latest add https://seu-dominio.com/r/termcn.json
```

4. Adiciona componentes:
```bash
npx shadcn@latest add https://seu-dominio.com/r/styles/termcn/button.json
npx shadcn@latest add https://seu-dominio.com/r/styles/termcn/card.json
```

5. Usa no código:
```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Page() {
  return (
    <Card>
      <Button>Terminal Button</Button>
    </Card>
  )
}
```

## 📝 Formato do Registry

O registry segue o formato oficial do shadcn/ui:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "name": "termcn",
  "type": "registry:style",
  "cssVars": { ... },
  "css": "...",
  "docs": "..."
}
```

## 🤝 Contribuindo

Para adicionar novos componentes:

1. Crie o componente em `registry/ui/novo-componente.tsx`
2. Execute `pnpm generate-registry`
3. Commit e push
4. O novo componente estará disponível em `/r/styles/termcn/novo-componente.json`
