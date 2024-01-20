import {
  IOffer,
  IOfferLocation,
  IUser,
  TOfferEntire,
  TOfferFeature,
  TUserStatus,
} from "../interfaces/index.js";

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
    authorString,
    reviewsAmount,
    locationString,
  ] = offerData.split("\t");

  const location = ((): IOfferLocation => {
    const [latitude, longitude] = locationString.split(";");
    return {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };
  })();

  const author = ((): IUser => {
    const [name, email, avatar, password, status] = authorString.split(";");
    return {
      name,
      email,
      avatar,
      password,
      status: status as TUserStatus,
    };
  })();

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
    author,
    reviewsAmount: Number(reviewsAmount),
    location,
  };
};
