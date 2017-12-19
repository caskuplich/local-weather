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

/**
 * Helper function that returns a Unix time (in seconds) formatted as HH:mm.
 * @param  {Number} time     Unix time in seconds
 * @param  {String} timezone IANA timezone name
 * @return {String}          time formatted as HH:mm
 */
function getFormattedTime (time, timezone) {
  return moment.tz(moment.unix(time), timezone).format('HH:mm')
}

/* eslint-disable no-new */
new Vue({
  /* eslint-enable no-new */
  el: '#app',
  data: {
    currently: null,
    hourly: [],
    errors: {
      location: false,
      server: false
    }
  },
  created: function () {
    this.fetchWeatherInfo()
  },
  methods: {
    locationError: function () {
      this.errors.location = true
    },
    fetchWeatherInfo: function () {
      if ('geolocation' in navigator) {
        const self = this
        navigator.geolocation.getCurrentPosition(function (position) {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude

          axios.get('/' + latitude + ',' + longitude)
            .then(function (response) {
              const data = response.data
              self.currently = {
                icon: data.currently.icon + '.svg',
                time: getFormattedTime(data.currently.time, data.timezone),
                summary: data.currently.summary,
                temperature: data.currently.temperature + '°'
              }
              self.hourly = response.data.hourly.map((item) => {
                return {
                  icon: item.icon + '.svg',
                  time: getFormattedTime(item.time, data.timezone),
                  temperature: item.temperature + '°'
                }
              })
            })
            .catch(function () {
              self.errors.server = true
            })
        }, this.locationError)
      } else {
        this.locationError()
      }
    }
  }
})
