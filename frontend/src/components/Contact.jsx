import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
    const [owner, setOwner] = useState(null);
    const [message, setMessage] = useState("");

    const onMessageChange = (e) => { setMessage(e.target.value) };

    const fetchOwner = async () => {
        try {
            const response = await fetch(`/api/users/${+listing.userRef}`);
            const data = await response.json();
            setOwner(data);
        } catch (error) {
            console.log("Fetching owner data failed:", error);

        }
    };

    useEffect(() => {
        fetchOwner();
    }, [listing.userRef]);

    return (
        <>
            {owner && (
                <div className="flex sm:flex-col sm:justify-center sm:mx-[9rem] gap-3">
                    <p>
                        Contact <span className="font-semibold">{owner.username}</span> to enquire about this
                        property:
                    </p>
                    <textarea
                        name="message"
                        id="message"
                        value={message}
                        placeholder="Type your enquiry..."
                        onChange={onMessageChange}
                        rows="2"
                        className="w-full border border-slate-400 rounded-lg p-2"
                    >
                    </textarea>
                    <Link
                        to={`mailto:${owner.email}?subject=Enquiry about ${listing.name}&body=${message}`}
                        className="bg-slate-700 text-white text-center p-2 rounded-lg hover:opacity-95 cursor-pointer"
                    >
                        Submit Query
                    </Link>
                </div>
            )}
        </>
    )
}

export default Contact;