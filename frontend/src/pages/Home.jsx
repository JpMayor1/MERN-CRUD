import Navbar from "../components/Navbar";
import AddTodo from "../components/AddTodo";
import Todos from "../components/Todos";
import useThemeSwitcher from "../hooks/useThemeSwitches";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    useThemeSwitcher();

    if (!token) {
        navigate("/login");
    }

    return (
        <>
            <div className="bg-gradient-to-br from-gradient-bg-light2 to-gradient-bg-light1 dark:bg-gradient-to-br dark:from-gradient-bg-dark1 dark:to-gradient-bg-dark2 min-h-screen h-full w-screen py-8 flex flex-col items-center gap-11">
                <Navbar />
                <AddTodo />
                <Todos />
            </div>
        </>
    );
};

export default Home;
