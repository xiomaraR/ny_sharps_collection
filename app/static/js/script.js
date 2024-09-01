document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-button");
  const addressInput = document.getElementById("address");
  const errorMessage = document.getElementById("error-message");
  const alertDiv = document.getElementById("alert-div");
  const searchForm = document.getElementById("search-form");
  const alertClose = alertDiv.querySelector(".alertClose");
  let searchPerformed = false;

  console.log("searchForm:", searchForm);
  console.log("searchForm type:", typeof searchForm);
  console.log(
    "searchForm instanceof HTMLFormElement:",
    searchForm instanceof HTMLFormElement
  );
  console.log("searchForm.submit:", searchForm.submit);
  console.log(
    "searchForm.submit is function:",
    typeof searchForm.submit === "function"
  );

  const displayErrorMessage = (message) => {
    alertDiv.querySelector(".alertText").textContent = message;
    alertDiv.style.display = "inline-block";
    errorMessage.checked = true;
  };

  const hideErrorMessage = () => {
    alertDiv.style.display = "none";
    errorMessage.checked = false;
  };

  addressInput.addEventListener("focus", () => {
    if (addressInput.value === addressInput.defaultValue) {
      addressInput.value = "";
    }
  });

  addressInput.addEventListener("blur", () => {
    if (addressInput.value.trim() === "") {
      addressInput.value = addressInput.defaultValue;
    }
  });

  function handleSearch(event) {
    event.preventDefault();
    if (
      addressInput.value.trim() === "" ||
      addressInput.value === addressInput.defaultValue
    ) {
      displayErrorMessage("Please enter a valid location!");
      searchPerformed = false;
    } else {
      hideErrorMessage();
      searchPerformed = true;
      searchForm.submit();
    }
  }
  searchButton.addEventListener("click", handleSearch);
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSearch(event);
  });

  alertClose.addEventListener("click", () => {
    hideErrorMessage();
  });

  function initializeMap() {
    if (
      typeof window.facilities !== "undefined" &&
      window.facilities.length > 0
    ) {
      const accessToken = window.accessToken;
      const facilities = window.facilities;

      console.log("Facilities: ", facilities);
      console.log("Access Token: ", accessToken);

      const mapContainer = document.getElementById("map");
      if (!mapContainer) {
        console.error("Map container not found");
        return;
      }

      const map = new maplibregl.Map({
        container: "map",
        style: `https://tiles.locationiq.com/v3/streets/vector.json?key=${accessToken}`,
        zoom: 12,
        center: [
          facilities[0].facility_location.longitude,
          facilities[0].facility_location.latitude,
        ],
      });

      // Add markers to the map
      facilities.forEach(function (facility) {
        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage =
          "url(https://tiles.locationiq.com/static/images/marker50px.png)";
        el.style.width = "50px";
        el.style.height = "50px";

        // Facility information to display in the popup
        const popupContent = `
                    <h3>${facility.facility_name}</h3>
                    <p>${facility.address1}</p>
                    <p>${facility.city}, ${facility.state} ${facility.fac_zip}</p>
                    <p>${facility.fac_phone}</p>
                `;

        const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
          popupContent
        );

        new maplibregl.Marker(el)
          .setLngLat([
            facility.facility_location.longitude,
            facility.facility_location.latitude,
          ])
          .setPopup(popup)
          .addTo(map);
      });

      hideErrorMessage();
    } else if (searchPerformed) {
      // Only display error if a search was performed and no facilities were found
      console.error("Facilities data is undefined or empty.");
      displayErrorMessage(
        "No facilities found for the provided location. Please try a different one."
      );
    }
  }

  // Check if the page loaded with search results
  if (
    typeof window.facilities !== "undefined" &&
    window.facilities.length > 0
  ) {
    searchPerformed = true; // Assume a search was performed if facilities are present
    initializeMap();
  }

  // Reset input form
  addressInput.value = addressInput.defaultValue;
});
