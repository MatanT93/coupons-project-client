# Coupons Project Client

This is a React-based frontend application for managing coupons. It provides interfaces for three types of users: Admin, Company, and Customer. Each user type has specific functionalities tailored to their role.

## Features

### Admin
- Manage companies:
  - Add, update, and delete companies.
  - View a list of all companies.
- Manage customers:
  - Add, update, and delete customers.
  - View a list of all customers.

### Company
- Manage coupons:
  - Add, update, and delete coupons.
  - View a list of all coupons.
  - Filter coupons by category and price.

### Customer
- View and purchase coupons.
- View owned coupons.
- Filter coupons by category and price.

## Project Structure

The project is organized into the following main directories:

- **`src/Components`**: Contains all React components, organized by user roles (AdminArea, CompanyArea, CustomerArea) and layout components (LayoutArea).
- **`src/Models`**: Defines TypeScript models for entities like `Company`, `Customer`, `Coupon`, etc.
- **`src/Redux`**: Contains the Redux store for managing authentication state.
- **`src/Services`**: Contains service classes for making API calls to the backend.
- **`public/`**: Contains static assets like `index.html`, `favicon.ico`, and `manifest.json`.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **React Router**: For client-side routing.
- **Redux Toolkit**: For state management.
- **Axios**: For making HTTP requests.
- **Material-UI**: For UI components and styling.
- **React Hook Form**: For form handling and validation.

## Installation

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Scripts
npm start: Runs the app in development mode.
npm run build: Builds the app for production.
npm test: Launches the test runner in interactive watch mode.
npm run eject: Ejects the app configuration (not recommended unless necessary).
API Endpoints
The application communicates with a backend server via the following endpoints:

#### Admin
GET /admin/companies: Fetch all companies.
POST /admin/add/company: Add a new company.
PUT /admin/update/company/:id: Update a company.
DELETE /admin/delete/company/:id: Delete a company.
GET /admin/customers: Fetch all customers.
POST /admin/add/customer: Add a new customer.
PUT /admin/update/customer/:id: Update a customer.
DELETE /admin/delete/customer/:id: Delete a customer.
#### Company
GET /company/coupons: Fetch all coupons.
POST /company/add/coupon: Add a new coupon.
PUT /company/update/coupon/:id: Update a coupon.
DELETE /company/delete/coupon/:id: Delete a coupon.
GET /company/categories: Fetch all categories.
GET /company/detail: Fetch company details.
#### Customer
GET /customer/coupons: Fetch all available coupons.
GET /customer/owned/coupons: Fetch owned coupons.
POST /customer/add/purchase/:id: Purchase a coupon.
Authentication
POST /users/login: Log in a user.
GET /users/logout: Log out a user.
Environment Variables
The application expects the backend server to be running at http://localhost:8080
Update the API base URL in the service files if needed.

#### Contributing
Fork the repository.
Create a new branch for your feature or bugfix.
Commit your changes and push them to your fork.
Submit a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.
