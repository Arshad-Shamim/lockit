# LockIt

## Description

**LockIt** is a website designed to store your browsing website login credentials, so you don't need to remember them. While many websites offer similar services, LockIt stands out by offering a **random strong password generator**, ensuring that your passwords are both unique and secure.

## Features

- **Responsive Design**: Adaptive for both mobile and desktop devices.
- **User Authentication**: Only actual users can access their accounts.
- **Personalization**: Each user is isolated, ensuring their data is private.
- **Generate Strong Password**: Generate strong, random passwords with just one click.
- **Store Credentials**: Add new credentials or delete old ones.
- **Sort Passwords**: Sort passwords based on multiple fields.
- **Security**: Passwords are hashed for security.
- **Authorization**: Only authenticated users can access web pages.

## Technologies Used

### Frontend

- **Languages**: HTML, CSS, JavaScript
- **Libraries/Frameworks**: React, Bootstrap

#### Modules:

- **react-router-dom**: For navigation and routing.
- **react-toastify**: For notifications.
- **react-helmet**: For modifying the header.
- **Bootstrap**: Integrated via `import "bootstrap/dist/css/bootstrap.css"` and `import "bootstrap/dist/js/bootstrap.bundle"` for Bootstrap 5 styling.
- **Axios**: For sending request to application server (rest api).

### Backend

- **Languages**: JavaScript, MySQL
- **Libraries/Frameworks**: Express.js

#### Modules:

- **cors**: For handling cross-origin requests.
- **ejs**: For rendering HTML files.
- **jsonwebtoken**: For encoding and decoding tokens.
- **nodemailer**: For sending Gmail notifications.
- **pg**: For Supabase database connection.
- **bcrypt**: For hashing passwords.
- **crypt**: For generating passwords.
- **express-jwt**: For token validation.

### Tools

- **VS Code**
- **ChatGPT** (for assistance during development)

## Setup Instructions

Since the API is already published, you only need to install the necessary client-side modules.

1. Clone the repository.
2. Navigate to the client folder and run `npm install` to install all dependencies.
3. Start the development server using `npm start`.

## Usage Instructions

### Authentication:

- **Sign Up**: Enter your details, and before submission, click on the **Verify** button to send an email verification link to your Gmail. Click the verification link in the email, and then submit your details to complete the sign-up process.
- **Sign In**: Enter your username and password to log in.

After successfully logging in, you can enjoy the features of the website.

## Contact Information

- **Name**: Arshad Shamim
- **Email**: [arshadshmim786@gmail.com](mailto\:arshadshmim786@gmail.com)
- **LinkedIn**: [www.linkedin.com/in/ar83had-shamim](https://www.linkedin.com/in/ar83had-shamim)

