# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# How to load Docker image 

run following in terminal 
```sh
docker load --input <path to file:saved-new-app.tar>
```
Note: `saved-new-app.tar` if docker image in same directory, else use where docker image saved path. 
Alternatively, we can also use redirection from a file.
```sh
docker load < saved-new-app.tar
```
> Based on the article steps are provided https://medium.com/@sanketmeghani/docker-transferring-docker-images-without-registry-2ed50726495f 
