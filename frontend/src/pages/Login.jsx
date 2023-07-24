import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTodoId, setToken, setUsername } from "../redux/store/userSlice";
import BeatLoader from "react-spinners/BeatLoader";
import { useState } from "react";

const Login = () => {
    const [isloading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            setIsLoading(true);
            const res = await axios.post(
                "https://jp-m-mern-crud.onrender.com/login",
                {
                    email,
                    password,
                }
            );

            //dispatch username and token to redux store
            const username = res.data.username;
            const token = res.data.token;
            const todoId = res.data.todoId;

            dispatch(setUsername(username));
            dispatch(setToken(token));
            dispatch(setTodoId(todoId));

            navigate("/");
        } catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="bg-gradient-to-br from-gradient-bg-light2 to-gradient-bg-light1 dark:bg-gradient-to-br dark:from-gradient-bg-dark1 dark:to-gradient-bg-dark2 min-w-fit min-h-fit h-screen w-screen dark:text-light">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-xl font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-dark"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-xl font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-dark"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-primary2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary2 bg-light-primary1 dark:bg-dark-primary1"
                                >
                                    {isloading ? (
                                        <BeatLoader color="#36d7b7" />
                                    ) : (
                                        "Sign in"
                                    )}
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            <span>Don&apos;t have an account?</span>
                            <Link
                                to="/register"
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2 dark:text-dark-primary2"
                            >
                                Register here!
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
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
                    position: "bottom-center",
                }}
            />
        </>
    );
};

export default Login;
