const delay = 0;

const profile = {
  hidden: { y: 5, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.2 + delay,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const profileItem = {
  hidden: { y: 5, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
};
const overview = {
  hidden: { y: 5, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.3 + delay,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const overviewItem = {
  hidden: { y: 5, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
};

const projectsHeadline = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.4 + delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const projects = {
  //staggered
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.5 + delay,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const projectItem = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
};

const divider = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.4 + delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export {
  profile,
  profileItem,
  overview,
  overviewItem,
  projectsHeadline,
  projects,
  projectItem,
  divider,
};
