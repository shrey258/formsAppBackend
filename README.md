# Express Server with TypeScript

This is an Express server built with TypeScript that provides three main endpoints: `/ping`, `/submit`, and `/read`. 
The server uses a JSON file as a database to store form submissions.
This project includes optional features like deleting and editing submissions, as well as searching for submissions by email.

## Table of Contents

- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [/ping](#ping)
  - [/submit](#submit)
  - [/read](#read)
  - [/delete](#delete)
  - [/edit](#edit)
  - [/search](#search)
- [Database Structure](#database-structure)
- [Additional Features](#additional-features)
  - [Deletion of Submissions](#deletion-of-submissions)
  - [Editing Submissions](#editing-submissions)
  - [Searching by Email](#searching-by-email)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/shrey258/formsAppBackend.git
    cd formsAppBackend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Ensure TypeScript and ts-node are installed globally:
    ```bash
    npm install -g typescript ts-node
    ```

## Running the Server

1. Start the server using `ts-node`:
    ```bash
    npm run start
    ```

The server will be running on `http://localhost:3000`.

## API Endpoints

### /ping

- **Method**: GET
- **Description**: Always returns `true` to indicate the server is running.
- **Response**: `true`

### /submit

- **Method**: POST
- **Description**: Submits a form with the fields `Name`, `Email`, `Phone`, `Github_Link`, and `Stopwatch_Time`.
- **Request Body**:
    ```json
    {
      "Name": "John Doe",
      "Email": "john.doe@example.com",
      "Phone": "1234567890",
      "Github_Link": "https://github.com/johndoe",
      "Stopwatch_Time": "00:01:30"
    }
    ```
- **Response**: `Submission successful`

### /read

- **Method**: GET
- **Description**: Reads a form submission by its index.
- **Query Parameter**: `index` (0-based)
- **Response**: JSON object with the form submission

### /delete

- **Method**: DELETE
- **Description**: Deletes a form submission by its index.
- **Query Parameter**: `index` (0-based)
- **Response**: `Deletion successful`

### /edit

- **Method**: PUT
- **Description**: Edits a form submission by its index.
- **Query Parameter**: `index` (0-based)
- **Request Body**: Any combination of the form fields to update
- **Response**: `Edit successful`

### /search

- **Method**: GET
- **Description**: Searches for form submissions by email.
- **Query Parameter**: `email`
- **Response**: JSON array of matching form submissions

## Database Structure

The database is a JSON file (`db.json`) with an array of submissions. Each submission is an object with the following structure:
```json
{
  "Name": "John Doe",
  "Email": "john.doe@example.com",
  "Phone": "1234567890",
  "Github_Link": "https://github.com/johndoe",
  "Stopwatch_Time": "00:01:30"
}
