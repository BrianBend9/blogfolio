const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  date: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  titleSlug: { type: String, required: true },
  intro: { type: String, required: true },
  body: { type: String, required: true },
  images: [{ type: { name: String, location: String, size: Number }, required: true }],
  postUrl: { type: String, required: true },
  tags: [{ type: String }],
});

module.exports = mongoose.model('Post', schema);
