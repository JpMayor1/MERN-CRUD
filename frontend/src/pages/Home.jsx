import Navbar from "../components/Navbar";
import TodoComponent from "../components/TodoComponent";
import TodoListComponent from "../components/TodoListComponent";
import useThemeSwitcher from "../hooks/useThemeSwitches";

const Home = () => {
    useThemeSwitcher();
    const userId = localStorage.getItem("userId");
    if (userId) {
        return (
            <>
                <div className="bg-gradient-to-br from-gradient-bg-light2 to-gradient-bg-light1 dark:bg-gradient-to-br dark:from-gradient-bg-dark1 dark:to-gradient-bg-dark2 min-h-screen h-full w-screen py-8 flex flex-col items-center gap-11">
                    <Navbar />
                    <TodoComponent />
                    <TodoListComponent />
                </div>
            </>
        );
    } else {
        window.location.href = "/login";
    }
};

export default Home;
