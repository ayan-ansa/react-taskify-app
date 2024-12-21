import { MdDone } from "react-icons/md";
import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setEditId: React.Dispatch<React.SetStateAction<string | number>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};
const TodoItem = ({
  index,
  todo,
  todos,
  setTodos,
  setEditId,
  setInputValue,
}: Props) => {
  const handleComplete = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };
  const handleDelete = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id != id));
  };
  const handleEdit = (id: number): void => {
    const item: Todo | undefined = todos.find((item) => item.id === id);

    if (item) setInputValue(item.todo);
    setEditId(id);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided,snapshot) => (
        <div
          className={`todo ${snapshot.isDragging?"drag":""}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p className={`${todo.isCompleted ? "complete" : ""}`}>{todo.todo}</p>
          <div className="icons">
            <span onClick={() => handleEdit(todo.id)}>
              <AiFillEdit />
            </span>
            <span onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span onClick={() => handleComplete(todo.id)}>
              <MdDone />
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;
