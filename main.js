

function loadDropDownMenu(TeamName)
{
  $("#team1").empty();
  $("#team2").empty();
  for(i=0;i<TeamName.length;i++)
  {
    $("#team1").append(
        $('<option></option>').val(TeamName[i]).html(TeamName[i])
    );
    $("#team2").append(
        $('<option></option>').val(TeamName[i]).html(TeamName[i])
    );
  }
}
function mainProgram(){


if($("#configuration option:selected").text()== "Expert User")
{
  var team_Names = ["Austria", "France", "Wales","England","Germany","Belgium","Iceland","Italy"];
  UserPrediction = [{"Team1":"France" , "Team2":"England" , "Results":"France"},
                        {"Team1":"Germany" , "Team2":"France" , "Results":"draw"},
                        {"Team1":"Germany" , "Team2":"Italy" , "Results":"Germany"},
                        {"Team1":"Germany" , "Team2":"Belgium" , "Results":"Germany"},
                        {"Team1":"Austria" , "Team2":"Wales" , "Results":"Austria"},
                        {"Team1":"France" , "Team2":"Italy" , "Results":"France"},
                        {"Team1":"Wales" , "Team2":"Italy" , "Results":"Italy"},
                        {"Team1":"Iceland" , "Team2":"England" , "Results":"draw"},
                        {"Team1":"Belgium" , "Team2":"Italy" , "Results":"Belgium"}
                        ]
  loadDropDownMenu(team_Names);
  dataset = {
     "nodes":[
       //Team nodes
       {"name":"Austria", "id":0, "NodeWeight":0},
       {"name":"France", "id":1, "NodeWeight":0},
       {"name":"Wales", "id":2, "NodeWeight":0},
       {"name":"England", "id":3, "NodeWeight":0},
       {"name":"Germany", "id":4, "NodeWeight":0},
       {"name":"Belgium", "id":5, "NodeWeight":0},
       {"name":"Iceland", "id":6, "NodeWeight":0},
       {"name":"Italy", "id":7, "NodeWeight":0},
       //Attribute ndoes
       {"name":"in-form player", "id":8, "NodeWeight":0},
       {"name":"Good scoring record", "id":9, "NodeWeight":0},
       {"name":"Good defence", "id":10, "NodeWeight":0},
       {"name":"Star player", "id":11, "NodeWeight":0},
       {"name":"momentum", "id":12, "NodeWeight":0},
       {"name":"World cup winner", "id":13, "NodeWeight":0},
       {"name":"Euro Winer", "id":14, "NodeWeight":0},
       {"name":"Good midfield", "id":15, "NodeWeight":0},
       {"name":"Bad scoring record", "id":16, "NodeWeight":0},
       {"name":"Good Attack", "id":17, "NodeWeight":0},
       {"name":"Bad defence", "id":18, "NodeWeight":0},
       {"name":"inexperienced", "id":19, "NodeWeight":0},
       {"name":"Positive", "id":20, "NodeWeight":0},
       {"name":"Negative", "id":21, "NodeWeight":0},
       {"name":"Result", "label":"final" ,"id":22, "NodeWeight":0}
     ],
     "links":[
  //France
       {"source":1,"target":8,"value":0.5},
       {"source":1,"target":9,"value":0.5},
  //wales
       {"source":2,"target":11,"value":0.5},
       {"source":2,"target":12,"value":0.5},
  //England
       {"source":3,"target":16,"value":0.5},
  //Germany
       {"source":4,"target":10,"value":0.5},
       {"source":4,"target":13,"value":0.5},
       {"source":4,"target":14,"value":0.5},
       {"source":4,"target":11,"value":0.5},
  //Belgium
      {"source":5,"target":17,"value":0.5},
      {"source":5,"target":15,"value":0.5},
      {"source":5,"target":18,"value":0.5},
  //Iceland
      {"source":6,"target":19,"value":0.5},

  //Italy
      {"source":7,"target":15,"value":0.5},
      {"source":7,"target":10,"value":0.5},

  //Win Linkage
      {"source":8,"target":20,"value":0.2},
      {"source":9,"target":20,"value":0.2},
      {"source":10,"target":20,"value":0.1},
      {"source":11,"target":20,"value":0.2},
      {"source":12,"target":20,"value":0.2},
      {"source":13,"target":20,"value":0.6},
      {"source":14,"target":20,"value":0.3},
      {"source":15,"target":20,"value":0.1},
      {"source":17,"target":20,"value":0.1},

    //Loss linkage
      {"source":16,"target":21,"value":0.2},
      {"source":18,"target":21,"value":0.2},
      {"source":19,"target":21,"value":0.2},

      {"source":20,"target":22,"value":0.2},
      {"source":21,"target":22,"value":0.2}
     ]
   }

}
else {
  var team_Names = ["France", "England","Germany","Iceland"];
 UserPrediction = [{"Team1":"Iceland" , "Team2":"France" , "Results":"France"},
                        {"Team1":"Germany" , "Team2":"France" , "Results":"Germany"},
                        {"Team1":"Germany" , "Team2":"England" , "Results":"draw"},
                        {"Team1":"England" , "Team2":"Iceland" , "Results":"England"},
                        {"Team1":"France" , "Team2":"England" , "Results":"France"}
                        ]
  loadDropDownMenu(team_Names);
  dataset = {
     "nodes":[
       //Team nodes
       {"name":"Iceland", "id":0, "NodeWeight":0},
       {"name":"France", "id":1, "NodeWeight":0},
       {"name":"England", "id":2, "NodeWeight":0},
       {"name":"Germany", "id":3, "NodeWeight":0},

       {"name":"good record", "id":4, "NodeWeight":0},
       {"name":"bad record", "id":5, "NodeWeight":0},
       {"name":"Star player", "id":6, "NodeWeight":0},
       {"name":"World cup winner", "id":7, "NodeWeight":0},

       {"name":"Positive", "id":8, "NodeWeight":0},
       {"name":"Negative", "id":9, "NodeWeight":0},
       {"name":"Result", "label":"final" ,"id":10, "NodeWeight":0}
     ],
     "links":[
  //Iceland
      {"source":0,"target":5, "value":0.3},

  //France
      {"source":1,"target":7,"value":0.6},
      {"source":1,"target":4,"value":0.2},

  //England
      {"source":2,"target":5, "value":0.2},

  //Germany
      {"source":3,"target":7, "value":0.6},
      {"source":3,"target":6, "value":0.5},
      {"source":3,"target":4, "value":0.2},

      {"source":4,"target":8,"value":0.3},
      {"source":6,"target":8,"value":0.3},
      {"source":7,"target":8,"value":0.3},


      {"source":5,"target":9,"value":0.3},

      {"source":8,"target":10,"value":0.3},
      {"source":9,"target":10,"value":0.3}
     ]
   }
}
 return dataset;

}
function run(dataset)
{
  width= $("#Vis").width()-10;
  height= $("#Vis").height()-10;
  force = d3.layout.force().charge(-500).linkDistance(30).size([width, height]);
  svg = d3.select("body").select("#Vis").append("svg").attr("width", width).attr("height", height);
  dataset = SpreadingActivation(dataset); // sends the data/network for creating the model
  Visualizer(force, svg, dataset); // sends the data for visualization
}
