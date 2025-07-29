// File: /api/github.js

// A very simple function to test if the endpoint is working.
export default function handler(request, response) {
  response.status(200).json({
    message: "Hello World! The serverless function is working.",
  });
}