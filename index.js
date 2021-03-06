let counter = 0; // counter for identifying options

//  add question
$('#questions').on('submit', function(event) {
        const form =$(this);
        event.preventDefault();
        // Grab the text and empty the box
        const input = form.find('#add_question');

        document.title = input.val();

        if(input.val()!==''){
          const q = $(`<h2>${input.val()}</h2>`);
          $('#aquestion').append(q); // Add to the page
          form.remove(); // get rid of question text box

        }
});
let list_counter=0;//this variable is used to count the number of item in the list
// Respond to submit events
$('#options').on('submit', function(event) {
  const form = $(this); // JQuery object representing the form
  event.preventDefault(); // Don't really submit the form
  const input=form.find('.add_option');
  if (input.val() !== '' && notDup(input.val())){ // check if input is blank or a duplicate
    const li = $(`<li class='item${counter} list-group-item'><div class='float-left'>${input.val()}</div></li>`); // create li w/ text
    const div = $(`<div class='float-right'></div>`)
    div.append($(`<button id="minus" class="btn btn-info">cancel a vote</button>`));
    div.append($(`<button id="plus" class="btn btn-info m-2">add a vote</button>`));
    div.append($(`<button id="remove" class="btn btn-info">Remove</button>`)); // add buttons
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

//when click Done for options
$('#submit_option').click(function(){
  //unable the done button for option when empty
  if(list_counter!=0){
    $(this).attr("disabled","disabled");  //disable the button when done
    $('.add_option').attr("disabled","disabled");
    $('.add_option').val('');
    //loop through to remove all the remove buttons
    while(list_counter>0){
      $('#remove').remove();
      list_counter=list_counter-1;
    }
    //get rid of the add option form
    this.closest('form').remove();
  }

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

const notDup = function(val){
  let table = $('table tbody');
  const trs = table.find('tr'); // get all rows of table
  for (const tr of trs){
    if (val === $(tr).find('td')[0].textContent){
      return false;
    };
  };
  return true;
};
