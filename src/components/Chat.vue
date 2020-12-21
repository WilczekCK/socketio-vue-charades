<template>
    <b-container fluid class="chat__wrapper">
        <ButtonsAboveChat :socket="socket"/>

        <b-container fluid class="chat__system">
            <ul>
                <li class="chat__system__message" :class="{isSystem: message.system }" v-for="message in messages" :key="message">
                   <span class="chat__system__message__user">{{message.user}}</span> : {{message.text}}
                </li> 
            </ul>
            <b-row>
                <b-col cols="12">
                <b-form-input v-model="message" placeholder="Enter your message" @keyup.enter="sendMessage()"></b-form-input>
                </b-col>

                <b-col>
                <b-button block variant="primary" @click="systemMessage()">SEND</b-button>
                </b-col>
            </b-row>
            
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
  props: ['isUsernameProvided', 'username', 'socket'],
  data() {
      return {
        user: 'Guest',
        message: '',
        messages: [],
        show: false,

        recentPlayer: undefined,
        playerConnectedTimeout: 5000,
      }
  },  
  methods: {
      sendMessage(){
          this.socket.emit('SEND_MESSAGE', {
              user: this.user,
              text: this.message
          });

          this.message = '';
      },
      systemMessage(){
        this.socket.emit('OS_MESSAGE', {
              user: "SYSTEM",
              text: "TEST"
        });
      },
  },
  mounted: function (){
    this.socket.on("MESSAGE", (data) => {
        this.messages = [...this.messages, data];
    })
    this.socket.on("PLAYER_CONNECTED_INFO", async (data) => {
        //TODO -- EACH TOOLTIP FOR CONNECTED USER AT THE SAME TIME
        this.show = true;
        this.recentPlayer = data;

        setTimeout(() => {
            this.show = false;
        }, this.playerConnectedTimeout)
    })
    this.socket.on("SYSTEM_MESSAGE", (data) => {
        this.messages = [...this.messages, {...data, system:true}];
    })
  },
  watch: {
      isUsernameProvided: function() {
        this.user = this.username ? this.username : 'Guest';
        this.socket.emit('PLAYER_CONNECTED', this.user);
      }
  }
}
</script>


<style scoped>

</style>
