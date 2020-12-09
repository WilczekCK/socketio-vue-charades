<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <Chat />
          <Game />
        </div>
      </div>
    </div>
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
