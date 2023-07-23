// Todos.js
// import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import SingleTodo from "./SingleTodo";
import { useSelector } from "react-redux";
import { fetchTodos } from "../redux/store/todoSlice";
import { useDispatch } from "react-redux";

const Todos = () => {
    const [completed, setCompleted] = useState(0);
    const todos = useSelector((state) => state.todo.todos);
    const todoId = useSelector((state) => state.user.todoId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos(todoId));
    }, [todoId, dispatch]);

    useEffect(() => {
        if (todos) {
            const completedTodos = todos.filter(
                (todo) => todo.completed === false
            );
            setCompleted(completedTodos.length);
        }
    }, [todos]);

    return (
        <div className="max-w-[420px] w-full h-fit text-center px-2">
            <ul className="flex flex-col items-start gap-3">
                {todos.map((todo) => (
                    <SingleTodo
                        key={todo._id}
                        id={todo._id}
                        text={todo.text}
                        completed={todo.completed}
                    />
                ))}
            </ul>
            <p className="my-10 flex items-center justify-center gap-2 dark:text-light">
                <AiOutlineBell />
                <i className="cursor-default">
                    you have {completed} left todos!
                </i>
            </p>
        </div>
    );
};

export default Todos;
