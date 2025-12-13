---
title: 'With the Benefit of Hindsight'
date: '2025-12-15'
readingTime: 7
theme: AI
categories:
  - AI
  - Evals
  - LLMs
preview: 'How a weekend project combining LLMs and public datasets offered new, retrospective insights into 150 years of UK political history—and what it revealed about leverage, adaptation, and the surprising power of small tools.'
projectUrl: 'https://politicoretro.netlify.app/'
---

## A long time ago...

The professor in our political history class set a debate for students: "Who was the most influential Prime Minister in British history?".

We were given: **Harold Wilson**. A key component of our argument was that his policies were prescient and progressive. Lower profile. Underrated, yet impactful.

We lost. The Thatcher group won.

## The LLM Retrospective

Yesterday, I saw a [post](https://x.com/karpathy/status/1998803709468487877) by Andrej Karpathy, which I thought was an interesting application of LLMs. In his [project](https://karpathy.ai/hncapsule/2015-12-26/index.html#article-10794951), he gathered Hacker News articles and comments from a decade ago and sent that content to an LLM for retrospective analysis. Through a grading process, you could see how articles had aged, which ones foreshadowed the following decade, and which users had particularly prescient perspectives.

I found this approach to be a novel application of LLMs, viewed through a slightly different lens. At its core, it resembles an **LLM-as-a-judge** evaluation approach. Typically, LLM-as-a-judge systems involve asking one LLM to produce an output and then asking a second (often different) LLM to evaluate that output.

The process here is similar, but subtly different. Instead of asking an LLM to judge another LLM, we’re leveraging _time_ combined with the LLM’s reasoning ability and knowledge base to judge historical perspectives based on how events actually unfolded. In essence, it’s a kind of **LLM-based retrospective**.

## **The lengths to say: 'I told you so'**

Curious about this approach, and with a free weekend to tinker, I added a few pennies to my OpenAI account and set to work trying to prove my long-held hypothesis about Harold Wilson from back in university.

I cloned Andrej Karpathy’s project, vibe coded my way through the scripts to pull Labour and Conservative manifestos from the last 150 years, and leveraged an LLM to generate metadata for each election—parties, leaders, and outcomes. I then asked the LLM to evaluate these manifestos, in hindsight, for prescience, impact, and influence.

After running a few examples, some summaries popped out. The UI looked good, so I ran the full dataset. A few hundred thousand tokens later, I had an LLM-based ranking of significant individuals, policies, and parties spanning more than a century. Incredible!

An LLM-based evaluation of over 100 years of British political history.

## Learnings

**Adaptation > invention**

Cloning Andrej Karpathy’s script and asking an LLM to repurpose it took a single prompt and less than 30 minutes, which still baffles me. In that time, I had a pipeline to fetch, scrape (non-PDF) manifesto content, parse it, send it to an LLM, and render a UI with scores and rankings relevant to my adapted political use case. Ten minutes later, I had 150+ years of US history too.

Leveraging an existing tool was a game changer. I was building (or asking the AI to build) on the shoulders of giants—the grunt work had already been done. This points to a potential shift in behaviour: tools are easier to adapt than ever, and extending or repurposing structurally sound tools for adjacent contexts is increasingly valuable. You only need to look at Cursor, a VS Code fork, and its recent $30bn valuation.

That same opportunity applies to all problems, from ambitious product ideas to small, simple scripts.

**Small, coherent tools are a force multiplier**

The cloned repository is tiny: around 800 lines of Python. LLMs can digest the entire program into context, which significantly improves output quality. Small, simple open-source scripts and libraries that solve problems well become disproportionately powerful in this environment.

LLMs don’t just accelerate development; they amplify the value of good structure, small scope, and high-quality code. In the age of AI, writing new code has become cheaper, but recognising existing tools and adapting them may offer even greater leverage.

**AI cost**

With any AI project, there’s an expectation of cost. Token usage accumulates quickly through testing, iteration, and analysis. I added $25 to my OpenAI account, expecting a meaningful outlay.

Nearly 1,000 requests and 10+ million tokens later, I discovered I’d only spent $7.48. Around $3.40 of that was the final run using **GPT 5.1** to maximise output quality. Running the full dataset - 160 political documents, each around 10,000 characters long, each sent with a system prompt - against **GPT 4o-mini** and **GPT 5-mini** was extremely cheap (less than $0.10 per model) for reasonable-quality results.

I didn’t aggressively optimise for cost, but a few strategies helped. Sending an identical system prompt separately meant it was charged as cached input tokens at a discounted rate. I also used OpenAI’s recently launched **flex** strategy, which trades latency for a 50% cost reduction. Despite the lower priority, most requests completed in under a minute, with no issues.

Cost has often discouraged me from experimenting with AI in personal projects. Given how far a few cents can go, I’ll treat this as much less of a barrier going forward.

**Model performance**

In keeping with the experimental nature of this project, the evaluation itself is imperfect and largely unvetted. However, I tested a range of models throughout development.

Both **GPT 4o-mini** and **GPT 5-mini** were used during prototyping. They were staggeringly cheap for the volume processed and reliably handled parsing, grading, and basic reasoning. That said, the output felt somewhat generic and surface-level.

As part of the build, I trialled several higher-end reasoning models to use for the final run. I ruled out **GPT 5.2**, still a bit rich for my blood, and tested **o4**, **o4-mini**, **GPT 5**, and **GPT 5.1** on subsets of data.

The **o4** models didn’t meaningfully improve results and tended to cluster grades around B–C. **GPT 5** produced better analysis but was overly verbose, ignoring prompt constraints and returning 20+ bullet points per section. **GPT 5.1** struck the best balance: still slightly verbose, but noticeably stronger in depth and insight.

Given the breadth of political and historical data these models are trained on, some alignment with mainstream analysis is inevitable. However, **GPT 5.1** surfaced more nuanced findings beyond headline figures and dominant narratives, which aligned best with the project’s goals.

## Beyond novel analysis

This application of the LLM-as-a-judge technique felt conceptually different from most generative AI tooling today. While many LLM use cases are tactical and immediate, this approach benefits from a longer time horizon. With hindsight, patterns emerge more clearly - what worked, what didn’t, and why.

While the political experiment is fun, it’s probably not the most impactful application. A more obvious use case is in retrospectives. Not to replace people or eliminate discussion, but to complement it.

One risk in retrospectives is outcome bias: if a feature ships with a bug, something _must_ have gone wrong. That isn’t always true. Emotional responses can distort reasoning and decision-making. An LLM, given appropriate context - assumptions, expectations, constraints, outcomes - could provide a parallel, more detached analysis of process compared with the result. Flawed assumptions that coincidentally led to success can be surfaced. Outliers generate less noise, and genuine procedural issues become clearer.

LLMs are particularly good at finding needles in haystacks. When signals are buried in noise - logs, documents, discussions - an LLM-as-a-judge approach can surface what actually mattered. Combined with real outcome data and a longer lens, this can elevate retrospective insight.

In my project, some names stood out. Beyond hundreds of heads of state and sweeping headline policies, individuals like **Jennie Lee**, instrumental in the creation of the Open University, rose to the top—highlighting where lasting impact truly lay, cutting through the volume of noise**.**

That said, after 10+ million tokens, 1,000 API calls, and a day of development, I’ve had to accept that the AI overlords disagree with my view of British political history. Margaret Thatcher scores an A-, while Harold Wilson earns a respectable B+. The process, however, was valuable; even if the conclusion wasn’t what I hoped for.

### Disclaimer

This was a vibe-coded, slapdash piece of political analysis, intended more as an exploration of an AI-based evaluation technique than a rigorously scrutinised political argument. It’s flawed in many ways—particularly due to biases in training data and the inherent limitations of LLM outputs.
