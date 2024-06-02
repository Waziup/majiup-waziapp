# MajiUp

## These are the instructions to install the Majiup app on your Wazigate.

Here is the screenshot of the dashboard page
![Image of landing page](./images/landingpage.png)

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Ensure you have the following dependancies for the application to run,

1. [Node.js](https://nodejs.org/en/download/) - The JavaScript runtime
2. [pnpm](https://pnpm.js.org/en/installation) - The package manager
3. [Git](https://git-scm.com/downloads) - The version control system
4. Wazigate - The IoT gateway
5. [Docker](https://docs.docker.com/get-docker/) - The containerization platform

Instruction to run the Majiup application on gateway (production) can be found [here](https://github.com/Waziup/majiup-backend/blob/main/README.md)

## Installing in local machine

Follow these steps to get a development environment running

1. Clone the repo
   ```
       git clone https://github.com/Waziup/majiup-waziapp.git
   ```
2. Navigate to project directory
   ```
       cd majiup-waziapp
   ```
3. Install dependencies
   ```
       pnpm install
   ```
4. Run the app
   ```
       pnpm dev
   ```
