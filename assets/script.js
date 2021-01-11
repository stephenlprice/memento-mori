//import dayjs from 'dayjs'
dayjs().format()

// variables and elements
var today = dayjs().format('dddd, MMMM D, YYYY');
var now = dayjs().format('h:mm:ss A');

// Writes the current day to the top of the page
$("#currentDay").text(today);

// Outputs current time
$("tbody th").text(dayjs().format('hh:mm A'));


function writeDay() {
    for (var i = 9; i <= 17; i++) {
        var hour = dayjs().hour(i).minute(0).second(0).format('hh A');

        $("tbody").append($(/*html*/`
            <tr>
                <th scope="row">${hour}</th>
                <td></td>
            </tr>
        `));
    }
}


// function timeContext() {
//     if (){

//     }
// }