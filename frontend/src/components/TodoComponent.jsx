import axios from "axios";
import { useState } from "react";
const TodoComponent = () => {
    const userId = localStorage.getItem("userId");
    const [text, setText] = useState("");

    const addTodo = async () => {
        try {
            await axios.post("http://localhost:5000/todos/add", {
                userId,
                text,
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex gap-2 max-w-[500px] min-w-[300px] w-[450px] h-fit bg-light-primary2 rounded-3xl p-3 dark:bg-dark-primary2">
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
        </div>
    );
};

export default TodoComponent;
