import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Menu from "@/components/Menu";
import Search from "@/components/Search";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import PageTransition from "@/components/PageTransition";
import styles from "@/styles/circles.module.scss";
import { circleBlue, circleGreen } from "@/animations/projects";

import { TaskDataProvider } from "@/contexts/TaskDataContext";
import { ProjectDataProvider } from "@/contexts/ProjectDataContext";
import ModalDim from "@/components/ModalDim";
import TaskOverlay from "@/components/TaskOverlay";
import ProjectOverlay from "@/components/ProjectOverlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
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

  const style = {
    //padding is only applied to the dashboard, to leave space for the menu and search
    padding: router.route.includes("/dashboard")
      ? "min(2.5rem, 2vw) min(4.2rem, 3.3vw) min(2rem, 1.6vw) min(11.3%, 11vw)"
      : "0",
    maxWidth: "1920px",
    margin: "0 auto",
    overflow: "hidden",
  };

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <main className={inter.className} style={style}>
          {router.route.includes("/dashboard") && (
            <div>
              <Menu />
              <Search />
            </div>
          )}

          <PageTransition mode="wait">
            <motion.div key={router.route}>
              {router.route.includes("/dashboard") && (
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
              <TaskDataProvider>
                <ProjectDataProvider>
                  <ModalDim />
                  <TaskOverlay />
                  <ProjectOverlay />
                  <Component {...pageProps} />
                </ProjectDataProvider>
              </TaskDataProvider>
            </motion.div>
          </PageTransition>
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
