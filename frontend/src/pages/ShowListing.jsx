import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
import { BsFillTrash3Fill } from "react-icons/bs";

function ShowListing() {
    const [propertyListing, setPropertyListing] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useSelector((state) => state.user);


    // Call an API Endpoint to fetch all properties 
    // associated with the authenticated user
    const fetchPropertyListing = async () => {
        try {
            setError("");
            setLoading(true);
            const response = await fetch(`/api/listings/get/${currentUser.user.id}`);
            const data = await response.json();

            if (data.success === false) {
                setError(data.message);
                return;
            }
            console.log(data);
            setPropertyListing(data);
            setLoading(false);
        } catch (error) {
            console.log("Something went wrong:", error);
            setError(error);
            setLoading(false);
        }
    };

    // console.log(propertyListing);

    // Call an API Endpoint to delete the specified property
    const handleDeleteListing = async (listingId) => {
        try {
            const response = await fetch(`/api/listings/delete/${listingId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (data.success === false) {
                console.log("Error fetching data: ", error);
                setError(error);
                return;
            }

            setPropertyListing((prev) => prev.filter((listing) => listing.id !== listingId));
        } catch (error) {
            console.log("Error:", error);
            setError(error);
        }
    };

    useEffect(() => {
        if (currentUser && currentUser.user && currentUser.user.id) {
            fetchPropertyListing();
        }
    }, [currentUser]);

    if (loading) {
        return (
            <div className="p-3 max-w-lg mx-auto">
                <h2 className="text-2xl">
                    Fetching data! Please wait...
                </h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-3 max-w-lg mx-auto">
                <h2 className="text-2xl">
                    Failed to fetch data. Please try again later...
                </h2>
                {console.error(error)}
            </div>
        )
    }

    return (
        <>
            <main>
                <div className="flex flex-col items-center gap-8">
                    <h1 className="mt-4 text-4xl font-semibold">Your Properties</h1>
                    <div className="flex flex-col items-center gap-5">
                        {propertyListing.length > 0 ? (
                            propertyListing.map((listing) => (
                                <>
                                    <div className="flex justify-between border border-slate-500 w-xl rounded-lg p-5">
                                        <div
                                            key={listing.id}
                                        >
                                            <Link to={`/listing/${listing.id}`} className="flex-1">
                                                <p className="font-semibold text-lg hover:underline truncate">{listing.name}</p>
                                                <p>{listing.address}</p>
                                            </Link>
                                        </div>
                                        <div className="flex gap-2">
                                            <p>
                                                <Link to={`/listing/update/${listing.id}`}>
                                                    <RiEditBoxLine
                                                        className="text-xl cursor-pointer"
                                                    />
                                                </Link>
                                            </p>
                                            <p>
                                                <BsFillTrash3Fill
                                                    className="text-lg text-red-600 cursor-pointer"
                                                    onClick={() => handleDeleteListing(listing.id)}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ))
                        ) : (
                            <div className="w-lg">
                                <h1 className="text-3xl text-red-500">
                                    Looks like you have not created any properties.
                                    Add the property and they'll show up here.
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default ShowListing;