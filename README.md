# Mini Seller Console

A lightweight console built with React and Tailwind CSS to triage leads and convert them into opportunities.

## Features

- **Leads Management**:
  - View leads with search, filter, and sort capabilities
  - Edit lead status and email
  - Optimistic updates with rollback on error

- **Opportunities**:
  - Convert leads into opportunities
  - View opportunities in a simple table

- **User Experience**:
  - Responsive design (desktop and mobile)
  - Loading, empty, and error states
  - Persists filter/sort preferences in localStorage

## Setup and Installation

```bash
# Install dependencies
yarn install

# Start the development server
yarn dev

# Build for production
yarn build
```

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite

## Project Structure

```
src/
├── components/      # UI components
├── context/         # React context for state management
├── data/            # Mock JSON data
├── services/        # API simulation
├── types/           # TypeScript interfaces
└── App.tsx          # Main application component
```

## Data Flow

- Mock API calls with simulated network latency
- Centralized state management with React Context
- Optimistic updates with error rollback

## Network Failure

To simulate real-world conditions, the application includes a simulated network failure mechanism:

- API requests have a 10% random chance of failing
- This helps test error handling and recovery mechanisms
- Implemented via the `simulateNetworkRequest` function in the API service
- Demonstrates optimistic updates with automatic rollback when network requests fail
- Provides realistic user experience for error states
