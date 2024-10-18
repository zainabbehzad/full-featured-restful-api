# Full-Featured RESTful API 🎉

## Project Description 📝
🌟 The Full-Featured RESTful API is a comprehensive web application designed to provide users with a platform to manage and explore movies. Built using modern web technologies, this application leverages the power of Node.js and Express to deliver a seamless user experience and high performance. 💻✨

## Demo 📸

## Live Demo 🌐
[Link to Live Demo](http://example.com) <!-- Provide a link if applicable -->

## Features 🎉
- **Real-time Movie Management**: Add, update, and delete movies easily.
- **User-friendly Interface**: Navigate through movies with ease.
- **Detailed Movie Information**: Access comprehensive details about each movie.
- **Search Functionality**: Quickly find movies by title, genre, or rating.
- **Pagination Support**: Effectively manage large datasets with pagination.

## Project Structure 🏗️
full-featured-restful-api/
│
├── public/ # Contains static files like HTML, CSS, JS
│ ├── index.html # A simple homepage
│ ├── style.css # Styling for the homepage
│ └── script.js # Handles user data interaction
│
├── models/ # Contains Mongoose models
│ └── movieModel.js # Schema and model for movies
│
├── routes/ # Contains route definitions
│ └── movieRoutes.js # API routes for movie management
│
├── controllers/ # Contains business logic for handling requests
│ └── movieController.js # Controller for movie operations
│
├── db.js # MongoDB connection setup
│
├── server.js # Main server file
│
└── package.json # Dependencies and scripts

## Technologies and Tools Used 🛠️
- Node.js
- Express
- MongoDB (with Mongoose)
- HTML
- CSS
- JavaScript
- Git
- GitHub

## Installation 💻
To install and set up this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone

        https://github.com/zainabbehzad/full-featured-restful-api.git

2. Change into the project directory:

       cd full-featured-restful-api

3. Install the dependencies:

       npm install

4. Create a .env file in the root of the project and add your MongoDB URI:

       MONGODB_URI=your_mongodb_connection_string

       PORT=3000

5. Start the server:

       node server.js

6. The API will be running on 

       http://localhost:3000.

##API Endpoints 📡

Movies

-GET /api/movies - Fetch all movies (supports filtering and pagination)

-GET /api/movies/:id - Fetch a single movie by ID

-POST /api/movies - Add a new movie

-PUT /api/movies/:id - Update an existing movie

-DELETE /api/movies/:id - Delete a movie

-Query Parameters for GET /api/movies

-page - Page number for pagination (default is 1)

-limit - Number of movies per page (default is 10)

-genre - Filter by genre

-rating - Filter by minimum rating


##Contributing 🤝

-If you'd like to contribute to this project, please follow these steps:

1. Fork the repository to your own GitHub account.

2. Clone the repository to your local machine:

       https://github.com/zainabbehzad/full-featured-restful-api.git

3. Create a new branch for your feature or bug fix:

       git checkout -b feature/new-feature

4. Make your changes in your local environment.

5. Commit your changes with a descriptive message:

       git commit -m 'Add new feature'

6. Push your changes to your forked repository:

       git push origin feature/new-feature

7. Submit a pull request to the original repository.

## Author
## Zainab Behzad

-LinkedIn: Zainab Behzad

-GitHub: zainabbehzad

-Email: zainabbehzad03@gmail.com

