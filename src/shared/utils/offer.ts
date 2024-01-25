import {
  IOffer,
  IOfferLocation,
  IUser,
  TOfferEntire,
  TOfferFeature,
  TUserStatus,
} from "../interfaces/index.js";

const getLocation = (location: string): IOfferLocation => {
  const [latitude, longitude] = location.split(";");
  return {
    latitude: Number(latitude),
    longitude: Number(longitude),
  };
};

const getAuthor = (author: string): IUser => {
  const [name, email, avatar, password, status] = author.split(";");
  return {
    name,
    email,
    avatar,
    password,
    status: status as TUserStatus,
  };
};

export const createOffer = (offerData: string): IOffer => {
  const [
    title,
    description,
    publishDate,
    city,
    preview,
    images,
    isPremium,
    isFavorite,
    rating,
    entire,
    bedrooms,
    adults,
    price,
    features,
    author,
    reviewsAmount,
    location,
  ] = offerData.split("\t");

  return {
    title,
    description,
    publishDate,
    city,
    preview,
    images: images.split(";"),
    isPremium: isPremium === "true",
    isFavorite: isFavorite === "true",
    rating: Number(rating),
    entire: entire as TOfferEntire,
    bedrooms: Number(bedrooms),
    adults: Number(adults),
    price: Number(price),
    features: features.split(";") as TOfferFeature[],
    author: getAuthor(author),
    reviewsAmount: Number(reviewsAmount),
    location: getLocation(location),
  };
};
