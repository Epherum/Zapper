const delay = 0;

const filters = {
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

const filterItem = {
  hidden: { y: 5, opacity: 0 },
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
      delay: 0.1 + delay,
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
      delayChildren: 0.2 + delay,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const taskItem = {
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
  //scale up
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

export { filters, filterItem, tasksHeadline, tasks, taskItem, divider };
