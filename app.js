require('dotenv').config()

const path = require('path')
const express = require('express')
const DarkSky = require('dark-sky')
const darkSky = new DarkSky(process.env.DARK_SKY)

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index')
})

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

app.use(function (req, res) {
  res.status(404).render('404')
})

app.listen(app.get('port'), function () {
  console.log('App started on port ' + app.get('port'))
})
