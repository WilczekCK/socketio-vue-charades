<template>
    <b-container fluid class="chat__wrapper">
        <b-container class="chat__menu">
            <b-row>
                <b-col>
                      <b-button block variant="primary">I want draw</b-button>
                </b-col>
                <b-col>
                      <b-button block variant="primary">Ask for tip</b-button>
                </b-col>
                <b-col>
                      <b-button block variant="primary">FAQ</b-button>
                </b-col>
            </b-row>
        </b-container>

        <b-container fluid class="chat__system">
            <b-table striped sticky-header small :items="messages"></b-table>
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
import io from  'socket.io-client';
export default {
  name: 'Chat',
  props: ['isUsernameProvided', 'username'],
  data() {
      return {
        user: 'Guest',
        message: '',
        messages: [],
        playerList: [],
        socket: io('http://localhost:3001')
      }
  },  
  methods: {
      sendMessage(){
          this.socket.emit('SEND_MESSAGE', {
              user: this.user,
              message: this.message
          });

          this.message = '';
      },
      updatePlayerList: async function(){
        await this.socket.emit('PLAYER_LIST', (response) => {
            this.playerList = response;
        })
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
        this.updatePlayerList();
      }
  }
}
</script>


<style scoped>

</style>
