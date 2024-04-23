import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import StoreProvider from "./redux/StoreProvider";
import Footer from "./components/Footer";
import MessageBox from "./components/MessageBox";
import Navbar from "./components/navbar/Navbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FreshFix",
  description: "Ordering restaurant app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <AppRouterCacheProvider>
          <StoreProvider>
            <NavBar />
            <Navbar />
            <MessageBox />
            <div className="min-h-screen">{children}</div>
            <Footer />
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
