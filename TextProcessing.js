require('should');

var nlp = require('nlp_compromise');
nlp.plugin(require('nlp-links'));

function checkStatus(result){
  var adjectiveStatus=false;
  var verbStatus=false;
  var placeStatus=false;
  var adverbStatus=false;
  for(i=0;i<result.length;i++)
  {
    if(result[i].pos.Place)
      placeStatus=true;
    else if(result[i].pos.Adjective)
      adjectiveStatus=true;
    else if(result[i].pos.Adverb)
      adverbStatus=true;
    else if(result[i].Verb)
      verbStatus= true;
  }
  return {"Adjective": adjectiveStatus, "Adverb":adverbStatus, "Place":placeStatus, "Verb":verbStatus};
}
module.exports = {
  TextProcessing: function (text) {
    //var sen = nlp.sentence('I fed the dog').withLinks();
        result = nlp.sentence(text).terms;


        //console.log(result);
        var adjectiveID=-1;
        var teamNode ="nothing ";
        var hiddenNode ="nothing ";
        var finalNode = " ";

        structure = checkStatus(result);
      //  console.log(result);
        if(structure.Adjective && structure.Place)
        {
          for(i=0;i<result.length;i++)
          {
            if(result[i].pos.Place)
            {
              teamNode= nlp.sentence(text).terms[i].text;
              console.log(teamNode);
            }
            else if(result[i].pos.Adjective)
            {
                hiddenNode = nlp.sentence(text).terms[i].text + " ";
                for(j=i+1;j<result.length;j++)
                {
                  hiddenNode = hiddenNode + nlp.sentence(text).terms[j].text + " ";
                }
                for(k=0;k<i;k++)
                {
                   console.log(nlp.sentence(text).terms[k].text);
                   if(nlp.sentence(text).terms[k].text == "is not" || nlp.sentence(text).terms[k].text == "has not"
                                                                   || nlp.sentence(text).terms[k].text == "have not")
                   {
                     hiddenNode = "not " + hiddenNode;
                   }
                }

                if(i>=1 && result[i-1].pos.Adverb)
                {
                  hiddenNode = nlp.sentence(text).terms[i-1].text + " " + hiddenNode;
                }
                break;
            }
          }
          // if callback exist execute it
          console.log({"teamNode":teamNode, "hiddenNode":hiddenNode.slice(0, -1) , "finalNode":"x"});
          return {"teamNode":teamNode, "hiddenNode":hiddenNode.slice(0, -1) , "finalNode":"x"};
        }
        else if(!structure.Adjective && structure.Place)
        {
           console.log('temdare bade');
           return {"teamNode":teamNode, "hiddenNode":hiddenNode.slice(0, -1) , "finalNode":"x"};
        }
        else if(!structure.Adjective && !structure.Place)
        {
           console.log('temNAdare bade');
           return {"teamNode":teamNode, "hiddenNode":hiddenNode.slice(0, -1) , "finalNode":"x"};
        }
  }
};
