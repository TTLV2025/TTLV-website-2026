# Territorial Title of Las Vegas — Website

Business website for Territorial Title of Las Vegas, serving San Miguel, Mora, and Guadalupe Counties.

Built with Next.js 15, Tailwind CSS, and shadcn/ui. Deployed via Docker on Sliplane.

## Required Environment Variables

Set these in your Sliplane service:

| Variable | Description |
|---|---|
| `SMTP_HOST` | Mail server host (e.g. `smtp.office365.com`) |
| `SMTP_PORT` | Mail server port (typically `587`) |
| `SMTP_USER` | `order@territorialtitle.com` |
| `SMTP_PASS` | Mailbox password |
| `SMTP_FROM` | `order@territorialtitle.com` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID (optional) |

## PDF Documents

Place the following files in `public/pdf/` before deploying:
- `rates.pdf` — Current rate sheet
- `privacy-policy.pdf` — Privacy policy

## Development

```bash
npm install
npm run dev
```

## Deployment

Push to `main` branch — Sliplane auto-deploys via Docker.
