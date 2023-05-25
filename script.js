// Start by opening a function...
$(function() {
  // Add a listener for clicking one of the save buttons. Using the id I added '.saveBtn' should be enough to call for every button with that id attached.
  $('.saveBtn').on('click', function() {
    // Grab the right time block, grab the message the user typed into it. Save it to local storage for later.
    const timeBlock = $(this).closest('.time-block').attr('id');
    const timeBlockMessage = $(this).siblings('textarea').val();
    localStorage.setItem(timeBlock, timeBlockMessage)
  })

  // This part of the function compares the current time, using dayjs, to the time of the time block. And colors the blocks appropriately based on past, present, or future.
  $('.time-block').each(function() {
    const currentHour = dayjs().hour();
    const timeBlockHour = parseInt($(this).attr('id').split('-')[1]);
    if (timeBlockHour < currentHour) {
      $(this).addClass('past').removeClass('present future');
    } else if (timeBlockHour === currentHour) {
      $(this).addClass('present').removeClass('past future');
    } else {
      $(this).addClass('future').removeClass('past present');
    }
  });

  // This function looks for all of the notes that the user has saved. And adds them to the saved time blocks.
  $('.time-block').each(function() {
    const timeBlock = $(this).attr('id');
    const savedNote = localStorage.getItem(timeBlock);
    if (savedNote) {
      $(this).find('textarea').val(savedNote);
    }
  });

  // Displays the current date using dayjs at the top of the page. 
  const currentDate = dayjs().format('MMMM DD, YYYY');
  $('#currentDay').text(currentDate);
});

