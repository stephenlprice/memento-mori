//import dayjs from 'dayjs'
dayjs().format()

// Outputs current time
dayjs().format('hh:mm A');

// Array of scheduled events, can be empty
var events = JSON.parse(localStorage.getItem('events')) || [];

function init () {
    // Writes the current day to the top of the page
    $("#currentDay").text(dayjs().format('dddd, MMMM D, YYYY'));
    // Fill in the day with hours
    writeDay();
}

$(document).ready(function() {

    // Listens for a click to add a text input to enter a new activity for the selected hour
    $("tbody td.w-75").on("click", function(event) {
        event.preventDefault();
        // Flag to not allow more than one event per hour
        var click = false;
        // Text input set to cover the entire width with a data-checked flag set to true
        var $input = $('<input type="text" class="w-100" data-checked="true">');
        // Checks if the click or data-checked flags are false
        if (!click || $(this).find("input").attr("data-checked") === false) {
            $(this).append($($input));
            // Focuses on the input element to enter an activity
            $("input").focus();
        }
        // Turns this button off once it has been clicked once
        $(this).off(event);
    });

    // Save button
    $("tbody tr").on("click", function(event) {
        event.preventDefault();
        var $target = $(event.target);
        // Allows clicks on save buttons or their icon
        if ($target.is("button.save") || $target.is("i.fas.fa-save")) {
            // Will not allow saves on empty input texts
            if($(this).find("td.w-75 input.w-100").val() != "") {
                // create activity object from text input and data-hour attribute
                var $activity = {
                    time: $(this).find("th.w-auto").attr("data-hour"),
                    timeIndex: $(this).find("th.w-auto").attr("data-index"),
                    date: dayjs().format('dddd, MMMM D, YYYY'),
                    event: $(this).find("td.w-75 input.w-100").val()
                };
                console.log($activity);
                // Does not save activity objects lacking events into local storage
                if ($activity.length < 3 || !$activity.hasOwnProperty("event") || $activity.event === undefined) {
                    console.log("cannot save an empty event");
                }
                else {
                    // Push activity object into events array
                    events.push($activity);
                    // Save events array on local storage
                    localStorage.setItem("events", JSON.stringify(events));
                }
            }
        } 
    });

    // Delete button
    $("tbody tr").on("click", function(event) {
        event.preventDefault();
        // Used for event delegation
        var $target = $(event.target);
        // Allows clicks on delete buttons or their icon
        if ($target.is("button.delete") || $target.is("i.fas.fa-trash-alt")) {
            // Remove the text input
            $(this).children("td.w-75").empty();
            // Used to loop through array and splice the right item
            var storedEvents = JSON.parse(localStorage.getItem("events"));
            var thisIndex = $(this).children("td.w-75").attr("id");
            for (i = 0; i < storedEvents.length; i++) {
                // If the timeIndex of an object is the same as the ID on a schedule row
                if (storedEvents[i].timeIndex === thisIndex ) {
                    // Remove the matching item from the array
                    events.splice(i, 1);
                    // Push the new array to local storage
                    localStorage.setItem("events", JSON.stringify(events));
                }
            }
            
        }
    });

});

// Writes hours from 9am to 5pm on the calendar page
function writeDay() {
    // Iterate through business hours
    for (var i = 9; i <= 17; i++) {
        // generates an hour value to be used to determine past, present, future
        var hour = dayjs().set('hour', i).hour();
        // formatted hour to be rendered unto the page
        var hourPretty = dayjs().hour(i).minute(0).second(0).format('hh A');
        var cronos = "present";
        // checks if the calendar hour is before or after current time
        if (hour < dayjs().hour()) {
            cronos = "past";
        }
        else if (hour > dayjs().hour()) {
            cronos = "future";
        }

        // Template literal for each schedule row
        $("tbody").append($(/*html*/`
            <tr class="${cronos}">
                <th class="w-auto" scope="row" data-hour="${hourPretty}" data-index="${hour}">${hourPretty}</th>
                <td class="w-75" id="${i}"></td>
                <td class="w-auto">
                    <button class="save">
                        <i class="fas fa-save"></i>
                    </button>
                    <button class="delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `)); 
        
        // Check local storage for a matching activity and render a text input on the right row
        var eventsStored = JSON.parse(localStorage.getItem("events"));
        if (eventsStored != null) {
            for (j = 0; j < eventsStored.length;  j++) {
                eventsValue = events[j];
                iString = String(i);
                // If the timeIndex of an object matches the row as iterated in the parent function with i
                if (eventsValue.timeIndex === iString) {
                    // Construct a selector
                    var selector = "tbody td#" + i;
                    // Create an input tag
                    var $input = $('<input type="text" class="w-100" data-checked="true">').val(events[j].event);
                    // Append the input tag to the selector
                    $(selector).append($($input));
                }
            }
        }
    }
}


init();