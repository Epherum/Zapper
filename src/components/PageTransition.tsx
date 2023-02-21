import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion, useAnimationControls } from "framer-motion";

export default function PageTransition({ children }: any) {
  const router = useRouter();
  const [variantOne, VariantOne] = useState(true);

  /* Animation settings */
  const ANIMATION_DURATION = 0.3;
  const controls = useAnimationControls();
  const variants1 = {
    hidden: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    reset: { opacity: 0, x: -20, transition: { duration: 0 } },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };
  const variants2 = {
    hidden: { y: 100 },
    visible: { y: 0 },
  };
  const transition = {
    duration: ANIMATION_DURATION,
  };

  useEffect(() => {
    /* On click, animate exit and push new route */
    const handleLinkClick = async (event: any) => {
      await controls.start("exit");

      if (event.detail.replace) {
        router.replace(event.detail.href, undefined, {
          shallow: event.detail.shallow,
        });
      } else {
        router.push(event.detail.href, undefined, {
          shallow: event.detail.shallow,
        });
      }
    };

    /* After route change complete, animate enter */
    const handleRouteChangeComplete = () => {
      controls.start("reset").then(() => {
        controls.start("visible");
      });
    };

    /* Event listeners */
    document.addEventListener("onLinkClicked", handleLinkClick);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      document.removeEventListener("onLinkClicked", handleLinkClick);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return (
    <motion.div
      variants={variantOne ? variants1 : variants2}
      initial="visible"
      animate={controls}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
