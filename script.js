
/* ==================================================
   BLOOMING OASIS - COMPLETE JAVASCRIPT
   Pages: Home, Products, About Us, Contact Us
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // 1. GLOBAL: LIVE DATE, TIME AND COPYRIGHT YEAR
    // ==================================================

    const dateTimeElement = document.getElementById("dateTime");
    const currentYearElement = document.getElementById("currentYear");

    function updateDateTime() {
        if (!dateTimeElement) return;

        const now = new Date();

        dateTimeElement.textContent = now.toLocaleString("en-BD", {
            dateStyle: "medium",
            timeStyle: "medium"
        });
    }

    updateDateTime();

    if (dateTimeElement) {
        setInterval(updateDateTime, 1000);
    }

    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }


    // ==================================================
    // 2. HOME: COLLAPSIBLE MEMBERSHIP SECTION
    // ==================================================

    const membershipToggle = document.getElementById("membershipToggle");
    const membershipContent = document.getElementById("membershipContent");
    const membershipArrow = document.getElementById("membershipArrow");

    if (membershipToggle && membershipContent && membershipArrow) {

        membershipToggle.addEventListener("click", function () {

            const isOpen =
                membershipToggle.getAttribute("aria-expanded") === "true";

            membershipToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            membershipContent.classList.toggle("open", !isOpen);

            membershipArrow.textContent = isOpen ? "＋" : "−";

            if (isOpen) {
                membershipContent.style.maxHeight = "0px";
            } else {
                membershipContent.style.maxHeight =
                    membershipContent.scrollHeight + "px";
            }
        });

        // Recalculate height if the screen or content changes.
        window.addEventListener("resize", function () {
            if (
                membershipToggle.getAttribute("aria-expanded") === "true"
            ) {
                membershipContent.style.maxHeight =
                    membershipContent.scrollHeight + "px";
            }
        });
    }


    // ==================================================
    // 3. HOME: PLANT MATCHMAKER QUIZ
    // ==================================================

    const plantQuizForm = document.getElementById("plantQuizForm");
    const quizResult = document.getElementById("quizResult");

    const plants = [
        {
            name: "Parlor Palm",
            light: ["low", "medium"],
            care: ["easy"],
            petFriendly: true,
            description:
                "A popular indoor palm that prefers indirect light and is suitable for homes with cats and dogs.",
            image:
                "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Spider Plant",
            light: ["medium", "high"],
            care: ["easy"],
            petFriendly: true,
            description:
                "An easy-care plant with arching leaves that grows well in bright, indirect light.",
            image:
                "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Peperomia",
            light: ["low", "medium"],
            care: ["easy", "moderate"],
            petFriendly: true,
            description:
                "A compact houseplant that prefers indirect light and manageable watering.",
            image:
                "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Areca Palm",
            light: ["medium", "high"],
            care: ["moderate", "advanced"],
            petFriendly: true,
            description:
                "A tropical-looking palm that prefers bright, indirect light and regular care.",
            image:
                "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Succulent",
            light: ["high"],
            care: ["easy", "moderate"],
            petFriendly: false,
            description:
                "A sun-loving option for bright spaces. Pet safety depends on the exact species, so verify the plant before buying.",
            image:
                "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Monstera",
            light: ["medium", "high"],
            care: ["moderate", "advanced"],
            petFriendly: false,
            description:
                "A striking tropical plant that prefers bright, indirect light. It is toxic to cats and dogs if chewed.",
            image:
                "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80"
        }
    ];

    if (plantQuizForm && quizResult) {

        plantQuizForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!plantQuizForm.reportValidity()) return;

            const sunlight = document.getElementById("sunlight").value;
            const careLevel = document.getElementById("careLevel").value;
            const hasPets = document.getElementById("pets").value;

            const needsPetFriendly = hasPets === "yes";

            const matches = plants.filter(function (plant) {

                const matchesLight = plant.light.includes(sunlight);
                const matchesCare = plant.care.includes(careLevel);
                const matchesPets =
                    !needsPetFriendly || plant.petFriendly;

                return matchesLight && matchesCare && matchesPets;
            });

            quizResult.replaceChildren();

            if (matches.length === 0) {
                const heading = document.createElement("h4");
                heading.textContent = "No exact match found 🌱";

                const message = document.createElement("p");
                message.textContent =
                    "Try another sunlight or care preference. " +
                    "Always verify plant care and pet safety before buying.";

                quizResult.append(heading, message);
                return;
            }

            const plant =
                matches[Math.floor(Math.random() * matches.length)];

            const row = document.createElement("div");
            row.className =
                "d-flex flex-column flex-sm-row gap-3 align-items-start";

            const image = document.createElement("img");
            image.src = plant.image;
            image.alt = plant.name;
            image.className = "result-image";
            image.loading = "lazy";

            const details = document.createElement("div");

            const heading = document.createElement("h4");
            heading.textContent = "Your Plant Match: " + plant.name;

            const description = document.createElement("p");
            description.textContent = plant.description;

            const safety = document.createElement("p");
            safety.className = "small fw-bold";
            safety.textContent = plant.petFriendly
                ? "Pet safety: Generally considered non-toxic to cats and dogs."
                : "Pet safety: Not recommended where pets may chew the plant.";

            const link = document.createElement("a");
            link.href = "product.html";
            link.className = "btn btn-success btn-sm";
            link.textContent = "Explore Our Plants";

            details.append(heading, description, safety, link);
            row.append(image, details);
            quizResult.appendChild(row);
        });
    }


    // ==================================================
    // 4. PRODUCTS: PLANT SIZE, ADD-ONS AND CART TOTAL
    // ==================================================

    const cartForm = document.getElementById("cartForm");

    if (cartForm) {

        const plantSize = document.getElementById("plantSize");
        const quantity = document.getElementById("plantQuantity");
        const addPot = document.getElementById("addPot");
        const addStand = document.getElementById("addStand");
        const cartTotal = document.getElementById("cartTotal");
        const cartMessage = document.getElementById("cartMessage");

        function calculateTotal() {

            const selectedOption =
                plantSize.options[plantSize.selectedIndex];

            const price = Number(selectedOption.dataset.price);
            const qty = Number(quantity.value) || 1;

            const unitPrice =
                price +
                (addPot.checked ? 250 : 0) +
                (addStand.checked ? 500 : 0);

            const total = unitPrice * qty;

            cartTotal.textContent =
                "৳" + total.toLocaleString("en-BD");

            return {
                size: plantSize.value,
                quantity: qty,
                pot: addPot.checked,
                stand: addStand.checked,
                unitPrice: unitPrice,
                total: total
            };
        }

        [plantSize, quantity, addPot, addStand].forEach(function (element) {
            element.addEventListener("change", calculateTotal);
            element.addEventListener("input", calculateTotal);
        });

        cartForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!cartForm.reportValidity()) return;

            const item = calculateTotal();

            if (
                !Number.isInteger(item.quantity) ||
                item.quantity < 1 ||
                item.quantity > 20
            ) {
                quantity.setCustomValidity(
                    "Please select a quantity between 1 and 20."
                );
                quantity.reportValidity();
                quantity.setCustomValidity("");
                return;
            }

            item.name = "Monstera Deliciosa";

            let cart = [];

            try {
                cart = JSON.parse(
                    sessionStorage.getItem("bloomingCart") || "[]"
                );

                if (!Array.isArray(cart)) {
                    cart = [];
                }
            } catch (error) {
                cart = [];
            }

            cart.push(item);

            try {
                sessionStorage.setItem(
                    "bloomingCart",
                    JSON.stringify(cart)
                );

                cartMessage.className = "alert alert-success mt-3";
                cartMessage.textContent =
                    item.quantity + " " + item.size +
                    " Monstera plant(s) added to your demo cart. Total: ৳" +
                    item.total.toLocaleString("en-BD") + ".";
            } catch (error) {
                cartMessage.className = "alert alert-warning mt-3";
                cartMessage.textContent =
                    "Your selection is ready, but browser storage is unavailable.";
            }
        });

        calculateTotal();
    }


    // ==================================================
    // 5. PRODUCTS: PLANT PARENT TIPS AND PHOTO PREVIEW
    // ==================================================

    const tipForm = document.getElementById("tipForm");

    if (tipForm) {

        const tipMessage = document.getElementById("tipMessage");
        const communityTips = document.getElementById("communityTips");
        const plantPhoto = document.getElementById("plantPhoto");

        tipForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!tipForm.reportValidity()) return;

            const name =
                document.getElementById("parentName").value.trim();

            const plant =
                document.getElementById("plantName").value.trim();

            const tip =
                document.getElementById("parentTip").value.trim();

            const file = plantPhoto.files[0];

            if (!name || !plant || !tip) return;

            if (file) {
                if (!file.type.startsWith("image/")) {
                    tipMessage.className = "alert alert-warning mt-3";
                    tipMessage.textContent =
                        "Please select a valid image file.";
                    return;
                }

                if (file.size > 5 * 1024 * 1024) {
                    tipMessage.className = "alert alert-warning mt-3";
                    tipMessage.textContent =
                        "Please select an image smaller than 5 MB.";
                    return;
                }
            }

            const card = document.createElement("div");
            card.className = "border rounded p-3 mt-3 bg-white";

            const heading = document.createElement("h6");
            heading.textContent = plant + " tip from " + name;

            const paragraph = document.createElement("p");
            paragraph.className = "mb-0";
            paragraph.textContent = tip;

            card.append(heading, paragraph);

            communityTips.prepend(card);

            tipMessage.className = "alert alert-success mt-3";
            tipMessage.textContent =
                "Thanks for sharing! Your tip has been added to the page preview.";

            tipForm.reset();

            if (file) {
                const reader = new FileReader();

                reader.onload = function () {
                    const image = document.createElement("img");

                    image.src = reader.result;
                    image.alt = "Plant photo shared by " + name;
                    image.className = "img-fluid rounded mt-3";
                    image.style.maxHeight = "250px";

                    card.appendChild(image);
                };

                reader.onerror = function () {
                    tipMessage.textContent =
                        "Your tip was added, but the photo preview could not be loaded.";
                };

                reader.readAsDataURL(file);
            }
        });
    }


    // ==================================================
    // 6. CONTACT: GENERAL INQUIRY FORM
    // ==================================================

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        const confirmation =
            document.getElementById("contactConfirmation");

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            confirmation.className = "alert alert-success mt-3";
            confirmation.textContent =
                "Thank you for contacting Blooming Oasis! " +
                "Your form passed browser validation. This demo does not " +
                "send your message; a backend or form service is needed.";

            contactForm.reset();
        });
    }


    // ==================================================
    // 7. CONTACT: INTERACTIVE PLANT CARE CHAT DEMO
    // ==================================================

    const chatForm = document.getElementById("chatForm");

    if (chatForm) {

        const chatInput = document.getElementById("chatInput");
        const chatMessages = document.getElementById("chatMessages");

        function addChatMessage(message, className) {

            const bubble = document.createElement("div");

            bubble.className = "chat-bubble " + className;
            bubble.textContent = message;

            chatMessages.appendChild(bubble);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function getPlantResponse(message) {

            const text = message.toLowerCase();

            if (
                text.includes("water") ||
                text.includes("watering")
            ) {
                return "💧 Check the soil before watering. Many houseplants " +
                    "need water when the upper soil layer becomes dry. " +
                    "Ensure your pot has drainage holes.";
            }

            if (
                text.includes("light") ||
                text.includes("sun") ||
                text.includes("sunlight")
            ) {
                return "☀️ Many tropical houseplants prefer bright, indirect " +
                    "light. Check the specific needs of your plant and avoid " +
                    "sudden exposure to harsh direct sunlight.";
            }

            if (text.includes("monstera")) {
                return "🌿 Monstera generally prefers bright, indirect light, " +
                    "well-draining soil and watering when the upper soil layer " +
                    "is dry. It is toxic to cats and dogs if chewed.";
            }

            if (
                text.includes("yellow") ||
                text.includes("leaf") ||
                text.includes("leaves")
            ) {
                return "🍃 Yellow leaves can have several causes, including " +
                    "watering issues, lighting or natural aging. Check soil " +
                    "moisture, drainage and light before changing your routine.";
            }

            if (
                text.includes("pet") ||
                text.includes("cat") ||
                text.includes("dog") ||
                text.includes("toxic")
            ) {
                return "🐾 Pet safety depends on the exact plant species. " +
                    "Verify the plant using a reliable veterinary or poison-control " +
                    "source before bringing it into a pet's environment.";
            }

            if (
                text.includes("repot") ||
                text.includes("pot") ||
                text.includes("roots")
            ) {
                return "🪴 Consider repotting when roots become crowded. " +
                    "Choose a pot with drainage holes, usually only one size " +
                    "larger than the existing pot.";
            }

            if (
                text.includes("hello") ||
                text.includes("hi ")
            ) {
                return "Hello! 🌿 Tell me which plant you have and what you " +
                    "would like help with: watering, sunlight, leaves or repotting.";
            }

            return "🌱 Thanks for your question! Please share the plant species, " +
                "its light conditions, watering routine and any visible changes. " +
                "This demo provides general tips only; real-time specialist " +
                "support requires a connected chat service.";
        }

        chatForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const message = chatInput.value.trim();

            if (!message) return;

            addChatMessage(message, "user-message");

            chatInput.value = "";

            const response = getPlantResponse(message);

            addChatMessage(response, "bot-message");

            chatInput.focus();
        });
    }

});
