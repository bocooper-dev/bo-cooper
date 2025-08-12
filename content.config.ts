import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
	title: z.string(),
	description: z.string()
})

const createButtonSchema = () => z.object({
	label: z.string(),
	icon: z.string().optional(),
	to: z.string().optional(),
	color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
	size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
	variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
	target: z.enum(['_blank', '_self']).optional()
})

const createImageSchema = () => z.object({
	src: z.string().editor({ input: 'media' }),
	alt: z.string()
})

const createAuthorSchema = () => z.object({
	name: z.string(),
	description: z.string().optional(),
	username: z.string().optional(),
	twitter: z.string().optional(),
	to: z.string().optional(),
	avatar: createImageSchema().optional()
})

const createTestimonialSchema = () => z.object({
	quote: z.string(),
	author: createAuthorSchema()
})

export default defineContentConfig({
	collections: {
		index: defineCollection({
			type: 'page',
			source: 'index.yml',
			schema: z.object({
				hero: z.object({
					links: z.array(createButtonSchema()),
					images: z.array(createImageSchema())
				}),
				about: createBaseSchema(),
				experience: createBaseSchema().extend({
					items: z.array(z.object({
						// Accept ISO date or human-readable string like "2023 – Present"
						date: z.union([z.date(), z.string()]),
						position: z.string(),
						company: z.object({
							name: z.string(),
							url: z.string(),
							logo: z.string().editor({ input: 'icon' }),
							color: z.string()
						})
					}))
				}),
				testimonials: z.array(createTestimonialSchema()),
				blog: createBaseSchema(),
				faq: createBaseSchema().extend({
					categories: z.array(
						z.object({
							title: z.string().nonempty(),
							questions: z.array(
								z.object({
									label: z.string().nonempty(),
									content: z.string().nonempty()
								})
							)
						}))
				})
			})
		}),
		projects: defineCollection({
			type: 'data',
			source: 'projects/*.yml',
			schema: z.object({
				title: z.string().nonempty(),
				description: z.string().nonempty(),
				image: z.string().nonempty().editor({ input: 'media' }),
				url: z.string().nonempty(),
				tags: z.array(z.string()),
				// Accept ISO date or year string
				date: z.union([z.date(), z.string()])
			})
		}),
		blog: defineCollection({
			type: 'page',
			source: 'blog/*.md',
			schema: z.object({
				minRead: z.number(),
				// Accept ISO date or string
				date: z.union([z.date(), z.string()]),
				image: z.string().nonempty().editor({ input: 'media' }),
				author: createAuthorSchema()
			})
		}),
		pages: defineCollection({
			type: 'page',
			source: [
				{ include: 'projects.yml' },
				{ include: 'blog.yml' }
			],
			schema: z.object({
				links: z.array(createButtonSchema())
			})
		}),
		speaking: defineCollection({
			type: 'page',
			source: 'speaking.yml',
			schema: z.object({
				links: z.array(createButtonSchema()),
				events: z.array(z.object({
					category: z.enum(['Live talk', 'Podcast', 'Conference']),
					title: z.string(),
					// Accept ISO date or string
					date: z.union([z.date(), z.string()]),
					location: z.string(),
					url: z.string().optional()
				}))
			})
		}),
		services: defineCollection({
			type: 'page',
			source: 'services.yml',
			schema: z.object({
				links: z.array(createButtonSchema()),
				offerings: z.array(z.object({
					title: z.string(),
					description: z.string(),
					icon: z.string().optional()
				})),
				packages: z.array(z.object({
					name: z.string(),
					duration: z.string(),
					from: z.string(),
					includes: z.array(z.string())
				})).optional(),
				process: z.array(z.string()),
				cta: z.object({
					label: z.string(),
					to: z.string(),
					color: z.string().optional()
				}).optional()
			})
		}),
		about: defineCollection({
			type: 'page',
			source: 'about.yml',
			schema: z.object({
				content: z.object({}),
				images: z.array(createImageSchema())
			})
		})
	}
})
