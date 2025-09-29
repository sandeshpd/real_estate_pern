import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgSpinnerTwo } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSucess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        // POST Created User to the backend
        try {
            dispatch(signInStart());
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            // If there's something wrong with the response
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSucess(data));
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
            navigate("/");
        } catch (error) {
            dispatch(signInFailure(error.message));
            console.log("Something went wrong:", error);
        }
    };

    return (
        <>
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold my-7'>
                    Sign In
                </h1>
                <form className='flex flex-col gap-4' onSubmit={handleSubmitForm}>
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
                        disabled={loading}
                    >
                        {loading ? (
                            <CgSpinnerTwo className='text-2xl animate-spin' />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                    <OAuth />
                </form>

                <div className="flex gap-1 mt-3">
                    <p>Dont have an account?</p>
                    <Link to={"/signup"}>
                        <span className='text-blue-700 underline hover:no-underline'>
                            Sign Up
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

export default SignIn;