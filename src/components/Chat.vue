<template>
    <b-container fluid class="chat__wrapper">
        <b-container class="chat__menu">
            <b-row>
                <b-col>
                      <b-button block variant="primary">Change nickname</b-button>
                </b-col>
                <b-col>
                      <b-button block variant="primary">Ask for help</b-button>
                </b-col>
                <b-col>
                      <b-button block variant="primary">FAQ</b-button>
                </b-col>
            </b-row>
        </b-container>

        <b-container fluid class="chat__system">
            <b-table striped sticky-header small :items="messages" style="max-height:130px;"></b-table>
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
  props: ['username'],
  data() {
      return {
        user: this.username,
        message: '',
        messages: [],
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
      }
  },
  mounted(){
      this.socket.on("MESSAGE", (data) => {
          this.messages = [...this.messages, data];
      })
  },
  watch: {
      username: function(newVal){
          this.user = newVal ? newVal : 'Guest';
      }
  }
}
</script>


<style scoped>

</style>
