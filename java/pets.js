document.addEventListener('DOMContentLoaded', function () {
    // Check authentication first
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const petsContainer = document.getElementById('petsContainer');
    const clearAdsBtn = document.getElementById('clearAdsBtn');
    const adoptForm = document.getElementById('adoptForm');
    const adoptModal = new bootstrap.Modal(document.getElementById('adoptModal'));
    let currentPetName = '';

    // Load user-submitted ads
    loadUserAds();

    // Event delegation for dynamic buttons
    document.addEventListener('click', function (e) {
        // Adopt Now button
        if (e.target?.classList.contains('btn-primary') && e.target.textContent === 'Adopt Now') {
            const card = e.target.closest('.card');
            currentPetName = card.querySelector('.card-title').textContent;
            document.getElementById('adoptModalLabel').textContent = `Adopt ${currentPetName}`;
        }

        // Edit button (admin-only)
        if (e.target?.classList.contains('btn-edit')) {
            if (!isAdmin) {
                showAlert('Only admins can edit pet ads', 'danger');
                return;
            }
            const card = e.target.closest('.card');
            const petCard = e.target.closest('.user-ad');
            const petId = petCard.dataset.petId;
            editPetAd(petId, card);
        }

        // Save button
        if (e.target?.classList.contains('btn-save')) {
            const petCard = e.target.closest('.user-ad');
            const petId = petCard.dataset.petId;
            savePetEdits(petId);
        }
    });

    // Clear Ads button (admin-only)
    if (clearAdsBtn) {
        clearAdsBtn.addEventListener('click', function () {
            if (!isAdmin) {
                showAlert('Only admins can clear ads', 'danger');
                return;
            }
            if (confirm('Are you sure you want to clear all user-submitted ads?')) {
                localStorage.removeItem('userAds');
                document.querySelectorAll('.user-ad').forEach(ad => ad.remove());
                showAlert('All user-submitted ads cleared', 'success');
            }
        });
    }

    // Adopt form submission
    adoptForm?.addEventListener('submit', function (e) {
        e.preventDefault();
        const adopterName = document.getElementById('adopterName').value;
        const adopterEmail = document.getElementById('adopterEmail').value;
        adoptModal.hide();
        adoptForm.reset();
        alert(`Thank you, ${adopterName}! We'll contact you about adopting ${currentPetName}.`);
    });

    function loadUserAds() {
        const userAds = JSON.parse(localStorage.getItem('userAds')) || [];

        userAds.forEach((ad, index) => {
            const petCard = document.createElement('div');
            petCard.className = 'col-md-4 mb-4 user-ad';
            petCard.dataset.petId = index;

            petCard.innerHTML = `
                <div class="card h-100">
                    <img src="${ad.image || 'images/default-pet.jpg'}" 
                         class="card-img-top" 
                         alt="${ad.name}"
                         onerror="this.src='images/default-pet.jpg'">
                    <div class="card-body">
                        <h5 class="card-title pet-name">${ad.name}</h5>
                        <p class="card-text pet-description">${ad.description}</p>
                        ${ad.contact ? `<p class="card-text"><small>Contact: ${ad.contact}</small></p>` : ''}
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-primary">Adopt Now</button>
                            ${isAdmin ? `<button class="btn btn-warning btn-edit">Edit</button>` : ''}
                        </div>
                    </div>
                </div>
            `;
            petsContainer.appendChild(petCard);
        });
    }

    function editPetAd(petId, card) {
        const nameElement = card.querySelector('.pet-name');
        const descElement = card.querySelector('.pet-description');
        const buttonsDiv = card.querySelector('.card-body > div');
        const originalName = nameElement.textContent;
        const originalDesc = descElement.textContent;

        nameElement.innerHTML = `<input type="text" class="form-control edit-name" value="${originalName}">`;
        descElement.innerHTML = `<textarea class="form-control edit-description">${originalDesc}</textarea>`;

        buttonsDiv.innerHTML = `
            <button class="btn btn-success btn-save">Save</button>
            <button class="btn btn-secondary btn-cancel">Cancel</button>
        `;

        buttonsDiv.querySelector('.btn-cancel').addEventListener('click', function () {
            nameElement.textContent = originalName;
            descElement.textContent = originalDesc;
            buttonsDiv.innerHTML = `
                <button class="btn btn-primary">Adopt Now</button>
                <button class="btn btn-warning btn-edit">Edit</button>
            `;
        });
    }

    function savePetEdits(petId) {
        const petCard = document.querySelector(`.user-ad[data-pet-id="${petId}"]`);
        const newName = petCard.querySelector('.edit-name').value;
        const newDesc = petCard.querySelector('.edit-description').value;

        // Update localStorage
        const userAds = JSON.parse(localStorage.getItem('userAds'));
        userAds[petId].name = newName;
        userAds[petId].description = newDesc;
        localStorage.setItem('userAds', JSON.stringify(userAds));

        // PROPERLY refresh the display
        refreshPetCards();

        showAlert('Pet ad updated successfully!', 'success');
    }

    // New function to properly refresh pets
    function refreshPetCards() {
        // Clear existing user ads
        document.querySelectorAll('.user-ad').forEach(el => el.remove());
        // Reload from localStorage
        loadUserAds();
    }

    function showAlert(message, type) {
        const existingAlert = document.querySelector('.global-alert');
        if (existingAlert) existingAlert.remove();

        const alertDiv = document.createElement('div');
        alertDiv.className = `global-alert alert alert-${type} alert-dismissible fade show mt-3`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.container').prepend(alertDiv);

        setTimeout(() => {
            new bootstrap.Alert(alertDiv).close();
        }, 3000);
    }
});