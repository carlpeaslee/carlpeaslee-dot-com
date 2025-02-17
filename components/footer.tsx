import { Github, Linkedin, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

const Footer = () => {
	const socialLinks = [
		{
			icon: Github,
			href: "https://github.com/carlpeaslee",
			label: "GitHub",
		},
		{
			icon: Linkedin,
			href: "https://linkedin.com/in/carlpeaslee",
			label: "LinkedIn",
		},
		{
			icon: Twitter,
			href: "https://x.com/carlpeaslee",
			label: "X",
		},
		{
			icon: Instagram,
			href: "https://instagram.com/carlpeaslee",
			label: "Instagram",
		},
		{
			icon: Youtube,
			href: "https://youtube.com/@carlpeaslee",
			label: "YouTube",
		},
	]

	return (
		<footer className="border-t py-8 mt-auto">
			<div className="container mx-auto px-4">
				<div className="flex justify-center space-x-6">
					{socialLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-600 hover:text-gray-900 transition-colors"
							aria-label={link.label}
						>
							<link.icon className="h-6 w-6" />
						</Link>
					))}
				</div>
				<div className="text-center mt-4 text-sm text-gray-600">
					© {new Date().getFullYear()} Carl Peaslee. All rights reserved.
				</div>
			</div>
		</footer>
	)
}

export default Footer
