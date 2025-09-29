import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import defaultAvatar from "../assets/avatardefault.png";

function Header() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to="/">
                    <h1 className='font-bold text-lg sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Sandesh</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input
                        type="text"
                        placeholder='Search...'
                        className='bg-transparent outline-none w-24 sm:w-64'
                    />
                    <FaSearch className="text-slate-500" />
                </form>
                <ul className="flex gap-4 items-center">
                    <Link to="/">
                        <li className="hidden sm:inline hover:underline cursor-pointer">Home</li>
                    </Link>
                    <Link to={"/about"}>
                        <li className="hover:underline">About</li>
                    </Link>
                    {currentUser ? (
                        <Link to={"/profile"}>
                            <img
                                className="rounded-full h-9 w-9 object-cover"
                                src={
                                    currentUser.avatar ?
                                        currentUser.avatar :
                                        defaultAvatar
                                }
                                alt={currentUser.username}
                            />
                        </Link>
                    ) : (
                        <Link to={"/signin"}>
                            <li>
                                <button
                                    className="bg-slate-600 text-white p-1 text-sm sm:inline sm:p-2.5 sm:text-base rounded-lg cursor-pointer"
                                >
                                    Sign In
                                </button>
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        </header >
    )
}

export default Header;