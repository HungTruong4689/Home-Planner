# Vue + Vite Project : Home Planner

## Features

-   Chairs and Closets List
-   Add items to the specific room
-   Adding, increasing, decreasing, adding to the shopping list, deleting from the shopping list

## Getting Started

1.  Clone this repository to your local machine or download the source code as a ZIP file.

2.  Open a terminal and navigate to the project's root directory.

3.  Install the dependencies by running the following command:

    ```bash
    npm install
    ```

4.  Start the development server by running the following command:

    ```bash
    npm run dev
    ```

5.  Fix error when running development
    Adding the --host flag into scripts in the package.json file as below:

    ```bash
        "scripts": {
    "dev": "vite --host",
    "build": "tsc && vite build",
    "preview": "vite preview"
    }
    ```

6.  Run https localhost
    You need to install it with

    ```bash
    npm install -D @vitejs/plugin-basic-ssl
    ```

    And then use it like this in your vite.config.ts:

    ```bash
    import basicSsl from '@vitejs/plugin-basic-ssl'

        export default {
        plugins: [
            basicSsl()
        ]
        }
    ```

        This command will launch the application in development mode and provide you with a local development server. You can access the application in your browser at `http://localhost:5173`.

7.  Start coding! You can modify the Vue components in the `src` directory and see the changes instantly reflected in the browser thanks to HMR.
