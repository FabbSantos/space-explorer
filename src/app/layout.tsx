import './globals.css'

// export const metadata: Metadata = {
//   title: 'Space Explorer',
//   description: 'Explore o universo em seu navegador',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}