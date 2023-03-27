# Keyence project

## Introduction
On this project I was asked to create a backend app and a frontend app that is able to receive a excel document and save the data on a DB.
I chose to create the frontend using React.

I'm also using some other technologies/libraries such as axios, react-bootstrap,etc

This app consumes an API deployed on heroku.

I also used JWT (a technologie I've never used ir) to authenticate the user and give or deny access.

There is only one env variable. You will find it here on the repo in the ``.env.example`` document.

## Iteration #1 There are two main lists of routes:

### User Routes:
Here are the routes you will be using:

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/user/all-users` |    GET    | Show all users |
| `/user/create-user` |    POST    | Create a user|
| `/update-user/:userID` |    PUT    | Update a user |
| `/delete-user/:userID` |    DELETE    | Delete a user |



### Auth Routes:
Here are the routes you will be using:

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/logn` |    POST    | Log the user in returning JWT|


# Credendials:
There are currently 2 "admin Users" for the login

**1.-** username: Andrea, pass: AndreaNunez\
**2.-** username: Federica, pass: FedericaShulz


**That's it! 🏆**

Happy reviewing