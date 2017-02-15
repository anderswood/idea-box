
var storageArray = JSON.parse(localStorage.getItem('storeMe')) || [];

$(document).ready(function() {
  storageArray.forEach( function(idea){
    var id = idea.id;
    var title = idea.title;
    var body = idea.body;
    var quality = idea.quality;
    printIdea(id,title,body,quality);
  })
});

$('#save').on('click', function() {

  // check inputs - confirm inputs are populated | disable 'save' button

  storeNewIdea();
  pushToStorage();
  printIdea(id,$('#title').val(),$('#body').val(),quality);
  clearInputs();
});


function storeNewIdea(){
  var id = Math.floor(Math.random()*1e10)
  var title = $('#title').val();
  var body = $('#body').val();
  var newIdea = new Idea(id,title,body);
  storageArray.push(newIdea);
};

function Idea(id,title,body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'swill';
};

function pushToStorage() {
  localStorage.setItem("storeMe", JSON.stringify(storageArray));
};

function printIdea(id,title,body,quality) {
  $('.ideas').prepend(
    `<article class="template">
    <h2>${title}</h2>
    <img class="icon" id="delete-btn" src="icons/delete.svg" alt="delete button">
    <p>${body}</p>
    <img class="icon upvote" src="icons/upvote.svg" alt="upvote button">
    <img class="icon downvote" src="icons/downvote.svg" alt="downvote button">
    <h3><b>quality:</b> <span id="quality">${quality}</span></h3>
    <h3>ID:<span id="unique-id">${id}</span></h3>
    </article>`);
};

function clearInputs() {
  $('form')[0].reset();
  disableSave();
};

function pullFromStorage() {
  JSON.parse(localStorage.getItem('storeMe'));
};


$('.ideas').on('click', '#delete-btn', function() {
 //store ID in local variable
 var id = $('#id')
  $(this).parent().remove('article');

//take ID, filter through StorageArray and remove object with matching ID from storage
// run filter function on storagearray, match ID from deleted Idea with ID of object in array, delete the filtered object
});

// Disable 'save' button when one or both of the input fields are empty
$('#title').keyup(function() {
  checkInputs();
})

$('#body').keyup(function() {
  checkInputs();
})

function checkInputs(){
  if ($('#title').val() == '' && $('#body').val() == ''){
    disableSave();
  } else if ($('#title').val() == '' || $('#body').val() == '') {
    disableSave();
  } else {
    $('#save').prop('disabled', false);
  }
}

function disableSave () {
  $('#save').prop('disabled', true);
}
