# Contributing

Thank you for considering a contribution. Please follow these steps.

## Development setup
1. Install Node 18 or newer.
2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the dev server.
   ```bash
   npm run dev
   ```

## Branching model
Use short feature branches.
Example, `feat/add-export`, `fix/tooltip-copy`.

## Commit messages
Use clear, descriptive messages.

## Pull requests
1. Open against `main`.
2. Ensure the project builds locally.
3. The CI workflow will run `npm ci` and `npm run build`.

## Code style
Use Prettier defaults. Keep code readable and consistent.
