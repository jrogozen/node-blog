var Post = require('./models/post');

module.exports = function(app) {

  app.get('/api/posts/:postId', function(req, res) {
    var params = req.params;
    Post.findOne({_id: params.postId}, function(err, post) {
      if (err)
        res.status(422).send(err);

      res.status(200).json(post);
    })
  });

  app.put('/api/posts', function(req, res) {
    var params = req.body;
    console.log(params);
    Post.findOneAndUpdate({_id: params._id}, params, function(err, post) {
      if (err)
        res.status(422).send(err);

      res.status(200).json(post);
    });
  })

  app.get('/api/posts', function(req, res) {
    Post.find(function(err, posts) {
      if (err)
        res.status(422).send(err);

      res.status(200).json(posts);
    });
  });

  app.post('/api/posts', function(req, res) {
    var params = req.body;
    Post.create({title: params.title, content: params.content}, function(err, post) {
      console.log('creating post with params:', params);
      if (err) return handleError(err);
      res.status(200).json(post);
    }) 
  });

  app.delete('/api/posts/:postId', function(req, res) {
    var params = req.params;
    Post.findByIdAndRemove(params.postId, function(err, post) {
      console.log('deleting post with params', params);
      if (err)
        res.status(422).send(err);

      res.status(200).json(post);
    })
  });


};