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
    getRandomPlayer(obj){
      let keys = Object.keys(obj);
      return obj[keys[ keys.length * Math.random() << 0]];
    },
    selectDrawingPlayer(){
      this.drawingPlayer = this.getRandomPlayer(this.playerList);

      this.socket.emit('SEND_MESSAGE', {
        username: "GAME",
        message: `Player which will draw is: ${this.drawingPlayer.username}, wait till he select the word!`,
        type: 'system__message'
      });
      
      this.isDrawing = true;
    }
  },
  mounted: function(){

  },
  watch:{
    playerList: function(){
      if(this.playerList.length > 1 && !this.isDrawing){
        this.selectDrawingPlayer();
      }
    }
  }
}
</script>


<style scoped>

</style>
