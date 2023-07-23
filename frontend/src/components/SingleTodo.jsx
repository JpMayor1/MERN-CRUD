import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BiEditAlt, BiSave } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
import {
    updateTodoCompleted,
    updateTodoText,
    deleteTodo,
} from "../redux/store/todoSlice";

const SingleTodo = ({ id, text, completed }) => {
    const [updatedText, setUpdatedText] = useState(text);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    const toggleCompleted = async () => {
        const updatedTodo = {
            id,
            text,
            completed: !completed,
        };

        // Dispatch action to update the completed field in the Redux store
        dispatch(updateTodoCompleted(updatedTodo));
        toast.success("Todo updated!");
    };

    const onEdit = async () => {
        const updatedTodo = {
            id,
            text: updatedText,
            completed,
        };

        // Dispatch action to update the text field in the Redux store
        dispatch(updateTodoText(updatedTodo));
        setIsEditing(false); // Exit edit mode
        toast.success("Todo updated!");
    };

    const onDelete = async () => {
        // Dispatch action to remove the todo from the Redux store
        dispatch(deleteTodo(id));
        toast.success("Todo deleted!");
    };

    return (
        <li className="w-full flex justify-between items-center bg-light-primary1 py-5 px-5 mb-3 rounded-3xl text-dark text-lg dark:bg-dark-primary1 dark:text-light">
            {!isEditing ? (
                // Display the todo text when not in edit mode
                <div className="flex gap-2 items-center">
                    <input
                        type="checkbox"
                        onChange={toggleCompleted}
                        checked={completed}
                    />
                    <span>{text}</span>
                </div>
            ) : (
                // Display the edit input field when in edit mode
                <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    className="w-[70%] bg-light-primary1 dark:bg-dark-primary1 focus:outline-none focus:ring focus:ring-light-primary1 dark:focus:outline-none dark:focus:ring dark:focus:ring-dark-primary1 border-l-0 border-t-0 border-r-0 border-b-2 dark:border-b-gradient-bg-dark2 border-b-dark"
                />
            )}

            <div className="flex items-center gap-2">
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)} // Enter edit mode
                        className="flex items-center gap-1 text-xl dark:text-gradient-bg-dark2"
                    >
                        <BiEditAlt /> Edit
                    </button>
                ) : (
                    <button
                        onClick={onEdit}
                        className="flex items-center gap-1 text-xl dark:text-gradient-bg-dark2"
                    >
                        <BiSave /> Save
                    </button>
                )}
                <button onClick={onDelete}>
                    <AiFillDelete />
                </button>
            </div>
            {/* Toaster component */}
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
        </li>
    );
};

SingleTodo.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
};

export default SingleTodo;
