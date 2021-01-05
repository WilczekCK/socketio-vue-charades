<template>
    <v-group>
        <v-rect @mousemove="highlight" @mouseout="unhighlight" :config="conva.background"></v-rect>
        <v-circle @mousemove="highlight" @mouseout="unhighlight" :config="conva.circle" dataTool="circle"></v-circle>
        <v-rect @mousemove="highlight" @mouseout="unhighlight" :config="conva.rect" dataTool="rect"></v-rect>
        <v-star @mousemove="highlight" @mouseout="unhighlight" :config="conva.star" dataTool="star"></v-star>
        <v-ring @mousemove="highlight" @mouseout="unhighlight" :config="conva.ring" dataTool="ring"></v-ring>
        <v-group>
            <v-circle @mousemove="highlight" :config="conva.colorbox.r" dataTool="colorbox"></v-circle>
            <v-circle @mousemove="highlight" :config="conva.colorbox.g" dataTool="colorbox"></v-circle>
            <v-circle @mousemove="highlight" :config="conva.colorbox.b" dataTool="colorbox"></v-circle>
        </v-group>
    </v-group>
</template>

<script>
export default {
  data() {
    const defaultX = 1065;
    const defaultY = 60;
    return {
        highlightedItem: undefined,
        conva: {
            background:{
                x: defaultX,
                y: defaultY,
                height: 400,
                width: 75,
                fill: '#007bff',
            },
            circle:{
                x: defaultX + 39,
                y: defaultY + 50,
                radius: 25,
                fill: 'black',
                opacity: 0.8,
            },
            rect:{
                x: defaultX + 16,
                y: defaultY + 100,
                height:45,
                width:45,
                fill: 'black',
                opacity: 0.8,
            },
            star: {
                x: defaultX + 39,
                y: defaultY + 200,
                numPoints: 6,
                fill: 'black',
                innerRadius: 14,
                outerRadius: 28,
                opacity: 0.8,
            },
            ring: {
                x: defaultX + 39,
                y: defaultY + 275,
                numPoints: 6,
                fill: 'black',
                innerRadius: 12,
                outerRadius: 24,
                opacity: 0.8,
            },
            colorbox: {
                opacity: 0.8,
                r:{
                    x: defaultX + 39,
                    y: defaultY + 340,
                    radius: 15,
                    fill: 'red',
                },
                g:{
                    x: defaultX + 25,
                    y: defaultY + 360,
                    radius: 15,
                    fill: 'green',
                },
                b:{
                    x: defaultX + 52,
                    y: defaultY + 360,
                    radius: 15,
                    fill: 'blue',
                },
            }
      },
    };
  },
  methods: {
      unhighlight: function(){
        if(this.highlightedItem){
            this.conva.[this.highlightedItem].opacity = .8;
        }
      },
      highlight: function(e){
        this.highlightedItem = e.target.attrs.dataTool;
        if(this.highlightedItem){
            this.conva.[this.highlightedItem].opacity = 1;
        }
      }
  }
};
</script>

<style>
</style>