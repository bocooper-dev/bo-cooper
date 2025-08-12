<template>
	<UPage v-if="page">
		<UPageHero
			:title="page.title"
			:description="page.description"
			:links="page.links"
			:ui="{ title: '!mx-0 text-left', description: '!mx-0 text-left', links: 'justify-start' }"
		/>

		<UPageSection
			:title="'What I Offer'"
			:ui="{ container: '!pt-0' }"
		>
			<template #description>
				<div class="grid gap-6 sm:grid-cols-2">
					<Motion
						v-for="(item, i) in page.offerings"
						:key="item.title"
						:initial="{ opacity: 0, transform: 'translateY(10px)' }"
						:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
						:transition="{ delay: 0.1 * i }"
						:in-view-options="{ once: true }"
						class="p-4 rounded-lg border border-default bg-elevated/40 flex flex-col gap-2"
					>
						<div class="flex items-center gap-2 font-semibold text-highlighted">
							<UIcon
								v-if="item.icon"
								:name="item.icon"
								class="size-4"
							/>
							{{ item.title }}
						</div>
						<p class="text-sm text-muted leading-relaxed">
							{{ item.description }}
						</p>
					</Motion>
				</div>
			</template>
		</UPageSection>

		<UPageSection
			v-if="page.packages"
			title="Packages"
			:ui="{ container: '!pt-0' }"
		>
			<template #description>
				<div class="grid gap-6 lg:grid-cols-3">
					<Motion
						v-for="(pack, i) in page.packages"
						:key="pack.name"
						:initial="{ opacity: 0, transform: 'translateY(10px)' }"
						:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
						:transition="{ delay: 0.1 * i }"
						:in-view-options="{ once: true }"
						class="p-5 rounded-lg border border-default bg-elevated/40 flex flex-col gap-3"
					>
						<div class="flex items-baseline justify-between">
							<h3 class="font-semibold text-highlighted">
								{{ pack.name }}
							</h3>
							<span class="text-xs text-muted">{{ pack.duration }}</span>
						</div>
						<p class="text-sm font-medium">
							From {{ pack.from }}
						</p>
						<ul class="text-sm text-muted space-y-1">
							<li
								v-for="line in pack.includes"
								:key="line"
								class="flex items-start gap-2"
							>
								<UIcon
									name="i-lucide-check"
									class="size-4 text-success mt-0.5"
								/>
								<span>{{ line }}</span>
							</li>
						</ul>
					</Motion>
				</div>
			</template>
		</UPageSection>

		<UPageSection
			title="Process"
			:ui="{ container: '!pt-0' }"
		>
			<template #description>
				<ol class="grid gap-4 sm:grid-cols-3 lg:grid-cols-6 text-sm">
					<li
						v-for="(step, i) in page.process"
						:key="step"
						class="relative pl-4"
					>
						<span class="absolute left-0 top-0 text-xs text-primary font-medium">{{ i + 1 }}</span>
						{{ step }}
					</li>
				</ol>
			</template>
		</UPageSection>

		<UPageSection
			v-if="page.cta"
			:ui="{ container: '!pt-0' }"
		>
			<template #description>
				<UPageCTA
					:description="'Have a project or need an audit? Let’s see if it’s a fit.'"
					:ui="{ container: 'gap-4 py-10' }"
					variant="subtle"
				>
					<template #title>
						<h2 class="text-xl font-semibold">
							Ready to move faster?
						</h2>
					</template>
					<template #actions>
						<UButton
							:label="page.cta.label"
							:to="page.cta.to"
							:color="ctaColor"
						/>
						<UButton
							variant="ghost"
							:to="`mailto:${global.email}`"
							label="Email me"
						/>
					</template>
				</UPageCTA>
			</template>
		</UPageSection>
	</UPage>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('services', () => {
	return queryCollection('services').first()
})
if (!page.value) {
	throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
	title: page.value?.seo?.title || page.value?.title,
	ogTitle: page.value?.seo?.title || page.value?.title,
	description: page.value?.seo?.description || page.value?.description,
	ogDescription: page.value?.seo?.description || page.value?.description
})

const { global } = useAppConfig()

const ctaColor = computed(() => {
	const allowed: Array<'neutral' | 'primary' | 'success' | 'warning' | 'info' | 'error' | 'secondary'> = ['neutral', 'primary', 'success', 'warning', 'info', 'error', 'secondary']
	const requested = (page.value as any)?.cta?.color
	return allowed.includes(requested) ? requested : 'neutral'
})
</script>
