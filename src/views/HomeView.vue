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
        counter: {{ counter }}
        Result:
        <br>
        <h4>
          {{ result }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script src="@/scripts/BrowserPrint-3.0.216.min.js"></script>

<script>
// import { BrowserPrint } from '@/scripts/BrowserPrint-3.0.216.min.js'
/* eslint-disable */
import { BrowserPDF417Reader, BarcodeFormat } from '@zxing/library';

export default {
  name: 'HomeView',
  data () {
    return {
      selectedDeviceId: null,
      codeReader: null,
      result: '',
      counter: 0
    }
  },
  mounted () {
    const time = 100
    const hints = new Map()
    hints.set([BarcodeFormat.PDF_417])

    this.codeReader = new BrowserPDF417Reader(time)
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

    // this.BrowserPrint.getDefaultDevice("printer", function(device)
    //   {
    
    //     //Add device to list of devices and to html select element
    //     selected_device = device;
    //     devices.push(device);
    //     var html_select = document.getElementById("selected_device");
    //     var option = document.createElement("option");
    //     option.text = device.name;
    //     html_select.add(option);
        
    //     //Discover any other devices available to the application
    //     BrowserPrint.getLocalDevices(function(device_list){
    //       for(var i = 0; i < device_list.length; i++)
    //       {
    //         //Add device to list of devices and to html select element
    //         var device = device_list[i];
    //         if(!selected_device || device.uid != selected_device.uid)
    //         {
    //           devices.push(device);
    //           var option = document.createElement("option");
    //           option.text = device.name;
    //           option.value = device.uid;
    //           html_select.add(option);
    //         }
    //       }
          
    //     }, function(){alert("Error getting local devices")},"printer");
        
    //   }, function(error){
    //     alert(error);
    //   })
  },
  methods: {
    scan () {
      this.codeReader.decodeFromVideoDevice(this.selectedDeviceId, 'video', (result, err) => {
        if (result) {
          this.counter++
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
