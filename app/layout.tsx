import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppWrapper } from "@/components/app-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sr Lomo - Pedidos Online",
  description: "Delicias auténticas con identidad propia. Pedí online tus lomos, burgers, empanadas y pizzas.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AppWrapper>{children}</AppWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
