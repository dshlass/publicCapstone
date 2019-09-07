const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PhotosSchema = new Schema({
  _id: Schema.Types.ObjectId,
  contentType: String,
  image:  Buffer
});

module.exports = Photos = mongoose.model('Photos', PhotosSchema)