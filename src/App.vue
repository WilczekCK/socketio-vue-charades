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
          v-model="loginData.username">
        </b-form-input>

        <b-button 
          @click="finishedWriting" 
          variant="primary"
          block>
          I want to play! 
        </b-button>
    </b-modal>

    <b-container class="game__container">
      <Game />
    </b-container>

    <b-container class="chat__container">
      <Chat :loginData="loginData" />
    </b-container>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'
import Game from './components/Game.vue'

export default {
  name: 'app',
  data () {
    return {
      loginData: {
        username: 'Guest',
        isWritingFinished: false,
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
      this.loginData.isWritingFinished = true;
    }
  },
  mounted() {
    this.$refs['nickname-modal'].show();
  }
}
</script>

<style>
</style>
