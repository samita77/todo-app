# The things I have learned:
## Docker:
- It is a open platform for building, sharing and running container applications.
### Docker compose:
- It is a tool for defining and running multi-container applications.

For this application, I used docker compose as there are multiple containers: frontend, backend, nginx.

Step 1: Create a Dockerfile in both frontend and backend.

Step 2: Create docker-compose.yml file.

**Commands that I used:**

`docker-compose up`: to start all services.

`docker-compose up --build`: to force rebuild images and then start.

`docker-compose up -d`: to run in detached mode (background)

`docker-compose down`: stop and remove containers, networks

`docker-compose start`: to start containers

`docker-compose stop`: to stop containers

`docker-compose ps`: to list running services

`docker-compose logs`: to view logs from all services

**Commands to push on DockerHub**
`docker login`: to log into Docker Hub

`docker tag <local-image-name> <dockerhub-username>/<repo-name>:<tag>`: to create containers name in dockerhub

`docker push <dockerhub-username>/<repo-name>:<tag>`: to push the containers in the dockerhub
