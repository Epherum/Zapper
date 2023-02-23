import { v4 as uuid } from "uuid";

export const overviewData = [
  {
    title: "Completed Tasks",
    tasks: "42",
    color: "#28BFFF",
    backgroundColor: "#E5F7FF",
    display: "flex",
  },
  {
    title: "Incompleted Tasks",
    tasks: "12",
    color: "#7164C6",
    backgroundColor: "#EFEDF9",
    display: "flex",
  },
  {
    title: "Overdue Tasks",
    tasks: "5",
    color: "#2DA757",
    backgroundColor: "#E7F5EC",
    display: "flex",
  },
  {
    title: "Total Tasks",
    tasks: "59",
    color: "#28BFFF",
    backgroundColor: "#E5F7FF",
    display: "none",
  },
];
export const tasksData = [
  {
    id: "1",
    title: "Logo design",
    idd: "ID LG-12",
    status: "To do",
    priority: "low",
    members: "John Doe",
    description:
      "Create storyboards that depict the script and narrative. Craft a dynamic portfolio ond reel.",
    date: "Jul 12 - Jul 17",
  },

  {
    id: "2",
    title: "Dashboard animations",
    idd: "ID LG-12",
    status: "Backlog",
    priority: "low",
    members: "John Doe",
    description:
      "Create storyboards that depict the script and narrative. Craft a dynamic portfolio ond reel.",
    date: "Jul 12 - Jul 17",
  },

  {
    id: "3",
    title: "Android app",
    idd: "ID LG-12",
    status: "Backlog",
    priority: "low",
    members: "John Doe",
    description:
      "Create storyboards that depict the script and narrative. Craft a dynamic portfolio ond reel.",
    date: "Jul 12 - Jul 17",
  },

  {
    id: "4",
    title: "IOS app",
    idd: "ID LG-12",
    status: "To do",
    priority: "high",
    members: "John Doe",
    description:
      "Create storyboards that depict the script and narrative. Craft a dynamic portfolio ond reel.",
    date: "Jul 12 - Jul 17",
  },

  {
    id: "5",
    title: "Circle color",
    idd: "ID LG-12",
    status: "Done",
    priority: "high",
    members: "John Doe",
    description:
      "Create storyboards that depict the script and narrative. Craft a dynamic portfolio ond reel.",
    date: "Jul 12 - Jul 17",
  },

  {
    id: "6",
    title: "App speed",
    idd: "ID LG-12",
    status: "In progress",
    priority: "high",
    members: "John Doe",
    description:
      "Create storyboards that depict the script and narrative. Craft a dynamic portfolio ond reel.",
    date: "Jul 12 - Jul 17",
  },

  {
    id: "7",
    title: "Dashboard colors",
    idd: "ID LG-12",
    status: "In progress",
    priority: "medium",
    members: "John Doe",
    description:
      "Create storyboards that depict the script and narrative. Craft a dynamic portfolio ond reel.",
    date: "Jul 12 - Jul 17",
  },

  {
    id: "8",
    title: "Task modal",
    idd: "ID LG-12",
    status: "In progress",
    priority: "medium",
    members: "John Doe",
    description:
      "Create storyboards that depict the script and narrative. Craft a dynamic portfolio ond reel.",
    date: "Jul 12 - Jul 17",
  },
];

export const projectsData = [
  {
    title: "Zara",
    tasks: 13,
    overdue: 4,
    date: "Jul 2 - Jul 16",
    status: "Active",
    manager: "Michael Scott",
    startDate: "Jul 13, 2023",
    targetDate: "Oct 20, 2023",
    members: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam sequi mollitia amet iste commodi velit ad ab totam veritatis accusantium.",
  },
  {
    title: "Burger King",
    tasks: 11,
    overdue: 2,
    date: "Jul 2 - Jul 16",
    status: "Active",
    manager: "Michael Scott",
    startDate: "Jul 13, 2023",
    targetDate: "Oct 20, 2023",
    members: "John Doe",
    description:
      "Lsssssssssssorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam sequi mollitia amet iste commodi velit ad ab totam veritatis accusantium.",
  },
  {
    title: "Luminous Group",
    tasks: 9,
    overdue: 1,
    date: "Jul 2 - Jul 16",
    status: "Active",
    manager: "Michael Scott",
    startDate: "Jul 13, 2023",
    targetDate: "Oct 20, 2023",
    members: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam sequi mollitia amet iste commodi velit ad ab totam veritatis accusantium.",
  },
  {
    title: "Missguided",
    tasks: 9,
    overdue: 1,
    date: "Jul 2 - Jul 16",
    status: "Active",
    manager: "Michael Scott",
    startDate: "Jul 13, 2023",
    targetDate: "Oct 20, 2023",
    members: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam sequi mollitia amet iste commodi velit ad ab totam veritatis accusantium.",
  },
  {
    title: "Paramount pictures",
    tasks: 9,
    overdue: 1,
    date: "Jul 2 - Jul 16",
    status: "Active",
    manager: "Michael Scott",
    startDate: "Jul 13, 2023",
    targetDate: "Oct 20, 2023",
    members: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam sequi mollitia amet iste commodi velit ad ab totam veritatis accusantium.",
  },
];
export const chartData = () => {
  return {
    labels: [
      "Jul 6",
      "Jul 8",
      "Jul 10",
      "Jul 12",
      "Jul 14",
      "Jul 16",
      "Jul 18",
    ],
    datasets: [
      {
        label: "Users Lost",
        data: [0, 5, 10, 5, 30, 15, 10, 5, 0, 5],
        borderColor: "rgba(0,0,0, 0.9)",
        borderWidth: 1.5,
        backgroundColor: "transparent",
        borderCapStyle: "round",
        pointBackgroundColor: "black", // set the color of the filled dot
        pointBorderColor: "black",
        pointRadius: 0,
        pointHitRadius: 100,
        tension: 0.5,
      },
      {
        label: "Users Gained",
        data: [0, 10, 5, 30, 20, 25, 10],
        borderColor: "black",
        borderWidth: 0,
        borderCapStyle: "round",
        pointBackgroundColor: "#9bffbf", // set the color of the filled dot
        pointBorderColor: "black",
        pointRadius: 0,
        pointHitRadius: 100,
        tension: 0.5,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 500);
          gradient.addColorStop(1, "rgba(255,255,255, 0)");
          gradient.addColorStop(0.9, "rgba(255,255,255, 0)");
          gradient.addColorStop(0.8, "rgba(255,255,255, 0)");
          gradient.addColorStop(0.7, "rgba(255,255,255, 0)");
          gradient.addColorStop(0.6, "rgba(255,255,255, 0)");
          gradient.addColorStop(0.5, "rgba(255,255,255, 0)");
          gradient.addColorStop(0.4, "rgba(255,255,255, 0)");
          gradient.addColorStop(0.1, "rgba(155, 255, 191, 1)");
          gradient.addColorStop(0, "rgba(155, 255, 191, 1)");
          return gradient;
        },
      },
    ],
  };
};
