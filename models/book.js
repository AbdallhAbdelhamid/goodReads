const { Schema, model } = require("mongoose");


const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 5,
    maxLength: 25,
  },
  description: { type: String, required: true, minLength: 5, maxLength: 50 },
  rating: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
  },
  price: { type: Number, required: true },
  pagesCount: { type: Number, required: true },
  reviewsCount: { type: Number, required: true, default: 0 },
  author: { type: String, required: true },
});



const Book = model('Book',bookSchema);

module.exports = Book;