<template>
        <b-container class="chat__menu">
            <b-row>
                <b-tooltip :show.sync="show" placement="top" target="show_players_button">
                </b-tooltip>
                <b-col>
                      <b-button block variant="primary">I want draw</b-button>
                </b-col>
                <b-col>
                      <b-button id="show_players_button" block variant="primary" @mouseup="updatePlayerList()">Players online</b-button>
                        <b-popover target="show_players_button" variant="primary" triggers="click" placement="top">
                        <template #title>Players online list</template>
                        <div v-if="playerList.length === 0">
                            <b-spinner variant="primary" label="Spinning"></b-spinner>
                        </div>
                        <ul v-else>
                            <li v-for="player in playerList" :key='player.id'>{{player.id}}</li>                        </ul>
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
import io from  'socket.io-client';
export default {
    //<strong>{{recentPlayer}}</strong> comes to play!
  name: 'ButtonsAboveChat',
  data() {
      return {
          socket: io('http://localhost:3001'),
          playerList: [],
          loading: false,
      }
  },  
  methods: {
      updatePlayerList(){
        this.socket.emit('PLAYER_LIST', (callback) => {
            this.playerList = callback;
        })
      }
  },
  mounted: function (){
    //this.socket.on("PLAYER_LIST", (data) => {
      //  this.playerList = data;
    //})
  },

}
</script>


<style scoped>

</style>
