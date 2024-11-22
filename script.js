// Initialize player credits
let credits = 1200;

// Update credits display
function updateCreditsDisplay() {
    document.getElementById("credits").innerText = credits;
}

// Function to handle badge purchase
function purchaseBadge(badgeName, price, badgeImage) {
    if (credits >= price) {
        // Deduct credits and update display
        credits -= price;
        updateCreditsDisplay();

        // Update inventory list with new badge
        const inventoryList = document.getElementById("inventory-list");

        // Create badge item for inventory
        const badgeItem = document.createElement("div");
        badgeItem.className = "inventory-item";
        badgeItem.innerHTML = `
            <img src="${badgeImage}" alt="${badgeName}" style="width:50px; height:50px; margin-bottom:5px;">
            <p>${badgeName}</p>
        `;
        inventoryList.appendChild(badgeItem);

        // Remove 'No badges' text if it exists
        if (inventoryList.children.length > 0 && inventoryList.firstChild.tagName === "P") {
            inventoryList.removeChild(inventoryList.firstChild);
        }
        alert(`${badgeName} purchased successfully!`);
    } else {
        alert("Not enough credits to purchase this badge.");
    }
}

// Add event listeners to all buy buttons
document.querySelectorAll(".badge-card button").forEach((button) => {
    button.addEventListener("click", (event) => {
        const badgeCard = event.target.closest(".badge-card");
        const badgeName = badgeCard.getAttribute("data-name");
        const badgePrice = parseInt(badgeCard.getAttribute("data-price"));
        const badgeImage = badgeCard.querySelector("img").src;
        purchaseBadge(badgeName, badgePrice, badgeImage);
    });
});
