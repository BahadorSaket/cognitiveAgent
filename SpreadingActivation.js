function getLossWinIDs(dataset){
  var winID=0, lossID=0;
  for(i=0;i<dataset.nodes.length;i++)
  {
    if(dataset.nodes[i].name=="Positive")
    {
        winID = dataset.nodes[i].id;
    }
    if(dataset.nodes[i].name=="Negative")
    {
        lossID = dataset.nodes[i].id;
    }
    if(dataset.nodes[i].label=="final")
    {
       finalID = dataset.nodes[i].id;
    }
  }
  return {"Win":winID, "Loss":lossID, "final":finalID};
}

function fillRealPrediction(i)
{

  if(UserPrediction[i].Results=="draw")
  {
    $("#realPrediction").empty();
    $("#realPrediction").append('<span style="font-family:Arial; font-size:12px;">'
          + UserPrediction[i].Team1 +' and '+ UserPrediction[i].Team2 +' will draw.</span></br>');
  }
  else {
    $("#realPrediction").empty();
    $("#realPrediction").append('<span style="font-family:Arial; font-size:12px;">'
          + UserPrediction[i].Results + ' will win the game.</span></br>');
  }
}
function userPrediction(team1, team2)
{
    $("#realPrediction").empty();
  team1=$("#team1 option:selected").text();
  team2=$("#team2 option:selected").text();
  var checker=false, counter=0;
  for(i=0;i<UserPrediction.length;i++)
  {
    if(team1 == UserPrediction[i].Team1)
    {
      if(UserPrediction[i].Team2 == team2)
      {
        checker=true;
        counter=i;
        //fillRealPrediction(i);
      }
    }
    else if(UserPrediction[i].Team2 == team1)
    {
      if(UserPrediction[i].Team1 == team2)
      {
        checker=true;
        counter=i;

       //fillRealPrediction(i);
      }
    }
  }
  if(checker)
  {
    fillRealPrediction(counter);
  }
  else {
    $("#realPrediction").append('<span style="font-family:Arial; font-size:12px;">The user did not make any prediction for this match. </span></br>');
  }
}

function SpreadingActivation(dataset){
  // This is the spread activation algorihtm. We developed this based on the algorithm provided on the Wikipedia
  var team1_ID;
  var team2_ID;
  team1_targetSource=[];
  team2_targetSource=[];
  team1_lossWeighting=0;
  team2_lossWeighting=0;
  team1_winWeighting=0;
  team2_winWeighting=0;
  team1_Weighting=0;
  team2_Weighting=0;
  loss_path=["Negative"];
  win_path=["Positive"];

  team1 = $("#team1 option:selected").text();
  team2 = $("#team2 option:selected").text();

  winlossID = getLossWinIDs(dataset);
  for(i=0;i<dataset.nodes.length;i++)
  {
    if(dataset.nodes[i].name==team1)
    {
       dataset.nodes[i].NodeWeight =1;
       team1_ID = dataset.nodes[i].id;
    }
    if(dataset.nodes[i].name==team2)
    {
       dataset.nodes[i].NodeWeight =1;
       team2_ID = dataset.nodes[i].id;
    }
  }
  //console.log(data.nodes);
  var Decade = 0.7;
  var Fire= 0.3;
  var temp=0;



  for(var i=0;i<dataset.nodes.length;i++)
  {
    if(dataset.nodes[i].NodeWeight > Fire )
    {

      for(var j=0;j<dataset.links.length;j++)
      {
        if(dataset.links[j].source.id == dataset.nodes[i].id)
        {
          for(var k=0; k<dataset.nodes.length;k++)
          {
            if(dataset.links[j].target.id == dataset.nodes[k].id)
            {
              temp = dataset.nodes[k].NodeWeight + (dataset.nodes[i].NodeWeight * Decade *dataset.links[j].value);
              if(temp>1)
              {
                //console.log("biger",temp);
                dataset.nodes[k].NodeWeight = 1;
              }
              else if(temp<0)
              {
                //  console.log("smaller",temp);
                dataset.nodes[k].NodeWeight = 0;
              }
              else
              {
                //  console.log("nothing",temp);
                dataset.nodes[k].NodeWeight = temp;
              }
            }
          }
        }
      }
    }
  }

//console.log("data", data.links);
  for(i=0;i<dataset.links.length;i++)
  {
  //  console.log("team1", team1_ID,i, data.links[i].source);
  //  console.log("team2",team2_ID,i ,data.links[i].source);
  //  console.log(['running loop', i, dataset.links[i].source])
    if(dataset.links[i].source.id == team1_ID)
    {
    //  console.log('inside first condition')
      team1_targetSource.push(dataset.links[i].target.id);
    }
    if(dataset.links[i].source.id == team2_ID)
    {

      team2_targetSource.push(dataset.links[i].target.id);
    }
  }
  //console.log(team1_targetSource, team2_targetSource);
  // team1_targetSource = [Best defence, World cup winner, star player]
  // Calculates the total weight for links connected to team 1
  for(i=0;i<team1_targetSource.length;i++)
  {
    for(j=0;j<dataset.links.length;j++)
    {
      if(team1_targetSource[i]==dataset.links[j].source.id)
      {
        if(dataset.links[j].target.id==winlossID.Win)
        {

         team1_winWeighting += dataset.nodes[dataset.links[j].source.id].NodeWeight;
          //data.links[j].value;
        }
        else if(dataset.links[j].target.id==winlossID.Loss)
        {
          team1_lossWeighting += dataset.nodes[dataset.links[j].source.id].NodeWeight;
          //data.links[j].value;
        }
      }
    }
  }
    // Calculates the total weight for links connected to team 2
  for(i=0;i<team2_targetSource.length;i++)
  {
    for(j=0;j<dataset.links.length;j++)
    {
      if(team2_targetSource[i]==dataset.links[j].source.id)
      {
        if(dataset.links[j].target.id==winlossID.Win)
        {
           team2_winWeighting += dataset.nodes[dataset.links[j].source.id].NodeWeight;
        }
        else if(dataset.links[j].target.id==winlossID.Loss)
        {
          team2_lossWeighting += dataset.nodes[dataset.links[j].source.id].NodeWeight;
        }
      }
    }
  }


  for(i=0;i<dataset.links.length;i++)
  {
    if(team1_ID == dataset.links[i].source.id)
    {
      for(j=0;j<dataset.links.length;j++)
      {
        if(dataset.links[i].target.id == dataset.links[j].source.id && dataset.links[j].target.id == winlossID.Win)
        {
          $(".team1").append('<span style="font-family:Arial; font-size:12px;">'
                + team1 + ' -- ' + dataset.nodes[dataset.links[i].target.id].name+ ' -- ' + ' Positive</span></br>');

          win_path.push(dataset.nodes[dataset.links[i].target.id].name);
        }
        else if(dataset.links[i].target.id == dataset.links[j].source.id && dataset.links[j].target.id == winlossID.Loss)
        {
          $(".team1").append('<span style="font-family:Arial; font-size:12px;">'
                + team1 + ' -- ' + dataset.nodes[dataset.links[i].target.id].name+ ' -- ' + ' Negative</span></br>');
          loss_path.push(dataset.nodes[dataset.links[i].target.id].name);
        }
      }
    }
  }

  for(i=0;i<dataset.links.length;i++)
  {
    if(team2_ID == dataset.links[i].source.id)
    {
      for(j=0;j<dataset.links.length;j++)
      {
        if(dataset.links[i].target.id == dataset.links[j].source.id && dataset.links[j].target.id == winlossID.Win)
        {
          $(".team2").append('<span style="font-family:Arial; font-size:12px;">'
                + team2 + ' -- ' + dataset.nodes[dataset.links[i].target.id].name+ ' -- ' + ' Positive</span></br>');
          win_path.push(dataset.nodes[dataset.links[i].target.id].name);
        }
        else if(dataset.links[i].target.id == dataset.links[j].source.id && dataset.links[j].target.id == winlossID.Loss)
        {
          $(".team2").append('<span style="font-family:Arial; font-size:12px;">'
                + team2 + ' -- ' + dataset.nodes[dataset.links[i].target.id].name+ ' -- ' + ' Negative</span></br>');
          loss_path.push(dataset.nodes[dataset.links[i].target.id].name);
        }
      }
    }
  }

  Negative_Team1=0;
  Negative_Team2=0;
  console.log(team1, team2);
  console.log(obj);
  for(i=0;i<obj.length;i++)
  {
    if(team1 == obj[i].Key)
    {
      Negative_Team1 = obj[i].Negative;
      console.log("Negative_Team1", Negative_Team1)
    }
    if(team2 == obj[i].Key)
    {
      Negative_Team2 = obj[i].Negative;
    }
  }
  team1_Weighting = team1_winWeighting - team1_lossWeighting - Negative_Team1;
  console.log(team1_Weighting,team1_winWeighting,team1_lossWeighting,Negative_Team1);
  team2_Weighting = team2_winWeighting - team2_lossWeighting - Negative_Team2;
  console.log(team2_Weighting,team2_winWeighting,team2_lossWeighting,Negative_Team2);

 // Checks which team will win the game based on the calculated weights

  if(team1_Weighting > team2_Weighting && (team1_Weighting - team2_Weighting) > 0.2)
  {
    userPrediction(team1, team2);
    $(".prediction").append('<span style="font-family:Arial; font-size:12px;">'
          + team1+' will win the game.</span></br>');
     dataset.nodes[winlossID.final].name = team1 + " will win the game and " + team2 +" will lose the game." ;
     win_path.push(team1);
     loss_path.push(team2);
     win_path.push(dataset.nodes[winlossID.final].name);


  }
  else if(team2_Weighting > team1_Weighting && (team2_Weighting - team1_Weighting) > 0.2){
    userPrediction(team1, team2);
    $(".prediction").append('<span style="font-family:Arial; font-size:12px;">'
          + team2+' will win the game.</span></br>');
    dataset.nodes[winlossID.final].name = team2 + " will win the game and " + team1 +" will lose the game." ;
    win_path.push(team1);
    loss_path.push(team2);
      win_path.push(dataset.nodes[winlossID.final].name);



  }
  else {
    $(".prediction").append('<span style="font-family:Arial; font-size:12px;">'
          + team1+ ' and ' + team2 +' will draw.</span></br>');
    dataset.nodes[winlossID.final].name = team1+ " and " + team2 + " will draw.";
    win_path.push(team1);
    win_path.push(team2);
    win_path.push(dataset.nodes[winlossID.final].name);
    userPrediction(team1, team2);
  //  finalLinksIDs = getfinalLinksIDs(dataset);
  //  dataset.links[finalLinksIDs.finalLossID].value
  }
  return dataset;
}
