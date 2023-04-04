<template>
  <div>
    Ejemplos:
    
    <div
      class="examples"
    >
      <img src="../assets/417.gif" alt="">
      <img src="../assets/qr.gif" alt="">
    </div>
    <button @click="test">test</button>
  </div>
</template>

<script>
/* eslint-disable */
// import { BrowserPrint } from '@/scripts/BrowserPrint-3.0.216.min.js'

export default {
  methods: {
    test () {
      debugger
      this.hola = 'hola'
      BrowserPrint.getLocalDevices((device_list) =>{
        debugger
        this.hola = 'hola y vemos'

      }, function(){alert("Error getting local devices")}, (res) => {debugger}, "printer");

      debugger
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
}
.examples img {
  width: 100%;
  image-rendering: pixelated;
  margin-top: 50px;
  border: solid 5px white;
  max-width: 300px;
}
</style>
