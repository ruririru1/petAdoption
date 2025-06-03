
if (localStorage.getItem('isAdmin') !== 'true') {
    window.location.href = 'login.html';
}
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("adForm");
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Disable submit button to prevent multiple submissions
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        try {
            // Get form values
            const petName = document.getElementById("petName").value;
            const petType = document.getElementById("petType").value;
            const petAge = document.getElementById("petAge").value;
            const description = document.getElementById("description").value;
            const contactInfo = document.getElementById("contactInfo").value;
            const photoInput = document.getElementById("photo");

            // Create a pet object with default image
            const pet = {
                name: petName,
                type: petType,
                age: petAge,
                description: description,
                contact: contactInfo,
                image: "pic/default.png" // Updated default path
            };

            // Handle image upload if exists
            if (photoInput.files && photoInput.files[0]) {
                try {
                    pet.image = await readFileAsDataURL(photoInput.files[0]);
                } catch (error) {
                    console.error("Error processing image:", error);
                    // Fall back to default image if there's an error
                    pet.image = "pic/default.png";
                }
            }

            // Save the ad
            saveAd(pet);

            // Show success message with link to view pets
            showAlert(
                `Ad for ${pet.name} has been submitted successfully! 
                <a href="available-pets.html" class="alert-link">View all pets</a>`,
                "success"
            );

            // Reset form
            form.reset();

        } catch (error) {
            console.error("Error submitting form:", error);
            showAlert("There was an error submitting your ad. Please try again.", "danger");
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Ad";
        }
    });

    // Helper function to read file as Data URL
    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(file);
        });
    }

    // Function to save ad to localStorage
    function saveAd(pet) {
        // Ensure we always have a valid image
        if (!pet.image || pet.image.includes("default")) {
            pet.image = "pic/default.png";
        }

        const ads = JSON.parse(localStorage.getItem("userAds")) || [];
        ads.push(pet);
        localStorage.setItem("userAds", JSON.stringify(ads));
    }

    // Function to show alert messages
    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector(".alert");
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create alert element
        const alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
        alertDiv.setAttribute("role", "alert");
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // Insert alert before the form
        form.parentNode.insertBefore(alertDiv, form);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }, 5000);
    }
});
if (localStorage.getItem('isAdmin') !== 'true') {
    window.location.href = 'login.html';
}