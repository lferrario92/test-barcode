<template>
  <div>
    Ejemplos:
    
    <div
      class="examples"
    >
      <img id="pdf" src="../assets/417.gif" alt="">
      <br>
      <img id="pdf2" src="../assets/417_2.gif" alt="">
      <img id="pdf3" src="../assets/aztec.gif" alt="">
      <img src="../assets/qr.gif" alt="">

      dinamyc test
      <input type="text" v-model="input">
      <img
        alt='Barcode Generator TEC-IT'
        :key="generate"
        :src="`https://barcode.tec-it.com/barcode.ashx?data=${input}&code=PDF417`"
      />
      <br>
      <br>
      <br>
      <button @click="generate++">generate</button>
      <br>
    </div>
    <br>
    <!-- <button @click="testme">test</button> -->
  </div>
</template>

<script>
/* eslint-disable */
// import { BrowserPrint } from '@/scripts/BrowserPrint-3.0.216.min.js'

export default {
  data () {
    return {
      input: 'M1MEC%2FDISCO+ERMZHML+AEPMDQXX+4444+063Y010A0001+148%3E3181OO3062BXX+2A999021005282300+N%23',
      generate: 0
    }
  },
  methods: {
    testme () {
      const barcodeDetector = new BarcodeDetector({
        formats: ["pdf_417"],
      })

      barcodeDetector
      .detect(document.querySelector('#pdf'))
      .then((barcodes) => {
        barcodes.forEach((barcode) => console.log(barcode.rawValue));
        debugger
      })
      .catch((err) => {
        console.log(err);
        debugger
      });
    },
    test () {
      // debugger
      // this.hola = 'hola'
      // BrowserPrint.getLocalDevices((device_list) =>{
      //   debugger
      //   this.hola = 'hola y vemos'

      // }, function(){alert("Error getting local devices")}, (res) => {debugger}, "printer");

      // debugger
      // BrowserPrint.getDefaultDevice("printer", function(device) {
      //   debugger

      //   //Add device to list of devices and to html select element
      //   selected_device = device;
      //   devices.push(device);
      //   var html_select = document.getElementById("selected_device");
      //   var option = document.createElement("option");
      //   option.text = device.name;
      //   html_select.add(option);
        
      //   //Discover any other devices available to the application
      //   BrowserPrint.getLocalDevices(function(device_list){
      //     for(var i = 0; i < device_list.length; i++)
      //     {
      //       //Add device to list of devices and to html select element
      //       var device = device_list[i];
      //       if(!selected_device || device.uid != selected_device.uid)
      //       {
      //         devices.push(device);
      //         var option = document.createElement("option");
      //         option.text = device.name;
      //         option.value = device.uid;
      //         html_select.add(option);
      //       }
      //     }
          
      //   }, function(){alert("Error getting local devices")},"printer");
        
      // }, function(error){
      //   debugger
      //   alert(error);
      // }, function(nose) {
      //   debugger
      // })
    }
  }
}
</script>

<style>
.examples {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80vh;
  flex-wrap: wrap;
}
.examples img {
  width: 100%;
  image-rendering: pixelated;
  margin-top: 50px;
  border: solid 5px white;
  max-width: 300px;
}
</style>
