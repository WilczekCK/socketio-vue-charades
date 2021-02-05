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
          v-model="searchWordsSimilarTo"
          placeholder="Type in the word you want to search nouns for draw"
          @keyup="debounce(fetchWords())"
        ></b-form-input>
      </b-form-group>

      <b-button 
        v-for="word in wordsSimilarFound"
        class="mt-3"
        variant="primary"
        block
        @click="selectedWord"
        :key="word.length"
        >
        {{word.word}}</b-button>
      <h6 v-if="wordsSimilarFound.length < 1 && searchWordsSimilarTo.length > 0">
        Sorry, word you provided isn't related with any noun from API.
        <br/>
        Please, try with another word. 
      </h6>
        <b-button 
        class="mt-10"
        variant="danger"
        block
        @click="socket.emit('NEXT_ROUND', true), $refs['word-selector'].hide()"
        >
        Do not want to draw? Click here!</b-button>
    </b-modal>
</template>

<script>
import _ from 'underscore';
import axios from 'axios';

export default {
  name: 'wordSelection',
  props: ['drawingPlayerId', 'socket'],
  data(){
    return {
        wordsSimilarFound: [],
        searchWordsSimilarTo: '',
        wordSelected: undefined,
    }
  },
  methods: {
    debounce: (funcToDebounce) =>  _.debounce(funcToDebounce, 300),
    fetchWords: async function() {
        
        const that = this;
        await axios.get(`https://api.datamuse.com/words?rel_jja=${this.searchWordsSimilarTo}&max=50`)
        .then(function({data}){
            if(_.isEmpty(data) || !data) return that.wordsSimilarFound = [];

            that.wordsSimilarFound = _.sample(_.shuffle(data), 5); //shuffle and sample it to 5 records
        })
        .catch(function(err){
            console.log(err)
        })
    },
    selectWord: function(){
        this.$refs['word-selector'].show()
    },
    selectedWord(e){  
      this.wordSelected = e.originalTarget.innerText;
      this.socket.emit('WORD_SELECTED', this.wordSelected);

      this.$refs['word-selector'].hide();
    }
  },
  mounted: function(){
    const that = this;
    this.socket.on('IS_PLAYER_SELECTED', ({userSelected}) => {
        this.socket.id === userSelected.id ? that.selectWord() : 0;
    })
  }
}
</script>


<style scoped>
</style>
