import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import StoreProvider from "./redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FreshFix",
  description: "Ordering restaurant app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <StoreProvider>
          <NavBar />
          {children}
        </StoreProvider>
        {/* <Footer />? */}
      </body>
    </html>
  );
}