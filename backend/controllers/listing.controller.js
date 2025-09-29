import { PrismaClient } from "../prisma/generate/prisma/index.js";

const prisma = new PrismaClient();

// API Endpoint to create a Listing
export async function createListing(req, res, next) {
    const {
        name,
        description,
        address,
        regularPrice,
        discountPrice,
        bathrooms,
        bedrooms,
        furnished,
        parking,
        type,
        offer,
        imageUrls,
        userRef
    } = req.body;
    try {
        const listing = await prisma.listings.create(
            {
                data: {
                    name,
                    description,
                    address,
                    regularPrice,
                    discountPrice,
                    bathrooms,
                    bedrooms,
                    furnished,
                    parking,
                    type,
                    offer,
                    imageUrls,
                    userRef
                }
            }
        );
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

// API Endpoint to retrieve all Listings from the database
export async function getAllListings(req, res, next) {
    try {
        const properties = await prisma.listings.findMany();
        res.status(200).json(properties);
    } catch (error) {
        console.error("Something went wrong:", error);
        next(error);
    }
};

// API Endpoint to retrieve a Listing associated with ID provided
export async function getListings(req, res, next) {
    // console.log({req: !!req, res: !!res, next: !!next});
    // FIXME: Issue arises when no-one has logged in and yet trying to access Property by ID. 
    // It apparently crashes. Look to resolve this issue.
    if (+req.user.id !== +req.params.id) {
        const error = new Error("Unauthorized to perform this action.");
        error.statusCode = 401;
        return next(error);
    }
    try {
        const propertyListing = await prisma.listings.findMany({
            where: { userRef: req.params.id }
        });
        res
            .status(200)
            .json(propertyListing);
    } catch (error) {
        console.log("Something went wrong: ", error);
        next(error);
    }
}

// API Endpoint to Delete a Listing associated with ID provided
export async function deleteListing(req, res, next) {
    // First check if the specified property listing exists in the database
    const listingIsFound = await prisma.listings.findFirst({ where: { id: +req.params.id } });
    if (!listingIsFound) {
        const error = new Error("Not Found");
        error.statusCode = 404;
        return next(error);
    }

    // If the user is not authenticated then throw an error
    if (+req.user.id !== +listingIsFound.userRef) {
        const error = new Error("Unauthorized to perform this action.");
        error.statusCode = 401;
        return next(error);
    }

    // Successfully delete the property listing
    try {
        await prisma.listings.delete({ where: { id: +req.params.id } });

        res
            .status(200)
            .json({ message: `Listing ${req.params.id} deleted!` })
    } catch (error) {
        console.log("Something went wrong:", error);
        next(error);
    }
};

// API endpoint to edit/update a Listing record
export async function updateListing(req, res, next) {
    const listingIsFound = await prisma.listings.findFirst({ where: { id: +req.params.id } });
    if (!listingIsFound) {
        const error = new Error("Not Found");
        error.statusCode = 404;
        return next(error);
    }

    if (+req.user.id !== +listingIsFound.userRef) {
        const error = new Error("Unauthorized to perform this action.");
        error.statusCode = 401;
        return next(error);
    }

    try {
        const updatedProperty = await prisma.listings.update({
            where: { id: +req.params.id },
            data: {
                name: req.body.name,
                description: req.body.description,
                address: req.body.address,
                type: req.body.type,
                parking: req.body.parking,
                furnished: req.body.furnished,
                bathrooms: req.body.bathrooms,
                bedrooms: req.body.bedrooms,
                regularPrice: req.body.regularPrice,
                discountPrice: req.body.discountPrice
            },
        });

        res
            .status(200)
            .json({ message: `Property number ${req.params.id} updated successfully.`, updatedProperty });
    } catch (error) {
        console.log("Something went wrong:", error);
        next(error);
    }
};

// API Endpoint to get a Listing associated with ID provided, for public access
export async function getPublicPropertyById(req, res, next) {
    try {
        const publicListing = await prisma.listings.findFirst({
            where: { id: +req.params.id }
        })

        if (!publicListing) {
            const error = new Error("Record Not Found.");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(publicListing);
    } catch (error) {
        console.log("Something went wrong: ", error);
        next(error);
    }
};