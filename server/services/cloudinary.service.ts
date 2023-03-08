const cloudinary = require('cloudinary').v2;
import { config } from "../config";

cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
});

/**
 * Upload a single photo to cloudinary
 * @param {string} url of the photo 
 * @returns {Promise<string>} cloudinary url of the photo
 */
export const uploadOnePhoto = async (url: string): Promise<string> => {
    if (url.includes('https://res.cloudinary.com')) {
        return url;
    }
    const result = await cloudinary.uploader.upload(url);
    return result.url as string;
}

/**
 * Uploads many photos to cloudinary
 * @param {string[]} urls photo urls
 * @returns {Promise<string[]>} cloudinary urls of the photos
 */
export const uploadManyPhotos = async (urls: string[]): Promise<string[]> => {
    const photos = urls.map(async (url) => {
        if (url.includes('https://res.cloudinary.com')) {
            return url;
        }
        const result = await cloudinary.uploader.upload(url);
        return result.url as string;
    })
    return Promise.all(photos);
}

export default cloudinary;
