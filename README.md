# Baraka Homes

A mobile-first property investment website built with Next.js, TypeScript, React and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```
## Vercel deployment

The root `vercel.json` explicitly selects Next.js, runs `npm run build`, and
uses the `.next` build output. Keep the Vercel project's Root Directory set to
the repository root (`./`) and its Production Branch set to `main`.

After pushing, confirm the new deployment shows your latest commit. Its build
logs should show Next.js and a generated `/` route. Open the deployment using
Vercel's Visit button while signed in, then check the custom domain separately.
If the deployment works but the custom domain returns 404, check the domain's
assignment in that project's Domains settings.

If deployment fails or still returns 404, save the new deployment URL and build
logs for diagnosis. The old root `index.html` is a legacy coming-soon page;
the Next.js homepage is `app/page.tsx`.
