# RESTful Express HTTP server

![pet-shop](https://i.imgur.com/oZFSFYq.jpg)

Now that you've converted your Node HTTP server to Express, the final hurdle is to add route handlers for creating, updating, and destroying records in the database.

## Getting started

Change into the project directory.

```shell
cd path/to/project
```

Create and switch to a new feature branch.

```shell
git checkout -b rest
```

Install `body-parser` and `morgan` as a dependencies.

```shell
npm install --save body-parser
npm install --save morgan
```

## Assignment

Your first task is to wire up `body-parser` and `morgan` as middleware to your express app. They will greatly help you with the rest of the assignment.

Your next task is to add routes to handle the create, update, and destroy HTTP commands. The route handlers must translate their respective command into an appropriate action that manages the records in the database. Once the database action is complete, the route handlers must send back an appropriate HTTP response.

| Request Method | Request URL | Request Body                                            | Response Status | Response Content-Type | Response Body                                           |
|----------------|-------------|---------------------------------------------------------|-----------------|-----------------------|---------------------------------------------------------|
| `POST`         | `/pets`     | `{ "name": "Cornflake", "age": 3, "kind": "parakeet" }` | `200`           | `application/json`    | `{ "name": "Cornflake", "age": 3, "kind": "parakeet" }` |
| `GET`          | `/pets/3`   | N/A                                                     | `200`           | `application/json`    | `{ "name": "Cornflake", "age": 3, "kind": "parakeet" }` |
| `PUT`          | `/pets/3`   | `{ "name": "Scooter", "age": 4, "kind": "puppy" }`      | `200`           | `application/json`    | `{ "name": "Scooter", "age": 4, "kind": "puppy" }`      |
| `GET`          | `/pets/3`   | N/A                                                     | `200`           | `application/json`    | `{ "name": "Scooter", "age": 4, "kind": "puppy" }`      |
| `DELETE`       | `/pets/3`   | N/A                                                     | `200`           | `application/json`    | `{ "name": "Scooter", "age": 4, "kind": "puppy" }`      |
| `GET`          | `/pets/3`   | N/A                                                     | `404`           | `text/plain`          | `Not Found`                                             |
| `GET`          | `/`         | N/A                                                     | `404`           | `text/plain`          | `Not found`                                             |
| `GET`          | `/blah`     | N/A                                                     | `404`           | `text/plain`          | `Not found`                                             |

Like before, start the HTTP server with `nodemon`.

```shell
nodemon server.js
```

Open a new shell tab and use the `http` shell command to send HTTP requests to your server.

```shell
http POST localhost:8000/pets age=3 kind=parakeet name=Cornflake
```

When handling the `POST` and `PUT` HTTP request methods, if `age`, `kind`, or `name` are missing from the HTTP request body or `age` is not an integer, then the data must not be added to the database and the server must send back the follow HTTP response.

| Request Method | Request URL | Request Body                               | Response Status | Response Content-Type | Response Body                                      |
|----------------|-------------|--------------------------------------------|-----------------|-----------------------|----------------------------------------------------|
| `POST`         | `/pets`     | `{ "name": "", "age": "two", "kind": "" }` | `400`           | `text/plain`          | `Bad Request`                                      |
| `GET`          | `/pets/4`   | N/A                                        | `404`           | `text/plain`          | `Not Found`                                        |
| `PUT`          | `/pets/1`   | `{ "name": "", "age": "two", "kind": "" }` | `400`           | `text/plain`          | `Bad Request`                                      |
| `GET`          | `/pets/1`   | N/A                                        | `200`           | `application/json`    | `{ "age": 5, "kind": "snake", "name": "Buttons" }` |

Once you've successfully added these route handlers, check out the `master` branch.

```shell
git checkout master
```

Merge the feature branch into `master`.

```shell
git merge rest
```

And delete the feature branch.

```shell
git br -d rest
```

Then, create a valid `Procfile` so you can deploy your RESTful Express server to Heroku.

```shell
echo 'web: node server.js' > Procfile
```

Add and commit this change to your local `master` branch. Then, create an app on Heroku.

**NOTE:** Replace `USERNAME` with the lowercase form of your GitHub username.

```shell
heroku create USERNAME-pet-shop
```

And push the local `master` branch to your Heroku app's `master` branch.

```shell
git push heroku master
```

Throughly test your RESTful Express server on Heroku to verify it works as expected. Your instructors will be using your deployed server to grade this assignment. To help your instructors find your deployed server, be a pal and add the URL of your live Heroku app to the URL field on your GitHub repository's landing page.

## Bonus

Add a route to handle the `PATCH` HTTP request method. The `PATCH` method issues a command to partially update a record in the database.

| Request Method | Request URL | Request Body         | Response Status | Response Content-Type | Response Body                                   |
|----------------|-------------|----------------------|-----------------|-----------------------|-------------------------------------------------|
| `PATCH`        | `/pets/3`   | `{ "name": "Fido" }` | `200`           | `application/json`    | `{ "name": "Fido", "age": 4, "kind": "puppy" }` |
| `GET`          | `/pets/3`   | N/A                  | `200`           | `application/json`    | `{ "name": "Fido", "age": 4, "kind": "puppy" }` |

The route handler must only update the record if `age` is an integer, if `kind` is not missing, or if `name` is not missing.

## Bonus

Convert the code in your `server.js` file into ES6 syntax. It may be helpful to use linting rules to assist in the conversion.

- [`eslint-config-airbnb`]['airbnb']
- [`eslint-config-ryansobol`]['ryansobol']

## Bonus

Add [500 Internal Server Error]['500'] middleware to handle all internal server errors and send an appropriate response. It may be helpful to test your error-handling middleware with a route handler that calls the `next()` function with a `new Error()`. See approach #2 in the [Node.js Error Handling]['error-handling'] guide for more details on how the `next()` function works in Express.

| Request Method | Request URL | Response Status | Response Content-Type | Response Body           |
|----------------|-------------|-----------------|-----------------------|-------------------------|
| `GET`          | `/boom`     | `500`           | `text/plain`          | `Internal Server Error` |

Once this is working, refactor your server's route handlers to call the `next()` function to handle all filesystem errors instead of using `throw`.

## Bonus

Add [basic access authentication]['auth'] middleware to protect all routes from unauthorized access. In other words, the middleware must send the following HTTP response for all unauthorized HTTP requests.

| Response Status | Response Content-Type | Response WWW-Authenticate | Response Body           |
|-----------------|-----------------------|---------------------------|-------------------------|
| `401`           | `text/plain`          | `Basic realm="Required"`  | `Unauthorized`          |

To make an authorized HTTP request, the user must specify the correct credentials such as a name of `admin` and a password of `meowmix`. The client will then encode the credentials and include them in the `Authorization` header of the HTTP request.

| Request Method | Request URL | Request Authorization        |
|----------------|-------------|------------------------------|
| `GET`          | `/pets`     | `Basic YWRtaW46bWVvd21peA==` |

Here's an example of making an unauthorized HTTP request.

```shell
$ http -v GET http://localhost:8000/pets
GET /pets HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: localhost:8000
User-Agent: HTTPie/0.9.3



HTTP/1.1 401 Unauthorized
Connection: keep-alive
Content-Length: 12
Content-Type: text/plain; charset=utf-8
Date: Thu, 24 Mar 2016 13:33:33 GMT
ETag: W/"c-4G0bpw8TMen5oRPML4h9Pw"
WWW-Authenticate: Basic realm="Required"

Unauthorized
```

And here's an example of making an authorized HTTP request.

```shell
$ http -v --auth admin:meowmix GET http://localhost:8000/pets
GET /pets HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Authorization: Basic YWRtaW46bWVvd21peA==
Connection: keep-alive
Host: localhost:8000
User-Agent: HTTPie/0.9.3



HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 84
Content-Type: application/json; charset=utf-8
Date: Thu, 24 Mar 2016 13:33:53 GMT
ETag: W/"54-D2Au1DrDyt59Q+wXwR4adQ"

[
    {
        "age": 7,
        "kind": "rainbow",
        "name": "fido"
    },
    {
        "age": 5,
        "kind": "snake",
        "name": "Buttons"
    }
]
```

## Bonus

Use an Express router to group and export your resource-specific `/pets` routes into a `routes/pets.js` module. In the `server.js` module, require and use it in the correct middleware order. To learn about the Express router, see the following documentation.

- [Express API - `express.Router()`](http://expressjs.com/en/4x/api.html#express.router)
- [Express API - Router](http://expressjs.com/en/4x/api.html#router)


['404']: http://expressjs.com/en/starter/faq.html#how-do-i-handle-404-responses
['500']: http://expressjs.com/en/starter/faq.html#how-do-i-setup-an-error-handler
['airbnb']: https://www.npmjs.com/package/eslint-config-airbnb
['auth']: https://en.wikipedia.org/wiki/Basic_access_authentication
['error-handling']: http://sahatyalkabov.com/jsrecipes/#!/backend/nodejs-error-handling
['ryansobol']: https://github.com/ryansobol/eslint-config-ryansobol#language-configuration
