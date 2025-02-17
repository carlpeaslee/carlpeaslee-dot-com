import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="prose dark:prose-invert lg:prose-xl max-w-none mb-8">
				<h1>Contact</h1>
				<p>
					Feel free to reach out to me via email or through any of my social
					media profiles linked below.
				</p>
			</div>

			<div className="flex items-center gap-4">
				<Mail className="h-5 w-5" />
				<a
					href="mailto:carl@peaslee.co"
					className="text-lg hover:underline hover:text-primary transition-colors"
				>
					carl@peaslee.co
				</a>
			</div>
		</div>
	)
}
