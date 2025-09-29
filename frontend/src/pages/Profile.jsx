import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import defaultAvatar from "../assets/avatardefault.png";
import { useState } from "react";
import {
    updateUserFailure,
    updateUserSuccess,
    updateUserStart,
    deleteUserFailure,
    deleteUserSuccess,
    deleteUserStart,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
} from "../redux/user/userSlice";
import { CgSpinnerTwo } from "react-icons/cg";
import { Link } from "react-router-dom";

function Profile() {
    const fileRef = useRef(null);
    const [formData, setFormdata] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState({ show: false, message: "" });

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleUpdateUserInfo = (e) => {
        setFormdata({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const response = await fetch(`/api/users/update/${currentUser.user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));

            // Show Alert like banner to the top right of the screen on success
            setTimeout(() => {
                // On successsful update, show the alert
                setUpdateSuccess({ show: true, message: "User updated successfully." });
                // Hide the alert after 3 seconds
                setTimeout(() => {
                    setUpdateSuccess({ show: false, message: '' });
                }, 4000);
            }, 500);   // Simulate the network delay
            // setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDelete = async () => {
        try {
            dispatch(deleteUserStart());
            const response = await fetch(`api/users/delete/${currentUser.user.id}`, {
                method: "DELETE",
            });
            const data = response.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
            console.log("Something went wrong: ", error);
        }
    };

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const response = await fetch("/api/auth/signout");
            const data = response.json();
            if (data.success === false) {
                return;
            }
            dispatch(signOutUserSuccess(data.message));
        } catch (error) {
            dispatch(signOutUserFailure());
            console.log("Something went wrong: ", error);
        }
    }

    return (
        <>
            <div className="p-3 max-w-lg mx-auto">
                {/* Alert banner */}
                {updateSuccess.show && (
                    <div className="fixed top-20 right-20 bg-slate-100 text-black text-2xl border p-4 border-l-green-700 border-l-8">
                        {updateSuccess.message}
                    </div>
                )}
                <h1 className="text-3xl font-semibold text-center my-5">
                    Profile
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="file" ref={fileRef} hidden accept="image/*" />
                    <img
                        src={currentUser.avatar ?
                            currentUser.avatar :
                            defaultAvatar
                        }
                        className="rounded-full h-24 w-24 object-cover self-center cursor-pointer"
                        onClick={() => fileRef.current.click()}
                        alt={currentUser.username}
                    />
                    <input
                        type="text"
                        id="username"
                        defaultValue={currentUser.user.username}
                        placeholder="Enter Username to edit..."
                        className="border p-3 rounded-lg"
                        onChange={handleUpdateUserInfo}
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter an Email to edit..."
                        defaultValue={currentUser.user.email}
                        className="border p-3 rounded-lg"
                        onChange={handleUpdateUserInfo}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password to edit..."
                        className="border p-3 rounded-lg"
                    />
                    <button
                        disabled={loading}
                        className="flex justify-center items-center bg-slate-700 text-white rounded-lg p-3 cursor-pointer hover:opacity-95 disabled:opacity-80"
                    >
                        {loading ? (
                            <CgSpinnerTwo className="text-2xl animate-spin" />
                        ) : (
                            "Update"
                        )}
                    </button>
                    <div className="flex justify-between gap-2">
                        <Link
                            className="bg-green-700 text-white p-3 rounded-lg text-center hover:opacity-95 w-40"
                            to={"/listing/create"}
                        >
                            Create Listing
                        </Link>
                        <Link
                            className="bg-blue-500 text-white p-3 rounded-lg text-center hover:opacity-95 w-40"
                            to={"/listing/show"}
                        >
                            Show Listings
                        </Link>
                    </div>
                </form>
                <div className="flex justify-between mt-4">
                    <span
                        className="text-red-700 cursor-pointer"
                        onClick={handleDelete}
                    >
                        Delete Account
                    </span>
                    <span
                        className="text-red-700 cursor-pointer"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </span>
                </div>
                <p className="text-red-500 mt-3">
                    {error ? error : ""}
                </p>
            </div>
        </>
    )
}

export default Profile;