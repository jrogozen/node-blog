var mongoose = require('mongoose');

module.exports = mongoose.model('Post', {
  title : {type : String, default: ''}
});