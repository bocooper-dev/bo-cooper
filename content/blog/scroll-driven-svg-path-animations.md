---
title: "Scroll-Driven SVG Path Animations"
description: Create performant scroll-driven SVG path animations in Nuxt using IntersectionObserver + requestAnimationFrame—no heavy libs.
date: 2025-06-10
image: https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
minRead: 8
author:
  name: Bo Cooper
  avatar:
    src: /images/bo-cooper-branding-2.png
    alt: Bo Cooper
---

SVG path animations can feel magical—if they're smooth and meaningful. We'll build a scroll-driven stroke-draw effect tied to viewport progress.

## Core Technique
We set stroke-dasharray and stroke-dashoffset to the path length, then reduce the offset as the element scrolls into view.

## Steps
1. Measure path length
2. Initialize dash values
3. Observe scroll progress
4. Interpolate offset

```ts
function setup(el: SVGPathElement) {
  const length = el.getTotalLength()
  el.style.strokeDasharray = String(length)
  el.style.strokeDashoffset = String(length)
  return length
}
```

```ts
function bindScroll(el: SVGPathElement, length: number) {
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    const start = window.scrollY
    function frame() {
      const visible = Math.min(1, (window.scrollY - start + window.innerHeight * 0.2) / (entry.boundingClientRect.height + window.innerHeight))
      el.style.strokeDashoffset = String(length * (1 - visible))
      if (visible < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, { threshold: [0, 0.2] })
  io.observe(el)
}
```

## Accessibility
Avoid animating purely decorative graphics as focus cues; ensure reduced motion mode disables the draw.

## Wrap Up
This pattern scales: hook multiple paths, abstract into a directive, or swap progression logic for scroll timelines once widely supported.
