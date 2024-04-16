# React-Django CRUD Management System

This project is a back-office management system designed to manage categories and products in a store. It provides authentication functionalities with different user profiles.

## Technologies Used:
- React
- Axios
- Uvcanvas
- React-icons
- Django
- Django Rest Framework
- PostgreSQL
- Swagger
- Docker

## Cloud Services for Deployment:
- Render
- Vercel

## Cloning the Project

1. Clone the project repository:

    ```bash
    git clone https://github.com/JudaCarrillo/react-django-crud.git
    ```

2. Navigate into the cloned directory:

    ```bash
    cd react-django-crud
    ```

## Setting Up the Backend

### Auth Service

1. Navigate to the auth service directory:

    ```bash
    cd ./management-system-backend/auth/
    ```

2. Run Docker Compose to start the service:

    ```bash
    docker-compose up
    ```

### Catalog Service

1. Navigate to the catalog service directory:

    ```bash
    cd ./management-system-backend/catalog/
    ```

2. Run Docker Compose to start the service:

    ```bash
    docker-compose up
    ```

## Setting Up the Frontend

1. Navigate to the frontend directory:

    ```bash
    cd ./app-management-system
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

## Accessing the Services

- Auth Service: [http://localhost:8000/](http://localhost:8000/)
  - API Documentation: [http://localhost:8000/doc/](http://localhost:8000/doc/)

- Catalog Service: [http://localhost:8200/](http://localhost:8200/)
  - API Documentation: [http://localhost:8200/doc/](http://localhost:8200/doc/)
- App Management System (Frontend): http://localhost:5173/


