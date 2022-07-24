# Containerize Express RESTful API

To containerize the express rest api, first, need to create one! The repository contains an `index.js` file that has all the code for our API. Next, we start by selecting our base image. We'll be using `node:14-alpine` as our base image. `alpine` images are usually small which in turn consume less memory and have better security, performance and maintainability.

```dockerfile
FROM node:14-alpine
```

Afterward, we change the working directory in the docker image's enviroment to `/app` directory.
```dockerfile
WORKDIR /app
```

Now, we'll copy the package.json and yarn.lock (or package-lock.json) to the working directory (/app) and install all the node modules using yarn install (or npm install). This will create a node_modules with all the dependency files. `--frozen-lockfile` should be passed if reproducible dependencies is a requirement.

```dockerfile
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
```

Once the node modules are installed, the contents of the current directory (`.`) will be copied over to the image's working directory (`/app`). Notice that the current environment may contain a `node_modules` folder and copying all contents will override the existing `node_modules` folder inside the docker image's working directory. So, this folder needs to be ignored. This can be done by creating a `.dockerignore` file in the root directory of the application and adding the line "`node_modules`".

```dockerfile
COPY . .
```
NOTE: it is possible to achieve the same result by copying over all the contents from the current directory to the docker image's /app directory and executing yarn install directly. However, copying the package.json & yarn.lock and installing the node modules a priori has an added advantage. It essentially allows the docker to cache the downloaded files. This provides a faster build time in the subsequent build of the application.

After the copying is complete we'll start the server using `node index.js`. However, we cannot use the command like following. 

```dockerfile
RUN node index.js
```
This is because the RUN will execute the command while building the image but we want to start the server not while building the image rather when the container starts. Thereby doing `RUN node index.js` will start the server while building the image and pause the overall building process. Hence, we need to use `CMD` instrution as follows:-
```dockerfile
CMD [ "node", "index.js" ]
```


image -> 946942c8b5e4
container -> f2d55d11161c