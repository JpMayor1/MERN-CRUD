import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import SingleTodo from "./SingleTodo";
import { useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";

const Todos = () => {
    const todoId = useSelector((state) => state.user.todoId);
    const [todos, setTodos] = useState([]);
    const [completed, setCompleted] = useState(0);
    const [isloading, setIsLoading] = useState(false);
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        setIsLoading(true);
        const getTodos = async () => {
            await axios
                .get(`http://localhost:5000/todos/${todoId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => setTodos(res.data))
                .catch((err) => console.log(err));
        };
        getTodos();
        setIsLoading(false);
    }, [todoId, token]);

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
            {isloading ? (
                <BeatLoader color="#36d7b7" />
            ) : (
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
            )}
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
