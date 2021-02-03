<template>
    <b-container fluid class="chat__wrapper">
        <ButtonsAboveChat :socket="socket" :playerList="playerList"/>

        <b-container fluid class="chat__system">
            <ul>
                <li class="chat__system__message" :class="{[message.type]: message.type}" v-for="message in messages" :key="message.length">
                   <span class="chat__system__message__user">{{message.username}}</span> : {{message.message}}
                </li> 
            </ul>
            <b-row>
                <b-col cols="12">
                <b-form-input v-model="message" placeholder="Enter your message" @keyup.enter="sendMessage()"></b-form-input>
                </b-col>

                <b-col>
                <b-button block variant="primary">SEND</b-button>
                </b-col>
            </b-row>
            
        </b-container>

        <b-container fluid class="alert_system">
            <b-alert
                :show="alert.dismissCountDown"
                dismissible
                fade
                variant="success"
                @dismissed="alert.dismissCountDown=0"
                @dismiss-count-down="countDownChanged"
                >
                New player appeared! :)
            </b-alert>
        </b-container>
    </b-container>
</template>

<script>
import ButtonsAboveChat from './ButtonsAboveChat';
//import _ from 'underscore';
export default {
  name: 'Chat',
  components: {
      ButtonsAboveChat
  },
  props: ['isUsernameProvided', 'username', 'socket', 'playerList'],
  data() {
      return {
        user: 'Guest',
        message: '',
        messages: [],

        alert: {
            dismissSecs: 5,
            dismissCountDown: 0
        }
      }
  },  
  methods: {
      sendMessage(){
          this.socket.emit('SEND_MESSAGE', {
              username: this.user,
              message: this.message,
              type: 'regular__message'
          });

          this.message = '';
      },
      showAlert() {
        this.alert.dismissCountDown = this.alert.dismissSecs
      },
      countDownChanged(dismissCountDown) {
        this.alert.dismissCountDown = dismissCountDown
      },
  },
  mounted: function (){
    this.socket.on("MESSAGE", (data) => {
        this.messages = [...this.messages, data];
    })
  },
  watch: {
      isUsernameProvided: function() {
        this.user = this.username ? this.username : 'Guest';
        this.socket.emit('PLAYER_CONNECTED', this.user);
        this.showAlert();
      }
  }
}
</script>


<style scoped>

</style>
