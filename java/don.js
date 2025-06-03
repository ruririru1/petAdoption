let donationCount = 0;

// Function with parameters: validates donation form
function validateDonation(amount, email) {
    return amount > 0 && email !== "" && email.includes("@");
}

// Function without parameters: shows thank-you message
function showThankYou() {
    const messages = [
        "You're making a real difference!",
        "Thank you for your kindness!",
        "You're helping save lives!",
        "Much appreciated – paws up for you! 🐾"
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    document.getElementById("donation-feedback").innerText = messages[randomIndex];
}

// Random donation suggestion
document.addEventListener("DOMContentLoaded", () => {
    const suggestedAmount = Math.floor(Math.random() * 50) + 10;
    const suggestion = document.createElement("div");
    suggestion.innerText = `💡 Suggested Donation: $${suggestedAmount}`;
    suggestion.style.color = "#0d6efd";
    suggestion.style.fontWeight = "bold";
    document.querySelector(".donation-options").prepend(suggestion);

    // Dynamic list of donation impacts (loop)
    const impactList = [
        "Helps feed a rescued animal for a week.",
        "Covers medical care for one pet.",
        "Supports shelter operations.",
        "Funds transport to a new forever home."
    ];

    const impactDiv = document.createElement("div");
    impactDiv.innerHTML = "<h5 class='mt-4'>Your donation helps:</h5>";
    for (let i = 0; i < impactList.length; i++) {
        const p = document.createElement("p");
        p.textContent = "• " + impactList[i];
        impactDiv.appendChild(p);
    }

    document.querySelector(".donation-options").appendChild(impactDiv);

    // Form handling
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const amount = parseFloat(document.getElementById("donationAmount").value);
        const email = document.getElementById("donorEmail").value;
        const name = document.getElementById("donorName").value || "Anonymous";

        if (validateDonation(amount, email)) {
            donationCount++;

            // Create a donation object
            const donation = {
                name: name,
                email: email,
                amount: amount,
                date: new Date().toLocaleString()
            };

            console.log("Donation received:", donation);

            // Play thank you sound
            const sound = document.getElementById("donateSound");
            if (sound) {
                sound.play().catch(err => console.warn("Audio playback failed:", err));
            }

            // Show thank-you message
            showThankYou();
            document.getElementById("donation-feedback").style.color = "green";
            document.getElementById("donation-feedback").innerText += ` (Total donations: ${donationCount})`;

            this.reset();
        } else {
            donationCount--; // just for using decrement
            document.getElementById("donation-feedback").innerText = "❌ Please enter a valid amount and email.";
            document.getElementById("donation-feedback").style.color = "red";
        }
    });
});


