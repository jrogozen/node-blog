var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  title: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('Category', categorySchema);