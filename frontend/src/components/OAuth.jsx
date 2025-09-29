import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSucess } from "../redux/user/userSlice.js";
import { app } from "../firebase";

function OAuth() {
    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const response = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    profileImage: result.user.photoURL,
                }),
            });
            const data = await response.json();
            console.log(result);
            dispatch(signInSucess(data));
            naviagte("/");
        } catch (error) {
            console.error("Could not sign in with Google:", error);
        }
    }

    return (
        <>
            <button
                type="button"
                className="bg-red-700 text-white p-3 rounded-lg hover:opacity-80 cursor-pointer"
                onClick={handleGoogleClick}
            >
                Continue with Google
            </button>
        </>
    )
};

export default OAuth;