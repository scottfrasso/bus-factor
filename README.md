# bus-factor

## Prerequisites

If you don't already have node installed (at least v16.13.0)

1. Get a Mac

2. Install Node Version Manager

https://github.com/nvm-sh/nvm#installing-and-updating

3. Download node version 16.13.0

`nvm install v16.13.0`

4. Set version 16.13.0 as your current node version

`nvm use v16.13.0`

## Installing

`npm install`

## Using a Github Personal Authentication toke to avoid being rate limited

Use a github personal authentication token so you won't be limited by requests

1. Get it from https://github.com/settings/tokens

2. Set the token as an environment variable

`export GITHUB_TOKEN=<Put Github Token Here>`

## Running

Run it and select your language and project count

`npm run start -- --language rust --project_count 50`

Note: You have to include the `--` after `start` so that node knows thats the end of the node options

It should output something like this:

```
project:996.ICU              user:996icu               percentage: 0.78
project:vue                  user:yyx990803            percentage: 0.81
project:developer-roadmap    user:kamranahmedse        percentage: 0.84
project:system-design-primer user:donnemartin          percentage: 0.76
project:You-Dont-Know-JS     user:getify               percentage: 0.92
project:CS-Notes             user:CyC2018              percentage: 0.95
project:build-your-own-x     user:danistefanovic       percentage: 0.87
project:awesome-python       user:vinta                percentage: 0.86
project:JavaGuide            user:Snailclimb           percentage: 0.88
project:Python-100-Days      user:jackfrued            percentage: 0.96
project:d3                   user:mbostock             percentage: 0.75
project:vue-element-admin    user:PanJiaChen           percentage: 0.89
```
