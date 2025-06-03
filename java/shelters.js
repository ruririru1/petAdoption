
// Variables and Data Types
let shelterName = "Happy Paws";
let totalPets = 47;
let isOpen = true;

// Basic Operations
let greeting = "Shelter: " + shelterName;
let petsAfterAdoption = totalPets - 5;
let evenCheck = totalPets % 2;

// Increment / Decrement
let visitors = 100;
visitors++;
visitors--;

// Function without parameter
function showVisitorCount() {
    let count = Math.floor(Math.random() * 1000);
    const vc = document.getElementById("visitor-count");
    if (vc) vc.textContent = "Visitor #" + count;
}

// Function with parameter
function greetUser(name) {
    const g = document.getElementById("greeting");
    if (g) g.textContent = "Hello, " + name + "!";
}

// If-Else condition
function checkOpenStatus() {
    if (isOpen) {
        console.log("We are open today!");
    } else {
        console.log("Sorry, we are closed today.");
    }
}

// Loop & Array
function listPetTypes() {
    let pets = ["Dog", "Cat", "Rabbit", "Parrot"];
    const container = document.getElementById("pet-types");
    if (container) {
        container.innerHTML = "";
        for (let i = 0; i < pets.length; i++) {
            let li = document.createElement("li");
            li.textContent = pets[i];
            container.appendChild(li);
        }
    }
}



// DOM Manipulation
document.addEventListener("DOMContentLoaded", function () {
    const title = document.getElementById("shelter-title");
    const link = document.getElementById("shelter-link");
    const img = document.getElementById("shelter-img");

    if (title) title.style.color = "#ff7043";
    if (link) link.href = "https://example.com";
    if (img) img.src = "pic/shelter1.jpg";

    const greetBtn = document.getElementById("greet-btn");
    const visitorBtn = document.getElementById("visitor-btn");

    if (greetBtn) greetBtn.addEventListener("click", () => greetUser("Ruri"));
    if (visitorBtn) visitorBtn.addEventListener("click", showVisitorCount);

    listPetTypes(); // auto list pet types
});

// jQuery Interactivity
$(document).ready(function () {
    // Change style
    $(".card-title").css("color", "#ff5722");

    // Change text
    $(".card-text").first().text("Updated info about this shelter!");

    // Change attribute
    $(".btn-primary").first().attr("href", "https://new-shelter.com");

    // Animation
    $(".card").hide().fadeIn(1500);

    // Add/remove on click
    $("#add-review").click(function () {
        $("#review-list").append("<li>New user review added!</li>");
    });

    // Slide toggle on mouseover
    $(".card-title").on("mouseover", function () {
        $(this).next(".card-text").slideToggle();
    });
});

