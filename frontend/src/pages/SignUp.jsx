import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { CgSpinnerTwo } from "react-icons/cg";
import OAuth from '../components/OAuth';

function SignUp() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    // console.log(formData);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        // POST Created User to the backend
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            // If there's something wrong with the response
            if (data.success === false) {
                setError(data.message || "Something went wrong.");
                setLoading(false);
                return;
            }
            setSuccess(true);
            setLoading(false);
            setError("");
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
            navigate("/signin");
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.log("Something went wrong:", error);
        }
    };

    return (
        <>
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold my-7'>
                    Sign Up
                </h1>
                <form className='flex flex-col gap-4' onSubmit={handleSubmitForm}>
                    <input
                        type="text"
                        placeholder='Username'
                        id='username'
                        className='border border-gray-400 p-3 rounded-lg bg-white'
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder='Email'
                        id='email'
                        className='border border-gray-400 p-3 rounded-lg bg-white'
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        id='password'
                        className='border border-gray-400 p-3 rounded-lg bg-white'
                        onChange={handleChange}
                    />
                    <button
                        className='flex justify-center items-center bg-slate-600 text-white p-3 rounded-lg cursor-pointer hover:opacity-95 disabled:opacity-80'
                        disabled={loading || success}
                    >
                        {loading ? (
                            <CgSpinnerTwo className='text-2xl animate-spin' />
                        ) : success ? (
                            <FaCheckCircle className='text-2xl text-green-500' />
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                    <OAuth />
                </form>

                <div className="flex gap-1 mt-3">
                    <p>Have an account already?</p>
                    <Link to={"/signin"}>
                        <span className='text-blue-700 underline hover:no-underline'>
                            Sign In
                        </span>
                    </Link>
                </div>
                {error && (
                    <div
                        className="form-error"
                        style={{ color: "red", marginBottom: "0" }}
                    >
                        {error}
                    </div>
                )}
            </div>
        </>
    )
}

export default SignUp;;