var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String,
  author: String,
  content: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  category: { type: String, ref: 'Category' }
});

module.exports = mongoose.model('Post', postSchema);