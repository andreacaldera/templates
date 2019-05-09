# iPanda

## Running the app for development

- Clone this repo
- Run `yarn` to install dependencies
- Run mongo for the first time `docker pull mongo` and `docker run -p 27017:27017 -d --name mongo mongo` or just start if you previously run it locally `docker start mongo`
- Run `yarn dev` to start the application

The app is now running. Go to http://localhost:8080 in your browser.

A health-check is available at http://localhost:8080/internal/healthcheck

## Running Tests

### All tests

Run all tests with `yarn test`

### Test watcher

To watch unit and integration tests

```
yarn test:watch
```

This runs using [Jest](https://jestjs.io), which can determine which tests to run based on your changes.

### Running on docker locally

Build image

```
docker build . -t local-instashop
```

Run container

```
docker run --name instashop -d -e ENV_NAME=live -p 8080:8080 local-instashop
```

Inspect running container

```
docker exec -it instashop bash
```
