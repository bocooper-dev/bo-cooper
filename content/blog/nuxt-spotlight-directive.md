---
title: "Reusable Spotlight Effect Directive for Nuxt"
description: Build a plug-and-play Vue directive that recreates Nuxt's spotlight cursor interaction for any element—accessible and performant.
date: 2025-07-12
image: https://images.pexels.com/photos/907485/pexels-photo-907485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
minRead: 7
author:
  name: Bo Cooper
  avatar:
    src: /images/bo-cooper-branding-1.png
    alt: Bo Cooper
---

The "spotlight" cursor effect on interactive areas is a subtle but powerful affordance. Let's build it once as a reusable Vue directive you can drop onto any component in your Nuxt app.

## Goals
- Keep DOM updates minimal
- Avoid layout thrash
- Respect reduced motion
- Provide graceful fallback for touch

## 1. Directive Skeleton
```ts
// spotlight.ts
export default {
  mounted (el: HTMLElement) {
    const spot = document.createElement('span')
    spot.className = 'spotlight'
    el.style.position = el.style.position || 'relative'
    el.appendChild(spot)

    function move (e: MouseEvent) {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      spot.style.setProperty('--x', x + 'px')
      spot.style.setProperty('--y', y + 'px')
    }
    el.addEventListener('pointermove', move)
    el.__spotlightCleanup = () => el.removeEventListener('pointermove', move)
  },
  unmounted (el: any) {
    el.__spotlightCleanup && el.__spotlightCleanup()
  }
}
```

## 2. Styles
```css
/* spotlight.css */
.spotlight {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.15), transparent 60%);
  transition: opacity .3s ease;
  mask: linear-gradient(#000,#000);
}
[data-prefers-reduced-motion] .spotlight { transition: none; }
```

## 3. Nuxt Plugin
```ts
// plugins/spotlight.client.ts
import { defineNuxtPlugin } from '#app'
import spotlight from '~/directives/spotlight'
import '~/assets/css/spotlight.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('spotlight', spotlight)
})
```

## 4. Usage
```vue
<button v-spotlight class="px-4 py-2 rounded bg-primary/10 hover:bg-primary/20">Hover me</button>
```

## 5. Reduced Motion
```ts
const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
if (rm.matches) el.dataset.prefersReducedMotion = 'true'
```

## 6. Touch Strategy
On touch devices we can fade the layer or lock it to center.

## Wrap Up
You now have an ergonomic directive: portable, SSR-safe (client plugin), and accessible. Extend with intensity, color, or shape props via data-* attributes.
