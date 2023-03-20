const delay = 0;

const title = {
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
const subtitle = {
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

const overview = {
  //staggered
  hidden: { y: 20, opacity: 0 },
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

const overviewItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,

    transition: {
      ease: "easeOut",
    },
  },
};
const tasksHeadline = {
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

const tasks = {
  //staggered
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.5 + delay,
      staggerChildren: 0.2,
      ease: "easeOut",
    },
  },
};

const taskItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.6 + delay,
      ease: "easeOut",
    },
  },
};

const chartHeadline = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5 + delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
const chart = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.6 + delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const progress = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.7 + delay,
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
      delayChildren: 1 + delay,
      staggerChildren: 0.1,
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
      delay: 0.9 + delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const projectItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
};

export {
  title,
  subtitle,
  buttons,
  overview,
  overviewItem,
  tasks,
  taskItem,
  projects,
  projectItem,
  chart,
  chartHeadline,
  progress,
  tasksHeadline,
  projectsHeadline,
};
