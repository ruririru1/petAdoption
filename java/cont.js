// Variables
let siteName = "Pet Adoption";
let submissionsToday = 15;
let formOpen = true;

// Basic operations
let headline = "Welcome to " + siteName;
let luckyNumber = submissionsToday + 7;
let modCheck = luckyNumber % 3;

// Increment/Decrement
submissionsToday++;
submissionsToday--;

// Function without parameters
function showThanks() {
    $("#form-feedback")
        .text("Thank you for your message!")
        .css("color", "#28a745");
}

// Function with parameters
function validateForm(name, email, message) {
    if (name.length < 2 || !email.includes("@") || message.length < 10) {
        return false;
    }
    return true;
}

// Conditional + Random number use
function randomResponse() {
    const responses = [
        "Thanks for reaching out!",
        "We’ll get back to you soon!",
        "Your message is appreciated!"
    ];
    let index = Math.floor(Math.random() * responses.length);
    return responses[index];
}

// Array + Feedback log
let feedbackLog = [];

// Function to display the log in console
function displayFeedbackLog() {
    console.log("Feedback log:");
    for (let i = 0; i < feedbackLog.length; i++) {
        console.log(i + 1 + ": " + feedbackLog[i].name + " - " + feedbackLog[i].message + " (" + feedbackLog[i].time + ")");
    }
}

// JavaScript Object: Create a feedback entry
function createFeedbackEntry(name, message) {
    return {
        name: name,
        message: message,
        time: new Date().toLocaleString()
    };
}

// Higher-Order Function: Accepts a callback to process the feedback
function processFeedback(entry, callback) {
    feedbackLog.push(entry);
    callback();
}

// DOM Manipulation + Event Listeners
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-input").value;
        const email = document.getElementById("email-input").value;
        const message = document.getElementById("message-input").value;

        if (validateForm(name, email, message)) {
            const entry = createFeedbackEntry(name, message);
            processFeedback(entry, function () {
                showThanks();
                $("#form-feedback")
                    .append("<br>" + randomResponse())
                    .hide()
                    .fadeIn();
                displayFeedbackLog();
            });
        } else {
            $("#form-feedback")
                .text("Please fill out the form properly.")
                .css("color", "red");
        }
    });

    // jQuery fade in effect on contact form
    $(".contact-form").hide().fadeIn(1000);

    // Styling interaction
    $("#submit-btn").on("mouseover", function () {
        $(this).css("background-color", "#ff69b4");
    }).on("mouseout", function () {
        $(this).css("background-color", "#0d6efd");
    });
});


    
