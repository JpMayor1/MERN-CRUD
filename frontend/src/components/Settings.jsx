import { CgProfile } from "react-icons/cg";
import { PiSignOutBold } from "react-icons/pi";
import useThemeSwitcher from "../hooks/useThemeSwitches";
import { MoonIcon, SunIcon } from "./icons";

const Settings = () => {
    const username = localStorage.getItem("username");
    const logOut = () => {
        window.localStorage.removeItem("userId");
        window.location.href = "/login";
    };
    const [mode, setMode] = useThemeSwitcher();
    return (
        <div className="absolute bg-light-primary2 dark:bg-dark-primary1 py-3 px-9 flex flex-col top-7 right-3 rounded-lg rounded-tr-none gap-2 w-48 items-start text-dark">
            <div className="flex justify-start items-center">
                <button
                    onClick={() => setMode(mode === "light" ? "dark" : "light")}
                    className={`rounded-full p-1 ${
                        mode === "light"
                            ? "bg-dark text-light"
                            : "bg-light text-dark"
                    }`}
                >
                    {mode === "dark" ? (
                        <SunIcon className={"fill-dark"} />
                    ) : (
                        <MoonIcon className={"fill-dark"} />
                    )}
                </button>
            </div>
            <div className="flex justify-center items-center gap-3 cursor-default">
                <CgProfile /> <p className="text-[20px]">{username}</p>
            </div>
            <div
                className="flex justify-center items-center gap-3 cursor-pointer"
                onClick={logOut}
            >
                <PiSignOutBold /> <p className="text-[20px]">Sign out</p>
            </div>
        </div>
    );
};

export default Settings;
