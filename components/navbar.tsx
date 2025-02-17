import Link from "next/link"
import { Button } from "@/components/ui/button"

const Navbar = () => {
	return (
		<nav className="border-b">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				<Link href="/" className="font-semibold text-lg">
					Carl Peaslee
				</Link>
				<div className="space-x-4">
					<Button variant="ghost" asChild>
						<Link href="/about">About</Link>
					</Button>
					<Button variant="ghost" asChild>
						<Link href="/posts">Posts</Link>
					</Button>
					<Button variant="ghost" asChild>
						<Link href="/contact">Contact</Link>
					</Button>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
