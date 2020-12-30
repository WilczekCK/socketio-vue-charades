<template>
        <b-container class="chat__menu">
            <b-row>
                <b-col>
                      <b-button block variant="primary">I want draw</b-button>
                </b-col>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque eget risus eget dolor finibus pulvinar.
                        Morbi lobortis id purus et vestibulum.
                        Maecenas vitae congue leo. Sed ac commodo mauris.
                    </b-popover>
                </b-col>
            </b-row>
        </b-container>
</template>

<script>
export default {
    //<strong>{{recentPlayer}}</strong> comes to play!
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
