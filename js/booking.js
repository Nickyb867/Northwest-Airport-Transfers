document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("booking-wrapper");

  formContainer.innerHTML = `
    <form id="bookingForm">
      <label>Collection Location</label>
      <input id="pickup" placeholder="Enter collection address (Bolton or Wigan)" required/>

      <label>Drop-off Airport</label>
      <select id="dropoff" required>
        <option value="">-- Select Airport --</option>
        <option value="manchester">Manchester (MAN)</option>
        <option value="liverpool">Liverpool (LPL)</option>
      </select>

      <label>Passengers</label>
      <select id="passengers" required>
        <option>1</option><option>2</option><option>3</option><option>4+</option>
      </select>

      <label>Pickup Date</label>
      <input type="date" id="pickupDate" required/>

      <label>Pickup Time</label>
      <input type="time" id="pickupTime" required/>

      <label>Journey Type</label>
      <select id="journeyType">
        <option value="oneway">One Way</option>
        <option value="return">Return</option>
      </select>

      <div id="returnFields" style="display:none;">
        <label>Return Date</label>
        <input type="date" id="returnDate"/>
        <label>Return Time</label>
        <input type="time" id="returnTime"/>
        <label>Return Flight Number</label>
        <input id="returnFlight"/>
      </div>

      <label>Contact Name</label>
      <input id="name" required/>
      <label>Telephone</label>
      <input id="phone" type="tel" required/>

      <div class="g-recaptcha" data-sitekey="6LcK2NorAAAAAEqyQ6rUev8DxVSKbA7Yy9_pXj3l"></div>
      <button type="submit" class="btn btn-primary" style="margin-top:1rem;">Submit Booking</button>
      <div id="bookingMsg" class="price-box" style="display:none;"></div>
    </form>
  `;

  const pickupInput = document.getElementById("pickup");
  const journeyType = document.getElementById("journeyType");
  const returnFields = document.getElementById("returnFields");
  const msg = document.getElementById("bookingMsg");

  // Google Places Autocomplete
  function initPlaces() {
    if (window.google && google.maps && google.maps.places) {
      new google.maps.places.Autocomplete(pickupInput, { componentRestrictions: { country: "uk" } });
    }
  }
  setTimeout(initPlaces, 300);

  journeyType.addEventListener("change", () => {
    returnFields.style.display = journeyType.value === "return" ? "block" : "none";
  });

  // Submit booking to Apps Script
  document.getElementById("bookingForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append("recaptchaToken", grecaptcha.getResponse());

    try {
      await fetch(GAS_URL, { method: "POST", mode: "no-cors", body: formData });
      msg.innerHTML = "✅ Your booking has been successfully submitted. We will contact you shortly.";
      msg.style.display = "block";
      msg.style.background = "#e8f5e9";
      e.target.reset();
      grecaptcha.reset();
    } catch (err) {
      msg.innerHTML = "❌ Error sending booking. Please try again.";
      msg.style.display = "block";
      msg.style.background = "#ffebee";
    }
  });
});
