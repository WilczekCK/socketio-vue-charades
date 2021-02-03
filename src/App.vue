<template>
  <div id="app">
    <b-modal 
      ref="nickname-modal"
      id="modal-scrollable"
      no-close-on-esc
      no-close-on-backdrop 
      hide-header-close 
      hide-footer
      title="Please, provide your username to start the game">
        <b-form-input
          placeholder="You will be displayed as a Guest"
          v-model="username">
        </b-form-input>

        <b-button 
          @click="finishedWriting" 
          variant="primary"
          block
          style="margin-top:10px;">
          I want to play! 
        </b-button>
    </b-modal>

    <b-container class="game__container">
      <Game :socket="socket" :playerList="playerList"/>
    </b-container>

    <b-container class="chat__container">
      <Chat :isUsernameProvided="isUsernameProvided" :username="username" :socket='socket' :playerList="playerList" />
    </b-container>


      <b-container fluid class="alert_system">
          <b-alert
              :show="alert.dismissCountDown"
              dismissible
              fade
              :variant="alert.variant"
              @dismissed="alert.dismissCountDown=0"
              @dismiss-count-down="countDownChanged"
              >
              {{alert.message}}
          </b-alert>
      </b-container>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'
import Game from './components/Game.vue'
import io from  'socket.io-client';

export default {
  name: 'app',
  head:{
    meta: [
      {name:"viewport", content:"width=device-width, initial-scale=1.0, user-scalable=no"}
    ]
  },
  data () {
    return {
      socket: io('http://localhost:3001'),
      username: 'Guest',
      isUsernameProvided: false,
      playerList: [],


      alert: {
          dismissSecs: 5,
          dismissCountDown: 0,
          message: undefined,
          variant: 'success',
      }
    }
  },
  components: {
    Chat,
    Game
  },
  methods:{
    finishedWriting: function() {
      this.$refs['nickname-modal'].hide();
      this.isUsernameProvided = true;
    },
    updatePlayerList(){
        this.socket.emit('PLAYER_LIST', (callback) => {
            this.playerList = callback;
        })
    },
    showAlert() {
      this.alert.dismissCountDown = this.alert.dismissSecs
    },
    countDownChanged(dismissCountDown) {
      this.alert.dismissCountDown = dismissCountDown
    },
  },
  mounted() {
    this.$refs['nickname-modal'].show();
    this.socket.on('PLAYER_LIST_UPDATE', () => {
      this.updatePlayerList();    
    })
  
    this.socket.on("ALERT_MESSAGE", (data) => {
      this.alert.message = `${data.username} just joined!`
      this.alert.variant = data.variant;
      this.showAlert();
    })
  }
}
</script>

<style>
</style>
