<template>
    <b-container fluid class="chat__wrapper">
        <b-container class="chat__menu">
            <b-row>
                <b-tooltip :show.sync="show" placement="top" target="show_players_button">
                    <strong>{{recentPlayer}}</strong> comes to play!
                </b-tooltip>
                <b-col>
                      <b-button block variant="primary">I want draw</b-button>
                </b-col>
                <b-col>
                      <b-button id="show_players_button" block variant="primary">Players online</b-button>
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
//import _ from 'underscore';
export default {
  name: 'Chat',
  props: ['isUsernameProvided', 'username'],
  data() {
      return {
        user: 'Guest',
        message: '',
        messages: [],
        playerList: [],
        socket: io('http://localhost:3001'),
        show: false,

        recentPlayer: undefined,
        playerConnectedTimeout: 5000,
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
        this.messages = [...this.messages, data];
    })
  },
  watch: {
      isUsernameProvided: function() {
        this.user = this.username ? this.username : 'Guest';
        this.socket.emit('PLAYER_CONNECTED', this.user);
        this.updatePlayerList();
      }
  }
}
</script>


<style scoped>

</style>
