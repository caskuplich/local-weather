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
