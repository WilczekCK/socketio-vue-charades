const wordsApi = {
    baseUrl: `https://api.datamue.com/words?&max=${this.maxResults}&rel_${this.partOfSpeech}`,
    partOfSpeech: `jja`, //search for nouns - based on datamuse.com/api
    maxResults: 25,
    wordsRelatedTo: (word) => word ? word : `random`,
    makeApiConnection: (word) => baseUrl + this.wordRelatedTo(word)
}

module.exports = wordsApi;