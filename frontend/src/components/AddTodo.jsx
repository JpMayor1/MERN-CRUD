import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";

const AddTodo = () => {
    const [text, setText] = useState("");
    const todoId = useSelector((state) => state.user.todoId);
    const token = useSelector((state) => state.user.token);

    const addTodo = async () => {
        await axios
            .post(
                `http://localhost:5000/todos/add`,
                {
                    todoId,
                    text,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(
                () =>
                    toast.success("Todo added!") &&
                    setTimeout(() => {
                        window.location.reload();
                    }, 800)
            )
            .catch((err) =>
                toast.error(err.response.data.message, {
                    duration: 1000,
                })
            );
    };

    return (
        <div className="px-1">
            <div className="flex gap-2 max-w-[420px] w-full h-fit bg-light-primary2 rounded-3xl p-3 dark:bg-dark-primary2">
                <input
                    type="text"
                    name="addtodo"
                    id="addtodo"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-dark focus:outline-none focus:ring focus:ring-light-primary2 bg-light-primary2 sm:text-sm sm:leading-6 dark:focus:ring-dark-primary2 dark:bg-dark-primary2"
                    placeholder="Ex. Buy Groceries"
                />
                <button
                    className="bg-light-primary1 hover:bg-light-primary2 border border-light-primary1 py-1 px-1 rounded-lg w-32 dark:bg-gradient-bg-dark1 dark:text-light dark:hover:bg-dark-primary2 dark:border-gradient-bg-dark1 hover:dark:text-gradient-bg-dark1"
                    onClick={addTodo}
                >
                    Add List
                </button>
            </div>
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: "green",
                            color: "white",
                        },
                    },
                    error: {
                        style: {
                            background: "red",
                            color: "white",
                        },
                    },
                }}
            />
        </div>
    );
};

export default AddTodo;
