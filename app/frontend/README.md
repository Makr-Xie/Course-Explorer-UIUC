# CS222 Predict Student Population

## Description

This is a frontend app setup tutorial.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python is installed on your system.

## Setup and Installation

Follow these steps to set up your development environment for the project.

### Setting Up Node.js Environment

1. **Install Nodeenv**

   Nodeenv is a tool to create isolated Node.js environments. It's useful for managing multiple Node.js versions. Install it globally using pip:

   ```sh
   pip install nodeenv
   ```

2. **Create a Node.js Virtual Environment**

   After installing nodeenv, create a new Node.js virtual environment. In this example, we're using Node.js version 20.1.0:

   ```sh
   nodeenv --node=20.1.0 env
   ```

   Activate the virtual environment:

   ```sh
   source env/bin/activate
   ```

3. **Install PNPM**

   PNPM is a fast, disk space efficient package manager for JavaScript. Install it globally:

   ```sh
   npm install -g pnpm
   ```

4. **Create a Vite React Project**

   Use Vite to create a new React project. Replace `my-react-app` with your desired project name:

   ```sh
   pnpm create vite my-react-app --template react
   ```

   Select Typescipt as programming language
   Navigate into your project directory:

   ```sh
   cd my-react-app
   ```

   Install the dependencies:

   ```sh
   pnpm install
   ```
  Run this everytime pull newer version code from github. 

## Running the Project

To run the project locally, execute:

```sh
pnpm run dev
```

This command starts a local development server. Open your browser and navigate to `http://localhost:3000` to see your React application.

## Contributing

We welcome contributions! Please read our contributing guidelines (link to contributing guidelines) to get started.

## License

Specify your project's license here.

---

For more information on `nodeenv`, visit the [official documentation](https://pypi.org/project/nodeenv/).
