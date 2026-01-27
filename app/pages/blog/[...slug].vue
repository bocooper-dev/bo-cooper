<template>
	<UMain class="mt-20 px-2">
		<UContainer class="relative min-h-screen">
			<UPage v-if="page">
				<ULink
					to="/blog"
					class="text-sm flex items-center gap-1"
				>
					<UIcon name="lucide:chevron-left" />
					Blog
				</ULink>
				<div class="flex flex-col gap-3 mt-8">
					<div class="flex text-xs text-muted items-center justify-center gap-2">
						<span v-if="page.date">
							{{ formatDate(page.date) }}
						</span>
						<span v-if="page.date && page.minRead">
							-
						</span>
						<span v-if="page.minRead">
							{{ page.minRead }} MIN READ
						</span>
					</div>
					<NuxtImg
						:src="page.image"
						:alt="page.title"
						class="rounded-lg w-full h-[300px] object-cover object-center"
					/>
					<h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
						{{ page.title }}
					</h1>
					<p class="text-muted text-center max-w-2xl mx-auto">
						{{ page.description }}
					</p>
					<div class="flex items-center justify-center gap-2 mt-2">
						<UUser
							orientation="vertical"
							color="neutral"
							variant="outline"
							class="justify-center items-center text-center"
							v-bind="page.author"
						/>
					</div>
				</div>
				<UPageBody class="max-w-3xl mx-auto">
					<ContentRenderer
						v-if="page.body"
						:value="page"
					/>

					<!-- Tags -->
					<div
						v-if="tags?.length"
						class="mt-8 flex flex-wrap items-center gap-2"
					>
						<UBadge
							v-for="tag in tags"
							:key="tag"
							variant="subtle"
							color="neutral"
							size="sm"
						>
							#{{ tag }}
						</UBadge>
					</div>

					<!-- Related links -->
					<div
						v-if="related?.length"
						class="mt-6 border-t pt-4"
					>
						<h3 class="text-base font-medium mb-2">
							Related
						</h3>
						<ul class="list-disc pl-5 text-sm">
							<li
								v-for="r in related"
								:key="r.to"
							>
								<ULink
									:to="r.to"
									class="hover:underline"
								>
									{{ r.label }}
								</ULink>
							</li>
						</ul>
					</div>

					<div class="flex items-center justify-end gap-2 text-sm text-muted">
						<UButton
							size="sm"
							variant="link"
							color="neutral"
							label="Copy link"
							@click="copyToClipboard(articleLink, 'Article link copied to clipboard')"
						/>
					</div>
					<UContentSurround :surround />
				</UPageBody>
			</UPage>
		</UContainer>
	</UMain>
</template>

<script setup lang="ts">
import { findPageBreadcrumb, mapContentNavigation } from '#ui-pro/utils/content'
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
	queryCollection('blog').path(route.path).first()
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
	queryCollectionItemSurroundings('blog', route.path, {
		fields: ['description']
	})
)

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))
const blogNavigation = computed(() => navigation.value.find(item => item.path === '/blog')?.children || [])

const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(blogNavigation?.value, page.value)).map(({ icon, ...link }) => link))

if (page.value.image) {
	defineOgImage({ url: page.value.image })
} else {
	defineOgImageComponent('Blog', {
		headline: breadcrumb.value.map(item => item.label).join(' > ')
	}, {
		fonts: ['Geist:400', 'Geist:600']
	})
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

// Extended meta (schema augmentation isn't reflected in current type until generated)
type RelatedLink = { label: string, to: string }
const tags = computed<string[]>(() => ((page.value as any)?.tags as string[]) || [])
const related = computed<RelatedLink[]>(() => ((page.value as any)?.related as RelatedLink[]) || [])

useSeoMeta({
	title,
	description,
	ogDescription: description,
	ogTitle: title
})

const articleLink = computed(() => `${window?.location}`)

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	})
}
</script>
