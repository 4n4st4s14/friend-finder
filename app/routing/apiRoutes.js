//A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.

var friendData = require('../data/friends.js');

module.exports = function (app) {
  app.get('/api/friends', function(req, res){
    res.json(friendData);
  });

//A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post('/api/friends', function(req, res){
    console.log(req.body)
    // console.log("Something happened")
    // console.log('USER SCORES')
    // console.log(req.body.scores)

    let userscores = req.body.scores.map(score=> parseInt(score) )
    req.body.scores = userscores
    // userscores = userscores.reduce((a,b)=> a + b)
    // console.log(userscores)
    var arrayOfDifferences = []
    friendData.forEach(function(possibleFriend,index){
      // console.log(index)
      // console.log('POSSIBLE FRIEND SCORE')
      // console.log(`COMPARINGG WITH USER ${possibleFriend.name}`)
      let difference = 0;
      // console.log()
      possibleFriend.scores.forEach(function(singleQ,q) {
        // console.log(`question ${q}`)
        // console.log(`answer ${singleQ}`)
        // console.log( `user answer ${userscores[q]}` )
        let varriance = Math.abs(userscores[q] - singleQ)
        difference+= varriance
      }, this);
      // console.log('DONE WITH USER')
      // console.log('the total difference is ' + difference )
      arrayOfDifferences.push(difference)
    })
      // this is polyfil
    Array.min = function( array ){
      return Math.min.apply( Math, array );
  };

    // console.log('arrayOfDifferences')
    // console.log(arrayOfDifferences)

    var minimum = Array.min(arrayOfDifferences);
    // console.log('minimum')
    // console.log(minimum)
    // console.log(arrayOfDifferences.indexOf(minimum))
    console.log('your friend is ')
    var bestFriend = friendData[arrayOfDifferences.indexOf(minimum)]
    console.log(bestFriend)
    console.log(req.body)
    friendData.push(req.body)

//FIRST ATTEMPT
      //  //get the data points from the incoming req
      //  var userData = req.body;
      //  var userName = userData.name;
      //  var userPhoto = userData.photo;
      //  var userScores= userData.scores;
       //
      //  console.log(userData);
      //  //var for comparing difference
      //  var difference = 0;
      //  //var obj to find best match
      //  var bestFriend = {
      //    name: "",
      //    photo: "",
      //    setDiff: 55
      //  };
       //
      //  //loop through the friends in friends.js
      //  for(var i=0; i<friendData.length; i++){
      //    //loop through scores of each friend and compare to scores of
      //    //incoming req
      //    console.log(friendData[i].name);
      //     difference = 0;
       //
      //    for(var j = 0; j< friendData[i].scores[j]; i++){
      //      //add together the absolute values of the differences between each //array location
       //
      //      difference += Math.abs(parseInt(userScores[j]) - parseInt(friendData[i].scores[j]));
       //
      //      console.log(difference);
       //
      //      if(difference <= bestFriend.setDiff){
      //        bestFriend.name = friendData[i].name;
      //        bestFriend.photo = friendData[i].photo;
      //        bestFriend.setDiff = difference;
      //      }
      //    }
      //  }



    //push data to friends.js AFTER finding best match, else will match with self
    //friendData.push(req.body);

    //best match in json format
    res.json(bestFriend);
  });
}
