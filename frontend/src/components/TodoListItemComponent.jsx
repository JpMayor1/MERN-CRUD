import axios from "axios";
import { BiEditAlt, BiSave } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const TodoListItemComponent = ({ id, text, completed }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatedText, setUpdatedText] = useState(text);
    const [iscompleted, setIsCompleted] = useState(completed);

    const toggleComplete = () => {
        setIsCompleted(!iscompleted);
        if (iscompleted === true) {
            toast.error("Todo marked as incomplete!");
        } else {
            toast.success("Todo marked as complete!");
        }

        setTimeout(() => {
            window.location.reload();
        }, 1000); // 1 seconds delay
    };

    // Update completed
    useEffect(() => {
        const updateCompleted = async () => {
            try {
                await axios.put(
                    `http://localhost:5000/todos/update/completed/${id}`,
                    {
                        completed: iscompleted,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
            } catch (error) {
                console.log(error);
            }
        };
        updateCompleted();
    }, [iscompleted, id]);

    // Update text
    const onEdit = async () => {
        try {
            await axios.put(
                `http://localhost:5000/todos/update/${id}`,
                {
                    text: updatedText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            toast.success("Todo updated successfully!");
            setIsUpdating(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000); // 2 seconds delay
        } catch (error) {
            console.log(error);
        }
    };

    const onDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/todos/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success("Todo deleted successfully!");
            setTimeout(() => {
                window.location.reload();
            }, 1000); // 2 seconds delay
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <li className="w-full flex justify-between items-center bg-light-primary1 py-5 px-5 mb-3 rounded-3xl text-dark text-lg dark:bg-dark-primary1 dark:text-light">
                {isUpdating ? (
                    <input
                        type="text"
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                        className="w-[70%]
                        bg-light-primary1 dark:bg-dark-primary1 focus:outline-none focus:ring focus:ring-light-primary1 dark:focus:outline-none dark:focus:ring dark:focus:ring-dark-primary1 border-l-0 border-t-0 border-r-0 border-b-2 dark:border-b-gradient-bg-dark2 border-b-dark"
                    />
                ) : (
                    <div className="flex gap-2 items-center">
                        <input
                            type="checkbox"
                            onChange={toggleComplete}
                            checked={iscompleted}
                        />
                        <span>{text}</span>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    {isUpdating ? (
                        <button
                            onClick={onEdit}
                            className="flex items-center gap-1 text-xl dark:text-gradient-bg-dark2"
                        >
                            <BiSave /> Save
                        </button>
                    ) : (
                        <div className="dark:text-gradient-bg-dark2 flex gap-2 items-center">
                            <button onClick={() => setIsUpdating(true)}>
                                <BiEditAlt />
                            </button>
                            <button onClick={onDelete}>
                                <AiFillDelete />
                            </button>
                        </div>
                    )}
                </div>
            </li>
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
        </>
    );
};

export default TodoListItemComponent;
