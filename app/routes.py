from flask import Blueprint, render_template, flash
from app.forms import AddressForm
import requests
import os

bp = Blueprint("routes", __name__)


@bp.route("/", methods=["GET", "POST"])
def index():
    access_token = os.getenv("LOCATIONIQ_API_KEY")
    form = AddressForm()
    facilities = None
    if form.validate_on_submit():
        address = form.address.data
        location = get_location(address)
        if location:
            facilities = get_health_facilities(location["lat"], location["lon"])
            if not facilities:
                flash(
                    "No facilities found for the given address or zip. Please try another."
                )
        else:
            flash("Invalid address or zipcode. Please try again.")
    return render_template(
        "index.html", form=form, facilities=facilities, access_token=access_token
    )


def get_location(address):
    locationiq_api_key = os.getenv("LOCATIONIQ_API_KEY")
    url = f"https://us1.locationiq.com/v1/search.php?key={locationiq_api_key}&q={address}&format=json"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx and 5xx)
        data = response.json()[0]
        return {"lat": data["lat"], "lon": data["lon"]}
    except requests.exceptions.RequestException as e:
        print(f"Error fetching location: {e}")
        return None
    except IndexError:
        print("No location data found.")
        return None


def get_health_facilities(lat, lon):
    health_api_token = os.getenv("HEALTH_API_TOKEN")
    url = "https://health.data.ny.gov/resource/vn5v-hh5r.json"
    params = {
        "$where": f"within_circle(facility_location, {lat}, {lon}, 5000)"  # radius in meters
    }
    headers = {"X-App-Token": health_api_token}
    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx and 5xx)
        facilities = response.json()

        # Exclude school-based facilities
        filtered_facilities = [
            facility
            for facility in facilities
            if not (
                (facility.get("fasc_desc_short") == "HOSP-SB")
                or (
                    facility.get("description")
                    == "School Based Hospital Extension Clinic"
                )
                or (
                    facility.get("description")
                    == "School Based Hospital and Treatment Center Extension Clinic"
                )
                or (
                    facility.get("description")
                    == "School Based Diagnostic and Treatment Center Extension Clinic"
                )
                or (
                    facility.get("description")
                    == "School Based Primary Care Hospital - Critical Access Extension Clinic"
                )
            )
        ]
        return filtered_facilities
    except requests.exceptions.RequestException as e:
        print(f"Error fetching health facilities: {e}")
        return None
