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
1. After cloning the repo, we have to do a couple of stuff.
    - ssh into your Wazigate
        ```
            ssh pi@<ip_address>
        ```
    -  Install ftp server on the Wazigate by running the following commands
        ```
            sudo apt-get install -y pure-ftpd
            sudo groupadd ftpgroup
            sudo usermod -a -G ftpgroup $USER
            sudo chown -R $USER:ftpgroup "$PWD"
            sudo pure-pw useradd upload -u $USER -g ftpgroup -d "$PWD" -m <<EOF
            loragateway
            loragateway
            EOF
            sudo pure-pw mkdb
            sudo service pure-ftpd restart
        ```
    - Exit the Wazigate by typing the following command
        ```
            exit
        ```
    - Test if you have successfully installed the ftp server by running the following command
        ```
            ftp <ip_address>
        ```
        You will be prompted to enter your username and password, enter the username (pi) and password (loragateway). If you are able to login, then you have successfully installed the ftp server.
    - Now exit the pi. 
        ```
            exit
        ```
    - Inside your host PC, navigate to the folder you clone your application and run the      following command
        ```
            zip -r majiup-waziapp.zip majiup-waziapp
            ftp <ip_address>
        ```
        You will be prompted to enter your username and password, enter the username (upload) and password (loragateway). If you are able to login, then you have successfully installed the ftp server.
    - Now make a folder called ``majiup`` and ``cd`` into it
        ```
            mkdir majiup
            cd majiup
        ```
    - Now copy the contents of the application into the folder you just created
        ```
            put majiup-waziapp.zip
        ```
        With this command, you will copy the contents from the  host machine application into wazigatethe folder you just created. Now exit the ftp server by typing the following command
        ```
            exit
        ```
2. Build the docker image
    - ssh into your Wazigate
        ```
            ssh pi@<ip_address>
        ```
    - Extract the files we just copied
        ```
            unzip majiup-waziapp.zip
        ```
    - Navigate to the application directory
        ```
            cd majiup-waziapp
        ```
    - Inside the application directory, run the following command
        ```
            docker build --platform linux/arm64  -t majiup_waziapp:1.1.0 .
        ```
        With this command, you will build the docker image for the application to work on the Wazigate, which only supports arm64 architecture arm arm64, aarch64 and arm64/v8.
    - Wait for the image to build.
    - After succesfull build, run the following command to check if the image is present
        ```
            docker images
        ```
        You should see the image you just built with it's name and tag. Copy the image id.
    - Now run the following command to run the application
        ```
            docker run --name majiup-frontend -d -p 4173:4173 <image_id>
        ```
        With this command, you will run the application in the background and expose it to port 3000. You can change the port to any port of your liking.
        This command will print the id of the container you just created. Copy the first 5 items id, you will need it in the next step.
3. Now 
    - run the following command to check if the container is running
        ```
            docker ps
        ```
    - You should see the container you just created with it's name and id.
      Now, we need to see if the application is running. To do that, we need to check the logs of the container. To do that, run the following command
        ```
            docker logs <container_id>
        ```
    - You should see the logs of the application. If you see the logs, then the          application is running. If you don't see the logs, then the application is not running. To run the application, run the following command
        ```
            docker start <container_id>
        ```
    - Navigate to your browser, type the ip address of your Wazigate and the port you exposed the application to. For example, if you exposed the application to port 4173, then you should type ``<ip_address>:4173``. You should see the application running.

