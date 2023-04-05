<template>
  <div class="home">
    <div>
      <h4>
        last lib (wasm)
      </h4>
      <span>
        frames decoded: {{ frames }}
      </span>
      <div>
        <h2>zxing-cpp/wasm live demo</h2>
        <p>
          This is a simple demo of the wasm wrapper of <a href="https://github.com/zxing-cpp/zxing-cpp">zxing-cpp</a>
          scanning for barcodes in a live video stream.
        </p>

        Camera:
        <select id="cameraSelector">
          <option value="front">Front Camera</option>
          <option value="back">Back Camera</option>
        </select>
        &nbsp;&nbsp;

        Format:
        <select id="format">
          <option value="" selected="">Any</option>
          <option value="Aztec">Aztec</option>
          <option value="Code39">Codabar</option>
          <option value="CODE_39">Code39</option>
          <option value="Code93">Code93</option>
          <option value="Code128">Code128</option>
          <option value="DataMatrix">DataMatrix</option>
          <option value="DataBar">DataBar</option>
          <option value="DataBarExpanded">DataBarExpanded</option>
          <option value="EAN8">EAN-8</option>
          <option value="EAN13">EAN-13</option>
          <option value="ITF">ITF</option>
          <option value="PDF417">PDF417</option>
          <option value="QRCode">QRCode</option>
          <option value="MicroQRCode">Micro QRCode</option>
          <option value="UPCA">UPC-A</option>
          <option value="UPCE">UPC-E</option>
          <option value="LinearCodes">Linear Codes</option>
          <option value="MatrixCodes">Matrix Codes</option>
        </select>
        &nbsp;&nbsp;

        Mode:
        <select id="mode">
          <option value="true" selected="">Normal</option>
          <option value="false">Fast</option>
        </select>
        <br /><br />

        <canvas id="canvas" width="640" height="480"></canvas>
        <br /><br />

        <div id="result"></div>
      </div>

      <button
        @click="scan"
      >
        Scan! 
      </button>

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
import { ZXing } from '@/scripts/zxing_reader'

export default {
  name: 'HomeView',
  data () {
    return {
      result: '',
      counter: 0,
      frames: 0
    }
  },
  mounted () {
  },
  methods: {
    scan () {
      let test = ZXing
      var zxing = ZXing().then((instance) => {
        zxing = instance; // this line is supposedly not required but with current emsdk it is :-/
        // const cameraSelector = document.getElementById("cameraSelector");
        const format = document.getElementById("format");
        const mode = document.getElementById("mode");
        const canvas = document.getElementById("canvas");
        const resultElement = document.getElementById("result");

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const video = document.createElement("video");
        video.setAttribute("id", "video");
        video.setAttribute("width", canvas.width);
        video.setAttribute("height", canvas.height);
        video.setAttribute("autoplay", "");

        const readBarcodeFromCanvas = (canvas, format, mode) => {
          var imgWidth = canvas.width;
          var imgHeight = canvas.height;
          var imageData = canvas.getContext('2d').getImageData(0, 0, imgWidth, imgHeight);
          var sourceBuffer = imageData.data;

          if (zxing != null) {
            var buffer = zxing._malloc(sourceBuffer.byteLength);
            zxing.HEAPU8.set(sourceBuffer, buffer);
            var result = zxing.readBarcodeFromPixmap(buffer, imgWidth, imgHeight, mode, format);

            if (result.text) {
              this.counter++
              this.result = result
            }
            zxing._free(buffer);

            return result;
          } else {
            return { error: "ZXing not yet initialized" };
          }
        }

        // function drawResult(code) {
        //   ctx.beginPath();
        //   ctx.lineWidth = 4;
        //   ctx.strokeStyle = "red";
        //   // ctx.textAlign = "center";
        //   // ctx.fillStyle = "#green"
        //   // ctx.font = "25px Arial";
        //   // ctx.fontWeight = "bold";
        //   with (code.position) {
        //     ctx.moveTo(topLeft.x, topLeft.y);
        //     ctx.lineTo(topRight.x, topRight.y);
        //     ctx.lineTo(bottomRight.x, bottomRight.y);
        //     ctx.lineTo(bottomLeft.x, bottomLeft.y);
        //     ctx.lineTo(topLeft.x, topLeft.y);
        //     ctx.stroke();
        //     // ctx.fillText(code.text, (topLeft.x + bottomRight.x) / 2, (topLeft.y + bottomRight.y) / 2);
        //   }
        // }

        const processFrame = () => {
          this.frames++
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const code = readBarcodeFromCanvas(canvas, format.value, mode.value === 'true');
          if (code.format) {
            resultElement.innerText = code.format + ": " + code.text;
            // drawResult(code)
          } else {
            resultElement.innerText = "No barcode found";
          }
          requestAnimationFrame(processFrame);
        };

        const updateVideoStream = (deviceId) => {
          navigator.mediaDevices
            .getUserMedia({ video: { facingMode: deviceId }, audio: false })
            .then((stream) => {
              video.srcObject = stream;
              video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
              video.play();
              processFrame();
            })
            .catch(function (error) {
              console.error("Error accessing camera:", error);
            });
        };

        // cameraSelector.addEventListener("change", function () {
        //   updateVideoStream(this.value);
        // });

        updateVideoStream();
      });

      
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
