# Movie Explorer

## Overview

The Movie Explorer is a web application that allows users to discover and explore movies.  It is built using React and utilizes the TMDB API to fetch movie data.

## Project Setup

### Prerequisites

* [Node.js](https://nodejs.org/) (version 12 or higher)
* [npm](https://www.npmjs.com/) (Node.js package manager)
* A TMDB API Key. You can obtain one by creating an account on [https://www.themoviedb.org/](https://www.themoviedb.org/) and navigating to your account settings.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/GeethmiPerera/web-explorer.git

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure the environment:**

    * Create a `.env` file in the root directory of the project.
    * Add your TMDB API key to the `.env` file:

        ```
        REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY
        ```

    * Replace `YOUR_TMDB_API_KEY` with your actual API key.

4.  **Start the application:**

    ```bash
    npm start
    ```

    * This will start the development server, and the application will be accessible at `http://localhost:3000` in your browser.

## API Usage

The Movie Explorer application uses the [TMDB API](https://developer.themoviedb.org/docs/v3) to retrieve movie data.  The following endpoints are used:

* `/trending/movie/day`:  To fetch trending movies.
* `/search/movie`: To search for movies by keyword.
* `/genre/movie/list`: To fetch the list of movie genres.

The application uses the API key provided in the `.env` file to authenticate requests.

## Features Implemented

*  Displays a list of currently trending movies on the home page.
* Allows users to search for movies by title.
* Displays a loading indicator while fetching data from the API.
*  Implemented "Load More" functionality to load additional search results.
* Users can add movies to their favorites list.
*  This README file provides comprehensive documentation for the project.

## Contributing

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes.
4.  Push your changes to your fork.
5.  Submit a pull request.


## Credits

* TMDB API: [https://www.themoviedb.org/](https://www.themoviedb.org/)
* React: [https://reactjs.org/](https://reactjs.org/)
* Material UI: [https://mui.com/](https://mui.com/)
