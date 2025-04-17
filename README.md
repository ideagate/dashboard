# Ideagate

## How To

### Install Dependencies

1. Create file `.env` with these format

   ```md
   GITHUB_TOKEN= # your github personal access token
   ```

2. Install `dotenv` globally

   ```bash
   npm install -g dotenv-cli
   ```

3. Install dependencies
   ```bash
   dotenv -e .env pnpm install
   ```
