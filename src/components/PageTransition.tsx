import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion, useAnimationControls } from "framer-motion";

export default function PageTransition({ children }: any) {
  const router = useRouter();

  /* Animation settings */
  const ANIMATION_DURATION = 0.3;
  const controls = useAnimationControls();
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const transition = {
    duration: ANIMATION_DURATION,
  };

  useEffect(() => {
    /* On click, animate exit and push new route */
    const handleLinkClick = async (event: any) => {
      await controls.start("hidden");

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
      controls.start("visible");
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
      variants={variants}
      initial="visible"
      animate={controls}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
