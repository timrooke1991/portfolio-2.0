---
title: Reflections on Svelte
date: '2025-01-19'
readingTime: 5
theme: frontend
slug: 'svelte-first-impressions'
categories:
  - 'frontend'
  - 'svelte'
preview: 'After years of working with React, I found myself increasingly frustrated with the overhead modern frontend development demands. Svelte’s simplicity has been a refreshing alternative, stripping away much of the unnecessary complexity and making development feel more natural.'
---

## From React to Svelte

Having spent most of my frontend career working with React, I’ve become all too familiar with the growing complexities that come with modern frontend development—build tools, linters, endless config files, and an ever-expanding ecosystem of dependencies. While powerful, React's approach sometimes feels like an abstraction too far. With Svelte, I’ve found something that aligns more closely with what I actually want from a frontend framework: simplicity.

Svelte takes a different architectural approach compared to React or Vue. It’s a compiled framework, meaning that rather than running in the browser, Svelte’s code is transformed at build time into highly efficient, vanilla JavaScript. This removes much of the runtime overhead associated with other frameworks, leading to a leaner and more performant experience.

### A Reduction in Boilerplate

One of the first things that struck me about Svelte is just how little code is required to achieve the same functionality as React. State management, for example, is baked into the framework rather than requiring external libraries. There's no need for hooks, reducers, or context APIs—reactivity is built in, and updates happen in a way that feels incredibly natural.

This reduction in boilerplate doesn’t just make development faster, it makes it more enjoyable. Code is clearer, easier to follow, and feels much closer to the core languages of the web—HTML, CSS, and JavaScript.

### Scoped Styles

Another feature I’ve really come to appreciate is Svelte’s approach to styling. Component styles are scoped by default, meaning there’s no risk of unwanted leakage into other parts of the application. This is a small but meaningful improvement, especially when compared to React, where styling often feels like an afterthought.

Having worked with Web Components and Vue, I’d already had a taste of scoped styles, but Svelte’s implementation captures all the same benefits. The simplicity of writing styles directly within a component, without worrying about naming collisions or specificity wars, is something I’ve grown to love.

```scss
h1 {
  ...
}

nav {
  ...
}

h2 {
  ...
}
```

It also reduces the need for complex styling solutions like CSS-in-JS or utility-first frameworks. While those approaches have their place, it’s refreshing to work with a framework that prioritises simplicity.

### Fine-Grained Reactivity

Svelte’s reactivity model is another aspect that sets it apart. Unlike React, which relies on a virtual DOM to determine which parts of the page need updating, Svelte compiles reactivity directly into the code. This means updates happen at a more granular level, improving performance while reducing unnecessary renders.

More importantly, Svelte’s reactivity feels intuitive. No need for dependency arrays or manually managing state updates—it just works.

### A Return to Plain(ish) HTML, CSS, and JavaScript

One of the things I love most about Svelte is how much it feels like writing traditional web code. You’re not dealing with JSX, CSS-in-JS, or a custom templating language. Instead, you’re working with something that feels very close to the web’s core technologies, but with the added benefits of stateful components and reactivity.

This is particularly evident in Svelte’s styling approach. In React, styling always felt like a bit of an afterthought, leading to an ecosystem of solutions to "fix" it—CSS modules, Styled Components, Tailwind, and so on. With Svelte, styles are first-class citizens. The framework even ships with built-in support for animations and transitions via `@svelte/motion` and `@svelte/transition`.

### Performance Gains

The culmination of all these design choices leads to significantly better performance. With no virtual DOM, fine-grained reactivity, and a lean runtime, Svelte applications often feel snappier and more efficient. This is particularly noticeable when it comes to rendering performance, where the framework’s optimisations lead to fewer unnecessary updates and more predictable behaviour.

Even better, getting a highly performant Svelte site requires far less effort than with other frameworks. Running a Lighthouse audit on this very portfolio yielded scores in the 90s across the board, with a perfect 100 in Accessibility and Best Practices—a result I’d rarely see with a React-based project out of the box.

### A Minor Gripe

If I had one minor nitpick, it would be the file extension. `.svelte` just feels a little long! 😅

### Final Thoughts

Svelte has been a refreshing shift in how I approach frontend development. It strips away unnecessary complexity, keeps the focus on writing clear and maintainable code, and encourages a workflow that feels more aligned with the fundamentals of the web.

I’m not saying I’ll never use React again—it’s still an incredibly powerful tool with a vast ecosystem—but Svelte has certainly given me a different perspective. For many projects, particularly those where simplicity and performance are key, it’s an excellent choice.

I’ll likely be writing more about my experiences with Svelte in the future. For now, I’m just enjoying the process of learning and building with something that makes frontend development feel fun again.
