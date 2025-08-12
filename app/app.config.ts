export default defineAppConfig({
	global: {
		picture: {
			dark: '/images/bo-cooper-branding-1.png',
			light: '/images/bo-cooper-branding-1.png',
			alt: 'My profile picture'
		},
		meetingLink: 'https://cal.com/',
		email: 'hiring@bo-cooper.com',
		available: true
	},

	ui: {
		colors: {
			primary: 'blue',
			neutral: 'neutral'
		}
	},

	uiPro: {
		pageHero: {
			slots: {
				container: 'py-18 sm:py-24 lg:py-32',
				title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
				description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
			}
		}
	},

	footer: {
		credits: `Copyright © ${new Date().getFullYear()}`,
		colorMode: false,
		links: [
			{
				'icon': 'i-simple-icons-github',
				'to': 'https://github.com/bocooper-dev',
				'target': '_blank',
				'aria-label': 'GitHub'
			},
			{
				'icon': 'i-simple-icons-linkedin',
				'to': 'https://linkedin.com/in/bo-cooper',
				'target': '_blank',
				'aria-label': 'LinkedIn'
			},
			{
				'icon': 'i-simple-icons-x',
				'to': 'https://x.com/bo_cooper',
				'target': '_blank',
				'aria-label': 'X'
			}
		]
	},

	seo: {
		siteName: 'Bo Cooper | bo-cooper.com'
	}
})
