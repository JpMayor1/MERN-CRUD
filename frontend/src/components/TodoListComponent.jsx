import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import TodoListItemComponent from "./TodoListItemComponent";

const TodoListComponent = () => {
    const [todo, setTodo] = useState([]);
    const [todoId, setTodoId] = useState("");
    const [todos, setTodos] = useState(0);

    useEffect(() => {
        const username = localStorage.getItem("username");

        const getTodoId = async () => {
            try {
                await axios
                    .get(`http://localhost:5000/user/${username}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    })
                    .then((res) => {
                        setTodoId(res.data);
                    });
            } catch (error) {
                console.log(error);
            }
        };

        const getTodo = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/todos/${todoId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                setTodo(res.data);

                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].completed === false) {
                        setTodos((prev) => prev + 1);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        getTodoId();
        getTodo();
    }, [todoId]);
    return (
        <div className="max-w-[420px] w-full h-fit text-center px-2">
            <ul className="flex flex-col items-start gap-3">
                {todo.map((todo) => (
                    <TodoListItemComponent
                        key={todo._id}
                        id={todo._id}
                        completed={todo.completed}
                        text={todo.text}
                    />
                ))}
            </ul>
            <p className="my-10 flex items-center justify-center gap-2 dark:text-light">
                <AiOutlineBell />
                <i className="cursor-default">you have {todos} left todos!</i>
            </p>
        </div>
    );
};

export default TodoListComponent;
