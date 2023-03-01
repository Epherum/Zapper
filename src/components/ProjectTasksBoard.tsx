import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@/components/dragAndDrop";
import { v4 as uuid } from "uuid";
import styles from "@/styles/projectTasks.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { BsCircleHalf } from "react-icons/bs";
import { TbCircleDotted } from "react-icons/tb";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Link from "@/components/Link";
import { tasksData } from "@/data/mockData";
import Image from "next/image";

const boardColumns = {
  [uuid()]: {
    name: "To do",
    items: tasksData.filter((item) => item.status === "To do"),
  },
  [uuid()]: {
    name: "In progress",
    items: tasksData.filter((item) => item.status === "In progress"),
  },
  [uuid()]: {
    name: "Backlog",
    items: tasksData.filter((item) => item.status === "Backlog"),
  },
  [uuid()]: {
    name: "Done",
    items: tasksData.filter((item) => item.status === "Done"),
  },
};

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function App() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);
  const [columns, setColumns] = useState(boardColumns);
  return (
    <main>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {isBrowser ? (
          <div className={styles.board}>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div className={styles.column} key={columnId}>
                  <div className={styles.columnHeadline}>
                    <div className={styles.columnHeadlineLeftSide}>
                      <p>
                        {index === 0 ? (
                          <BsCircle />
                        ) : index === 1 ? (
                          <BsCircleHalf />
                        ) : index === 2 ? (
                          <TbCircleDotted />
                        ) : index === 3 ? (
                          <AiOutlineCheckCircle />
                        ) : (
                          <BsCircle />
                        )}
                      </p>
                      <h2>{column.name}</h2>
                      <p>{"(2)"}</p>
                    </div>
                    <AiOutlinePlus />
                  </div>

                  {/* <div> */}
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={styles.columnContent}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={styles.columnContentItem}
                                      style={{
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <div className={styles.itemTopHalf}>
                                        <Link href="/projects/missguided/LG-12">
                                          {item.title}
                                        </Link>
                                        <p>{item.idd}</p>
                                      </div>
                                      <div className={styles.itemBottomHalf}>
                                        <div
                                          className={styles.itemPriorityAndDate}
                                        >
                                          <p
                                            style={{
                                              backgroundColor:
                                                item.priority === "high"
                                                  ? "#FF8080"
                                                  : item.priority === "medium"
                                                  ? "#FFE0B2"
                                                  : "#DFFFDE",
                                            }}
                                          >
                                            {item.priority}
                                          </p>
                                          <p>{item.date}</p>
                                        </div>
                                        <div className={styles.members}>
                                          {[
                                            "/profile1.png",
                                            "/profile2.png",
                                          ].map((item, index) => (
                                            <Image
                                              key={index}
                                              src={item}
                                              width={35}
                                              height={35}
                                              alt="Picture of the author"
                                              className={styles.member}
                                            />
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                  {/* </div> */}
                </div>
              );
            })}
          </div>
        ) : null}
      </DragDropContext>
    </main>
  );
}

export default App;
