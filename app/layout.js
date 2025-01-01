import "./globals.css";
import { Quicksand } from 'next/font/google'

const urbanist = Quicksand({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
