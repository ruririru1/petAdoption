window.onload = function () {
    alert("Thank you for considering a donation!");
};

// Variables & arithmetic
let baseDonors = 50;
let recentDonations = 5;
let totalDonors = baseDonors + recentDonations;

console.log("Total donors so far: " + totalDonors);

// Function with parameters
function generateDonorID(name) {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return name.substring(0, 3).toUpperCase() + "-" + randomNum;
}

// Array and loop
let donors = ["Alice", "Bob", "Charlie"];

function updateDonorList() {
    let list = document.getElementById("donorList");
    if (list) {
        list.innerHTML = ""; // Clear list
        for (let i = 0; i < donors.length; i++) {
            let li = document.createElement("li");
            li.textContent = donors[i];
            list.appendChild(li);
        }
    }
}

// Increment / Decrement
let counter = 0;
document.getElementById("donationAmount").addEventListener("input", () => {
    counter++;
    console.log("User changed amount " + counter + " times");
});

// DOM manipulation + validation + audio + object
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    let amount = document.getElementById("donationAmount").value;
    let name = document.getElementById("donorName").value || "Anonymous";
    let email = document.getElementById("donorEmail").value;

    if (!amount || amount <= 0 || !email) {
        alert("Please enter a valid donation amount and email.");
        return;
    }

    // Create donation object
    const donation = {
        donorName: name,
        amount: parseFloat(amount),
        email: email,
        date: new Date().toLocaleString()
    };

    console.log("Donation received:", donation);

    // Play sound
    const donateSound = document.getElementById("donateSound");
    if (donateSound) donateSound.play();

    // Generate Donor ID
    let donorID = generateDonorID(name);
    document.getElementById("donationMsg").textContent =
        "Thank you, " + name + "! Your Donor ID is " + donorID;

    // Add to donors
    donors.push(name);
    updateDonorList();

    // Reset form
    this.reset();
});

$(document).ready(function () {
    // Change heading text + style
    $(".donation-page h1").css("color", "#E75480").text("Help Us Help Them!");

    // Animate message on donation
    $("form").on("submit", function () {
        $("#donationMsg").hide().fadeIn(1000);
    });

    // Toggle donor list
    $("#toggleDonors").click(function () {
        $("#donorSection").slideToggle();
    });

    // Remove last donor
    $("#removeLastDonor").click(function () {
        $("#donorList li").last().remove();
    });

    // Set tooltip on navbar brand
    $(".navbar-brand").attr("title", "Return to Home");
});
