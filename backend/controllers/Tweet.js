const Tweet = require('../model/Tweet');
const User = require('../model/User');
const mongoose = require('mongoose');

exports.createTweet = (req, res) => {
    const tweet = new Tweet({
        user: req.body.user, 
        description: req.body.description
    });
    
    tweet.save()
        .then(() => {
            res.status(201).json({
                message: 'Tweet enregistré !'
            });
        })
        .catch((error) => {
            console.error('Erreur lors de la création du tweet:', error);
            res.status(400).json({
                error: error.message || 'Une erreur s\'est produite lors de l\'enregistrement du tweet.'
            });
        });
};

exports.getOneTweet = (req, res) => {
    Tweet.findOne({
        _id: req.params.id
      })
      .populate('user', 'surname')
      .then(
        (tweet) => {
          res.status(200).json(tweet);
        }
      ).catch(
          (error) => {
            res.status(404).json({
              error: error
            });
          }
        );
      };
      
exports.getAllTweetFromOneUser = (req, res) => {
    Tweet.find({user : req.params.user})
    .populate('user', 'surname')
    .then(tweets => res.status(200).json(tweets.toReversed()))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllTweet = (req, res) => {
    let query = {};
    const searchData = req.query.search;
    if (searchData) {
        query= {
            $or: [
                {description: {$regex: searchData, $options:"i"}},
            ]
        }
    }
    Tweet.find(query)
    .populate('user', 'surname')
    .then(tweets => res.status(200).json(tweets.toReversed()))
    .catch(error => res.status(400).json({ error }));
};

exports.getbyTweet = (req, res) => {
    const TweetSearchQuery = req.query.q;
  if (!TweetSearchQuery) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
  }
  Tweet.find({ description: { $regex: TweetSearchQuery, $options: 'i' } })
      .then(tweets => {
          if (tweets.length === 0) {
              return res.status(404).json({ error: 'No tweets found' });
          }

          const formattedTweets = tweets.map(tweet => {
              const tweetObject = tweet.toObject();
              return tweetObject;
          });

          res.status(200).json(formattedTweets);
      })
      .catch(error => {
          console.error('Error fetching tweets by description:', error);
          res.status(500).json({ error: error.message || 'Internal Server Error' });
      });
}


exports.modifyTweet = (req, res) => {
    Tweet.updateOne({ _id: req.params.id }, req.body) 
    .then(() => res.status(200).json({ message: 'Tweet modifié !' }))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteTweet = (req, res) => {
        Tweet.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Tweet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      };