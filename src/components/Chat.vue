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
        messages: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
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
