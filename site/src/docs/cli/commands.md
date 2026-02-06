# CLI Commands

The ZhinNX CLI (`@zhinnx/cli`) is your primary tool for project management.

## Global Commands

### `create`
Scaffolds a new project.

```bash
npx @zhinnx/cli create <project-name>
```

### `dev`
Starts the development server.

```bash
npx @zhinnx/cli dev
# or
npm run dev
```

### `plugin list`
Lists all active plugins in the current project.

```bash
npx @zhinnx/cli plugin list
```

## Plugin Commands

Plugins can register their own commands. For example, if `@zhinnx/font` is installed:

```bash
npx @zhinnx/cli font build
```
