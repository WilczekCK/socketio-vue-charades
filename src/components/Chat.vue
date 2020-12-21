<template>
    <b-container fluid class="chat__wrapper">
        <ButtonsAboveChat :socket="socket"/>

        <b-container fluid class="chat__system">
            <ul>
                <li class="chat__system__message" :class="{[message.type]: message.type}" v-for="message in messages" :key="message">
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
      }
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
      }
  }
}
</script>


<style scoped>

</style>
