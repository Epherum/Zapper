import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import Menu from "@/components/Menu";
import Search from "@/components/Search";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
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
        <Component {...pageProps} />
      </div>
    </main>
  );
}
