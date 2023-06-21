# Culinary Quest

Welcome to the Culinary Quest Recipe Collection website repository! This project is a web application built using HTML, CSS, and JavaScript, along with the Vite.js build tool and Tailwind CSS framework. The website allows users to navigate through multiple recipes and explore various culinary delights.

## Demo / Production

> The project is currently running at https://culinaryquest.akkarin.de

## Project Structure

The project structure is organized as follows:

```php
├
├── src/ # Source code directory
│ ├── public/ # Public assets and index.html file
│ ├── recipe/ # Recipe page
│ ├── search/ # Search page
│ ├── utils/ # Utility functions
│ └── index.html # Entry point for the website
├── .gitignore # Git ignore configuration
├── package.json # Project dependencies and scripts
├── README.md # Project README (you're currently reading it)
└── Dockerfile # Docker configuration for deployment
└── docker-compose.yml # Docker compose stack configuration
└── tailwind.config.js # TailwindCSS configuration
└── vite.config.js # vite configuration

```

## Setup

To set up the Culinary Quest Recipe Collection website locally, please follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/culinary-quest.git
cd culinary-quest
```

2. Install the project dependencies using Node:

```bash
npm install
```

3. Run the development server using Vite

```bash
npm run dev
```

4. Open your web browser and visit http://localhost:3000 to see the website in action!
   Deployment

## Deployment

To deploy the Culinary Quest Recipe Collection website using Docker, make sure you have Docker installed on your machine. Then, follow these steps:

1. Build the Docker image:

```bash
docker build -t culinary-quest .
```

2. Run the Docker container:

```bash
docker run -p 80:80 culinary-quest
```

3. Access the website by visiting http://localhost in your web browser.

## Technologies Used

The Culinary Quest Recipe Collection website leverages the following technologies:

HTML - Used for structuring the web pages.
CSS - Used for styling the website.
JavaScript - Used for adding interactivity and logic.
Vite.js - A fast build tool and development server.
Tailwind CSS - A utility-first CSS framework for rapid UI development.
Docker - A containerization platform for easy deployment.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.
