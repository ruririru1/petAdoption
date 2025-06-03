window.onload = function () {
    alert("Welcome to the Pet Adoption Center!");
};

function rateSite() {
    let rating = prompt("How would you rate our site out of 5?");
    if (rating >= 4) {
        alert("Thank you for your positive feedback!");
    } else {
        alert("We'll try to improve. Thanks for your input!");
    }
}



let heading = document.querySelector("h1");
heading.addEventListener("mouseover", function () {
    heading.style.color = "#ff6600";
});
heading.addEventListener("mouseout", function () {
    heading.style.color = "";
});

$(document).ready(function () {
    $(".card").hover(function () {
        $(this).fadeTo(200, 0.8);
    }, function () {
        $(this).fadeTo(200, 1);
    });

    $(".btn-primary").click(function (e) {
        e.preventDefault();
        $(this).closest(".card").slideUp();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Array of tips or facts
    const tips = [
        "Did you know? Adopting a pet saves lives and provides them with a loving home.",
        "Tip: Make sure you have all the necessary supplies for your new pet before bringing them home!",
        "Fact: Pets can reduce stress and improve mental health. They truly are great companions!",
        "Adoption Tip: Consider the pet's age, personality, and needs before making a decision.",
        "Fun Fact: Dogs have been shown to understand human emotions and react to them!"
    ];

    // Function to display a random tip
    function showRandomTip() {
        const randomIndex = Math.floor(Math.random() * tips.length);
        const tipText = tips[randomIndex];
        document.getElementById("tip-text").textContent = tipText;
    }

    // Show a random tip when the page loads
    showRandomTip();

    // Event listener for the button to load a new tip
    document.getElementById("new-tip-btn").addEventListener("click", showRandomTip);
});
