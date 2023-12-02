## Description

A simple server-side application that manages the registration of students for courses.
The application is be capable of accepting student details, processing and validating these details, and storing them in a database

## Installation

```bash
$ npm install
```

## Running the app

First create a .env file in the main directory and provide the following environment variables:

- MONGODB_URI=mongodb+srv://name:password@cluster.mongodb.net/?retryWrites=true&w=majority

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

While the application is running, open your browser and navigate to http://localhost:3000/api. You should see the Swagger UI, all API documentation can be found there.
