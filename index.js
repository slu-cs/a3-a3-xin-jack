let counter = 0; // counter for identifying options

// Respond to submit events
$('form').on('submit', function(event) {

  const form = $(this); // JQuery object representing the form
  event.preventDefault(); // Don't really submit the form

  const input = $('input'); // Turn input into a JQuery object
  if (input.val() !== ''){ // check if input is blank
    const li = $(`<li class='item${counter}'>${input.val()}</li>`); // create li w/ text
    li.append($(`<button id="minus">-</button>`));
    li.append($(`<button id="plus">+</button>`));
    li.append($(`<button id="remove">Remove</button>`)); // add buttons
    const tr = $(`<tr class='item${counter}'>
                    <td>${input.val()}</td>
                    <td>0</td>
                  </tr>`); // add row to table

    $('ul').append(li); // Add to the page
    $('table').append(tr);

    input.val(''); // reset text
    counter++; // increment id counter
  };
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
  let table = $('table');
  const trs = table.find('tr').slice(1); // take header off, it doesn't play nice w/ sorting
  trs.sort((a, b) => getVal($(b)) - getVal($(a))); // sort by votes
  table.empty(); // empty table for sorted repopulation
  table.append($(`<tr>
                   <td><h5>Option</h5></td>
                   <td><h5>Votes</h5></td>
                </tr>`)); // put header back on
  for (const tr of trs){
    table.append(tr);
  }; // repopulate table
};
