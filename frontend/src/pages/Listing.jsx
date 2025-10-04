import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBath, FaBed, FaChair, FaMapMarkedAlt, FaParking } from "react-icons/fa";

function Listing() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const params = useParams();

    const fetchListing = async () => {
        setError("");
        try {
            setLoading(true);
            const id = params.id;
            const response = await fetch(`/api/listings/get/public/${id}`);
            const data = await response.json();
            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }
            setListing(data);
            setLoading(false);
        } catch (error) {
            console.log("Something went wrong: ", error);
            setError(error);
            setLoading(false);
        };
    };
    // console.log(listing);

    useEffect(() => {
        fetchListing();
    }, [params.id]);

    return (
        <>
            <main>
                {loading &&
                    <p className="text-center my-7 text-3xl">Loading...</p>
                }

                {error &&
                    <p className="text-center my-7 text-3xl text-red-500">Something went wrong.</p>
                }

                {listing && !error && !loading &&
                    (
                        // Add image and slider when images are available
                        <>
                            <div className="flex flex-col mx-auto my-7 max-w-4xl h-100 text-center gap-4">
                                <h1 className="text-3xl font-semibold w-auto">
                                    {listing.name}
                                </h1>
                                <p className="flex justify-center items-center gap-1">
                                    <FaMapMarkedAlt className="text-green-700 text-xl" />
                                    {listing.address}
                                </p>

                                <div className="flex justify-between">
                                    <p className="font-semibold text-lg ml-[1rem]">
                                        ${" "}
                                        {listing.offer
                                            ? listing.discountPrice.toLocaleString("en-US")
                                            : listing.regularPrice.toLocaleString("en-US")}
                                        {listing.type === "rent" && "/month"}
                                    </p>
                                    <div className="flex max-sm:flex-col max-sm:items-end max-sm:mr-[1.5rem] gap-5 w-90">
                                        <p
                                            className="bg-red-900 w-full max-w-[100px] sm:max-w-[200px] text-white text-center p-1 rounded-md"
                                        >
                                            {listing.type === "rent" ? "For Rent" : "For Sale"}
                                        </p>
                                        <p
                                            className="bg-green-800 w-full max-w-[100px] sm:max-w-[200px] text-white text-center p-1 rounded-md"
                                        >
                                            ${+listing.regularPrice - listing.discountPrice} off
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <p>
                                        <span className="text-3xl w-full">
                                            {listing.description}
                                        </span>
                                    </p>
                                </div>
                                <ul className="flex flex-wrap text-green-800 font-semibold gap-4 sm:gap-5 sm:flex-row max-sm:ml-4">
                                    <li className="flex items-center gap-1 whitespace-nowrap">
                                        <FaBed className="text-xl" />
                                        {listing.bedrooms > 1 ?
                                            `${listing.bedrooms} Bedrooms` :
                                            `${listing.bedrooms} Bedroom`}
                                    </li>
                                    <li className="flex items-center gap-1 whitespace-nowrap">
                                        <FaBath className="text-xl" />
                                        {listing.bathrooms > 1 ?
                                            `${listing.bathrooms} Bathrooms` :
                                            `${listing.bathrooms} Bathroom`
                                        }
                                    </li>
                                    <li className="flex items-center gap-1 whitespace-nowrap">
                                        <FaParking className="text-xl" />
                                        {listing.parking ? "Available" : "Not Available"}
                                    </li>
                                    <li className="flex items-center gap-1 whitespace-nowrap">
                                        <FaChair className="text-xl"/>
                                        {listing.furnished ? "Furnished" : "Not Furnished"}
                                    </li>
                                </ul>
                            </div>
                        </>
                    )
                }
            </main>
        </>
    )
};

export default Listing;