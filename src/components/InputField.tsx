import { useRef } from "react";

interface Props {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
 
}

const InputField = ({ inputValue, setInputValue, handleSubmit}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <form
      className="todo-form"
      onSubmit={(e) => {
        handleSubmit(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter a task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default InputField;
