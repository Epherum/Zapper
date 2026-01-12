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

const logoVariants = {
  expanded: {
    x: 0,
    transition: {
      type: "spring", stiffness: 300, damping: 30
    },
  },
  collapsed: {
    x: 0,
    transition: {
      type: "spring", stiffness: 300, damping: 30
    },
  },
};

const logoTextVariants = {
  visible: {
    opacity: 1,
    width: "auto",
    display: "inline-block",
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    width: 0,
    transitionEnd: {
      display: "none",
    },
    transition: {
      duration: 0.2,
    },
  },
};

const sidebarVariants = {
  expanded: {
    width: "min(18rem, 15vw)",
    boxShadow: "0 18px 40px rgba(0, 0, 0, 0.12)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  collapsed: {
    width: "min(5.4rem, 4.4vw)",
    boxShadow: "none",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const labelVariants = {
  visible: {
    opacity: 1,
    x: 0,
    display: "inline-block",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  hidden: {
    opacity: 0,
    x: 0,
    transitionEnd: {
      display: "none",
    },
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export { logo, menuItems, menuItem, labelVariants, sidebarVariants, logoVariants, logoTextVariants };
