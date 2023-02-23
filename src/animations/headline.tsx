const delay = 0;

const headline = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1 + delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const crumbs = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0 + delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const buttons = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2 + delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export { crumbs, headline, buttons };
