import { FiSettings } from "react-icons/fi";
import Settings from "./Settings";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <main className="flex justify-center items-center w-screen">
            <nav className="2xl:max-w-lg xl:max-w-lg lg:max-w-lg md:max-w-xs sm:max-w-xs px-7 flex justify-between items-center w-full text-[25px] dark:text-light">
                <h1 className="hover:cursor-default font-semibold">To do!</h1>
                <div className="relative flex flex-col">
                    <FiSettings
                        className="hover:cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                    {isOpen && <Settings />}
                </div>
            </nav>
        </main>
    );
};

export default Navbar;
