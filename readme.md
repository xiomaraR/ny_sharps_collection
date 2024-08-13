# NYS Safe Sharps Collection Locator

This Flask application provides a web interface for locating nearby safe sharps collection sites in New York State.

## Features

- **Search by Location:** Users can enter and address, zip code or name of a location to find the nearest safe sharps collection sites.
- **Map Visualization:** The application displays a map with markers representing the locations of the collection sites.
- **Site Information:** Clicking on a marker reveals a popup with details about the collection site, such as address, phone number, and operating hours.

## Installation and Setup

1. **Create a virtual environment:**
   macOS and Linux:

   ```bash
   # Create a virtual environment
   python3 -m venv venv
   # Activate the virtual environment
   source venv/bin/activate

   ```

   Windows:

   ```bash
   # Create a virtual environment
   python3 -m venv venv
   # Activate the virtual environment
   venv\\Scripts\\activate

   ```

2. **Create a .env file:**
   in the root of your project and add the following environment variables:
   LOCATIONIQ_API_KEY='replace_with_api_key'
   HEALTH_API_TOKEN='replace_with_access_token'

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the app:**
   ```bash
        flask run
   ```

## Future Improvements

- Adding search filters
- More data cleanup
- Locations of non health facility venues that offer syringe collection drop boxes (or "kiosks")
- Adding click to directions and click to call
- Allow users to create accounts and save preferred collection sites
- Better error handling
- Mobile Optimization
