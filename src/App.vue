<template>
  <div id="app">
    <b-container class="game__container">
      <Game />
    </b-container>

    <b-container class="chat__container">
      <Chat />
    </b-container>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'
import Game from './components/Game.vue'

export default {
  name: 'app',
  components: {
    Chat,
    Game
  }
}
</script>

<style>
</style>
