// Selects the clock hands elements from the DOM
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

// Selects the clock face container from the DOM
const face = document.querySelector('.Face');

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// Event listener to open the dialog modally when the "Show the dialog" button is clicked
showButton.addEventListener("click", () => {
    dialog.showModal();
});

// Event listener to close the dialog and store the dropdown values in local storage when the "Close" button is clicked
closeButton.addEventListener("click", () => {
    // Get the selected values from the dropdowns
    const hours = document.getElementById("hours").value;
    const minutes = document.getElementById("minutes").value;
    const ampm = document.getElementById("ampm").value;

    // Combine the values into a single string representing the alarm time
    const alarmTime = `${hours}:${minutes} ${ampm}`;

    // Store the alarm time in local storage
    localStorage.setItem("alarmTime", alarmTime);

    alert('You have an alarm set for: ' + alarmTime)

    // Close the dialog
    dialog.close();
});



// Function to create and position each divot on the clock face
function createDivots() {
    const radius = 140; // Radius for positioning divots from the center
    for (let i = 0; i < 60; i++) {
        // Create a new div element for each divot
        const divot = document.createElement('div');
        divot.classList.add('second-divots'); // Assign base class for styling

        // Add a special class for every 5th divot to make it longer and gray
        if (i % 5 === 0) {
            divot.classList.add('divot');
        }

        // Rotate each divot and position it outward from the center
        divot.style.transform = `rotate(${i * 6 - 90}deg) translateY(-${radius}px)`;
        face.appendChild(divot); // Append the divot to the clock face
    }
}

function addZeros(z) {
    //Adds 0's in front of single digits in minutes and seconds
    if (z < 10) {
        z = "0" + z
    }
    return z
}


function realtime() {
    var today = new Date()
    //Pulls current date and time
    var h = today.getHours()
    //Pulls strictly the hours and puts it into a variable
    //Same is done for minutes and seconds
    var m = today.getMinutes()
    var s = today.getSeconds()

    let chng = ''
    if (h > 12) {
        h -= 12
        chng = 'PM'
    }
    else {
        chng = 'AM'
        return h
    }

    m = addZeros(m)
    s = addZeros(s)

    // Convert seconds to degrees, starting from the top (0 degrees)
    const secondsDegrees = ((s / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`; // Apply rotation

    // Convert minutes to degrees, including seconds for accuracy
    const minutesDegrees = ((m / 60) * 360) + ((s / 60) * 6) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`; // Apply rotation

    // Convert hours to degrees, including minutes for accuracy
    const hoursDegrees = ((h / 12) * 360) + ((m / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`; // Apply rotation


    document.getElementById('time').innerHTML = h + ":" + m + ":" + s + " " + chng
    //Note: The innerHTML property is used to update the items being pushed every time it's updating


    let displayAlarm = h + ':' + m + ' ' + chng

    if (displayAlarm == localStorage.getItem('alarmTime') && s == '00') {
        alert(localStorage.getItem('alarmTime'))
    }

}

setInterval(realtime, 500)
// Sets a transition between each half second that is passed
//Remember, time is measured in milliseconds       
//Takes realtime as the function in the parameter for setTimou

// Initialize the clock by setting up divots and hands
function initClock() {
    createDivots(); // Create and position the divots on the clock face
    realtime(); //Calls the calculations for the times and sets position of hands
}

// Call the initialization function to start the clock
initClock();











