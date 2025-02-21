# How to explain


## Quick Start

1. Clone the repository

```bash
git clone git@github.com:zhangchenchen/how_to_explain.git
```

2. Install dependencies

```bash
pnpm install
```

3. Run the development server

```bash
pnpm dev
```

## Customize

- Set your environment variables

```bash
cp .env.example .env.local
```

- Set your theme in `app/theme.css`

[shadcn-ui-theme-generator](https://zippystarter.com/tools/shadcn-ui-theme-generator)

- Set your landing page content in `i18n/pages/landing`

- Set your i18n messages in `i18n/messages`

## Deploy

### Vercel 部署

1. 确保依赖正确安装：
```bash
pnpm install
```

2. 本地测试构建：
```bash
pnpm build
```

3. 部署到 Vercel：
```bash
pnpm vercel
```

如果遇到类型错误，尝试：
```bash
pnpm exec tsc --build --clean
pnpm build
```

- Deploy to Cloudflare

1. Customize your environment variables

```bash
cp .env.example .env.production
cp wrangler.toml.example wrangler.toml
```

edit your environment variables in `.env.production`

and put all the environment variables under `[vars]` in `wrangler.toml`

2. Deploy

```bash
npm run cf:deploy
```

