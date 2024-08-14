# NYS Safe Sharps Collection Locator

_Deployed:_ [https://nysharps.onrender.com](https://nysharps.onrender.com)

This Flask application offers a simple interface to help find nearby safe sharps collection sites in New York State, using data from the NYS Department of Health API.

[All hospitals and nursing homes in New York State are mandated by law](https://www.nysenate.gov/legislation/laws/PBH/1389-DD) to accept home-generated sharps as a free, community service through their sharps collection programs.

## Features

- **Search by Location:** Users can enter an address, zip code or name of a location to find the nearest safe sharps collection sites.
- **Map Visualization:** The application displays a map with markers representing the locations of the collection sites.
- **Site Information:** Clicking on a marker reveals a popup with details about the collection site, such as address and phone number.

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
   venv\Scripts\activate

   ```

2. **Create a .env file:**

   in the root of your project and add the following environment variables:

   ```bash
     LOCATIONIQ_API_KEY='replace_with_api_key'
     HEALTH_API_TOKEN='replace_with_access_token'
     SECRET_KEY='replace_with_random_string'
   ```

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the app:**
   ```bash
        flask run
        # or
        python3 app.py
   ```

## Future Improvements

- Adding search filters
- Deeper data cleaning
- Locations of non health facility venues that offer syringe collection drop boxes (or "kiosks")
- Adding click to directions and click to call
- Allow users to create accounts and save preferred collection sites
- Better error handling
- Mobile Optimization
