# Docsy Backend

## 1. Introduction

Docsy is a document collaboration platform that allows users to create, edit, and collaborate on documents in real-time. This repository contains the backend API services for Docsy.

**Base URL**: `http://localhost:3000` (Default for local development)

## 2. Technology Stack

We chose a modern, robust, and type-safe stack to ensure scalability and maintainability:

- **Node.js & Express**: A fast, unopinionated, minimalist web framework for Node.js, providing a robust set of features for web and mobile applications.
- **TypeScript**: Adds static typing to JavaScript, enhancing improved developer productivity, code quality, and maintainability.
- **Mongoose**: An elegant MongoDB object modeling tool designed to work in an asynchronous environment.
- **MongoDB**: A NoSQL database that offers high performance, high availability, and easy scalability.
- **InversifyJS**: A powerful and lightweight inversion of control (IoC) container for TypeScript and JavaScript apps, enabling proper Dependency Injection.
- **Zod**: A TypeScript-first schema declaration and validation library, used for runtime request validation.
- **JWT (JSON Web Tokens)**: Used for secure transmission of information between parties as a JSON object, handling authentication.
- **Bcrypt**: A library to help you hash passwords.

## 3. Clean Architecture

This project implements **Clean Architecture** (also known as Onion Architecture) to separate concerns and ensure the codebase is testable and independent of external frameworks.

The structure is divided into four main layers (from outer to inner):

1.  **Frameworks & Drivers (External)**:

    - `src/api`: Contains the entry point for external requests (express routers, controllers, middleware).
    - `src/infrastructure`: Implementations of interfaces defined in the domain layer (Mongoose models, Repositories implementations).

2.  **Interface Adapters**:

    - `src/api/controller`: Converts web requests into data formats convenient for the use cases and vice-versa.
    - `src/api/middleware`: Handles request validation, authorization (JWT), and error handling.

3.  **Application Business Rules (Use Cases)**:

    - `src/application/usecases`: Contains application-specific business rules. It orchestrates the flow of data to and from the User Entities.
    - `src/application/dto`: Data Transfer Objects used to pass data between layers.

4.  **Enterprise Business Rules (Domain)**:
    - `src/domain/entities`: The core business objects (User, Document, Collaboration).
    - `src/domain/repository`: Interfaces defining data access patterns, decoupled from the implementation.

**Dependency Rule**: Source code dependencies only point inwards. The inner layers know nothing about the outer layers. We use **InversifyJS** to inject dependencies (like repositories) into use cases and controllers.

## 4. Features

- **Authentication**: Secure user signup, login with JWT, and token refreshing.
- **User Profiles**: Manage user profiles including avatar, bio, and personal details.
- **Document Management**: Create, read, update, and delete documents.
- **Ownership Transfer**: Transfer document ownership to other users.
- **Collaboration**:
  - Invite users to collaborate via email.
  - Set roles: `VIEWER` (read-only) or `EDITOR` (can edit).
  - Manage collaborators (update roles, remove collaborators).
  - View shared documents.

## 5. API Endpoints

### Authentication

| Method | Endpoint                  | Description          | Request Body                                                                                                |
| :----- | :------------------------ | :------------------- | :---------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/auth/signup`        | Register a new user  | `{ email: string, password: string (min 6), fullname: string (min 3), avatarUrl?: string, about?: string }` |
| `POST` | `/api/auth/login`         | Login user           | `{ email: string, password: string }`                                                                       |
| `POST` | `/api/auth/refresh-token` | Refresh access token | `{ token: string }`                                                                                         |

### User Profile

_Requires `Authorization: Bearer <token>` for all endpoints._

| Method   | Endpoint          | Description                | Request Body                                                |
| :------- | :---------------- | :------------------------- | :---------------------------------------------------------- |
| `GET`    | `/api/profile/me` | Get current user's profile | -                                                           |
| `PATCH`  | `/api/profile/me` | Update profile             | `{ fullname?: string, avatarUrl?: string, about?: string }` |
| `DELETE` | `/api/profile/me` | Delete account             | -                                                           |

### Documents

_Requires `Authorization: Bearer <token>` for all endpoints._

| Method   | Endpoint                                        | Description                | Request Body                                                  |
| :------- | :---------------------------------------------- | :------------------------- | :------------------------------------------------------------ |
| `POST`   | `/api/documents`                                | Create a document          | `{ title: string, currentContent?: string }`                  |
| `GET`    | `/api/documents`                                | Get all documents for user | Query Param: `?ownership=mine` OR `others` OR `any` (default) |
| `GET`    | `/api/documents/:documentId`                    | Get a specific document    | -                                                             |
| `PATCH`  | `/api/documents/:documentId`                    | Update a document          | `{ title?: string, currentContent?: string }`                 |
| `DELETE` | `/api/documents/:documentId`                    | Delete a document          | -                                                             |
| `PATCH`  | `/api/documents/:documentId/transfer-ownership` | Transfer ownership         | `{ newOwnerEmail: string }`                                   |

### Collaboration

_Requires `Authorization: Bearer <token>` for all endpoints._

| Method   | Endpoint                                    | Description                      | Request Body                                                |
| :------- | :------------------------------------------ | :------------------------------- | :---------------------------------------------------------- |
| `GET`    | `/api/documents/:documentId/collaborations` | Get collaborators for a document | -                                                           |
| `POST`   | `/api/documents/:documentId/collaborations` | Add a collaborator               | `{ collaboratorEmail: string, role: "viewer" \| "editor" }` |
| `PATCH`  | `/api/collaborations/:collaborationId`      | Update collaborator role         | `{ role: "viewer" \| "editor" }`                            |
| `DELETE` | `/api/collaborations/:collaborationId`      | Remove a collaborator            | -                                                           |

## 6. Tools & Libraries Used

- **Production**:
  - `express`: Web server.
  - `mongoose`: Database interaction.
  - `jsonwebtoken`: Auth token generation/verification.
  - `bcrypt`: Password hashing.
  - `inversify` & `reflect-metadata`: Dependency Injection.
  - `zod`: Data validation.
  - `dotenv`: Environment variable management.
- **Development**:
  - `typescript`: Static typing.
  - `ts-node`: Execution of TS files in dev.
  - `nodemon`: Hot reloading.
  - `tsconfig-paths`: Handling path aliases.

## 7. Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB installed locally or a connection string to a cloud instance.

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd backend
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Create a `.env` file in the root directory and add the following variables:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/docsy  # Or your MongoDB URL
    JWT_SECRET=your_super_secret_key
    JWT_REFRESH_SECRET=your_refresh_secret_key
    ```

4.  **Run Development Server**:
    Start the server with hot-reloading:

    ```bash
    npm run dev
    ```

5.  **Build and Run**:
    To build the project for production and run it:
    ```bash
    npm run build
    npm start
    ```
