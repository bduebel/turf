#  E2E test framework  for a Web Application

## Supports
 1. Functional Testing .
 1. Accessibility Testing
 1. Visual Regression Testing


## Table of Contents
1. [Features](#features)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Application Structure](#application-structure)
1. [Testing](#testing)
1. [Configuration](#configuration)
1. [Learning Resources](#learning-resources)

## Features
* [Selenium](http://www.seleniumhq.org/)
* [Webdriver.io](http://webdriver.io/)
* [AxeCore](https://github.com/dequelabs/axe-core)
* [Mocha](https://mochajs.org/)
* [Chai](https://github.com/chaijs/chai)
* [Chromedriver](https://sites.google.com/a/chromium.org/chromedriver/)


## Requirements
* node `^6.5.0`
* yarn `^0.17.0` or npm `^4.0.0`

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), you can create a new project based on this project by doing the following:

### Install from source

First, clone the project:

```bash
$ git clone https://git.express-scripts.com/ExpressScripts/end-to-end-testing-starter.git <my-project-name>
$ cd <my-project-name>
```

Then install dependencies and check to see it works. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic installs, but `npm install` will work just as well.

```bash
$ yarn install    # Install project dependencies
$ yarn test      # Compile and launch (same as `npm start`)
```
## Application Structure
```
.
├── config                   # Applications and Locators configurations
│   ├── index.js             # App configuration like Auth, BaseDelay etc
│   ├── locators.js          # Html tags selectors
├── helpers                  # Helpers function for the Applications
│   ├── axe.js               # Helpers method to use axe core
│   ├── common.js            # Common helper methods for Chai assertions
├── pages                    # Page modules
│   ├── index.js             # All the page helpers method (Abstractions of webdriver.io api)
├── specs                    # Tests files
├── wdio.config.js           # Main configuration file for webdriver.io

```
## Testing
```bash
npm test
```
## Configuration
All the webdirver.io related configuration are located inside wido.config.js. Most of the case you only need to change baseUrl which should point to your testing url.
For other configuration:  http://webdriver.io/guide/getstarted/configuration.html

## Learning Resources
1. [Webdriver.IO API](http://webdriver.io/api.html)
1. [Page Object Example ](https://github.com/webdriverio/webdriverio/tree/master/examples/pageobject)
1. [Accessibility Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)