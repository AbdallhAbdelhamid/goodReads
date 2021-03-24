const { Schema, model, SchemaTypes } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 5,
    maxLength: 15,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  favorites: [{type: Schema.Types.ObjectId , ref: 'Book'}]
});


const User = model('User',userSchema)

module.exports = User