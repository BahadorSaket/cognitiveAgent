var senti = require('senti');


module.exports = {
    sentimentAnalyzer: function(text, callback){
      var val="nothing";
       senti(text, function(something){
         console.log(something.probability.neg);
         console.log(something.probability.pos);
          if(Math.abs(something.probability.neg - something.probability.pos) >=0.1)
          {
            val= "Positive";
          }
          else {
            val= "Negative";
          }
       }, true);

       setTimeout(function(){callback(val); }, 2000);

    }
}
