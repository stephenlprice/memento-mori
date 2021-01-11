//import dayjs from 'dayjs'
dayjs().format()

// variables and elements
var today = dayjs().format('dddd, MMMM D, YYYY');

$("#currentDay").text(today);
