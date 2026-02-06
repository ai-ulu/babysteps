## 2026-02-01 - Tailwind Dynamic Classes with Opacity
**Learning:** When using dynamic theme colors in Tailwind (e.g., `shadow-${themeColor}-100/50`) with the Play CDN, the `safelist` regex pattern must explicitly account for the opacity modifier (`/\d+`). Otherwise, the Tailwind compiler will fail to generate the necessary utility classes for those specific combinations.
**Action:** Always verify that dynamic utility patterns in the Tailwind configuration cover all potential variants, including opacity modifiers, especially when building components that rely on theme-based styling.
