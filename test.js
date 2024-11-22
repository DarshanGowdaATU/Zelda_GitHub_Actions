/**
 * @jest-environment jsdom
 */
const { JSDOM } = require('jsdom');

// Mock DOM environment
document.body.innerHTML = `
<header>
  <div id="credits">1200</div>
</header>
<main>
  <section class="inventory">
    <div id="inventory-list">
      <p>No badges purchased yet.</p>
    </div>
  </section>
</main>
`;

// Import script.js functions
let credits = 1200;
const updateCreditsDisplay = () => {
  document.getElementById("credits").innerText = credits;
};
const purchaseBadge = (badgeName, price, badgeImage) => {
  const inventoryList = document.getElementById("inventory-list");
  if (credits >= price) {
    credits -= price;
    updateCreditsDisplay();

    const badgeItem = document.createElement("div");
    badgeItem.className = "inventory-item";
    badgeItem.innerHTML = `
      <img src="${badgeImage}" alt="${badgeName}" style="width:50px; height:50px; margin-bottom:5px;">
      <p>${badgeName}</p>`;
    inventoryList.appendChild(badgeItem);

    if (inventoryList.children.length > 0 && inventoryList.firstChild.tagName === "P") {
      inventoryList.removeChild(inventoryList.firstChild);
    }
    return `${badgeName} purchased successfully!`;
  } else {
    return "Not enough credits to purchase this badge.";
  }
};

// Tests
test("Purchases a badge and updates credits and inventory", () => {
  const result = purchaseBadge("Basic Badge", 300, "basic.png");
  expect(credits).toBe(900);
  expect(document.getElementById("credits").innerText).toBe("900");
  const inventoryList = document.getElementById("inventory-list");
  expect(inventoryList.children.length).toBe(1);
  expect(inventoryList.firstChild.querySelector("p").innerText).toBe("Basic Badge");
  expect(result).toBe("Basic Badge purchased successfully!");
});

test("Fails to purchase a badge with insufficient credits", () => {
  credits = 200;
  const result = purchaseBadge("Rare Badge", 1000, "rare.png");
  expect(credits).toBe(200);
  const inventoryList = document.getElementById("inventory-list");
  expect(inventoryList.children.length).toBe(0); // Inventory remains unchanged
  expect(result).toBe("Not enough credits to purchase this badge.");
});
