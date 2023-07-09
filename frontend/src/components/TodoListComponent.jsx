import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import TodoListItemComponent from "./TodoListItemComponent";

const TodoListComponent = () => {
    const [result, setResult] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = localStorage.getItem("userId");
                const res = await axios.get(
                    `http://localhost:5000/todos/${userId}`
                );
                setResult(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);
    return (
        <div className="max-w-[500px] min-w-[300px] w-[450px] h-fit text-center">
            <ul className="flex flex-col items-start gap-3">
                {result.map((item) => (
                    <TodoListItemComponent
                        key={item._id}
                        id={item._id}
                        item={item.text}
                    />
                ))}
            </ul>
            <p className="my-10 flex items-center justify-center gap-2 text-xl">
                <AiOutlineBell />
                <span className="cursor-default">
                    you have {result.length} left todos!
                </span>
            </p>
        </div>
    );
};

export default TodoListComponent;
