import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import Menu from "@/components/Menu";
import Search from "@/components/Search";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import PageTransition from "@/components/PageTransition";
import styles from "@/styles/circles.module.scss";
import { circleBlue, circleGreen } from "@/animations/projects";
import { ModalDimProvider } from "@/contexts/ModalDimContext";
import ModalDim from "@/components/ModalDim";
import TaskOverlay from "@/components/TaskOverlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  //usestate is used to prevent the queryclient from being recreated on every render
  //this is important because it will stop the queryclient from losing its cache
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={inter.className}
        style={{
          maxWidth: "1920px",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <Menu />
        <Search />
        <PageTransition mode="wait">
          <motion.div key={router.route}>
            {router.route !== "/" && (
              <>
                <motion.div
                  variants={circleBlue}
                  initial="hidden"
                  animate="visible"
                  className={styles.circleBlue}
                />
                <motion.div
                  variants={circleGreen}
                  initial="hidden"
                  animate="visible"
                  className={styles.circleGreen}
                />
              </>
            )}
            <ModalDimProvider>
              <ModalDim />
              <TaskOverlay />
              <Component {...pageProps} />
            </ModalDimProvider>
          </motion.div>
        </PageTransition>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
