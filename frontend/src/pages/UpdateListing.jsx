import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CgSpinnerTwo } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";

function UpdateListing() {
    const { currentUser } = useSelector((state) => state.user);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false
    });

    const fetchListing = async () => {
        const id = params.id;
        const response = await fetch(`/api/listings/get/public/${id}`);
        const data = await response.json();
        if (data.success === false) {
            console.error(data.message);
            return;
        }
        setFormData(data);
    };

    useEffect(() => {
        fetchListing();
    }, []);

    const handleChange = (e) => {
        // Handle types of input for property, ie for sale or for Rent
        if (e.target.id === "sale" || e.target.id === "rent") {
            setFormData({
                ...formData,
                type: e.target.id
            })
        } else if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        } else if (e.target.type === "number") {
            setFormData({
                ...formData,
                [e.target.id]: +e.target.value,  // Convert regularPrice and discountPrice in Number
            })
        } else {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    };

    // console.log(formData);

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            if (+formData.regularPrice < +formData.discountPrice) {
                return setError("Regular price cannot be less than Discount price.");
            }
            setLoading(true);
            setError("");
            const respose = await fetch(`/api/listings/update/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    userRef: String(currentUser.user.id),
                }),
            });
            const data = respose.json()
            setLoading(false);
            if (data.success===false) {
                setError(data.message);
            }
            // navigate(`/listings/${data.id}`);
            navigate("/listing/show");
        } catch (error) {
            console.error("Something went wrong:", error);
            setError(error);
            setLoading(false);
        }
    };

    return (
        <>
            <main className="p-3 max-w-4xl mx-auto">
                <h1
                    className="text-3xl font-semibold text-center my-5"
                >
                    Edit Property Listing Data
                </h1>
                <form
                    className="flex flex-col sm:flex-row gap-5"
                    onSubmit={handleSaveChanges}
                >
                    {/* Column 1 */}
                    <div className="flex flex-col gap-3 flex-1">
                        <input
                            type="text"
                            id="name"
                            placeholder="Name..."
                            className="border rounded-lg p-2"
                            maxLength={"62"}
                            minLength={"6"}
                            required
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <textarea
                            type="text"
                            id="description"
                            placeholder="Description..."
                            className="border rounded-lg p-2"
                            required
                            onChange={handleChange}
                            value={formData.description}
                        />
                        <input
                            type="text"
                            id="address"
                            placeholder="Address"
                            className="border rounded-lg p-2"
                            required
                            onChange={handleChange}
                            value={formData.address}
                        />
                        <div className="flex gap-4 flex-wrap">
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    id="sale"
                                    className="w-5"
                                    onChange={handleChange}
                                    checked={formData.type === "sale"}
                                />
                                <span>Sell</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    id="rent"
                                    className="w-5"
                                    onChange={handleChange}
                                    checked={formData.type === "rent"}
                                />
                                <span>Rent</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    id="parking"
                                    className="w-5"
                                    onChange={handleChange}
                                    checked={formData.parking}
                                />
                                <span>Parking spot</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    id="furnished"
                                    className="w-5"
                                    onChange={handleChange}
                                    checked={formData.furnished}
                                />
                                <span>Furnished</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    id="offer"
                                    className="w-5"
                                    onChange={handleChange}
                                    checked={formData.offer}
                                />
                                <span>Offer</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    id="bedrooms"
                                    min={"1"}
                                    max={"10"}
                                    required
                                    className="p-2 border border-gray-400 rounded-lg"
                                    onChange={handleChange}
                                    value={formData.bedrooms}
                                />
                                <span>Beds</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    id="bathrooms"
                                    min={"1"}
                                    max={"10"}
                                    required
                                    className="p-2 border border-gray-400 rounded-lg"
                                    onChange={handleChange}
                                    value={formData.bathrooms}
                                />
                                <span>Baths</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    id="regularPrice"
                                    min={50}
                                    max={10000}
                                    required
                                    className="p-2 border border-gray-400 rounded-lg"
                                    onChange={handleChange}
                                    value={formData.regularPrice}
                                />
                                <div className="flex flex-col items-center">
                                    <span>Regular Price</span>
                                    <span className="text-xs">($/Month)</span>
                                </div>
                            </div>
                            {formData.offer &&
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        id="discountPrice"
                                        min={0}
                                        max={10000}
                                        required
                                        className="p-2 border border-gray-400 rounded-lg"
                                        onChange={handleChange}
                                        value={formData.discountPrice}
                                    />
                                    <div className="flex flex-col items-center">
                                        <span>Discounted Price</span>
                                        <span className="text-xs">($/Month)</span>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                    {/* Column 2 */}
                    <div className="flex flex-col flex-1 gap-4">
                        {/* TODO: Upload images feature to be done in Firebase */}
                        <p className="font-semibold">Images:
                            <span
                                className="font-normal text-gray-600 ml-2"
                            >
                                The first image will be the cover (max 6)
                            </span>
                        </p>
                        <div className="flex gap-4">
                            <input
                                type="file"
                                id="images"
                                className="p-3 border border-gray-400 rounded w-full cursor-pointer"
                                accept="images/*"
                                multiple
                            />
                            <button
                                className="p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opactiy-80 cursor-pointer"
                            >
                                Upload
                            </button>
                        </div>
                        <button
                            className="flex justify-center items-center p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80 cursor-pointer"
                        >
                            {loading ? (
                                <CgSpinnerTwo className='text-2xl animate-spin' />
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                        {error && <p className="text-red-700 text-sm">{error}</p>}
                    </div>
                </form>
            </main >
        </>
    )
};


export default UpdateListing;