# GTNH Thaumcraft Calculator

A modern Thaumcraft research helper for GregTech New Horizons.

## App name

Suggested public name: **GTNH Thaumcraft Calculator**

Alternative short name: **GTNH Aspect Solver**

## What it does

- Finds a connection path between two aspects
- Respects a minimum step count
- Lets you block aspects you do not want to use unless necessary
- Includes GTNH-specific extra aspects:
  - Electrum
  - Magneto
  - Nebrisum
  - Radio
  - Strontio

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/deploy-pages.yml`.

Typical setup:

1. Push the repo to GitHub
2. In GitHub, enable Pages with source set to GitHub Actions
3. Push to `main`
4. The workflow will build and deploy `dist`

The Vite base is configured for simple static hosting.

## Notes

This first version is a modern rebuild inspired by ythri/tcresearch, adapted for GTNH-style aspect data and a cleaner UI.

The current GTNH extra aspect mappings in the app are:

- Electrum = Energy + Mechanism
- Magneto = Metal + Flight
- Nebrisum = Craft + Greed
- Radio = Light + Energy
- Strontio = Entropy + Mind

These align with the known GregTech addon-style aspect set and the live GTNH source confirms the aspects themselves are present and used throughout the pack.
