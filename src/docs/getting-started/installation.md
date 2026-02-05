# Installation

Getting started with ZhinNX is incredibly simple. You can use our CLI to scaffold a new project in seconds.

## Prerequisites

- **Node.js**: Version 16.0.0 or higher.
- **npm**: (Comes with Node.js)

## Using the CLI

Run the following command in your terminal:

```bash
npx @zhinnx/cli create my-app
```

Follow the interactive prompts:
1. **Project Name:** Choose a name for your folder.
2. **CSS Preset:** Select 'yes' to include `@zhinnx/ui`.
3. **Font Plugin:** Select 'yes' to include `@zhinnx/font` (Space Grotesk).

## Starting the Project

Once created, navigate into your project and start the server:

```bash
cd my-app
npm install
npm run dev
```

Your app will be running at `http://localhost:3000`.

## Manual Installation

If you prefer to add ZhinNX to an existing project:

```bash
npm install @zhinnx/core @zhinnx/server
```

You will need to set up a `server.js` entry point manually. See the **Architecture** section for details.
