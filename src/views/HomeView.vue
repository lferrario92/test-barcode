<template>
  <div class="home">
    <div>
      <div>
        <video id="video" style="border: 1px solid gray"></video>
      </div>

      <button
        @click="scan"
      >
        Scan! 
      </button>
      <button
        @click="reset"
      >
        reset 
      </button>


      <div id="sourceSelectPanel" style="display:none">
        <label for="sourceSelect">Change video source:</label>
        <select id="sourceSelect" style="max-width:400px">
        </select>
      </div>

      <div>
        Result:
        <br>
        <h4>
          {{ result }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { BrowserMultiFormatReader } from '@zxing/library';

export default {
  name: 'HomeView',
  data () {
    return {
      selectedDeviceId: null,
      codeReader: null,
      result: ''
    }
  },
  mounted () {
    this.codeReader = new BrowserMultiFormatReader()
    console.log('ZXing code reader initialized')
    this.codeReader.listVideoInputDevices()
    .then((videoInputDevices) => {
      const sourceSelect = document.getElementById('sourceSelect')
      this.selectedDeviceId = videoInputDevices[0].deviceId
      if (videoInputDevices.length >= 1) {
        videoInputDevices.forEach((element) => {
          const sourceOption = document.createElement('option')
          sourceOption.text = element.label
          sourceOption.value = element.deviceId
          sourceSelect.appendChild(sourceOption)
        })

        sourceSelect.onchange = () => {
          this.selectedDeviceId = sourceSelect.value;
        };

        const sourceSelectPanel = document.getElementById('sourceSelectPanel')
        sourceSelectPanel.style.display = 'block'
      }

    })
    .catch((err) => {
      console.error(err)
    })
  },
  methods: {
    scan () {
      this.codeReader.decodeFromVideoDevice(this.selectedDeviceId, 'video', (result, err) => {
        if (result) {
          this.result = result
        }
      })
    },
    reset () {
      this.codeReader.reset()
      this.result = '';
      console.log('Reset.')
    }
  }
}
</script>

<style>

#video {
  width: 100%;
  max-width: 650px;
}
</style>
