let counter = 0; // counter for identifying options

// Respond to submit events
$('form').on('submit', function(event) {

  const form = $(this); // JQuery object representing the form
  event.preventDefault(); // Don't really submit the form

  const input = $('input'); // Turn input into a JQuery object

  const li = $(`<li class='item${counter}'>${input.val()}</li>`); // create li w/ text
  li.append($(`<button type='submit' id="-">-</button>`));
  li.append($(`<button type='submit' id="+">+</button>`));
  li.append($(`<button type='submit' id="remove">Remove</button>`)); // add buttons
  count=0
  const tr = $(`<tr class='item${counter}'>
                  <td>${input.val()}</td>
                  <td>${count}</td>
                </tr>`); // add row to table


  $('ul').on('click', '#remove', function(event) {
         const cl = $(this).closest('li').attr('class');
         console.log(cl);
         //$(this).closest('li').remove();
         $('table').closest('tr').remove();
       });




  $('ul').append(li); // Add to the page
  $('table').append(tr);

  input.val(''); // reset text
  counter++; // increment id counter

});
