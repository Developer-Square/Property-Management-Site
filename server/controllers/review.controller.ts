import Review from '../mongodb/models/review';
import mongoose from 'mongoose';
const cloudinary = require('cloudinary').v2;

require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createReview = async (req, res) => {
  try {
    const { name, avatar, comment, rating, status } = req.body;

    await Review.create({
      name,
      avatar,
      comment,
      rating,
      status,
    });

    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { _end, _start } = req.query;
    const count = await Review.countDocuments({});

    const reviews = await Review.find({}).limit(_end).skip(_start);

    if (reviews.length) {
      res.header('x-total-count', count);
      res.header('Access-Control-Expose-Headers', 'x-total-count');

      res.status(200).json(reviews);
    } else {
      res.status(404).json({ message: 'No Reviews found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getSpecificReviews = async (req, res) => {
  try {
    const { status = '' } = req.query;
    const query = {};

    if (status) {
      // @ts-ignore
      query.status = status;
    }

    const reviews = await Review.find(query);

    if (reviews.length) {
      res.status(200).json(reviews);
    } else {
      res.status(404).json({ message: 'No Reviews found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

