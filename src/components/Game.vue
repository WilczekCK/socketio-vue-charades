<template>
<div style="height:100%;">

    <v-stage :config="conva.config">
      <v-layer>
        <v-rect :config="conva.rect"></v-rect>>
        <headerLabel />
  
        <v-text v-if="wordSelected" :config="{text: `The word you have to draw is: ${ wordSelected }`, y: 50, x:6, fontSize: 12}"  />
      </v-layer>
    </v-stage>

    <b-modal ref="word-selector"
      no-close-on-esc
      no-close-on-backdrop 
      hide-header-close 
      hide-footer 
      hide-header
      >
      <h4>You are selected by system!</h4>
      <h6>Select what you want to draw:</h6>

      <b-button class="mt-3" variant="success" block @click="selectedWord">Cat</b-button>
      <b-button class="mt-3" variant="warning" block @click="selectedWord">Home</b-button>
      <b-button class="mt-3" variant="danger" block @click="selectedWord">Cricket</b-button>
    </b-modal>
</div>
</template>

<script>
//import _ from 'underscore';
import headerLabel from './canvas/headerLabel';
export default {
  name: 'Game',
  components: {headerLabel},
  props: ['socket', 'playerList'],
  data(){
    return {
      wordSelected: undefined,
      drawingPlayer: {
        username: undefined,
        id: null,
        points: null
      },
      conva: {
        config: {
          width: 1200,
          height: 535
        },
        rect: {
          x: 0,
          y: 0,
          width: 1140,
          height: 535,
          fill: "white",
        },
      },
    }
  },
  methods: {
    selectDrawingPlayer(){
      this.getDrawingPlayer();
    },
    getDrawingPlayer(){
      this.socket.emit('LOAD_DRAWING_PLAYER', (callback) => {
        this.drawingPlayer = callback;

        this.socket.id === this.drawingPlayer.id ? this.selectWord() : 0;
      })
    },
    selectWord(){
      this.$refs['word-selector'].show();
    },
    selectedWord(e){  
      this.wordSelected = e.originalTarget.innerText;
      this.socket.emit('WORD_SELECTED', this.wordSelected);

      this.$refs['word-selector'].hide();
    }
  },
  mounted: function(){
    //check while connecting
    this.getDrawingPlayer();
    
    //if connected, and new player is drawing recog
    this.socket.on('IS_PLAYER_SELECTED', () => this.getDrawingPlayer());
    
    //hearable, watcher-like
    this.socket.on('NEXT_ROUND', () => {
      this.wordSelected = undefined;
      this.socket.emit('NEXT_ROUND');
    });
  },
  watch:{
  }
}
</script>


<style scoped>

</style>
