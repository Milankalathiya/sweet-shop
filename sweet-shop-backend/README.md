# Sweet Shop Backend

This is the Spring Boot backend for the Sweet Shop Management System.

## Prerequisites

- Java 17
- Maven
- MySQL Database

## Setup

1.  **Database**:
    - Ensure MySQL is running on port 3306.
    - Create a database named `sweetshop` (optional, as `createDatabaseIfNotExist=true` is used).
    - Username: `root`, Password: `root`.

2.  **Build**:
    ```bash
    mvn clean install
    ```

3.  **Run**:
    ```bash
    mvn spring-boot:run
    ```

## API Endpoints

-   **Auth**:
    -   `POST /api/auth/register`
    -   `POST /api/auth/login`
-   **Sweets**:
    -   `GET /api/sweets`
    -   `GET /api/sweets/search?query=...`
    -   `POST /api/sweets` (Admin)
    -   `PUT /api/sweets/{id}` (Admin)
    -   `DELETE /api/sweets/{id}` (Admin)
    -   `POST /api/sweets/{id}/purchase?quantity=...`
    -   `POST /api/sweets/{id}/restock?quantity=...` (Admin)
-   **Analytics**:
    -   `GET /api/analytics` (Admin)

## My AI Usage

Used Google Deepmind's Agent to generate TDD tests and entity boilerplate, manually added role-based logic and analytics.
Generated `SweetServiceTest` (Unit) and `SweetController` (Integration) tests.
Implemented Layered Architecture (Controller, Service, Repository, Entity, DTO).
