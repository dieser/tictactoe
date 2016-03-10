

/////////////////////////////////
/////main function for board////
///////////////////////////////
$(function() {

  var player = 1;
  var table = $('table');
  var messages = $('.messages');
  var turn = $('.turn');
  displayNextPlayer(turn, player);

///////////////////////////////////////////////////////////////////////////////
/// click function checks if player has won then goes on to set next player //
/////////////////////////////////////////////////////////////////////////////
  $('td').click(function() {
    td = $(this);
    var state = getState(td);
    if (!state) {
      var win = defineWinForCurrentPlayer(player);
      changeState(td, win);
      if (checkIfPlayerWon(table, win)) {
        swal({   title: 'Player ' + player + ' has won.',   imageUrl: "images/xoxo.png" });
        turn.html('');
      } else {
        player = setNextPlayer(player);
        displayNextPlayer(turn, player);
      }
    } else {
      swal({  title:'The box has already been filled'});
    }
  });

  $('.reset').click(function() {
    player = 1;
    messages.html('');
    reset(table);
    displayNextPlayer(turn, player);
  });

});

function getState(td) {
  if (td.hasClass('cross') || td.hasClass('circle')) {
    return 1;
  } else {
    return 0;
  }
}

function changeState(td, win) {
  return td.addClass(win);
}

function defineWinForCurrentPlayer(player) {
  if (player == 1) {
    return 'cross';
  } else {
    return 'circle';
  }
}

function setNextPlayer(player) {
  if (player == 1) {
    return player = 2;
  } else {
    return player = 1;
  }
}

function displayNextPlayer(turn, player) {
  turn.html("Player  " + player + "'s turn");
}

//////////////////////////////////////////////////////////////
//////// runs through all possible win combinations /////////
////////////////////////////////////////////////////////////
function checkIfPlayerWon(table, win) {
  var won = 0;
  if (table.find('.box1').hasClass(win) && table.find('.box2').hasClass(win) && table.find('.box3').hasClass(win)) {
    won = 1;
  } else if (table.find('.box1').hasClass(win) && table.find('.box4').hasClass(win) && table.find('.box7').hasClass(win)) {
    won = 1;
  } else if (table.find('.box1').hasClass(win) && table.find('.box5').hasClass(win) && table.find('.box9').hasClass(win)) {
    won = 1;
  } else if (table.find('.box4').hasClass(win) && table.find('.box5').hasClass(win) && table.find('.box6').hasClass(win)) {
    won = 1;
  } else if (table.find('.box7').hasClass(win) && table.find('.box8').hasClass(win) && table.find('.box9').hasClass(win)) {
    won = 1;
  } else if (table.find('.box2').hasClass(win) && table.find('.box5').hasClass(win) && table.find('.box8').hasClass(win)) {
    won = 1;
  } else if (table.find('.box3').hasClass(win) && table.find('.box6').hasClass(win) && table.find('.box9').hasClass(win)) {
    won = 1;
  } else if (table.find('.box3').hasClass(win) && table.find('.box5').hasClass(win) && table.find('.box7').hasClass(win)) {
    won = 1;
  }
  return won;
}

////////////////////////////////////////////////////////////////////////////////////////////
//resets table by removing all circles and crosses from board and resetting to player 1.
/////////////////////////////////////////////////////////////////////////////////////////
function reset(table) {
  table.find('td').each(function() {
    $(this).removeClass('circle').removeClass('cross');
  });
}
