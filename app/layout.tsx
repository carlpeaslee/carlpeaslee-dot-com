import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Carl Peaslee",
	description: "Personal blog and portfolio of Carl Peaslee",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen flex flex-col`}>
				<Navbar />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
