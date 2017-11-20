//A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.

var friendData = require('../data/friends.js');

module.exports = function (app) {
  app.get('/api/friends', function(req, res){
    res.json(friendData);
  });

//A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post('/api/friends', function(req, res){
    //    //compare incoming scores with all other scores
    //    var userData = req.body;
    //    var difference = [];
     //
    //    //if more than one obj in friends.js
    //    if(friendData.length >1) {
    //      friendData.forEach(function(user){
    //        var totalDiff = 0;
     //
    //        for(var i = 0; i<userData.scores.length; i++){
    //          var dbScore = user.scores[i];
    //          var userScore = userData.scores[i];
    //          var diff = +dbScore - +userScore;
    //          totalDiff += Math.abs(diff);
    //        }
     //
    //        difference.push(totalDiff);
    //      });
     //
    //      var minDiff = Math.min.apply(null, difference);
     //
    //      var bestMatch = [];
     //
    //      for (var i=0; i < difference.length; i++){
    //        if(difference[i] === minDiff){
    //          bestMatch.push(friendData[i]);
    //        }
    //      }
     //
    //      res.json(bestMatch);
    //    } else {
    //      res.json(friendData);
    //    }
     //
    //  friendData.push(userData);



//FIRST ATTEMPT
       //get the data points from the incoming req
       var userData = req.body;
       var userName = userData.name;
       var userPhoto = userData.photo;
       var userScores= userData.scores;

       console.log(userData);
       //var for comparing difference
       var difference = 0;
       //var obj to find best match
       var bestFriend = {
         name: "",
         photo: "",
         setDiff: 55
       };

       //loop through the friends in friends.js
       for(var i=0; i<friendData.length; i++){
         //loop through scores of each friend and compare to scores of
         //incoming req
         console.log(friendData[i].name);
          difference = 0;

        //  for(var j = 0; j< friendData[i].scores[j]; i++){
        //    //add together the absolute values of the differences between each //array location
         //
        //    difference += Math.abs(parseInt(userScores[j]) - parseInt(friendData[i].scores[j]));
         //
        //    console.log(difference);
         //
        //    if(difference <= bestFriend.setDiff){
        //      bestFriend.name = friendData[i].name;
        //      bestFriend.photo = friendData[i].photo;
        //      bestFriend.setDiff = difference;
        //    }
        //  }
       }



    //push data to friends.js AFTER finding best match, else will match with self
    friendData.push(req.body);

    //best match in json format
    res.json(bestFriend);
  });
}
