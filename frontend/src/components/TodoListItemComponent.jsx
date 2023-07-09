import axios from "axios";
import { BiEditAlt, BiSave } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const TodoListItemComponent = ({ id, item }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatedItem, setUpdatedItem] = useState(item);

    const onEdit = async () => {
        try {
            await axios.put(`http://localhost:5000/todos/update/${id}`, {
                text: updatedItem,
            });
            setIsUpdating(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const onDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/todos/delete/${id}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <li className="w-full flex justify-between items-center bg-light-primary1 py-5 px-5 mb-3 rounded-3xl text-dark text-lg">
                {isUpdating ? (
                    <input
                        type="text"
                        value={updatedItem}
                        onChange={(e) => setUpdatedItem(e.target.value)}
                    />
                ) : (
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" />
                        <span>{item}</span>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    {isUpdating ? (
                        <button onClick={onEdit}>
                            <BiSave />
                        </button>
                    ) : (
                        <>
                            <button onClick={() => setIsUpdating(true)}>
                                <BiEditAlt />
                            </button>
                            <button onClick={onDelete}>
                                <AiFillDelete />
                            </button>
                        </>
                    )}
                </div>
            </li>
        </>
    );
};

export default TodoListItemComponent;
