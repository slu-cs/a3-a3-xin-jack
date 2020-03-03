let counter = 0; // counter for identifying options
$('#questions').on('submit', function(event) {
        const form =$(this);
        event.preventDefault();


        // Grab the text and empty the box
        const input =form.find('#add_question');
        if(input.val()!==''){
          const li = $(`<li>${input.val()}</li>`);
          $('#aquestion').append(li); // Add to the page
          input.val('');
        }
        $('#submit_question').prop('disabled',true);


});

// Respond to submit events
$('#options').on('submit', function(event) {
  const form = $(this); // JQuery object representing the form
  event.preventDefault(); // Don't really submit the form
  const input=form.find('#add_option');
  if (input.val() !== ''){ // check if input is blank
    const li = $(`<li class='item${counter} list-group-item'>${input.val()}</li>`); // create li w/ text
    li.append($(`<button id="minus">cancel a vote</button>`));
    li.append($(`<button id="plus">add a vote</button>`));
    li.append($(`<button id="remove">Remove</button>`)); // add buttons
    const tr = $(`<tr class='item${counter}'>
                    <td>${input.val()}</td>
                    <td>0</td>
                  </tr>`); // add row to table

    $('#aoption').append(li); // Add to the page
    $('table').append(tr);

    input.val(''); // reset text
    counter++; // increment id counter
  };
  $('#submit_option').click(function(){
    $(this).attr("disabled","disabled");
    $('#add_option').attr("disabled","disabled");
  });


});

// remove items from list and table
$('ul').on('click', '#remove', function(event) {
       event.preventDefault();
       const cl = $(this).closest('li').attr('class'); // get item number
       $(this).closest('li').remove(); // remove item from list
       $('table').find(`.${cl}`).remove(); // remove row from table
});

// increase vote count
$('ul').on('click', '#plus', function(event){
  event.preventDefault();
  const li = $(this).closest('li'); // find event listener
  const cl = li.attr('class'); // get item number
  const tr = $('table').find(`.${cl}`); // find corresponding row
  const val = getVal(tr); // get vote number from table
  tr.find('td')[1].textContent=val+1; // increment
  sortTable();
});

// decrease vote count
$('ul').on('click', '#minus', function(event){
  event.preventDefault();
  const li = $(this).closest('li'); // find event listener
  const cl = li.attr('class'); // get item number
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
