import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import Menu from "@/components/Menu";
import Search from "@/components/Search";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });
import PageTransition from "@/components/PageTransition";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <main className={inter.className}>
      <div
        style={{
          maxWidth: "1920px",
          margin: "0 auto",
        }}
      >
        <Menu />
        <Search />
        <PageTransition mode="wait">
          <motion.div key={router.route}>
            <Component {...pageProps} />
          </motion.div>
        </PageTransition>
      </div>
    </main>
  );
}
