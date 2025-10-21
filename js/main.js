// Inject header and footer globally
document.addEventListener("DOMContentLoaded", () => {
  const headerHTML = `
    <header>
      <img src="assets/A_logo_for_Northwest_Airport_Transfers.png" alt="Logo"/>
      <nav>
        <a href="index.html">Home</a>
        <a href="booking.html">Book</a>
        <a href="about.html">About</a>
        <a href="services.html">Services</a>
        <a href="faq.html">FAQ</a>
        <a href="tel:+447520664620">Call</a>
      </nav>
    </header>
  `;
  const footerHTML = `
    <footer>
      <img src="assets/A_logo_for_Northwest_Airport_Transfers.png" alt="Logo"/>
      <p>&copy; 2025 Northwest Airport Transfers • All Rights Reserved</p>
      <div>
        <a href="index.html">Home</a> |
        <a href="booking.html">Book</a> |
        <a href="about.html">About</a> |
        <a href="services.html">Services</a> |
        <a href="faq.html">FAQ</a>
      </div>
      <a class="call-btn" href="tel:+447520664620">📞 Call Us Now</a>
      <div class="floating-buttons">
        <a href="https://wa.me/447520664620" target="_blank" class="float-whatsapp">💬</a>
        <a href="tel:+447520664620" class="float-call">📞</a>
      </div>
    </footer>
  `;
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");
  if (header) header.outerHTML = headerHTML;
  if (footer) footer.outerHTML = footerHTML;
});

// Quick quote for homepage
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quickBookingForm");
  const priceBox = document.getElementById("quickPrice");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const pickup = document.getElementById("pickupShort").value.toLowerCase();
    const dropoff = document.getElementById("dropoffShort").value;
    const pax = document.getElementById("passengersShort").value;

    let price = null;
    if ((pickup.includes("bolton") || pickup.includes("wigan")) && (dropoff === "manchester" || dropoff === "liverpool")) {
      const base = pax === "4+" ? 60 : pax === "3" ? 45 : 40;
      price = base;
      if (pickup.includes("wigan")) price += 5;
      if (dropoff === "liverpool") price += 10;
    }

    if (price) {
      priceBox.innerHTML = `<strong>Estimated Price:</strong> £${price}`;
    } else {
      priceBox.innerHTML = `<strong>Estimated Price:</strong> Please enter a valid route.`;
    }
    priceBox.style.display = "block";
  });
});
