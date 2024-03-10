# Restaurant Rider Panel

Restaurant Rider Panel is a mobile application designed for restaurant riders to efficiently manage and handle incoming orders from an admin panel. This application utilizes real-time data using WebSockets to receive orders and allows riders to accept or decline them promptly. The backend is built with Node.js, WebSocket, and Redis for real-time communication and data caching, while the frontend is developed with React Native, Redux, and Context API for state management. Additionally, MongoDB is used as the database to store relevant information.

## Features

- Real-time order updates using WebSocket
- Order management for restaurant riders
- Accept or decline orders promptly
- Data caching with Redis for improved performance
- MongoDB integration for database management
- React Native frontend with Redux and Context API for state management

## Technologies Used

- Backend: Node.js, WebSocket, Redis, MongoDB
- Frontend: React Native, Redux, Context API
- Database: MongoDB

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ezaanamin/Resturant-Rider-Panel.git
   ```

2. Install backend dependencies:
   ```
   cd Resturant-Rider-Panel/backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Set up environment variables by creating a `.env` file based on the `.env.example` file in both the backend and frontend directories.

## Usage

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Thank you to the contributors for their valuable contributions to this project.

---

Feel free to explore the project on [GitHub](https://github.com/ezaanamin/Resturant-Rider-Panel.git) and reach out with any questions or feedback!
