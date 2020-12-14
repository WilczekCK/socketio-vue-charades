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
                <b-form-input v-model="text" placeholder="Enter your message"></b-form-input>
                </b-col>

                <b-col>
                <b-button block variant="primary">SEND</b-button>
                </b-col>
            </b-row>
            
        </b-container>
    </b-container>
</template>

<script>
export default {
  name: 'Chat',
  data() {
      return {
        fields: [
            {
                key: 'points',
                sortable: true,
                theadClass: 'chat__system--points'
            }
        ],
        messages: [
          { points: 40, nickname: 'Dickerson', message: 'Macdonald' },
          { points: 40, nickname: 'Dickerson', message: 'Macdonald' },
          { points: 40, nickname: 'Dickerson', message: 'Macdonald' },
          { points: 40, nickname: 'Dickerson', message: 'Macdonald' },
          { points: 40, nickname: 'Dickerson', message: 'Macdonald' },
          { points: 40, nickname: 'Dickerson', message: 'Macdonald' },
        ]
      }
  },  
  props: {
    msg: String
  }
}
</script>


<style scoped>

</style>
