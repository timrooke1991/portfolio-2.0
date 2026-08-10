/**
 * Year-by-year work chapters for the home twin column.
 * Narrative arc: Product Manager → Bootcamp → Junior Eng →
 * Software Eng → Product Engineer → Senior → AI-first.
 * Sourced from CV (Mar 2026) + about timeline + side projects.
 */

/** @typedef {{ name: string, href?: string, meta?: string }} YearProject */

/**
 * @typedef {Object} YearBio
 * @property {string} chapter - arc stage label
 * @property {string} org
 * @property {string} role
 * @property {string} [orgHref]
 * @property {string} summary
 * @property {string[]} [highlights] - short achievement callouts (use sparingly)
 * @property {string[]} [stack]
 * @property {YearProject[]} [projects]
 */

/** @type {Record<number, YearBio>} */
export const yearBios = {
	2026: {
		chapter: 'AI-first Engineer',
		org: 'Legl',
		orgHref: 'https://legl.com',
		role: 'Senior Product Engineer',
		summary:
			'Owning full product workstreams from planning through implementation, with AI as default leverage across Engineering, Product, and Design.',
		highlights: [
			'Built an MCP server on Cloudflare Workers bridging AI assistants to internal PM tooling',
			'Piloting and evaluating AI tooling so EPD stays current without the hype treadmill'
		],
		stack: ['TypeScript', 'Vue', 'Python', 'LLM', 'MCP'],
		projects: [
			{
				name: 'Raceblocks',
				href: 'https://github.com/timrooke1991/raceblocks',
				meta: 'Side · Strava block analysis'
			},
			{
				name: 'Football Bacon',
				href: 'https://footballbacon.onrender.com/',
				meta: 'Side · graph search'
			}
		]
	},
	2025: {
		chapter: 'AI-first Engineer',
		org: 'Legl',
		orgHref: 'https://legl.com',
		role: 'Senior Product Engineer',
		summary:
			'Making AI a force multiplier for the company: automation at codebase scale, an internal LLM testing platform, and infrastructure that does not burn money.',
		highlights: [
			'Grew AI-assisted i18n coverage from under 1% to ~45% in eight weeks (~100 PRs)',
			'Shipped AI bank-statement extraction end to end, processing thousands of documents a week',
			'Cut AI infrastructure cost by thousands £/month via model migration and rollout strategy'
		],
		stack: ['TypeScript', 'Vue', 'Python', 'RAG', 'GitHub Actions'],
		projects: [
			{
				name: 'Political Manifesto Retrospective',
				href: 'https://politicoretro.netlify.app/',
				meta: 'Side · LLM-as-a-Judge'
			},
			{
				name: 'Running Diary',
				href: 'https://trainingdiary.up.railway.app/dashboard',
				meta: 'Side · Strava → Sheets'
			}
		]
	},
	2024: {
		chapter: 'Senior Engineer',
		org: 'Legl',
		orgHref: 'https://legl.com',
		role: 'Product Engineer → Senior',
		summary:
			'The year generative AI stopped being a prototype and became part of the product, and part of how the team shipped.',
		highlights: [
			'Promoted to Senior Product Engineer',
			'In July, led AI adoption as part of Legl’s AI Steering Committee',
			'Shipped Legl’s first generative AI feature (~15% faster legal workflows)',
			'Built Legl’s first NFC-powered feature, unblocking a key enterprise sales barrier'
		],
		stack: ['Vue', 'TypeScript', 'RAG', 'APIs']
	},
	2023: {
		chapter: 'Product Engineer',
		org: 'Legl',
		orgHref: 'https://legl.com',
		role: 'Product Engineer',
		summary:
			'Product engineering in regulated legal tech: workflows firms trust, revenue-bearing integrations, Vue SPA migration, and the first serious AI prototypes on the platform.',
		highlights: [
			'Architected and prototyped gen-AI features with RAG, function calling, and production prompt work',
			'Shipped customisable client forms and structured data collection for law firms',
			'Integrated third-party financial checks via API, opening a new revenue line'
		],
		stack: ['Vue', 'TypeScript', 'RAG', 'i18next']
	},
	2022: {
		chapter: 'Product Engineer',
		org: 'Axis → Legl',
		role: 'Software Engineer → Product Engineer',
		summary:
			'Axis ran out of money. Leaving was hard, and invaluable: a forced retrospective on what had worked in the product and the company, and what hadn’t. Joined Legl in August.',
		highlights: [
			'Owned verification-code auth (React, Mongo, Node, Redis), tightening security and onboarding',
			'Joined Legl’s frontend steering conversations and the Vue modernisation effort'
		],
		stack: ['React', 'Node', 'Vue']
	},
	2021: {
		chapter: 'Software Engineer',
		org: 'Axis Workshops',
		role: 'Software Engineer',
		summary:
			'Growth-stage SaaS: less greenfield, more hardening. Platform work that had to stand up to enterprise scrutiny.',
		highlights: [
			'Built a Node microservice for visual PDF exports with ReactPDF, reusing the design system in print',
			'Ran internal security audits for 12 months, helping gain and retain ISO27001 and unlock enterprise contracts'
		],
		stack: ['React', 'Node', 'ReactPDF']
	},
	2020: {
		chapter: 'Software Engineer',
		org: 'Axis Workshops',
		role: 'Software Engineer',
		summary:
			'Remote full-time on the facilitation platform. A year of rebuilding surfaces clients lived in, while keeping delivery moving.',
		highlights: [
			'Rebuilt the frontend in React from client feedback, improving satisfaction and day-to-day engagement',
			'Shipped Creative Matrix with canvas and GreenSock for collaborative, interactive workshops'
		],
		stack: ['React', 'Node', 'GreenSock']
	},
	2019: {
		chapter: 'Software Engineer',
		org: 'Axis Workshops',
		role: 'Software Engineer',
		summary:
			'Early engineer on a design-thinking facilitation product. Small team, high ownership, and the first version that had to convince investors and pilot customers.',
		highlights: [
			'With two other engineers, built the foundational MVP that helped secure investment and pilot enterprise customers',
			'Led Round Robin, Dot Voting, and SWOT into the platform with React and Node'
		],
		stack: ['React', 'Node', 'JavaScript']
	},
	2018: {
		chapter: 'Junior Engineer',
		org: 'Bili → Axis',
		role: 'Junior Software Engineer',
		summary:
			'Finished the EdTech year at Bili owning real product surfaces, then into Axis Workshops. First paid revenue behind me; next, a SaaS that had to scale.',
		highlights: [
			'Integrated Stripe and launched a premium tier, contributing to Bili’s first revenue',
			'Built a multilingual WordPress site wired into HubSpot with the marketing team',
			'Earned AWS Developer Associate (Feb 2018)'
		],
		stack: ['PHP', 'Laravel', 'JavaScript', 'MongoDB', 'AWS']
	},
	2017: {
		chapter: 'Bootcamp → Junior Eng',
		org: 'GA → Bili',
		role: 'Career switch',
		summary:
			'Left product management, completed General Assembly’s Software Engineering Immersive, and joined Bili alongside the CTO. Small startup: features, deploys, and DevOps in the same week.',
		highlights: [
			'Career switch: PM → junior engineer in one year',
			'Led Socket.IO live chat for classmates (Laravel, jQuery, Blade)',
			'Shipped a class forum in PHP/Laravel for teacher-set discussion topics'
		],
		stack: ['JavaScript', 'PHP', 'Laravel', 'Socket.IO']
	},
	2016: {
		chapter: 'Product Manager',
		org: 'Unruly',
		role: 'Product Manager',
		summary:
			'Owning EQ and Custom Audiences end to end: roadmaps, rollouts, and the technical workstreams that made the products real on mobile and in new markets.',
		highlights: [
			'Launched Unruly DNA MVP (Oct 2016)',
			'Integrated facial recognition and NLP APIs into the insight products',
			'ACE Award for outstanding achievement in customer experience'
		],
		stack: ['Product', 'APIs', 'Mobile']
	},
	2015: {
		chapter: 'Product Manager',
		org: 'Unruly',
		role: 'Product Manager',
		summary:
			'The product-builder seat was clear by now: stand-ups, stories, roadmaps, and shipping insight tools that sales and clients depended on.',
		highlights: [
			'Launched Unruly Custom Audiences MVP (Mar 2015)',
			'Built survey infrastructure that later reached 400,000+ responses a year',
			'Cut client report delivery times by ~66% through automation and new research partners'
		],
		stack: ['Product', 'Data', 'MVPs']
	},
	2014: {
		chapter: 'Project → Product',
		org: 'Unruly',
		role: 'Project Manager → Product',
		summary:
			'Still delivering client work, but the role was morphing organically into product. A small team, and more of the job was building the thing, not only running the projects around it.',
		highlights: [
			'Took EQ / ShareRank from an Excel-based MVP to an interactive dashboard in 12 months',
			'Sourced technology partners that cut product cost to Unruly by ~50%',
			'Introduced data visualisations that helped clients rethink content strategy'
		],
		stack: ['Product', 'Dashboards', 'Delivery']
	},
	2013: {
		chapter: 'Project Manager',
		org: 'Unruly',
		role: 'Project Manager',
		summary:
			'Joined AdTech after LSE on the project side: booking to report delivery, suppliers, and supporting global sales while the product was still proof-of-concept.',
		highlights: [
			'Supported key accounts through the proof-of-concept phase',
			'Managed up to seven freelancers against delivery deadlines'
		],
		stack: ['Delivery', 'AdTech']
	}
};

export function bioForYear(year) {
	return yearBios[year] ?? null;
}
