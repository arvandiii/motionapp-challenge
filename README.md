# Facebook API Integration Example

This Node.js application demonstrates how to integrate with the Facebook API to fetch basic user information (`id`, `name`, `last_name`) using a provided access token. It requests data every 2 seconds, adhering to Facebook's rate limits by implementing appropriate handling mechanisms.

## Features

- Fetches user data from the Facebook API at regular intervals.
- Implements rate limiting to respect Facebook API's usage policies.
- Configurable via environment variables for flexibility across different environments.
- Written in TypeScript for better type safety and developer experience.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/arvandiii/motionapp-challenge.git
cd motionapp-challenge
```

2. **Install npm packages**

```bash
npm install
```

3. **Configure Environment Variables**
Create a .env file in the root of your project and add your Facebook API access token:

```bash
ACCESS_TOKEN=your_facebook_api_access_token_here
```

4. **Build and run the project**
```bash
npm run build
npm start
```
The application will start making requests to the Facebook API every 2 seconds and log the received data to the console. It will automatically handle rate limiting by adjusting the request interval as needed.

**Run tests**
```bash
npm run test
```
