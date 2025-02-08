---
title: Hello world, hello new site
date: '2024-03-07'
slug: 'hello-world'
readingTime: 3
theme: 'general'
categories:
  - 'general'
preview: "I've embarked on a new routine of building and learning, which has led to the creation of this site. Built with Svelte and SvelteKit, it represents a much-improved upgrade from my previous minimalist site and is built using a Svelte."
---

## Welcome! 👋

I've embarked on a new routine of building and learning, which has led to the creation of this site. Built with Svelte and SvelteKit, it represents a much-improved upgrade from my previous minimalist site and is built using a Svelte (more on that in future posts). The site is not fully complete, I am still to add a project page and some other bits.

### Out with the old

My old site was very minimalist and had some limitations. Here, this site is built with SvelteKit and supports  markdown, JAMstack, and all the interactive magic that comes with it. This site is supports a greater ability of learning, and sharing, and is hopefully a drastically be user experience as well.

### Writing

Writing has always been a way for me to crystallise my thoughts and share my learning. Although it's been some time since I last published, I'm trying to get into a more regular routine of writing and building. Expect to see more frequent posts, ranging from technical deep dives to reflections on the latest trends and personal insights.

Whether you're here to learn something new or just curious about my journey, I hope you find something of value. And who knows? Maybe in sharing my learning process, there may be some value imparted.

<script>
import LinkList from '$lib/components/LinkList.svelte'
import { socials } from '$lib/data/links.js'
</script>

<LinkList links={socials} />
