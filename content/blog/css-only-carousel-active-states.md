---
title: "CSS-Only Active States in a Nuxt Blog Carousel (Tailwind + :has + Arbitrary Variants)"
description: How to build rich active/previous/next card states in a carousel using pure CSS with Tailwind's arbitrary variants (group selectors, :has, sibling combinators)—no extra watchers.
date: 2025-08-01
image: https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
minRead: 8
author:
  name: Bo Cooper
  avatar:
    src: /images/bo-cooper-branding-2.png
    alt: Bo Cooper
---

Most carousels rely on JS state (currentIndex, previousIndex) and conditional classes. With modern selectors like `:has()` plus Tailwind's arbitrary variants we can express *positional* UI states purely in CSS—cleaner, faster, and easier to reason about.

Below is the core idea applied to a Nuxt + `UCarousel` blog post slider.

## Goals
- Highlight the active ("snapped") slide.
- Dim slides further from focus.
- Style the slide *before* and *after* the active one differently.
- Avoid extra reactive props or manual class toggling.

## The Markup (Simplified)
```vue
<UCarousel
  ref="carousel"
  v-slot="{ item: post, index }"
  :items="posts"
  loop
  :autoplay="{ delay: 4000 }"
  :ui="{ item: 'basis-1/3 md:basis-1/5 group min-w-[75%] sm:min-w-[350px]' }"
  class="h-[528px] overflow-hidden"
>
  <UBlogPost
    v-bind="post"
    :to="index === selectedSlideIndex ? post.to : ''"
    :class="blogCardClasses"
  />
</UCarousel>
```

We let the carousel attach utility classes such as `.is-snapped` & `.is-in-view` to *items* (these are provided by Nuxt UI Pro's carousel). Then we use CSS selectors to style relatives.

## Tailwind Arbitrary Variant Cheatsheet
Tailwind lets you wrap selectors inside `group-[ ... ]:` (or `peer-[ ... ]:`) to transform them into variants. With arbitrary variants we can express advanced relationships.

| Pattern | Meaning |
|--------|---------|
| `group-[.is-snapped]:X` | Apply `X` when the element itself has `.is-snapped` |
| `group-[&:has(+div.is-snapped)]:X` | Apply `X` when *this element* has a **next sibling** matching `.is-snapped` (so this is the element *before* the active one) |
| `group-[.is-snapped+&]:X` | Apply `X` when this element is the **immediate next sibling** of a `.is-snapped` element (the element *after* the active one) |
| `group:opacity-8` | Base style for all items in the group (standard variant) |

The trick: Tailwind rewrites `group-[selector]:utility` → a generated variant using the provided selector with `&` replaced by the target element.

## Full Class Stack Example
```ts
const blogCardClasses = [
  // Base
  'flex flex-col items-center justify-center transition-all duration-300 ease-in-out cursor-pointer',
  // Faded default state
  'group:opacity-8 group:mb-12',
  // Previous (element BEFORE snapped)
  'group-[&:has(+div.is-snapped)]:opacity-45 group-[&:has(+div.is-snapped)]:mb-10 select-none',
  // Active (snapped)
  'group-[.is-snapped]:bg-white group-[.is-snapped]:scale-[105%] group-[.is-snapped]:-mt-2.5 group-[.is-snapped]:border-b-8 group-[.is-snapped]:border-b-(--ui-primary) group-[.is-snapped]:shadow-md group-[.is-snapped]:opacity-100 group-[.is-snapped]:mb-0',
  // Next (immediately after snapped)
  'group-[.is-snapped+&]:opacity-45 group-[.is-snapped+&]:mb-10 select-none'
]
```

### Why Two Different Patterns?
- Previous element: we *start* on the previous card and ask "do I have a next sibling that is active?" → `&:has(+div.is-snapped)`.
- Next element: we *start* on the active card and select the next sibling → `.is-snapped+&`.

`+` is the adjacent sibling combinator. You could adapt this for further distances using `~` (general sibling) but that may be visually noisy.

## Browser Support
- `:has()` is now supported in all modern evergreen browsers (Chrome, Edge, Safari 15.4+, Firefox 121+ behind flag → stable soon). For legacy fallback, keep a JS class toggling path or accept reduced visuals.

## Progressive Enhancement Fallback
Wrap advanced variants behind a feature detection class:
```js
if (!CSS.supports('selector(:has(*))')) {
  document.documentElement.classList.add('no-has')
}
```
Then scope your advanced styles:
```css
html.no-has .group-[&:has(+div.is-snapped)]:opacity-45 { /* optional fallback */ }
```
(Or simply let all cards share the base style.)

## A11y & UX Considerations
- Ensure focus styles are still visible: add `focus-visible:outline` utilities separately.
- Maintain logical tab order independent of visual scaling.
- Don’t rely solely on opacity differences for meaning; consider a border or underline.

## Performance Notes
Pure CSS avoids extra reactivity watchers per slide. Layout cost is minor: the only potential expensive call is `getBoundingClientRect` inside the carousel's internal snapping logic—your CSS layer adds none.

## Extending the Pattern
- Add distance-based scaling with general sibling combinators (e.g., `.is-snapped~&:not(.is-snapped+&)` for a second ring).
- Use custom properties for dynamic scale or shadow intensity set on `.is-snapped` and read by siblings.
- Combine with `prefers-reduced-motion` to reduce transform scaling / transitions.

```css
@media (prefers-reduced-motion: reduce) {
  .group-[.is-snapped]:scale-[105%] { transform: none; }
  .group-[.is-snapped]:transition-all { transition: none; }
}
```

## Wrap Up
Tailwind’s arbitrary variants + modern selectors let you convert imperative carousel styling into declarative CSS. Less JS state, clearer mental model. Start simple (active + neighbors), then layer complexity only if users benefit.

If you’d like this abstracted into a reusable variant preset or plugin, let me know—easy to package.
