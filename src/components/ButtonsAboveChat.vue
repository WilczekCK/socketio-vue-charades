<template>
        <b-container class="chat__menu">
            <b-row>
                <b-tooltip :show.sync="show" placement="top" target="show_players_button">
                    
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
</template>

<script>
export default {
    //<strong>{{recentPlayer}}</strong> comes to play!
  name: 'ButtonsAboveChat',
  data() {
      return {

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
