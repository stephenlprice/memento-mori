//import dayjs from 'dayjs'
dayjs().format()

// Outputs current time
dayjs().format('hh:mm A');

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
        // Text input set to cover the entire width
        var input = $('<input type="text" id="event" class="w-100">');
        if (!click) {
            $(this).append($(input));
            // Focuses on the input element to enter an activity
            $("input").focus();
        }
        // Turns this button off once it has been clicked once
        $(this).off(event);
    });

    $("tbody .save").on("click", function(event) {
        event.preventDefault();
        // create activity object from input and data-hour attribute
        var activity = {
            time: $("tbody th.w-auto").attr("data-hour"),
            date: dayjs().format('dddd, MMMM D, YYYY'),
            event: $("tbody td.w-75 input.w-100").val()
        };
        console.log(activity);
        // localStorage.setItem("activity")
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
        if (hour < dayjs().hour()) {
            $("tbody").append($(/*html*/`
                <tr class="past">
                    <th class="w-auto" scope="row" data-hour="${hourPretty}">${hourPretty}</th>
                    <td class="w-75"><span></span></td>
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
        }
        else if (hour === dayjs().hour()) {
            $("tbody").append($(/*html*/`
                <tr class="present">
                    <th class="w-auto" scope="row" data-hour="${hourPretty}">${hourPretty}</th>
                    <td class="w-75"><span></span></td>
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
        }
        else {
            $("tbody").append($(/*html*/`
                <tr class="future">
                    <th class="w-auto" scope="row" data-hour="${hourPretty}">${hourPretty}</th>
                    <td class="w-75"><span></span></td>
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
        }   
    }
}


init();