import { deleteDoc } from "firebase/firestore";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto shadow-xl p-4`,
  heading: `text-3xl font-bold text-center p-2 text-gray-800 mb-4`,
  form: `flex justify-between`,
  input: `w-full p-2 border text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};
function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodo(todosArr);
    });
    return () => unsubscribe();
  }, []);
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Todo"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todo.map((item, index) => {
            return (
              <Todo
                key={index}
                todo={item}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </ul>
        {todo.length < 1 ? null : (
          <p className={style.count}>You have {todo.length} todos</p>
        )}
      </div>
    </div>
  );
}

export default App;
