# InmateIntake

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Getting started
Running 'npm install' will install the project dependencies. This is the first thing you need to do ( assuming Angular Cli , devkit & builder are already isntalled on your machine).

I have created some custom npm scripts which will spin up a mock json server & the angular server.
I am using a package called concurrently to acheive this.

To execute please use 'npm start'.

## Admin Access
A basic login page has been put together and using the json server a good response is returned for any request whihc hits the auth endpoint. You can see this in the middleware-authentication.js file.
