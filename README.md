🚀 QuickChat - Real-Time Full-Stack Chat Application

QuickChat is a robust, full-stack, real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO. It provides a seamless and interactive user experience with features like instant messaging, secure authentication, image sharing, and real-time user presence indicators.

🌐 Live Demo
Experience the live application here: quickchat0105.vercel.app/login

✨ Features
Secure JWT Authentication: Robust and secure user authentication with signup, login, and session management using JSON Web Tokens (JWT).

Real-Time Bidirectional Messaging: Leverages Socket.IO to create a persistent, low-latency connection for instant message delivery.

Cloud-Based Image Uploads: Users can share images seamlessly, which are uploaded to Cloudinary for efficient storage and delivery.

Live User Presence: See which users are currently online and receive real-time notifications for unread messages, enhancing user engagement.

Fully Responsive UI: The user interface is built with React and styled with Tailwind CSS, ensuring a clean, modern, and mobile-friendly experience across all devices.

Scalable MERN Architecture: A well-structured backend using Node.js, Express.js, and MongoDB (Mongoose) for a scalable and maintainable codebase.

🛠️ Tech Stack & Architecture
Frontend
React.js (Vite): For building a fast and dynamic user interface.

Tailwind CSS: For modern, utility-first styling.

Axios: For making promise-based HTTP requests to the backend API.

Socket.IO Client: To establish and manage the real-time websocket connection.

Backend
Node.js & Express.js: For building the robust and scalable server-side application.

MongoDB (Mongoose): As the NoSQL database for storing user data, messages, and conversations.

Socket.IO: For enabling real-time, event-based communication between the client and server.

Cloudinary: For cloud-based image storage and management.

JWT & bcrypt: For secure user authentication and password hashing.

⚙️ Setup & Installation
Follow these steps to set up and run the project locally.

Prerequisites
Node.js (v16 or higher)

MongoDB Atlas account (or a local MongoDB instance)

Cloudinary account

1. Clone the Repository
git clone [https://github.com/your-username/quickchat.git](https://github.com/your-username/quickchat.git)
cd quickchat

2. Backend Setup
Navigate to the backend directory, install dependencies, and set up your environment variables.

cd backend
npm install

Create a .env file in the backend directory and add the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

3. Frontend Setup
Navigate to the frontend directory, install dependencies, and set up the backend proxy.

cd ../frontend
npm install

In the frontend directory, create a .env file and add the URL of your backend server:

VITE_BACKEND_URL=http://localhost:5000

🚀 Running the Application
Start the Backend Server
From the backend directory:

npm start

Start the Frontend Development Server
From the frontend directory:

npm run dev

The application should now be running on your local machine. Open your browser and navigate to the URL provided by Vite (usually http://localhost:5173).

🤝 Contributing
Contributions are welcome! If you'd like to improve QuickChat, please feel free to fork the repository, make your changes, and create a pull request.

Fork the repository.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
