# @champtekllc/uikit

A standalone React UI component library built with **Tailwind CSS v4**, **Radix UI primitives**, and **shadcn/ui** patterns. Originally extracted from the [entero.biz](https://github.com/champtekllc/entero.biz) monorepo, this package is fully self-contained and can be used in any React project.

---

## Features

- **80+ production-ready components** — forms, data tables, modals, navigation, charts, and more
- **Tailwind CSS v4** — utility-first styling with a zero-configuration approach
- **Storybook** — interactive component playground with dark/light theme support
- **TypeScript** — full type safety throughout
- **React 19 compatible**
- **Framework agnostic routing** — layout components accept TanStack Router context but have no hard router dependency
- **Hooks library** — debounce, local/session storage, media queries, scroll, viewport, tree state, and more

---

## Package Contents

| Directory | Description |
|-----------|-------------|
| `src/ui/` | Core UI primitives (Button, Input, Select, Dialog, Table, …) |
| `src/components/` | Higher-level composite components (DataTable, RichMdxEditor, CreditCardBrand, …) |
| `src/hooks/` | Reusable React hooks |
| `src/layout/` | App shell, page layouts, backgrounds, nav menus |
| `src/lib/` | Utilities, types, helpers (axios factory, permissions, date helpers, …) |
| `src/styles/` | Global CSS and custom overrides |
| `src/stories/` | Storybook stories for all components |
| `schema/` | Minimal type definitions extracted from the entero.biz schema (no Mongoose/server dependency) |

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9 (or npm / yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/champtekllc/uikit.git
cd uikit

# Install dependencies
pnpm install
```

### Running Storybook

```bash
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006) to browse the interactive component docs.

### Type-checking

```bash
pnpm typecheck
```

### Linting

```bash
pnpm lint
```

---

## Usage in Another Project

Since this package ships TypeScript source (no compiled output by default), the easiest integration is as a **workspace package** or by pointing your bundler at the source directly.

### 1. Add as a local workspace dependency

In your monorepo's `package.json`:

```json
{
  "dependencies": {
    "@champtekllc/uikit": "workspace:*"
  }
}
```

### 2. Configure path aliases

Add the following to your project's `tsconfig.json` so TypeScript resolves the package paths:

```json
{
  "compilerOptions": {
    "paths": {
      "@entero/uikit": ["./node_modules/@champtekllc/uikit/src/index.ts"],
      "@uikit/*": ["./node_modules/@champtekllc/uikit/src/*"],
      "@entero/schema": ["./node_modules/@champtekllc/uikit/schema/index.ts"]
    }
  }
}
```

### 3. Import styles

In your app entry point (e.g. `main.tsx`):

```typescript
import '@champtekllc/uikit/src/styles/global.css';
```

### 4. Use components

```tsx
import { Button } from '@entero/uikit';
import { DataTable } from '@entero/uikit';

export function MyPage() {
  return (
    <div>
      <Button variant="default">Click me</Button>
    </div>
  );
}
```

---

## Peer Dependencies

The following are **peer dependencies** (not bundled) that your host project must provide:

| Package | Version |
|---------|---------|
| `react` | `^19.0.0` |
| `react-dom` | `^19.0.0` |
| `tailwindcss` | `^4.0.0` |

---

## Key Third-party Libraries

| Library | Purpose |
|---------|---------|
| Radix UI (via shadcn/ui patterns) | Accessible headless primitives |
| `@tanstack/react-table` | Powerful headless data-table engine |
| `@mdxeditor/editor` | Rich MDX/Markdown editor |
| `sonner` | Toast notifications |
| `react-hook-form` | Form state management |
| `@tanstack/react-form` | Alternative form primitives |
| `dayjs` | Date manipulation |
| `axios` | HTTP client with custom interceptors |
| `echarts-for-react` | Chart components |
| `framer-motion` / `motion` | Animations |
| `react-dropzone` | File upload dropzone |
| `@dnd-kit/*` | Drag-and-drop sortable lists |

---

## Schema Package

The `schema/` directory contains a minimal, standalone copy of the TypeScript types that uikit components reference. Unlike the original `@entero/schema` package (which includes server-side Mongoose models and backend-only types), this version:

- Has **no Mongoose dependency** — `MongoDbObjectID` is typed as `string | undefined`
- Contains only the types strictly needed by the UI components
- Is safe to import in any frontend or fullstack project

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-component`
3. Make your changes and add/update stories in `src/stories/`
4. Run Storybook to verify: `pnpm storybook`
5. Open a pull request

---

## License

MIT © Champtekllc
