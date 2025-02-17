import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts")

export type Post = {
	slug: string
	title: string
	description: string
	date: string
	featured?: boolean
	content: string
}

export function getAllPosts(): Post[] {
	const fileNames = fs.readdirSync(postsDirectory)
	const allPosts = fileNames
		.filter((fileName) => fileName.endsWith(".mdx"))
		.map((fileName) => {
			const slug = fileName.replace(/\.mdx$/, "")
			const fullPath = path.join(postsDirectory, fileName)
			const fileContents = fs.readFileSync(fullPath, "utf8")
			const { data, content } = matter(fileContents)

			return {
				slug,
				title: data.title,
				description: data.description,
				date: data.date,
				featured: data.featured || false,
				content,
			}
		})

	return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getFeaturedPost(): Post | null {
	const posts = getAllPosts()
	return posts.find((post) => post.featured) || null
}

export function getRecentPosts(count: number = 2): Post[] {
	const posts = getAllPosts()
	return posts.slice(0, count)
}

export function getPostBySlug(slug: string): Post | null {
	try {
		const fullPath = path.join(postsDirectory, `${slug}.mdx`)
		const fileContents = fs.readFileSync(fullPath, "utf8")
		const { data, content } = matter(fileContents)

		return {
			slug,
			title: data.title,
			description: data.description,
			date: data.date,
			featured: data.featured || false,
			content,
		}
	} catch {
		return null
	}
}
