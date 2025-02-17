import Link from "next/link"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { getAllPosts } from "@/lib/posts"

export default async function PostsPage() {
	const posts = getAllPosts()

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<Card key={post.slug} className="hover:bg-muted/50 transition-colors">
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
		</div>
	)
}
