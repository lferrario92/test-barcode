<template>
  <div class="home">
    <div>
      <h4>
        New lib (esta es la paga)
      </h4>

      <button
        @click="scan"
      >
        Scan! 
      </button>
      <div>
        <div id="UIElement" class="UIElement">
          <span id='lib-load' style='font-size:x-large' hidden>Loading Library...</span>
          <div id="div-ui-container" class="div-ui-container">
            <div class="dce-video-container"></div>
            <div class="dce-scanarea">
              <div class="dce-scanlight" hidden></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        counter: {{ counter }}
        Result:
        <br>
        <h4 id="result">
          {{ result }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import dynamsoft from '@/scripts/dist/dbr.js'

export default {
  name: 'HomeView',
  data () {
    return {
      result: '',
      counter: 0,
      dynamsoft: dynamsoft
    }
  },
  mounted () {
    Dynamsoft.DBR.BarcodeReader.license = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxODAyMzI2LVRYbFhaV0pRY205cVgyUmljZyIsIm9yZ2FuaXphdGlvbklEIjoiMTAxODAyMzI2IiwiY2hlY2tDb2RlIjo4NTI2OTg4MDd9';
  },
  methods: {
    async scan () {
      try {
        document.getElementById('lib-load').hidden = false;
        let scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance()
        await scanner.setUIElement(document.getElementById('div-ui-container'));
        scanner.onUniqueRead = (txt, result) => {
          const format = result.barcodeFormatString;
          this.counter++

          this.result = format + ": " + txt
        }
        await scanner.show();
        document.getElementById('lib-load').hidden = true;
        // updateOptions()
        // updateCurrentResolution()
      } catch (ex) {
        let errMsg;
        if (ex.message.includes("network connection error")) {
          errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
        } else {
          errMsg = ex.message||ex;
        }
        console.error(errMsg);
        alert(errMsg);
      }
    }
  }
}
</script>

<style>
.div-ui-container {
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  height: 450px;
  position: relative;
}

.dce-video-container,
.dce-scanarea {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
