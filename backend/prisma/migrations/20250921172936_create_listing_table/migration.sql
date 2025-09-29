-- CreateTable
CREATE TABLE "public"."Listings" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "regularPrice" DOUBLE PRECISION NOT NULL,
    "discountPrice" DOUBLE PRECISION NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "furnished" BOOLEAN NOT NULL,
    "parking" BOOLEAN NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "offer" BOOLEAN NOT NULL,
    "imageUrls" VARCHAR(255)[],
    "userRef" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Listings_pkey" PRIMARY KEY ("id")
);
