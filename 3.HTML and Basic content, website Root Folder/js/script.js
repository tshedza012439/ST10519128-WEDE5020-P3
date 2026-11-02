// Get the enquiry form
const enquiryForm = document.getElementById("enquiry-form");

// Check whether the form exists on the current page
if (enquiryForm) {

    // Get the event date input
    const eventDate = document.getElementById("event-date");

    // Get today's date using the local date
    const today = new Date();

    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    // Customers cannot select a date in the past
    eventDate.min = localToday;


    // Listen for form submission
    enquiryForm.addEventListener("submit", function(event) {

        // Prevent the page from refreshing
        event.preventDefault();

        // Get customer information
        const name = document.getElementById("customer-name").value.trim();

        const email = document.getElementById("customer-email").value.trim();

        const phone = document.getElementById("customer-phone").value.trim();

        const occasion = document.getElementById("occasion").value;

        const flavour = document.getElementById("cake-flavour").value;

        const date = eventDate.value;

        const size = document.getElementById("cake-size").value;

        const details = document.getElementById("cake-details").value.trim();


        // Validate phone number
        const phonePattern = /^[0-9+() -]{7,20}$/;

        const phoneValid = phonePattern.test(phone);

        // Validate cake description
        const detailsValid = details.length >= 10;

        // Validate event date
        const dateValid = date !== "" && date >= localToday;

        // Apply custom browser validation
        document.getElementById("customer-phone")
            .setCustomValidity(
                phoneValid ? "" : "Please enter a valid phone number."
            );

        document.getElementById("cake-details")
            .setCustomValidity(
                detailsValid ? "" : "Please describe your cake in at least 10 characters."
            );

        eventDate.setCustomValidity(
            dateValid ? "" : "Please select today or a future date."
        );


        // Check all form fields
        if (!enquiryForm.checkValidity()) {

            // Display browser validation messages
            enquiryForm.reportValidity();

            return;
        }


        // Get the result section
        const result = document.getElementById("enquiry-result");

        // Clear previous messages
        result.replaceChildren();

        // Display successful validation message
        const heading = document.createElement("h3");

        heading.textContent = "Enquiry Details Validated Successfully!";

        result.appendChild(heading);

        // Create an enquiry summary
        const summary = document.createElement("p");

        summary.textContent =
            "Thank you, " + name +
            ". Your cake enquiry details have passed the form checks.";

        result.appendChild(summary);


        // Display customer selections
        const information = document.createElement("ul");

        const items = [
            "Email: " + email,
            "Phone: " + phone,
            "Occasion: " + occasion,
            "Cake Flavour: " + flavour,
            "Event Date: " + date,
            "Cake Size: " + size,
            "Cake Requirements: " + details
        ];

        items.forEach(function(item) {

            const listItem = document.createElement("li");

            listItem.textContent = item;

            information.appendChild(listItem);

        });

        result.appendChild(information);

        // Explain the demonstration limitation
        const notice = document.createElement("p");

        notice.textContent =
            "This is a demonstration form. Your enquiry has not been sent or confirmed.";

        result.appendChild(notice);

    });

}
"use strict";

// Product information
const bakeryProducts = [
    {
        name: "Chocolate Cake",
        category: "cakes",
        description: "A delicious chocolate cake for birthdays and celebrations.",
        price: 250
    },
    {
        name: "Vanilla Cake",
        category: "cakes",
        description: "A soft and tasty vanilla cake.",
        price: 220
    },
    {
        name: "Vanilla Cupcakes",
        category: "cupcakes",
        description: "Fresh vanilla cupcakes, sold per box.",
        price: 120
    },
    {
        name: "Freshly Baked Bread",
        category: "bread",
        description: "Fresh bread baked for everyday enjoyment.",
        price: 20
    },
    {
        name: "Fresh Bakery Biscuits",
        category: "biscuits",
        description: "Tasty biscuits suitable for snacks and special occasions.",
        price: 50
    }
];

// Display products on the webpage
function displayProducts() {
    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("product-search");
    const categoryFilter = document.getElementById("category-filter");
    const results = document.getElementById("product-results");

    if (!productList || !searchInput || !categoryFilter) {
        return;
    }

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    // Search and filter products
    const filteredProducts = bakeryProducts.filter(function(product) {
        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Clear the previous products
    productList.innerHTML = "";

    if (results) {
        results.textContent =
            filteredProducts.length + " product(s) found.";
    }

    // Display a message if no products match
    if (filteredProducts.length === 0) {
        productList.textContent =
            "No products found. Please try another search.";
        return;
    }

    // Create a product card for each matching product
    filteredProducts.forEach(function(product) {
        const card = document.createElement("article");
        card.className = "product-card";

        const heading = document.createElement("h3");
        heading.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("p");
        price.innerHTML = "<strong>Price: From R" +
            product.price.toFixed(2) + "</strong>";

        card.appendChild(heading);
        card.appendChild(description);
        card.appendChild(price);

        productList.appendChild(card);
    });
}

// Search when the visitor types
document.getElementById("product-search")
    ?.addEventListener("input", displayProducts);

// Filter when the visitor selects a category
document.getElementById("category-filter")
    ?.addEventListener("change", displayProducts);

// Display all products when the page opens
displayProducts();