<template>
  <div>
    Ejemplos:
    
    <div
      class="examples"
    >
      <img src="../assets/417.gif" alt="">
      <img src="../assets/qr.gif" alt="">
    </div>
  </div>
</template>

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
