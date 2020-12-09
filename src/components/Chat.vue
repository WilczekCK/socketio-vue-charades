<template>
    <b-container class="chat__wrapper">
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
        <b-container class="chat__container">
        </b-container>
    </b-container>
</template>

<script>
export default {
  name: 'Chat',
  props: {
    msg: String
  }
}
</script>


<style scoped>

</style>
