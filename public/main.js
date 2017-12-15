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

/* eslint-disable no-unused-vars */
const currentWeather = new Vue({
  /* eslint-enable no-unused-vars */
  el: '#current-weather',
  data: {
    icon: 'loading.svg',
    time: '...',
    temperature: '...',
    summary: '...'
  },
  created: function () {
    this.fetchCurrentWeather()
  },
  methods: {
    positionError: function () {
      this.icon = 'location-error.svg'
      this.time = ''
      this.temperature = 'Erro'
      this.summary = 'Não foi possível obter sua localização'
    },
    fetchCurrentWeather: function () {
      if ('geolocation' in navigator) {
        const self = this
        navigator.geolocation.getCurrentPosition(function (position) {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude

          axios.get('/' + latitude + ',' + longitude)
            .then(function (response) {
              const data = response.data
              self.icon = data.icon + '.svg'
              self.time = moment.tz(moment.unix(data.time), data.timezone).format('HH:mm')
              self.summary = data.summary
              self.temperature = data.temperature + '°'
            })
            .catch(function () {
              self.temperature = 'Erro!'
            })
        }, this.positionError)
      } else {
        this.positionError()
      }
    }
  }
})
