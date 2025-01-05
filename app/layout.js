import "./globals.css";
import { Quicksand } from 'next/font/google'
import { ThemeProvider } from "../components/ui/theme-provider";

const quicksand = Quicksand({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${quicksand.className} antialiased`}>
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
