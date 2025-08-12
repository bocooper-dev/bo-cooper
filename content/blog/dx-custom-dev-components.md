---
title: "Improving DX with Custom Dev Components"
description: Build internal developer-facing Vue components (like an inline GA debug panel) to speed troubleshooting and reduce context switching.
date: 2025-05-18
image: https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
minRead: 6
author:
  name: Bo Cooper
  avatar:
    src: /images/bo-cooper-branding-1.png
    alt: Bo Cooper
---

Developer experience (DX) tooling doesn't have to live outside your app. Embedding small, toggleable components can shorten feedback loops drastically.

## Example: GA Debug Panel
Expose current route, event queue, consent state, and a manual dispatch form.

## Implementation Sketch
```vue
<template>
  <aside v-if="open" class="fixed bottom-2 right-2 w-72 p-3 bg-neutral-900/90 rounded text-xs space-y-2">
    <header class="flex justify-between items-center font-medium">
      <span>GA Debug</span>
      <button @click="open=false">×</button>
    </header>
    <pre>{{ events.slice(-5) }}</pre>
    <form @submit.prevent="send">
      <input v-model="name" placeholder="event name" class="w-full mb-1" />
      <button class="px-2 py-1 bg-primary/30 rounded">Send</button>
    </form>
  </aside>
  <button @click="open=!open" class="fixed bottom-2 right-2 bg-primary/50 rounded px-2 py-1">GA</button>
</template>
```

## Tips
- Guard behind env flag & never ship to prod bundled (vite define or route rules)
- Use composables to expose tracking state
- Provide keyboard shortcut for toggling

## Broader Ideas
Error overlay, feature flag switcher, accessibility outline toggle, latency HUD, i18n key explorer.

## Wrap Up
Treat DX surface area like user UX—small purposeful tools that live where work happens.
