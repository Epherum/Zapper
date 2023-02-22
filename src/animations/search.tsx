const delay = 0;

const search = {
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

const icons = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3 + delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export { search, icons };
