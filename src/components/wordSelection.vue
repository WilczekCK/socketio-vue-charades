<template>
    <b-modal ref="word-selector"
      no-close-on-esc
      no-close-on-backdrop 
      hide-header-close 
      hide-footer 
      hide-header
      >
      <h4>You are selected by system!</h4>
      <b-form-group class="pt-4" id="searchingWordsSimilarTo-group" label="Search noun related with word :" label-for="searchingWordsSimilarTo">
        <b-form-input
          id="searchingWordsSimilarTo"
          v-model="wordsSimilarFound"
          placeholder="Type in the word you want to search nouns for draw"
          @change="fetchWords"
        ></b-form-input>
      </b-form-group>

      <b-button 
        v-for="word in wordsSimilarFounnd"
        class="mt-3"
        variant="primary"
        block
        @click="selectedWord"
        :key="word.length"
        >
        {word}</b-button>
    </b-modal>
</template>

<script>
import _ from 'underscore';
export default {
  name: 'wordSelection',
  data(){
    return {
        wordsSimilarFound: [],
        searchWordsSimilarTo: undefined,
        wordSelected: undefined,
    }
  },
  methods: {
    debounce: (funcToDebounce) =>  _.debounce(funcToDebounce, 300),
    fetchWords(){
        console.log('xD');
    },
    selectWord: () => this.$refs['word-selector'].show(),
    selectedWord(e){  
      this.wordSelected = e.originalTarget.innerText;
      this.socket.emit('WORD_SELECTED', this.wordSelected);

      this.$refs['word-selector'].hide();
    }
  },
  mounted: function(){
   
  }
}
</script>


<style scoped>
</style>
