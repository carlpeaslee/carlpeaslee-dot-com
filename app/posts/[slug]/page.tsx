import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

export async function generateStaticParams() {
	const posts = getAllPosts()
	return posts.map((post) => ({
		slug: post.slug,
	}))
}
type Params = Promise<{ slug: string }>

export default async function PostPage({
	params,
}: {
	params: Params
}) {
	const { slug } = await params
	const post = getPostBySlug(slug)

	if (!post) {
		notFound()
	}

	return (
		<article className="container mx-auto px-4 py-8">
			<header className="mb-8">
				<h1 className="text-4xl font-bold mb-2">{post.title}</h1>
				<p className="text-xl text-muted-foreground mb-4">{post.description}</p>
				<time className="text-sm text-muted-foreground">
					{new Date(post.date).toLocaleDateString()}
				</time>
			</header>
			<div className="prose dark:prose-invert lg:prose-xl max-w-none">
				<MDXRemote source={post.content} />
			</div>
		</article>
	)
}
