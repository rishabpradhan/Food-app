import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function FormData() {
    const initial = { firstname: "",lastname:"", password: "", email: "", contact: "" }; // initial state for input fields
    const [query, setQuery] = useState(initial); // hook to capture the event in input fields
    const [error, setError] = useState({}); // managing and setting errors
    const [message, setMessage] = useState(null); // provide message if data has been sent to the backend
    const [isPassword, setPassword] = useState(false); // toggle password visibility
    const [submit, setSubmit] = useState(false); // for button to disable once the user has submitted

    // Handle changes in each input field
    const handleChange = (e) => {
        const { name, value } = e.target;
        e.preventDefault();
        setQuery({
            ...query,
            [name]: value
        });

        setError({
            ...error,
            [name]: null
        });
    };

    // Toggle password visibility
    const togglePassword = () => {
        setPassword(!isPassword);
    };

    // User validation logic
    const validate = () => {
        const newError = {};

        if (!query.firstname.trim()) {
            newError.firstname = "Firstname is required";
        } else if (!/^[a-zA-Z\s\-']{1,50}$/.test(query.name)) {
            newError.firstname = "Invalid name";
        }
        if (!query.lastname.trim()) {
            newError.lastname = "Lastname is required";
        } else if (!/^[a-zA-Z\s\-']{1,50}$/.test(query.name)) {
            newError.lastname = "Invalid name";
        }
        if (!query.password.trim()) {
            newError.password = "Password is required";
        } else if (query.password.length < 8) {
            newError.password = "Password must be at least 8 characters";
        }
        if (!query.email.trim()) {
            newError.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(query.email)) {
            newError.email = "Invalid email";
        }
        if (!query.contact.trim()) {
            newError.contact = "Contact is required";
        } else if (query.contact.length < 5 || query.contact.length > 5) {
            newError.contact = "Contact length must be 5 numbers";
        }

        setError(newError);
        return Object.keys(newError).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);  // Disable submit button and set processing state
        try {
            if (!validate()) {
               // setSubmit(false);  // Re-enable the button if validation fails
                return;
            }

            setError({});  // Clear any previous errors
            const response = await axios.post("http://localhost:3000/users/signin", query,{
                timeout:10000,
                }
            );  // Send data to backend

            console.log(response.data);
            setQuery(initial);
            setMessage("Your information has been inserted");  // Show success message
              // Reset form data to initial state
        }
        catch (error) {
            setMessage("Error occurred while sending");  // Show error message
            console.error(error.message);
        }
        finally {
            setSubmit(false);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray">
                <form
                    className="mt-10 bg-white-100 p-8 rounded-xl shadow-lg w-full max-w-md"
                    onSubmit={handleSubmit}
                >
                    <div className="text-center mb-8">
                        <span className="font-medium text-3xl">Hi! Welcome 👋</span>
                    </div>

                    <div className="space-y-4">
                        <div className="mt-2">
                            <input
                                className="border border-solid border-black w-full h-8 rounded-xl"
                                type="text"
                                name="firstname"
                                placeholder="Enter your firstname"
                                value={query.firstname}
                                onChange={handleChange}
                                spellCheck="true"
                            />
                            {error.firstname && <span style={{ color: "red" }}>{error.firstname}</span>}
                        </div>
                        <div className="mt-2">
                            <input type="text"  spellCheck="true" name="lastname" value={query.lastname} onChange={handleChange} placeholder="Enter your lastname" className="border border-black rounded-xl w-full h-8"/>
                            {error.lastname && <span style={{ color: "red" }}>{error.lastname}</span>}
                        </div>

                        <div className="mt-3">
                            <input
                                className="border border-solid border-black w-full h-8 rounded-xl"
                                type={isPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={query.password}
                                onChange={handleChange}
                            />
                            {error.password && <span style={{ color: "red" }}>{error.password}</span>}
                        </div>

                        <div className="mt-3">
                            <input
                                className="border border-solid border-black w-full h-8 rounded-xl"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={query.email}
                                onChange={handleChange}
                            />
                            {error.email && <span style={{ color: "red" }}>{error.email}</span>}
                        </div>

                        <div className="mt-3">
                            <input
                                className="border border-solid border-black w-full h-8 rounded-xl"
                                type="text"
                                name="contact"
                                placeholder="Enter your contact"
                                value={query.contact}
                                onChange={handleChange}
                            />
                            {error.contact && <span style={{ color: "red" }}>{error.contact}</span>}
                        </div>
                    </div>

                    <div className="flex justify-center items-center mt-2">
                        <label htmlFor="toggle">
                            <input type="checkbox" onClick={togglePassword} />
                            <span>Show password</span>
                        </label>

                    </div>
                    <p className="text-center font-serif font-normal text-blue-500 hover:text-blue-800 ">Already have account?</p>
                    <Link to="/login" className="font-serif font-normal text-blue-500 hover:text-blue-800 text-center block" >Login</Link>
                    <div>
                        <button
                            className="border py-1 px-2 rounded-full bg-purple-700 hover:bg-purple-500 disabled:opacity-50 text-white w-full h-8"
                            type="submit"
                            disabled={submit}

                        >
                            {submit?"processing...":"submit"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="">
                <p className="text-3xl text-center text-green-400 font-serif">{message}</p>
            </div>
        </>
    );
}
