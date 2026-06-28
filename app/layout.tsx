import './globals.css'

export const metadata = {
  title: 'Math Quest: Wang Tahun 4',
  description: 'Interactive math game for Year 4 students about money.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ms">
      <body>{children}</body>
    </html>
  )
}
