const delay = 0;

const logo = {
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

const menuItems = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      delayChildren: 0.1 + delay,
      staggerChildren: 0.1,
    },
  },
};

const menuItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export { logo, menuItems, menuItem };
