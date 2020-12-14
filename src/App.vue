<template>
  <div id="app">
    <b-modal ref="nickname-modal" id="modal-scrollable" scrollable no-close-on-esc no-close-on-backdrop title="Please, provide your username">
      <h6>Please, provide your username!</h6>
      <b-form-input v-model="username" placeholder="Enter your name"></b-form-input>
    </b-modal>

    <b-container class="game__container">
      <Game />
    </b-container>

    <b-container class="chat__container">
      <Chat :username="username" />
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
      username: 'Guest'
    }
  },
  components: {
    Chat,
    Game
  },
  mounted() {
    this.$refs['nickname-modal'].show()
  }
}
</script>

<style>
</style>
