document.addEventListener("DOMContentLoaded", function () {
  if (
    typeof window.facilities !== "undefined" &&
    window.facilities.length > 0
  ) {
    const accessToken = window.accessToken;
    const facilities = window.facilities;
    const theme = "streets";
    const type = "vector";

    // Debugging: Ensure accessToken is set correctly
    console.log("Access Token: ", accessToken);

    // Debugging: Ensure facilities data is correct
    console.log("Facilities Data: ", facilities);

    // Ensure the map container exists
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      console.error("Map container not found");
      return;
    }

    // Define the map and configure the map's theme
    const map = new maplibregl.Map({
      container: "map",
      style: `https://tiles.locationiq.com/v3/${theme}/${type}.json?key=${accessToken}`,
      zoom: 12,
      center: [
        facilities[0].facility_location.longitude,
        facilities[0].facility_location.latitude,
      ],
    });

    // Debugging: Check if the map object is created
    console.log("Map Object: ", map);

    // Add markers to map
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

      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(popupContent);

      new maplibregl.Marker(el)
        .setLngLat([
          facility.facility_location.longitude,
          facility.facility_location.latitude,
        ])
        .setPopup(popup)
        .addTo(map);
    });

    // JavaScript for submitting the form
    document
      .getElementById("search-button")
      .addEventListener("click", function () {
        document.getElementById("submit").click();
      });
  } else {
    console.error("Facilities data is undefined or empty.");
  }
});
