# Local Weather

Yet another weather forecast web app. Based initially on the
[temperature-by-zip-code](https://github.com/EvanHahn/Express.js-in-Action-code/tree/master/Chapter_05/temperature-by-zip-code)
example app from the excellent book "Express.js in Action" by Evan Hahn.

[Demo](https://yawfwa.herokuapp.com/) (hosted at
[Heroku](https://www.heroku.com/))

## Running

You need [Node.js](https://nodejs.org/) installed in your system to run the app.
You also need a [Dark Sky](https://darksky.net/) secret key you can obtain by
signing up for a free account [here](https://darksky.net/dev/register).

After cloning the repository, create a file named `.env` at the root of the
project with the following content, replacing `[Dark Sky secret key]` with your
Dark Sky secret key:

```
DARK_SKY=[Dark Sky secret key]
```

Still at the root directory of the project, run the following commands in a
terminal:

```bash
$ npm install # install the dependencies
$ npm start   # start the app
```

The app will be running at http://localhost:3000/.

## License

Local Weather is licensed under the [Apache License, Version
2.0](http://www.apache.org/licenses/LICENSE-2.0).

Images at `public/img` from [Climacons](http://adamwhitcroft.com/climacons/) by
[@adamwhitcroft](https://twitter.com/AdamWhitcroft).
