# Tinybird UI

A modern web interface for interacting with your local Tinybird instance, built with Next.js.

## Overview

Tinybird UI provides a user-friendly interface for working with your locally running Tinybird container. Previously, there was no straightforward way to interact with a local Tinybird instance - this tool bridges that gap, making local development and testing much easier.

## Features

- 🔄 Connect to your local (or remote 😉) Tinybird container
- 📊 View and manage data sources
- 🔍 Execute and test SQL queries
- 📈 View API endpoints
- 💻 Local development friendly

## Prerequisites

- Node.js 18.x or higher
- A running local Tinybird container
- npm or yarn package manager

## Getting Started

1. Clone this repository:
```bash
git clone https://github.com/yourusername/tinybird-ui.git
cd tinybird-ui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to access the UI.

## Development

This project is built with:
- [Next.js](https://nextjs.org) - React framework
- [shadcn/ui](https://ui.shadcn.com) - Tailwind CSS components
- TypeScript for type safety

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
