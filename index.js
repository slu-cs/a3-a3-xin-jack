let counter = 0; // counter for identifying options

// Respond to submit events
$('form').on('submit', function(event) {

  const form = $(this); // JQuery object representing the form
  event.preventDefault(); // Don't really submit the form

  const input = $('input'); // Turn input into a JQuery object

  const li = $(`<li class='item${counter}'>${input.val()}</li>`); // create li w/ text
  li.append($(`<button type='submit' id="minus">-</button>`));
  li.append($(`<button type='submit' id="plus">+</button>`));
  li.append($(`<button type='submit' id="remove">Remove</button>`)); // add buttons
  const tr = $(`<tr class='item${counter}'>
                  <td>${input.val()}</td>
                  <td>0</td>
                </tr>`); // add row to table


  $('ul').on('click', '#remove', function(event) {
         event.preventDefault();
         const cl = $(this).closest('li').attr('class');
         $(this).closest('li').remove();
         $('table').find(`.${cl}`).remove();
       });

  $('ul').on('click', '#plus', function(event){
    event.preventDefault();
    const li = $(this).closest('li'); // find event listener
    const cl = li.attr('class'); // get item number
    const tr = $('table').find(`.${cl}`); // find corresponding row
    const val = parseInt(tr.find('td')[1].textContent); // get vote number from table
  });


  $('ul').append(li); // Add to the page
  $('table').append(tr);

  input.val(''); // reset text
  counter++; // increment id counter

});
