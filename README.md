# WeatherApp-JS-

WeatherApp-JS is a simple desktop weather application built using Electron.js and vanilla JavaScript. It fetches and displays current weather information for a searched city using the OpenWeatherMap API. The application is designed to be a lightweight, always-on-top widget that provides quick access to weather details.

## Features

*   **City-based Weather Search:** Enter a city name to get the latest weather data.
*   **Current Weather Details:**
    *   Temperature (in Celsius)
    *   City name and Country (with country flag)
    *   Humidity percentage
    *   Wind speed (km/h)
    *   Wind direction (e.g., N, NNE, SW)
    *   Sunrise and Sunset times (adjusted for local timezone)
*   **Dynamic Weather Icons:** Displays different icons based on the current weather conditions (e.g., clouds, clear, rain, drizzle, mist).
*   **Error Handling:** Shows an error message if an invalid city name is entered.
*   **Desktop Integration (Electron):**
    *   Runs as a standalone desktop application.
    *   Tray icon for quick access to show or quit the application.
    *   The window can be minimized using an in-app button.
    *   The application window hides when it loses focus (blur) and can be reshown from the tray.
    *   Designed to be "always on top" of other windows.
    *   Custom frameless window positioned on the right side of the primary screen.

## Technologies Used

*   **Frontend:** HTML, CSS, Vanilla JavaScript
*   **Desktop Framework:** Electron.js
*   **API:** OpenWeatherMap API for weather data
*   **Flags:** `flagcdn.com` for country flags
*   **Environment Variables:** `dotenv` to manage API keys
*   **Build/Package (devDependencies):** `electron-packager`

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jusmaran/WeatherApp-JS-.git
    cd WeatherApp-JS-
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    *   Create a `.env` file in the root directory of the project by copying the example file:
        ```bash
        cp .env.example .env
        ```
    *   Open the `.env` file and replace `your_api_key_here` with your actual OpenWeatherMap API key.
        ```
        OPENWEATHER_API_KEY=your_actual_api_key
        ```
        You can obtain an API key by signing up on the [OpenWeatherMap website](https://openweathermap.org/appid).

## How to Run

After completing the setup and installation steps, you can run the application using:

```bash
npx electron .
```

This command will start the Electron application. The weather app window will appear on your desktop.

## File Structure Overview

*   `main.js`: The main process script for Electron. It handles window creation, tray icon management, and inter-process communication (IPC).
*   `index.html`: The main HTML file that defines the structure of the weather application's user interface.
*   `index.js`: The renderer process script for `index.html`. It handles DOM manipulation, fetches weather data from the API, and updates the UI.
*   `preload.js`: A script that runs before the web page is loaded in the renderer process. It's used here to securely expose Node.js/Electron functionalities (like API key access and IPC) to the renderer process via `contextBridge`.
*   `styles.css`: Contains all the CSS rules for styling the application.
*   `.env.example`: An example file showing the structure for the required environment variables.
*   `package.json`: Lists project dependencies and scripts.
*   `images/`: Contains static image assets used in the application (weather icons, search icon, tray icon, etc.).

## How it Works

The application uses Electron to create a desktop window that loads `index.html`. The JavaScript in `index.js` listens for search events, then calls the OpenWeatherMap API with the provided city name and the API key (securely accessed via `preload.js` from environment variables). The fetched JSON data is then parsed to update the HTML elements with weather information, including temperature, humidity, wind speed, wind direction, sunrise/sunset times, and the corresponding weather icon and country flag. `main.js` manages the application lifecycle, tray icon functionality, and window behavior like always-on-top and hide-on-blur.
