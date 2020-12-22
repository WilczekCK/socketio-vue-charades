<template>
<div style="height:100%;">
    <h2><b-badge variant="primary">Vue + SocketIO Charades</b-badge></h2>
</div>
</template>

<script>
//import _ from 'underscore';
export default {
  name: 'Game',
  props: ['socket', 'playerList'],
  data(){
    return {
      isDrawing: false,
      timeForDrawing: 120, //seconds
      drawingPlayer: {
        username: undefined,
        id: null,
        points: null
      }
    }
  },
  methods: {
    selectDrawingPlayer(){
      this.getDrawingPlayer();
      this.isDrawing = true;
    },
    getDrawingPlayer(){
      this.socket.emit('LOAD_DRAWING_PLAYER', (callback) => {
        this.drawingPlayer = callback;
      })
    }
  },
  mounted: function(){
    this.socket.on('ROLL_PLAYER', () => {
      this.selectDrawingPlayer();
    })
  },
  watch:{
  }
}
</script>


<style scoped>

</style>
