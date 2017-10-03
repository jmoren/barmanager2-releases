<template>
    <div class="control has-addons">
      <input
        ref="autocomplete"
        type="text"
        class="input is-expanded"
        :id="id"
        :placeholder="placeholder"
        v-model="autocompleteText"
        @focus="onFocus()"
        @blur="onBlur()"
        @change="onChange"
        @keypress="onKeyPress"
      />
      <span class="button is-primary" :disabled="!autocompleteText"@click.prevent="clear()"><i class="fa fa-times"></i></span>
  </div>
</template>

<script>
  export default {
    name: 'VueGoogleAutocomplete',

    props: {
      id: {
        type: String,
        required: true
      },
      value: {
        type: String,
        default: ''
      },
      classname: String,
      placeholder: {
        type: String,
        default: 'Start typing'
      },
      types: {
        type: String,
        default: 'address'
      },
      country: {
        type: [String, Array],
        default: null
      },
      enableGeolocation: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        autocomplete: null,
        autocompleteText: this.value
      }
    },
    watch: {
      autocompleteText: function (newVal, oldVal) {
        this.$emit('inputChange', { newVal, oldVal })
      }
    },
    mounted: function () {
      const options = {}

      if (this.types) {
        options.types = [this.types]
      }

      if (this.country) {
        options.componentRestrictions = {
          country: this.country
        }
      }

      this.autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById(this.id),
        options
      )

      this.autocomplete.addListener('place_changed', () => {
        let place = this.autocomplete.getPlace()

        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          this.$emit('no-results-found', place)
          return
        }

        let addressComponents = {
          street_number: 'short_name',
          route: 'long_name',
          locality: 'long_name',
          administrative_area_level_1: 'short_name',
          country: 'long_name',
          postal_code: 'short_name'
        }

        let returnData = {}
        if (place.address_components !== undefined) {
          // Get each component of the address from the place details
          for (let i = 0; i < place.address_components.length; i++) {
            let addressType = place.address_components[i].types[0]

            if (addressComponents[addressType]) {
              let val = place.address_components[i][addressComponents[addressType]]
              returnData[addressType] = val
            }
          }

          returnData['latitude'] = place.geometry.location.lat()
          returnData['longitude'] = place.geometry.location.lng()

          // return returnData object and PlaceResult object
          this.$emit('placechanged', returnData, place, this.id)

          // update autocompleteText then emit change event
          this.autocompleteText = document.getElementById(this.id).value
          this.onChange()
        }
      })
    },

    methods: {
      onFocus () {
        this.geolocate()
        this.$emit('focus')
      },
      onBlur () {
        this.$emit('blur')
      },
      onChange () {
        this.$emit('change', this.autocompleteText)
      },
      onKeyPress (event) {
        this.$emit('keypress', event)
      },
      clear () {
        this.autocompleteText = ''
        this.$emit('clear')
      },
      focus () {
        this.$refs.autocomplete.focus()
      },
      blur () {
        this.$refs.autocomplete.blur()
      },
      update (value) {
        this.autocompleteText = value
      },
      geolocate () {
        if (this.enableGeolocation) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              let geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
              let circle = new window.google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
              })
              this.autocomplete.setBounds(circle.getBounds())
            })
          }
        }
      }
    }
  }
</script>
