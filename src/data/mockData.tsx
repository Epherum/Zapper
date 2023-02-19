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
    title: "Logo design",
    id: "KL-2",
    description:
      "Create storyboards that depict the script and narrative. Craft a dynamic portfolio ond reel.",
    priority: "high",
    date: "Jul 2 - Jul 16",
    backgroundColor: "#FF8080",
  },
  {
    title: "Homepage illustration",
    id: "KL-2",
    description:
      "Create storyboards that depict the script and narrative. Craft a dynamic portfolio ond reel.",
    priority: "low",
    date: "Jul 2 - Jul 16",
    backgroundColor: "#FFE0B2",
  },
  {
    title: "Dashboard animations",
    id: "KL-2",
    description:
      "Create storyboards that depict the script and narrative. Craft a dynamic portfolio ond reel.",
    priority: "medium",
    date: "Jul 2 - Jul 16",
    backgroundColor: "#DFFFDE",
  },
  {
    title: "Circle progress",
    id: "KL-2",
    description:
      "Create storyboards that depict the script and narrative. Craft a dynamic portfolio ond reel.",
    priority: "high",
    date: "Jul 2 - Jul 16",
    backgroundColor: "#FF8080",
  },
];
export const projectsData = [
  {
    title: "Zara",
    tasks: 13,
    overdue: 4,
    date: "Jul 2 - Jul 16",
  },
  {
    title: "Burger King",
    tasks: 11,
    overdue: 2,
    date: "Jul 2 - Jul 16",
  },
  {
    title: "Luminous Group",
    tasks: 9,
    overdue: 1,
    date: "Jul 2 - Jul 16",
  },
  {
    title: "Missguided",
    tasks: 9,
    overdue: 1,
    date: "Jul 2 - Jul 16",
  },
  {
    title: "Paramount pictures",
    tasks: 9,
    overdue: 1,
    date: "Jul 2 - Jul 16",
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

export const boardTasks = [
  {
    id: uuid(),
    title: "Logo design",
    idd: "ID LG-12",
    status: "To do",
    priority: "medium",
    members: "John Doe",
    Date: "Jul 12 - Jul 17",
  },
  {
    id: uuid(),
    title: "Laptop screen blinks",
    idd: "ID LG-12",
    status: "Backlog",
    priority: "low",
    members: "John Doe",
    Date: "Jul 12 - Jul 17",
  },
  {
    id: uuid(),
    title: "First task",
    idd: "ID LG-12",
    status: "To do",
    priority: "high",
    members: "John Doe",
    Date: "Jul 12 - Jul 17",
  },
  {
    id: uuid(),
    title: "First task",
    idd: "ID LG-12",
    status: "In progress",
    priority: "high",
    members: "John Doe",
    Date: "Jul 12 - Jul 17",
  },
  {
    id: uuid(),
    title: "First task",
    idd: "ID LG-12",
    status: "To do",
    priority: "high",
    members: "John Doe",
    Date: "Jul 12 - Jul 17",
  },
  {
    id: uuid(),
    title: "First task",
    idd: "ID LG-12",
    status: "To do",
    priority: "high",
    members: "John Doe",
    Date: "Jul 12 - Jul 17",
  },
  {
    id: uuid(),
    title: "First task",
    idd: "ID LG-12",
    status: "To do",
    priority: "high",
    members: "John Doe",
    Date: "Jul 12 - Jul 17",
  },
  {
    id: uuid(),
    title: "First task",
    idd: "ID LG-12",
    status: "To do",
    priority: "high",
    members: "John Doe",
    Date: "Jul 12 - Jul 17",
  },
  {
    id: uuid(),
    title: "First task",
    idd: "ID LG-12",
    status: "To do",
    priority: "high",
    members: "John Doe",
    Date: "Jul 12 - Jul 17",
  },
];
