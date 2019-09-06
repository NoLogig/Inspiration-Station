
# NoLogig's Inspiration Station [![Dependencies](https://img.shields.io/david/NoLogig/Inspiration-Station.svg)](https://david-dm.org/NoLogig/inspiration-station) [![License](https://img.shields.io/github/license/NoLogig/Inspiration-Station.svg)](https://choosealicense.com/licenses/mit/)

## [Live instance](https://inspiration-station.herokuapp.com/)

Please be patient, [Heroku](https://heroku.com) might take upto a minute to load a sleeping page.

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

### Prerequisites

 - [Node.js®](https://nodejs.org) and npm	( node 12.6.0 and npm 6.9.0 )
 - [Angular CLI](https://cli.angular.io)	( 8.2.2 )

### Install

```bash
# Clone or download repo
git clone https://github.com/NoLogig/Inspiration-Station.git
# Change into directory (UnZip before)
cd inspiration-station
# Install dependencies
npm install
```

## Development server

Run `ng serve -o` or `npm run start` for a dev server. Navigate to [`http://localhost:4200/`](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Notes

## [ECMAScript](https://kangax.github.io/compat-table/es6/) `5|6|2016+|next|intl|non-standard` compatibility table

[MEAN Stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) in [TypeScript](https://www.typescriptlang.org)

* [**M**ongoDB](https://www.mongodb.com):                   NoSQL-Document Database
* [**E**xpress](http://expressjs.com):                      A minimal & flexible NodeJS framework
* [**A**ngular 8](https://angular.io):                      Frontend **S**ingle-**P**age-**A**pplication
* [**N**odeJS](https://nodejs.org):                         Asynchronous event driven JavaScript runtime

Server (Node & Express)
* [body-parser](https://www.npmjs.com/package/body-parser): Middleware to parse incoming request bodies before your handlers
* [path](https://nodejs.org/docs/latest/api/path.html):     Provides utilities for working with file and directory paths
* [morgan](https://www.npmjs.com/package/morgan):           Middleware logs HTTP request details to console (written by ExpressJS)
* [errorhandler]():                                         Development error handler
* [cors](https://www.npmjs.com/package/cors):               Express middleware to enable CORS 

Client (Angular)
* [Angular CLI](https://cli.angular.io):                    Command line frontend scaffolding
* [Angular Material](https://material.angular.io):          Design components for Angular
    + [Material Icons](https://material.io/icons):          Material Icons
    + [HammerJS](https://hammerjs.github.io/):              Add Touch gesture support
* [ng2-charts](https://www.chartjs.org/):                   Angular 2+ Charts
    + [Chart.js](https://www.chartjs.org/):                 Flexible JavaScript charting
* [Googlemaps](https://cloud.google.com/maps-platform/):    Google Maps API

## PWA - Service Worker Test HTTP-Server

### Prerequisites

* [http-server](https://nodejs.org/http-server)

### Install 
```bash
    npm i -g http-server
```

### Run

```bash
    ng build --prod

    http-server -p 8080 -c-1 dist/PROJECT-NAME
```
or `npm run start-http` for a http server.
Navigate to [`http://localhost:8080/`](http://localhost:8080/).

Disconnect internet connection & reload the page.

## Native-File-System-API

The lack of access to the file system is one of the biggest obstacles to the success of **P**rogressive-**W**eb-**A**pps.

In Chrome 77 (beta) an access to the file system can be activated.

**!Hurray!**
