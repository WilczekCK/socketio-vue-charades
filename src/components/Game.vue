<template>
<div style="height:100%;">
    <v-stage ref="blackboard" :config="conva.config" @mousemove="draw" @mousedown="startDraw"  @mouseup="stopDraw">
      <v-layer>
        <v-rect :config="conva.rect"></v-rect>>
        
  
        <v-text v-if="gameData.wordSelected" :config="{text: `The word you have to draw is: ${ gameData.wordSelected }`, y: 50, x:6, fontSize: 12}"  />
       

        <v-circle
        v-for="paint in gameData.paintings"
        :key="paint.id"
        :config="{
            fill: 'black',
            x: paint.x,
            y: paint.y,
            radius: 70
        }">
        </v-circle>


        <headerLabel />
        <toolbox @brushChanged="setBrush" @colorPicker="displayColorPicker = !displayColorPicker"/>
      </v-layer>
    </v-stage>



    <b-modal ref="color-picker"
      no-close-on-esc
      no-close-on-backdrop 
      hide-header-close 
      hide-footer 
      hide-header
      >
      <color-picker v-bind="color" @input="onInput"></color-picker>
    </b-modal>

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
import toolbox from './canvas/toolbox';
import ColorPicker from '@radial-color-picker/vue-color-picker';
export default {
  name: 'Game',
  components: {headerLabel, toolbox, ColorPicker},
  props: ['socket', 'playerList'],
  data(){
    return {
      color: {
        hue: 50,
        saturation: 100,
        luminosity: 50,
        alpha: 1
      },
      gameData: {
        isMouseButtonHold: false,
        actualBrush: 'circle',
        paintings: [
          {x: 100, y: 100},
          {x: 101, y: 101},
          {x: 102, y: 102},
          {x: 103, y: 103},
          {x: 104, y: 104},
        ],
        wordSelected: undefined,
        drawingPlayer: {
          username: undefined,
          id: null,
          points: null
        },
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
    setBrush(brush){
      this.gameData.actualBrush = brush;
    },
    draw(){
      if(!this.gameData.isMouseButtonHold) return;
      const mousePos = this.$refs.blackboard.getNode().getPointerPosition();

      this.gameData.paintings.push({x:mousePos.x, y:mousePos.y});
    },
    startDraw(){
      this.gameData.isMouseButtonHold = true;
    },
    stopDraw(){
      this.gameData.isMouseButtonHold = false;
    },
    selectDrawingPlayer(){
      this.gameData.getDrawingPlayer();
    },
    getDrawingPlayer(){
      this.socket.emit('LOAD_DRAWING_PLAYER', (callback) => {
        this.gameData.drawingPlayer = callback;

        this.socket.id === this.gameData.drawingPlayer.id ? this.selectWord() : 0;
      })
    },
    selectWord(){
      this.$refs['word-selector'].show();
    },
    selectedWord(e){  
      this.wordSelected = e.originalTarget.innerText;
      this.socket.emit('WORD_SELECTED', this.wordSelected);

      this.$refs['word-selector'].hide();
    },
    onInput(hue) {
      this.color.hue = hue;
    },
  },
  mounted: function(){
    //check while connecting
    this.getDrawingPlayer();
    
    //if connected, and new player is drawing recog
    this.socket.on('IS_PLAYER_SELECTED', () => this.getDrawingPlayer());
    
    //hearable, watcher-like
    this.socket.on('NEXT_ROUND', () => {
      this.gameData.wordSelected = undefined;
      this.socket.emit('NEXT_ROUND');
    });
  }
}
</script>


<style scoped>
  @import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';

</style>
