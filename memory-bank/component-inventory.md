# Component Inventory

This document tracks all shadcn/ui components used in the project, their installation method, customizations, and dependencies.

## Initialization

- **Date:** 19/02/2025
- **Command used:** `npx shadcn@canary init`
- **Style:** New York (Recommended)
- **Base color:** Neutral
- **CSS variables for theming:** No (but implemented in `tailwind.config.ts`)
- **React version:** 19
- **Installation method:** Used --force due to potential peer dependency issues

### Tailwind and CSS Configuration Changes

- Custom color scheme using CSS variables for both light and dark themes
- Custom font families defined (Geist Sans and Geist Mono)
- Custom border radius values
- Added `tailwindcss-animate` plugin
- Implemented media query for dark mode preference
- Tailwind layers used for base styles

### Note on CSS Variables

Despite initially opting out of CSS variables for theming during initialization, the project is using CSS variables extensively for color theming. This discrepancy should be investigated and resolved if necessary.

### Utility Functions

A new file `src/lib/utils.ts` has been created with the following content:

- `cn` function: Combines `clsx` and `tailwind-merge` for efficient class name handling.

This utility is commonly used in shadcn/ui projects for managing Tailwind CSS classes dynamically.

## Component List

| Component Name | Installation Method | Customizations | Dependencies |
|----------------|---------------------|----------------|--------------|
| Button | `npx shadcn@canary add button` | None | Used --force due to React 19 peer dependency issues |
| Input | `npx shadcn@canary add input` | None | None |
| Card | `npx shadcn@canary add card` | None | None |
| Dialog | `npx shadcn@canary add dialog` | None | Used --force due to React 19 peer dependency issues |
| Navigation Menu | `npx shadcn@canary add navigation-menu` | None | Used --force due to React 19 peer dependency issues |

## Adding New Components

When adding a new component:

1. Use the command: `npx shadcn@latest add [component]`
2. Document the process in this file, including:
   - Component name
   - Installation method (CLI or direct)
   - Any customizations made
   - Dependencies added

## Customization Notes

Document any significant customizations made to components here, including the rationale for changes and any implications for the overall design system.
