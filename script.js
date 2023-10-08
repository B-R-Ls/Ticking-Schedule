var saveInput = $('.saveBtn');

saveInput.on('click', function(event) {
  var target = $(event.target);
  var item = target.siblings('.hour').text();

  localStorage.setItem("scheduleSave" + item, target.siblings().eq(1).val());

  $('#Display').append('Schedule item has been saved.');
  setTimeout(remove, 3000);
  
});

function renderSaves() {
  for (var y = 9; y <= 11; y++) {
    var info = localStorage.getItem('scheduleSave' + y +'AM')
    $('#hour-' + y).children().eq(1).append(info);
  };
  var hour = 12
  for (var g = 1; g <= 12; g++) {
    var text = localStorage.getItem('scheduleSave' + g +'PM')
    $('#hour-' + hour).children().eq(1).append(text);
    hour++;
  };
};

function remove(){
  $('#Display').text('')
}

function displaytime(){
  var datetime = dayjs().format('MMM D, YYYY, hh:mm:ss a');
  $('#currentDay').text(datetime);
};

var i = 8;

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

setInterval(editboxes, 500);
editboxes();

setInterval(displaytime, 1000);
displaytime();

renderSaves();