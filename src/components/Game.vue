<template>
<div>
    <v-stage ref="blackboard" :config="conva.config" @mousemove="debounce(mouseHandler(gameData.actualBrush), 100)" @mousedown="startDraw(gameData.actualBrush)"  @mouseup="stopDraw">  
     
      <v-layer>
        <v-group>
            <v-container>
              <v-circle
              v-for="circle in gameData.blackboard.circles"
              :key="circle.id"
              :config="{
                  ...gameData.optimize,
                  fill: circle.color,
                  x: circle.x,
                  y: circle.y,
                  radius: circle.size
              }">
              </v-circle>

              <v-rect
              v-for="rect in gameData.blackboard.rects"
              :key="rect.id"
              :config="{
                  ...gameData.optimize,
                  fill: rect.color,
                  x: rect.x,
                  y: rect.y,
                  height: rect.size,
                  width: rect.size
              }">
              </v-rect>
      
              <v-star
              v-for="star in gameData.blackboard.stars"
              :key="star.id"
              :config="{
                  ...gameData.optimize,
                  fill: star.color,
                  x: star.x,
                  y: star.y,
                  innerRadius: star.size / 2,
                  outerRadius: star.size
              }">
              </v-star>

              <v-ring
              v-for="ring in gameData.blackboard.rings"
              :key="ring.id"
              :config="{
                  ...gameData.optimize,
                  fill: ring.color,
                  x: ring.x,
                  y: ring.y,
                  innerRadius: ring.size / 2,
                  outerRadius: ring.size,
                  numPoints: 6
              }">
              </v-ring>
            </v-container>
        </v-group>

        <v-group>
          <v-rect :config="conva.rect"></v-rect>>
          <v-text v-if="gameData.wordSelected" :config="{text: `The word you have to draw is: ${ gameData.wordSelected }`, y: 50, x:6, fill:'#007bff', fontSize: 12}"> </v-text>

          <headerLabel />
          <toolbox
            @brushChanged="setBrush" 
            @colorPicker="$refs['color-picker'].show()"
          />
      </v-group>
      </v-layer>
    </v-stage>



    <b-modal ref="color-picker"
      no-close-on-esc
      no-close-on-backdrop 
      hide-header-close 
      hide-footer 
      hide-header
      >
      <color-picker v-bind="color" @select="hideColorPicker"></color-picker>
      
      <div class="p-4"></div>
      <b-form-input id="range-1" class="" v-model="gameData.brushSize" type="range" min="5" max="50"></b-form-input>
      <b-badge variant="primary" class="text-center p-2"> Brush size: {{ gameData.brushSize }}</b-badge>

      <div class="text-center mt-4"> Click the circle inside to select size and color</div>
    </b-modal>

    <wordSelection :drawingPlayerId="gameData.drawingPlayer.id" :socket="socket"/>
</div>
</template>

<script>
import headerLabel from './canvas/headerLabel';
import toolbox from './canvas/toolbox';
import wordSelection from './wordSelection';
import ColorPicker from '@radial-color-picker/vue-color-picker';
import _ from 'underscore';

export default {
  name: 'Game',
  components: {headerLabel, toolbox, ColorPicker, wordSelection},
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
        brushSize: 24,
        searchingWordsSimilarTo: undefined,
        wordsSimilarToFound: [],
        blackboard: {
          circles: [],
          rects:  [],
          stars: [],
          rings: [],
          //x, y, color
        },
        wordSelected: undefined,
        drawingPlayer: {
          username: undefined,
          id: null,
          points: null
        },
        optimize: {            
          perfectDrawEnabled: false,
          listening:false,
          transformsEnabled: 'position',
          shadowForStrokeEnabled: false,
          hitStrokeWidth: 0
        },
      },
      conva: {
        config: {
          scale: 1,
          width: 1140,
          height: 535
        },
        rect: {
          x: 0,
          y: 0,
          scale: 1,
          width: 1140,
          height: 535,
        },
      },
    }
  },
  methods: {
    debounce: (funcToDebounce) =>  _.debounce(funcToDebounce, 300),
    setBrush(brush){
      this.gameData.actualBrush = brush;
    },
    mouseHandler(brush){
      if( !this.isActualPlayerTryingToDraw() ) return;
      const mousePos = this.$refs.blackboard.getNode().getPointerPosition();
      const preparePaint = {
          x: (mousePos.x / this.conva.config.scale.x),
          y: (mousePos.y / this.conva.config.scale.y),
          brush : brush,
          size: this.gameData.brushSize,
          color: `hsl(${this.color.hue}, ${this.color.saturation}%, ${this.color.luminosity}%)`,
          isPlaceholder: !this.gameData.isMouseButtonHold ? true : false,
          userId: this.socket.id,
      }

      this.socket.emit('PLAYER_DRAW_ON_BLACKBOARD', preparePaint);
    },
     
    startDraw(brush){
      if( !this.isActualPlayerTryingToDraw() ) return;
      this.gameData.isMouseButtonHold = true;
      this.mouseHandler(brush);
    },
    isActualPlayerTryingToDraw(){
      return this.socket.id !== this.gameData.drawingPlayer.id ? false : true;
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
      })
    },
    hideColorPicker(hue) {
       this.color.hue = Math.floor(hue);
       this.$refs['color-picker'].hide();
    },
    fitStageIntoParentContainer() {
        var container = document.querySelector('.game__container');

        // now we need to fit stage into parent
        var containerWidth = container.offsetWidth;
        // to do this we need to scale the stage
        var scale = containerWidth / 1140;

        this.conva.config.width = (1140 * scale);
        this.conva.config.height = (535 * scale);
        this.conva.config.scale = ({ x: scale, y: scale });
      }
  },
  mounted: function(){
    //check while connecting, recog when start the game
      this.getDrawingPlayer();
    
    //on connected, recog player and fill the blackboard
      this.socket.on('IS_PLAYER_SELECTED', () => this.getDrawingPlayer());
      this.socket.emit('GET_BLACKBOARD_DATA', (callback) => this.gameData.blackboard = callback);
      
    //hearables, watcher-like
      this.socket.on('NEXT_ROUND', () => {
        this.gameData.wordSelected = undefined;
        this.socket.emit('NEXT_ROUND');
      });

      this.socket.on('UPDATE_FE_BLACKBOARD', () => {
        this.socket.emit('GET_BLACKBOARD_DATA', (callback) => {
          this.gameData.blackboard = callback;
        })
      })

      this.socket.on('WORD_SELECTED', () => {
        this.socket.emit('GET_DRAWING_WORD', (callback) => {
          this.gameData.wordSelected = callback;
        })
      })

      //Scailing
      this.fitStageIntoParentContainer();
  },
  created: function(){
     window.addEventListener('resize', this.fitStageIntoParentContainer);
  }
}
</script>


<style scoped>
  @import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
  .rcp{margin: 0 auto;}
</style>
