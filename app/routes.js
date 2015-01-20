var Post = require('./models/post');
var Category = require('./models/category')

module.exports = function(app) {

  app.get('/api/posts', function(req, res) {
    Post.find(function(err, posts) {
      if (err)
        res.status(422).send(err);

      res.status(200).json(posts);
    });
  });

  app.post('/api/posts', function(req, res) {
    var params = req.body;

    var post = new Post({
      title: params.title,
      content: params.content,
      category: params.category
    });

    post.save(function(err, post) {
      if (err)
        return res.status(422).send(err);

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

  app.get('/api/posts/:postId', function(req, res) {
    var params = req.params;
    Post
      .findOne({_id: params.postId})
      .populate('category', 'title')
      .exec(function (err, post) {
        if (err)
          res.status(422).send(err);
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

  app.get('/api/categories', function(req, res) {
    Category.find(function(err, cats) {
      if (err)
        return res.status(422).send(err);

      res.status(200).json(cats);
    }) 
  });

  app.post('/api/categories', function(req, res) {
    var params = req.body;
    Category.create({title: params.title}, function(err,cat) {
      if (err)
        return res.status(422).send(err);

      res.status(200).json(cat);
    })
  });

  app.get('/api/categories/:catId', function(req, res) {
    var params = req.params;
    console.log('cat with params', params);
    Category.findOne({_id: params.catId}, function(err, cat) {
      if (err)
        res.status(422).send(err);

      res.status(200).json(cat);
    })
  });

};