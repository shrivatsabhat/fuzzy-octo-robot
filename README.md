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

You can verify in the docker-desktop  
<img width="1511" alt="Screenshot 2024-08-07 at 9 53 01 AM" src="https://github.com/user-attachments/assets/f53253d0-c4bd-428e-b983-473893eb1037">

You directly run from docker and navigate to local web URL by clicking on ports
<img width="1511" alt="Screenshot 2024-08-07 at 9 54 48 AM" src="https://github.com/user-attachments/assets/543259c5-2d78-483a-b1ce-65973953fb74">

OR 

run `docker run -p 5173:5173 news-app:latest` at your terminal 

# Run locally 

**Use node version 20 **

step: 
1. check `yarn` is present in the system if not install `yarn`
2. go to the code directory and run `yarn install`
3. enter `yarn dev` to run the local server
