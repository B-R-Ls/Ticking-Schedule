//Grabs the save button
var saveInput = $('.saveBtn');

//Based on location, upon click it will grab the text and save it to local storage based on location.
saveInput.on('click', function(event) {
  var target = $(event.target);
  var item = target.siblings('.hour').text();

  localStorage.setItem("scheduleSave" + item, target.siblings().eq(1).val());

  $('#Display').append('Schedule item has been saved.');
  setTimeout(remove, 3000);
  
});

//Places all the saved text if any
function renderSaves() {
  for (var y = 9; y <= 11; y++) {
    var info = localStorage.getItem('scheduleSave' + y +'AM')
    $('#hour-' + y).children().eq(1).append(info);
  };
  var hour = 12
  for (var g = 0; g <= 12; g++) {
    var text = localStorage.getItem('scheduleSave' + g +'PM')
    $('#hour-' + hour).children().eq(1).append(text);
    hour++;
    if (g === 12){
      hour = 12;
      $('#hour-' + hour).children().eq(1).append(text);
    }
  };
};

//used to remove the save message
function remove(){
  $('#Display').text('')
}

//places time on page using dayjs
function displaytime(){
  var datetime = dayjs().format('MMM D, YYYY, hh:mm:ss a');
  $('#currentDay').text(datetime);
};

var i = 8;

//changes backgrounds based on time
function editboxes(){
  var time = dayjs().format('H');
  Number(time);
  
  if (time > i) {
    $('#hour-' + [i - 1]).removeClass('future present');
    $('#hour-' + [i - 1]).addClass('past')
    $('#hour-' + [i]).removeClass('future');
    $('#hour-' + [i]).addClass('past');
    i++;
  } else {
    $('#hour-' + [i]).removeClass('future past');
    $('#hour-' + [i]).addClass('present');
  }

  if (i > 23) {
    i = 8;
    $('.time-block').removeClass('past present')
    $('.time-block').addClass('future')
  }
}

//initializing editboxes, displaytime, and rendersaves
setInterval(editboxes, 200);
editboxes();

setInterval(displaytime, 1000);
displaytime();

renderSaves();