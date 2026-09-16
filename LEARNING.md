# The things I have learned:
## Docker (Universal Packaging):
- It is a open platform for building, sharing and running container applications.
- The main objective of it is **Write Once, Run Anywhere**
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

## GitHub Actions CI/CD (Cloud Robot Assembly Line)
- GitHub Actions is a built-in continuous integration and continous delivery (CI/CD) platform that automates your build, test, and deployment pipelines directly within your GitHub repo.
- The main motto is **"Never Ship Broken Code"**.

**Commands that I used**
`git stash`: to hide untracked edits safely.

`git pull origin main --rebase`: to force pulling online updates down from the website.

`git stash pop`: to restore most recently saved temporary changes back in the working directory and deleting them from stash list.

`git add .`: to stage new, modified, deleted and hidden files.

`git commit -m "(write comment)"`: committing

`git push origin main`: pushing 

## Kubernets via Minikube (Cluster Orchestration)
- It is an open source system for automating deployment, scaling, and managing containerized applications.

**Commands that I used:**

`minikube start`: starting local single-node cluster engine.

`kubectl apply -f k8s/`: to apply entire folder (k8s) of manifest blueprints at once.

`kubectl get pods`: checking the status of the running container pods live.

`kubectl logs deployment/todo-backend --tail=20`: reading internal container console logs to debug crashes.

`kubectl rollout restart deployment/todo-frontend` `kubectl rollout restart deployment/todo-backend`: to force an app instantly to clear its network cache and restart fresh.

`minikube service frontend`: to expose frontend to browser via **Minikube NodePort tunnel**

## Prometheus & Grafana (Real-Time Telemetry & Observability)
- Tools that help to monitor and visualize how your applications and systems are working.

**The commands that I used:**

`helm install monitoring prometheus-community/kube-prometheus-stack --create-namespace --namespace monitoring`: to deploy the entire pre-packaged monitoring system with Helm.

`helm upgrade monitoring prometheus-community/kube-prometheus-stack \ --namespace monitoring \--set prometheusprometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false`: to force prometheus to cross namespace gates and look inside the app folder

`kubectl port-forward deployment/monitoring-grafana 3000:3000 -n monitoring`: to bypass cluster firewalls and map Grafana directly onto the browser window.
