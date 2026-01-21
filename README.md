# URL Shortener

A simple and efficient URL shortening service built with Node.js, Express, and MongoDB. This application allows users to convert long URLs into short, shareable links and track click statistics.

## Features

- **URL Shortening**: Convert long URLs into compact short links with unique identifiers
- **URL Redirection**: Redirect short URLs to their original destinations
- **Visit Tracking**: Track the number of visits and timestamps for each shortened URL
- **Statistics**: Get detailed analytics for shortened URLs including visit count and history
- **RESTful API**: Clean and intuitive API endpoints for easy integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **ID Generation**: nanoid for unique short ID generation
- **Environment Management**: dotenv for configuration
- **Development**: Nodemon for auto-reloading during development

## Prerequisites

Before running this project, ensure you have:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud-based like MongoDB Atlas)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sahilbansal23/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the project root:
   ```
   DATABASE_URL="YOUR_DB_URL"
   PORT="YOUR_PORT"
   ```
   
   Replace `DATABASE_URL` with your MongoDB connection string. For MongoDB Atlas:
   ```
   DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

## Running the Application

Start the development server with auto-reload:

```bash
npm start
```

The server will start on `http://localhost:3001`

## API Documentation

### 1. Create a Shortened URL

**Endpoint**: `POST /api/shorten-url`

**Request Body**:
```json
{
  "url": "https://example.com/very/long/url/that/needs/shortening"
}
```

**Response** (Success - 201):
```json
{
  "shortUrl": "http://localhost:3001/abc12345"
}
```

**Response** (Error - 400):
```json
{
  "message": "redirectUrl is required"
}
```

### 2. Redirect to Original URL

**Endpoint**: `GET /api/:shortId`

**Description**: Visiting a short URL will:
- Log the visit with a timestamp
- Redirect to the original URL

**Example**: `GET http://localhost:3001/abc12345`

**Response**: Redirects to the original URL (HTTP 302)

### 3. Get URL Statistics

**Endpoint**: `GET /api/stats/:shortId`

**Response** (Success - 200):
```json
{
  "redirectUrl": "https://example.com/very/long/url/that/needs/shortening",
  "visitCount": 5,
  "visitHistory": [
    { "timestamp": 1705856400000 },
    { "timestamp": 1705856500000 },
    { "timestamp": 1705856600000 },
    { "timestamp": 1705856700000 },
    { "timestamp": 1705856800000 }
  ]
}
```

**Response** (Error - 404):
```json
{
  "message": "URL not found"
}
```

## Project Structure

```
url-shortener/
├── index.js                 # Main application entry point
├── connect.js               # MongoDB connection configuration
├── package.json             # Project dependencies and metadata
├── README.md                # Project documentation
├── controllers/
│   └── url.js              # Business logic for URL operations
├── models/
│   └── url.js              # MongoDB schema and model definition
└── routes/
    └── url.js              # API route definitions
```

## Database Schema

The URL model stores the following information:

```javascript
{
  shortId: String,           // Unique short identifier (required, unique)
  redirectUrl: String,       // Original long URL (required)
  visitHistory: [
    {
      timestamp: Number      // Visit timestamp in milliseconds
    }
  ],
  createdAt: Date,          // Document creation timestamp
  updatedAt: Date           // Document update timestamp
}
```

## Usage Examples

### Using cURL

**Shorten a URL**:
```bash
curl -X POST http://localhost:3001/api/shorten-url \
  -H "Content-Type: application/json" \
  -d '{"url":"https://github.com/sahilbansal23"}'
```

**Get Statistics**:
```bash
curl http://localhost:3001/api/stats/abc12345
```

### Using JavaScript/Fetch

```javascript
// Shorten a URL
const response = await fetch('http://localhost:3001/api/shorten-url', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com/very/long/url'
  })
});

const data = await response.json();
console.log(data.shortUrl); // http://localhost:3001/xyz789ab
```

## Environment Variables

The application uses the following environment variables (configure in `.env`):

- `DATABASE_URL`: MongoDB connection string (required)
- `PORT`: Server port (optional, defaults to 3001)

## Error Handling

The API returns appropriate HTTP status codes:

- **201**: Successfully created a shortened URL
- **200**: Successfully retrieved data
- **302**: Redirect to original URL
- **400**: Bad request (missing required fields)
- **404**: URL not found
- **500**: Server error

## Future Enhancements

- Add URL validation and sanitization
- Implement custom short URL aliases
- Add expiration time for shortened URLs
- User authentication and personalized URL management
- Rate limiting to prevent abuse
- QR code generation for shortened URLs
- Advanced analytics dashboard
- Bulk URL shortening

## Author

Sahil Bansal
