---
title: "Modern Motion in Nuxt with Motion.js"
description: Practical patterns for building fluid, interruptible animations in Nuxt using Motion.js—focus on structure, performance, and accessibility.
date: 2025-07-02
image: https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
minRead: 9
author:
  name: Bo Cooper
  avatar:
    src: /images/bo-cooper-branding-1.png
    alt: Bo Cooper
---

Motion done well guides, orients, and builds trust. Motion done poorly distracts and slows. Here's a framework for using Motion.js inside a production Nuxt app.

## Principles
1. Intent > Decoration
2. Interruptibility
3. Respect user preferences
4. Defer non-critical motion

## Setup
Install `motion-v/nuxt` (already in this template). Then compose variants near the component.

```ts
const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.2 } }
}
```

## Layout Transitions
Use keyed <NuxtPage /> wraps + Motion presence to animate route swaps without jank.

## Stagger Utilities
Create a small helper to produce delays based on index rather than hard-coding.

```ts
export const stagger = (i: number, base = 0.05) => ({ delay: base * i })
```

## Reduced Motion
```ts
import { usePreferredReducedMotion } from '@vueuse/core'
const reduced = usePreferredReducedMotion()
const maybe = (value: any) => reduced.value ? undefined : value
```

## Performance Tips
- Use transform not layout properties
- Move heavy animations off the initial route
- Avoid animating box-shadow; use pseudo elements
- Profile long lists; bail early with v-intersect

## Testing Motion
Record Core Web Vitals before/after; ensure no LCP regressions.

## Wrap Up
Motion.js + Nuxt gives you declarative, composable motion. Codify patterns early and keep motion purposeful.
