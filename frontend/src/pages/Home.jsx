import Navbar from "../components/Navbar";
import AddTodo from "../components/AddTodo";
import Todos from "../components/Todos";
import useThemeSwitcher from "../hooks/useThemeSwitches";

const token = window.localStorage.getItem("token");
if (!token) {
    if (window.location.pathname === "/") {
        window.location.href = "/login";
    }
}

const Home = () => {
    useThemeSwitcher();

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
