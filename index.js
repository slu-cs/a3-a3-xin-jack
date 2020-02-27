let counter = 0;

// Respond to submit events
$('form').on('submit', function(event) {
  const form = $(this); // JQuery object representing the form
  event.preventDefault(); // Don't really submit the form

  // Create a new list
  const list = $('<ul></ul>');

  // Translate each input value into a list item
  const inputs = form.find('input'); // JQuery object represent all inputs
  for (let input of inputs) {
    input = $(input); // Turn into a JQuery object
    const li = $(`<li>${input.val()}<button type='submit'>-</button>  <button type='submit'>+</button>  <button type='submit'>Remove</button></li> `); // New list item
    list.append(li);
    input.val('');
  }

  counter++;
  const p = $(`<p>Options </p>`);

  // Add to the page

  $('#voting').append(list);

});
