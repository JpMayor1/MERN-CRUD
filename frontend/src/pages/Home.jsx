import Navbar from "../components/Navbar";
import TodoComponent from "../components/TodoComponent";
import TodoListComponent from "../components/TodoListComponent";
import useThemeSwitcher from "../hooks/useThemeSwitches";
const token = localStorage.getItem("token");

if (!token) {
    if (window.location.pathname === "/") window.location.href = "/login";
}
const Home = () => {
    useThemeSwitcher();

    return (
        <>
            <div className="bg-gradient-to-br from-gradient-bg-light2 to-gradient-bg-light1 dark:bg-gradient-to-br dark:from-gradient-bg-dark1 dark:to-gradient-bg-dark2 min-h-screen h-full w-screen py-8 flex flex-col items-center gap-11">
                <Navbar />
                <TodoComponent />
                <TodoListComponent />
            </div>
        </>
    );
};

export default Home;
