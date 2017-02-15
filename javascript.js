
var storageArray = JSON.parse(localStorage.getItem('storeMe')) || [];
var id;
var title;
var body;
var quality;
var flaggedId;

$(document).ready(function() {
  printStorageArray()
});

function printStorageArray() {
  storageArray.forEach(function(idea){
    var localId = idea.id;
    var localTitle = idea.title;
    var localBody = idea.body;
    var localQuality = idea.quality;
    printIdea(localId,localTitle,localBody,localQuality);
  })
}

//Save button
$('#save').on('click', function() {
  storeNewIdea();
  pushToStorage();
  printIdea(id,title,body,'swill');
  clearInputs();
});

function storeNewIdea(){
  id = Math.floor(Math.random()*1e10)
  title = $('#title').val();
  body = $('#body').val();
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
    <h3 id="unique-id">${id}</h3>
    <h3><b>quality:</b> <span id="quality">${quality}</span></h3>
    </article>`);
};

function clearInputs() {
  $('form')[0].reset();
  disableSave();
};

//Delete Button: Update storageArray to exclude deleted idea, push updated
//array to storage, remove deleted idea from DOM
$('.ideas').on('click', '#delete-btn', function() {
  flaggedId = $(this).siblings('#unique-id').text()*1;
  storageArray = storageArray.filter(function(idea) {
    return idea.id !== flaggedId;
  })
  pushToStorage();
  $(this).parent().remove('article');
});

//Upvote and Downvote Buttons
$('.ideas').on('click', '.upvote', function() {
  quality = $(this).siblings().children('#quality').text();
  updateTextUpQuality();
  flaggedId = $(this).siblings('#unique-id').text()*1;
  updateObjectQuality();
  pushToStorage();
  $(this).parent().siblings().remove();
  $(this).parent().remove('article');
  printStorageArray();
})

$('.ideas').on('click', '.downvote', function() {
  quality = $(this).siblings().children('#quality').text();
  updateTextDownQuality();
  flaggedId = $(this).siblings('#unique-id').text()*1;
  updateObjectQuality();
  pushToStorage();
  $(this).parent().siblings().remove();
  $(this).parent().remove('article');
  printStorageArray();
})

function updateTextUpQuality() {
  if (quality == 'swill') {
    quality = 'plausible';
  } else if (quality == 'plausible') {
    quality = 'genius';
  }
}

function updateTextDownQuality() {
  if (quality == 'genius') {
    quality = 'plausible';
  } else if (quality == 'plausible') {
    quality = 'swill';
  }
}

function updateObjectQuality(){
  storageArray.forEach(function(idea,i) {
    if (idea.id == flaggedId) {
      idea.quality = quality;
      storageArray[i] = idea;
    }
  })
}

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
