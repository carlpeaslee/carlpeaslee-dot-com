import Link from "next/link"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { getFeaturedPost, getRecentPosts } from "@/lib/posts"

export default function Home() {
	const featuredPost = getFeaturedPost()
	const recentPosts = getRecentPosts().slice(1)

	return (
		<div className="container mx-auto px-4 py-8 space-y-8">
			{/* Introduction */}
			<section className="prose dark:prose-invert lg:prose-xl max-w-none">
				<p className="lead">
					Software engineer, writer, co-founder and ceo at{" "}
					<Link href="https://loopwork.com">Loopwork</Link>.
				</p>
			</section>

			{/* Featured Post */}
			{featuredPost && (
				<section>
					<h2 className="text-2xl font-bold mb-4">Featured Post</h2>
					<Card className="hover:bg-muted/50 transition-colors">
						<Link href={`/posts/${featuredPost.slug}`}>
							<CardHeader>
								<CardTitle>{featuredPost.title}</CardTitle>
								<CardDescription>{featuredPost.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<time className="text-sm text-muted-foreground">
									{new Date(featuredPost.date).toLocaleDateString()}
								</time>
							</CardContent>
						</Link>
					</Card>
				</section>
			)}

			{/* Recent Posts */}
			<section>
				<h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
				<div className="grid gap-4 md:grid-cols-2">
					{recentPosts.map((post) => (
						<Card
							key={post.slug}
							className="hover:bg-muted/50 transition-colors"
						>
							<Link href={`/posts/${post.slug}`}>
								<CardHeader>
									<CardTitle>{post.title}</CardTitle>
									<CardDescription>{post.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<time className="text-sm text-muted-foreground">
										{new Date(post.date).toLocaleDateString()}
									</time>
								</CardContent>
							</Link>
						</Card>
					))}
				</div>
			</section>
		</div>
	)
}
