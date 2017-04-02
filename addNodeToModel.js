
function cleanTheShit()
{
  d3.select("svg").remove();
  $(".prediction").empty();
  $(".team1").empty();
  $(".team2").empty();
  $(".team1").append('<span style="font-family:Arial; font-size:12px; font-weight: bold;">'+ team1+' </span></br>');
  $(".team2").append('<span style="font-family:Arial; font-size:12px; font-weight: bold;">'+ team2+' </span></br>');
  force.nodes(dataset.nodes)
       .links(dataset.links)
       .start();

}
var linkID, teamID;
function createStartNode(dataset, dataModel)
{
  var element={};
  element.name = dataModel.teamNode;
  teamID = element.id = dataset.nodes.length;
  element.NodeWeight = 0;
  dataset.nodes.push(element);
  //console.log("begining", dataset.nodes);
}
function createMiddleNode(dataset, dataModel)
{
  var element={};
  element.name = dataModel.hiddenNode;
  linkID =element.id= dataset.nodes.length;
  element.NodeWeight = 0;
  dataset.nodes.push(element);
 //console.log("middle", dataset.nodes);
}


function createMiddleLink(dataset, dataModel, teamID, checkNode)
{
  if(checkNode==false)
  {
    var link={};
    link.source = teamID;
    link.target = linkID;
    link.value = 0.5;
    dataset.links.push(link);
  }
  else
  {
    var link={};
    link.source = teamID;
    for(i=0;i<dataset.nodes.length;i++)
    {
      if(dataset.nodes[i].name == dataModel.hiddenNode)
      {
        linkID = dataset.nodes[i].id;
      }
    }
    link.target  = linkID;
    link.value = 0.5;
    dataset.links.push(link);

  }
}

function createFinalLink(dataset, dataModel)
{
  winlossID = getLossWinIDs(dataset);
  console.log(winlossID.Loss)
  var finalLink={};
  finalLink.source= linkID ;
  if(dataModel.finalNode == "Positive")
  {
       finalLink.target = winlossID.Win;
  }
  else
  {
       finalLink.target = winlossID.Loss;
  }
  finalLink.value = 0.5;
  dataset.links.push(finalLink);
}

function addNodeToModel(dataModel){
  EuropeanTeam = ["Switzerland","France","Romania","Albania","Russia","Wales","Slovakia","England","Ukraine",
                  "Poland", "Germany", "Northern Ireland", "Czech Republic","Turkey", "Croatia", "Spain", "Sweden", "Sweden",
                  "Spain", "Belgium", "Iceland", "Austria", "Hungary","Portugal" ,"Italy" ,"Ireland"];
  var checkTeam =false;
  var checkNode=false;
  for(i=0;i<dataset.nodes.length;i++)
  {
    dataset.nodes[i].NodeWeight =0;
    if(dataModel.teamNode == dataset.nodes[i].name)
    {
      teamID=i;
      checkTeam = true;
    }
    if(dataModel.hiddenNode == dataset.nodes[i].name)
    {
      checkNode=true;
      hiddenNodeID=i;
    }
  }

  if(checkTeam==true && checkNode==false)
  {
     createMiddleNode(dataset, dataModel);
     createMiddleLink(dataset, dataModel, teamID);
     createFinalLink(dataset, dataModel)
     cleanTheShit();
     setTimeout(function(){     run(dataset);}, 100);
  }
  else if(checkTeam==false && checkNode==false)
  {
    var checkEuropeanTeam=false;

    for(j=0;j<EuropeanTeam.length;j++)
    {
        if(dataModel.teamNode == EuropeanTeam[j])
        {
            checkEuropeanTeam=true;
            createStartNode(dataset, dataModel);
            createMiddleNode(dataset, dataModel);
            createMiddleLink(dataset, dataModel, teamID, checkNode);
            createFinalLink(dataset, dataModel);
            cleanTheShit();
            setTimeout(function(){     run(dataset);}, 100);

        }
    }
    if(checkEuropeanTeam==false)
    {
      $("#notification").empty();
      $("#notification").text(dataModel.teamNode + " is not an European team.");
    }
  }
  else if(checkTeam==false && checkNode==true)
  {
    var checkEuropeanTeam=false;
    for(j=0;j<EuropeanTeam.length;j++)
    {

        if(dataModel.teamNode == EuropeanTeam[j])
        {
            //console.log("I the way");
            checkEuropeanTeam=true;
            createStartNode(dataset, dataModel);
            createMiddleLink(dataset, dataModel, teamID, checkNode);
            createFinalLink(dataset, dataModel);
            cleanTheShit();
            //console.log(dataset.links)
            setTimeout(function(){     run(dataset);}, 100);

        }
    }
    if(checkEuropeanTeam==false)
    {
      $("#notification").empty();
      $("#notification").text(dataModel.teamNode + " is not an European team.");
    }
  }
  else {
    var link={};
    linkChecker = false;
    link.source = teamID;
    link.target = hiddenNodeID;
    for(i=0;i<dataset.links.length;i++)
    {
      if(dataset.links[i].source.id == link.source && dataset.links[i].target.id == link.target)
      {
        linkChecker=true;
      }
    }
    if(linkChecker==false)
    {
      link.value = 0.5;
      dataset.links.push(link);
      cleanTheShit();
      //console.log(dataset.links)
      setTimeout(function(){     run(dataset);}, 100);
    }
  }

}
