---
title: "AI Meta-Prompting with HOP & LOP"
description: Use Higher Order Prompts (HOP) and Lower Order Prompts (LOP) to structure agent context for more predictable, high-signal outputs.
date: 2025-07-28
image: https://images.pexels.com/photos/3952234/pexels-photo-3952234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
minRead: 10
author:
  name: Bo Cooper
  avatar:
    src: /images/bo-cooper-branding-2.png
    alt: Bo Cooper
---

Most prompt chains collapse because context is unstructured. Separating meta instructions (HOP) from tactical directives (LOP) creates durable, debuggable flows.

## Model
- HOP: Governing constraints & roles (non-ephemeral)
- LOP: Task-specific payload (ephemeral)

## Template Example
```txt
[HOP]
Role: Senior Vue/Nuxt Engineer AI
Goals: Generate concise component scaffolds
Constraints: No unused imports, accessible markup, type-safe
Quality Gates: lint clean, no console warnings

[LOP]
Task: Build a composable for network status with online/offline events and throttled state updates.
```

## Code Doc Generator Mini-Case
A doc generator can parse components → emit prop/event tables. HOP defines tone + format; each file run is a LOP.

## Benefits
- Repeatability
- Easier diffing & debugging
- Clear separation of stable vs volatile input

## Wrap Up
Think of HOP as the contract and LOP as the request. Explicit boundaries reduce prompt drift and improve output consistency.
