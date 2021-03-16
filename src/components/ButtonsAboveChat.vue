<template>
        <b-container class="chat__menu">
            <b-row>
                <b-col>
                      <b-button id="show_players_button" block variant="primary">Players online ({{playerList.length}})</b-button>
                        <b-popover target="show_players_button" variant="primary" triggers="click" placement="top">
                        <template #title>Players online list</template>
                        <div class="chat__menu__playerList" v-if="playerList.length === 0">
                            <b-spinner variant="primary" label="Spinning"></b-spinner>
                        </div>
                        <ul class="chat__menu__playerList" v-else>
                            <li v-for="player in playerList" :key='player.id'>{{player.username}}, points: {{player.points}}</li>
                        </ul>
                    </b-popover>
                </b-col>
                <b-col>
                    <b-button id="faq__button" block variant="primary">FAQ</b-button>
                    <b-popover target="faq__button" variant="primary" triggers="click" placement="top">
                        <template #title>Frequently Asked Questions</template>
                        <ol>
                            <li>Drawing player cannot chat</li>
                            <li>If player will answer proper word, then drawing player gets the one point too</li>
                            <li>Single round takes 5 minutes</li>
                            <li>Open Source project!</li>
                        </ol>
                    </b-popover>
                </b-col>
            </b-row>
        </b-container>
</template>

<script>
export default {
  name: 'ButtonsAboveChat',
  props: ['socket', 'playerList'],
  data() {
      return {
          loading: false,
      }
  },  
  methods: {

  },
  mounted: function (){

  },

}
</script>


<style scoped>

</style>
