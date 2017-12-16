/**
 * Copyright 2017 Cassiano Kuplich
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

require('dotenv').config()

const path = require('path')
const express = require('express')
const DarkSky = require('dark-sky')
const darkSky = new DarkSky(process.env.DARK_SKY)

const app = express()

app.enable('trust proxy')
app.disable('x-powered-by')
app.set('port', process.env.PORT || 3000)

if (process.env.NODE_ENV === 'production') {
  const enforceSSL = require('express-enforces-ssl')
  const helmet = require('helmet')
  const ms = require('ms')

  app.use(enforceSSL())
  app.use(helmet.hsts({
    maxAge: ms('1 year'),
    includeSubdomains: true
  }))
}

app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index')
})

// GET /[latitude],[longitude]
app.get(/^\/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$/, function (req, res, next) {
  var latitude = req.params[0]
  var longitude = req.params[1]

  darkSky
    .latitude(latitude)
    .longitude(longitude)
    .units('auto')
    .language('pt')
    .get()
    .then((data) => {
      res.json({
        icon: data.currently.icon,
        summary: data.currently.summary,
        temperature: data.currently.temperature,
        time: data.currently.time,
        timezone: data.timezone
      })
    })
    .catch((err) => {
      next(err)
    })
})

// 404 error
app.use(function (req, res) {
  res.status(404).render('404')
})

app.listen(app.get('port'), function () {
  console.log('App started on port ' + app.get('port'))
})
