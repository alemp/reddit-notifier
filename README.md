# Reddit Notifier

Mail notifications for Reddit users 

## Development server

* Run `npm install` to install the packages
* Copy `.env.example` to `.env` file and fill the reddit info
    * You must follow the first steps on [Reddit Quick Start Example](https://github.com/reddit-archive/reddit/wiki/OAuth2-Quick-Start-Example) 
    and fill the info: 
        * `REDDIT_CLIENT_ID` - app client ID created on reddit
        * `REDDIT_CLIENT_SECRET` - app client secret
        * `REDDIT_DEV_USER` - your dev user name
        * `REDDIT_DEV_PWD` - your dev user password
* Run `npm run test:dev` for a dev server. the API will be available at `http
://localhost:3000/`.

## Build

Run `npm run build` to build the project. 

## Running unit tests

Run `npm run test` to execute the unit tests.

# Dependencies

You will need to have NodeJS 10+ installed globally in your machine.

