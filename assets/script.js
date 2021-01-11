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
        var click = false;
        var input = $('<input type="text" class="w-100">');
        if (!click) {
            $(this).append($(input));
            $("input").focus();
        }
        $(this).off(event);
    });

});

// Writes hours from 9am to 5pm on the calendar page
function writeDay() {
    for (var i = 9; i <= 17; i++) {
        var hour = dayjs().set('hour', i).hour();
        var hourPretty = dayjs().hour(i).minute(0).second(0).format('hh A');
        if (hour < dayjs().hour()) {
            $("tbody").append($(/*html*/`
                <tr class="past">
                    <th class="w-25" scope="row">${hourPretty}</th>
                    <td class="w-75"><span></span></td>
                </tr>
            `));
        }
        else if (hour === dayjs().hour()) {
            $("tbody").append($(/*html*/`
                <tr class="present">
                    <th class="w-25" scope="row">${hourPretty}</th>
                    <td class="w-75"><span></span></td>
                </tr>
            `));
        }
        else {
            $("tbody").append($(/*html*/`
                <tr class="future">
                    <th class="w-25" scope="row">${hourPretty}</th>
                    <td class="w-75"><span></span></td>
                </tr>
            `));
        }   
    }
}


init();