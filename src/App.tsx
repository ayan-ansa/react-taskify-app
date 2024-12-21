import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | string>("");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, todo: inputValue } : todo
        )
      );
      setEditId("");
      setInputValue("");
      return;
    }
    if (inputValue) {
      setTodos([
        ...todos,
        { id: Date.now(), todo: inputValue, isCompleted: false },
      ]);
      setInputValue("");
    }else{
      alert("Please enter a task")
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    let active = [...todos];
    let completed = [...completedTodos];
    let movedItem;

    if (source.droppableId === "TodosList") {
      movedItem = active[source.index];
      active.splice(source.index, 1);
    } else {
      movedItem = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, movedItem);
    } else {
      completed.splice(destination.index, 0, movedItem);
    }

    setTodos(active);
    setCompletedTodos(completed);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <h1>Taskify</h1>
        <InputField
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
        />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          setInputValue={setInputValue}
          setEditId={setEditId}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
