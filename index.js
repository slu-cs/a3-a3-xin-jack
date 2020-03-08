let counter = 0; // counter for identifying options

$('#questions').on('submit', function(event) {
        const form =$(this);
        event.preventDefault();

        // Grab the text and empty the box
        const input = form.find('#add_question');
        if(input.val()!==''){
          const q = $(`<h2>${input.val()}</h2>`);
          $('#aquestion').append(q); // Add to the page
          // TODO: decide which of the following to do:
          form.remove(); // get rid of question text box

        }
});
let list_counter=0;
// Respond to submit events
$('#options').on('submit', function(event) {
  const form = $(this); // JQuery object representing the form
  event.preventDefault(); // Don't really submit the form
  const input=form.find('.add_option');
  if (input.val() !== ''){ // check if input is blank
    const li = $(`<li class='item${counter} list-group-item'><div class='float-left'>${input.val()}</div></li>`); // create li w/ text
    const div = $(`<div class='float-right'></div>`)
    div.append($(`<button id="minus">cancel a vote</button>`));
    div.append($(`<button id="plus">add a vote</button>`));
    div.append($(`<button id="remove">Remove</button>`)); // add buttons
    li.append(div);
    list_counter=list_counter+1;
    const tr = $(`<tr class='item${counter}'>
                    <td>${input.val()}</td>
                    <td>0</td>
                  </tr>`); // add row to table

    $('#aoption').append(li); // Add to the page
    $('table').append(tr);

    input.val(''); // reset text
    counter++; // increment id counter
  };
});


$('#submit_option').click(function(){
    $(this).attr("disabled","disabled");
    $('.add_option').attr("disabled","disabled");
    $('.add_option').val('');
    while(list_counter>0){
      $('#remove').remove();
      list_counter=list_counter-1;
    }
    this.closest('form').remove();

});


// remove items from list and table
$('ul').on('click', '#remove', function(event) {
       event.preventDefault();
       const cl = $(this).closest('li').attr('class').split(' ')[0]; // get item number
       $(this).closest('li').remove(); // remove item from list
       $('table').find(`.${cl}`).remove(); // remove row from table
       list_counter=list_counter-1;
});

// increase vote count
$('ul').on('click', '#plus', function(event){
  event.preventDefault();
  const li = $(this).closest('li'); // find event listener
  const cl = li.attr('class').split(' ')[0]; // get item number
  const tr = $('table').find(`.${cl}`); // find corresponding row
  const val = getVal(tr); // get vote number from table
  tr.find('td')[1].textContent=val+1; // increment
  sortTable();
});

// decrease vote count
$('ul').on('click', '#minus', function(event){
  event.preventDefault();
  const li = $(this).closest('li'); // find event listener
  const cl = li.attr('class').split(' ')[0]; // get item number
  const tr = $('table').find(`.${cl}`); // find corresponding row
  const val = getVal(tr); // get vote number from table
  if(val-1>=0){ // check for non-negativity
    tr.find('td')[1].textContent=val-1; // decrement
  };
  sortTable();
});

// function to get vote count out of table
const getVal = function(tr){
  return parseInt(tr.find('td')[1].textContent);
};

// sort results list upon polling change
const sortTable = function(){
  let table = $('table tbody');
  const trs = table.find('tr'); // get all rows of table
  trs.sort((a, b) => getVal($(b)) - getVal($(a))); // sort by votes
  table.empty(); // empty table for sorted repopulation
  for (const tr of trs){
    table.append(tr);
  }; // repopulate table
};
