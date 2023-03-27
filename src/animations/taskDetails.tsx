const delay = 0;

const filters = {
  hidden: { y: 10, opacity: 0 },
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
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
};

const taskInfoHeadline = {
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
const description = {
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
const substasksHeadline = {
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
const subtasks = {
  hidden: { y: 5, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.7 + delay,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const subtasksItem = {
  hidden: { y: 5, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
};

const activityHeadline = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.8 + delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
const activity = {
  hidden: { y: 5, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.9 + delay,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const activityItem = {
  hidden: { y: 5, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
};

const commentAni = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1 + delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
const taskDetailsHeadline = {
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

const taskDetails = {
  //staggered
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.4 + delay,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const taskDetailsItem = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
};

const editButton = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.7 + delay,
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const deleteButton = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.8 + delay,
      duration: 0.3,
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
      delay: 0.3 + delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export {
  filters,
  filterItem,
  taskInfoHeadline,
  description,
  substasksHeadline,
  subtasks,
  subtasksItem,
  activityHeadline,
  activity,
  activityItem,
  commentAni,
  taskDetailsHeadline,
  taskDetails,
  taskDetailsItem,
  editButton,
  deleteButton,
  divider,
};
