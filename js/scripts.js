//business logic
var total = 0;
var roundScore = 0;
var playerOneTurn = true;
var playerTwoTurn = false;
var playerOneScore = 0;
var playerTwoScore = 0;

var gameSetup;

var gameInput = function(players, dice, goal){
  this.noOfPlayers = players;
  this.noOfDice= dice;
  this.goal=goal;
}
function roll(dice){
  if (playerOneTurn){
    total = Math.floor((Math.random() * 5)+1);
    console.log("Total: " + total);
    if (total%2===0){
      total=0;
      changeTurns();
    }
    roundScore=roundScore+total;
    total=0;
  } else if (playerTwoTurn) {
    total = Math.floor((Math.random() * 5)+1);;
  if (total%2===0){
      total=0;
      changeTurns();
    }
    roundScore=roundScore+total;
    total=0;
    roundScore+=total;
  }
}
function changeTurns(){
  checkWinner();
  playerOneTurn = !playerOneTurn;
  playerTwoTurn = !playerTwoTurn;
  roundScore = 0;
  $(".player-one").toggle();
  $(".player-two").toggle();
  if (playerTwoTurn){
  for(i=0; i<1 ;i++){
    total = Math.floor((Math.random() * 5)+1);
    console.log("Computer Roll: " + total);
    if (total%2===0){
      total=0;
      // changeTurns();
      $("#player-two-total").text(playerTwoScore);
      $("#player-two-round-total").text(roundScore);
      break;
    }
    roundScore=roundScore+total;
    total=0;
  };
  hold();
  };
};
function hold(){
  if (playerOneTurn){
    playerOneScore+=roundScore;
  } else if (playerTwoTurn){
    playerTwoScore+=roundScore;
  }
  roundScore = 0;
  changeTurns();
}
function checkWinner(){
if((playerOneScore>=21)){
  alert("player 1 is winner")
}
else if (playerTwoScore>=21) {
    alert("player 2 is winner")
}
}
// UI
$(document).ready(function(){
  $("form#game-input").submit(function(event) {
    event.preventDefault();
    var playerNumber = $("#player-number").val();
    var dice = $("#dice").val();
    var goal = $("#goal").val();
    gameSetup = new gameInput(playerNumber, dice, goal);
    $("#game-input").hide();

    $(".initial-hide").show();

    $(".player-two").hide();
  });
  $("#roll-player-one").click(function(event) {
    event.preventDefault();
    roll(dice);
    $("#player-one-total").text(playerOneScore);
    $("#player-one-round-total").text(roundScore);
    $("#player-two-total").text(playerTwoScore);
    $("#player-two-round-total").text(roundScore);
  });
  $("#hold-player-one").click(function(event) {
    event.preventDefault();
    hold();
    $("#player-one-total").text(playerOneScore);
    $("#player-one-round-total").text(roundScore);
    $("#player-two-total").text(playerTwoScore);
    $("#player-two-round-total").text(roundScore);
  });
  $("#roll-player-two").click(function(event) {
    event.preventDefault();
    roll(dice);

    $("#player-two-total").text(playerTwoScore);
    $("#player-two-round-total").text(roundScore);
  });
  $("#hold-player-two").click(function(event) {
    event.preventDefault();
    hold();
    $("#player-two-total").text(playerTwoScore);
    $("#player-two-round-total").text(roundScore);
  });
});
