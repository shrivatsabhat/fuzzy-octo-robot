# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# How to load Docker image 

run following in the terminal 
```sh
docker load --input <path to file:saved-new-app.tar>
```
Note: `saved-new-app.tar` if docker image in the same directory, else use where docker image saved path. 
Alternatively, we can also use redirection from a file.
```sh
docker load < saved-new-app.tar
```
> Based on the article steps are provided https://medium.com/@sanketmeghani/docker-transferring-docker-images-without-registry-2ed50726495f 

# Run locally 

**Use node version 20 **

step: 
1. check `yarn` is present in the system if not install `yarn`
2. go to the code directory and run `yarn install`
3. enter `yarn dev` to run the local server
