# MajiUp
## These are the instructions to install the Majiup app on your Wazigate. 
Here is the screenshot of the landing page
![Image of landing page](./images/landingpage.png)

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
What things you need to install the software and how to install them
1. [Node.js](https://nodejs.org/en/download/) - The JavaScript runtime
2. [pnpm](https://pnpm.js.org/en/installation) - The package manager
3. [Git](https://git-scm.com/downloads) - The version control system
4. Wazigate - The IoT gateway
5. [Docker](https://docs.docker.com/get-docker/) - The containerization platform
## Installing in local machine
A step by step series of examples that tell you how to get a development env running
1. Clone the repo
    ``` 
        git clone <url>
    ```
2. Navigate to project directory
    ``` 
        cd majiup
    ```
3. Install dependencies
    ```
        pnpm install
    ```
4. Run the app
    ```
        pnpm dev
    ```
## Installing in Wazigate
1. Build the docker image
    ```
    docker build -t majiup .
    ```
2. Deploy to Docker Hub
    ** before you deploy to docker hub, just ensure your have an account and have created a project with the name ``waziup/mazjiup:1.0.0``, feel free to give a tag of your own liking. 
    ```
        docker tag majiup:latest waziup/majiup:1.0.0
        docker push waziup/majiup:1.0.0
    ```
    Then copy the name
3. Launch your Wazigate and go to the Waziup dashboard
4. Go to the ***Apps*** tab and click on **Install new app**
5. Paste the name you had copied and click on "Install"
6. You can run the application now.
