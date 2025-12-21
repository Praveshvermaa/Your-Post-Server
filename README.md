# Your Posts Server(SocialSync)

This is the backend server for the Your Posts application, built with Node.js and Express.

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens), Bcrypt
- **File Storage**: Cloudinary (via Multer)
- **AI Integration**: OpenAI API
- **Utilities**: Sentiment analysis, UUID

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (Local or AtlasURI)

### Installation

1. Navigate to the server directory:
   ```bash
   cd Server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root of the server directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# AI Configuration
OPENAI_API_KEY=your_openai_api_key
```

### Running the Server

To start the server with Nodemon (for development to auto-restart on changes):

```bash
npm start
```

## API Endpoints

The server provides endpoints for:
- User Authentication (Login, Register)
- Post Management
- Profile Management
- AI-based features
- Image Uploads

Refer to the `routes` directory for specific endpoint paths.
