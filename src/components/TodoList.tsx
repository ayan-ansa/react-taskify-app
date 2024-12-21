import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setEditId: React.Dispatch<React.SetStateAction<string | number>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList = ({
  todos,
  setTodos,
  setEditId,
  setInputValue,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`active_task_container ${
              snapshot.isDraggingOver ? "dragactive" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="heading_text">Active Task</span>
            {todos.map((todo, index) => (
              <TodoItem
                index={index}
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                setEditId={setEditId}
                setInputValue={setInputValue}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`completed_task_container ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="heading_text">Completed Task</span>

            {completedTodos.map((todo, index) => (
              <TodoItem
                index={index}
                key={todo.id}
                todo={todo}
                todos={completedTodos}
                setTodos={setCompletedTodos}
                setEditId={setEditId}
                setInputValue={setInputValue}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
