import { useState, useContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TailSpin  } from "react-loader-spinner";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        setFormErrors((prev) => ({
            ...prev,
            [e.target.name]: false
        }));
    };

    const validateForm = () => {
        let errors = {
            email: false,
            password: false
        };

        if (!user.email || user.email.length === 0 || !user.email.endsWith("@gmail.com")) {
            errors.email = true;
        }
        if (!user.password || user.password.length === 0) {
            errors.password = true;
        }
        setFormErrors(errors);

        return !errors.email && !errors.password;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            validateForm();
            const res = await axios.post("/auth/login", user);
            
            console.log(res);
            if(res?.status === 200) {
                toast.success("Login successfully");
            }

            login(res?.data?.token, res?.data?.user)
            navigate("/");
        } catch (error) {
            if(error.response) {
                const message = error.response.data?.message || "Login Failed";
                toast.error(message);
            } else {
                toast.error("Something went wrong while login");
            }
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Inventory Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`w-full p-3 border rounded-lg focus:outline-dark focus:ring-2 focus:ring-blue-500 ${formErrors.email ? "border-red-500" : ""}`}
                            onChange={handleChange}
                            name="email"
                            value={user.email}
                        />
                        {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                Please enter a valid email
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className={`w-full p-3 border rounded-lg focus:outline-dark focus:ring-2 focus:ring-blue-500 ${formErrors.password ? "border-red-500" : ""}`}
                            onChange={handleChange}
                            name="password"
                            value={user.password}
                        />
                        {formErrors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                Please enter a valid password
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer flex items-center justify-center gap-2"
                    >
                        { isLoading && 
                            <TailSpin 
                                height="20"
                                width="20"
                                color="#ffffff"
                            />
                        } Login
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Login;