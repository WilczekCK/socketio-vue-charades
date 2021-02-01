<template>
    <v-group>
        <v-rect @click="changeBrush" @mousemove="highlight" @mouseout="unhighlight" :config="conva.background"></v-rect>
        <v-circle @click="changeBrush" @mousemove="highlight" @mouseout="unhighlight" :config="conva.circle" dataTool="circle"></v-circle>
        <v-rect @click="changeBrush" @mousemove="highlight" @mouseout="unhighlight" :config="conva.rect" dataTool="rect"></v-rect>
        <v-star @click="changeBrush" @mousemove="highlight" @mouseout="unhighlight" :config="conva.star" dataTool="star"></v-star>
        <v-ring @click="changeBrush" @mousemove="highlight" @mouseout="unhighlight" :config="conva.ring" dataTool="ring"></v-ring>
        
        <v-group @click="$emit('colorPicker')">
            <v-circle @mousemove="highlight" :config="conva.colorbox.r" dataTool="colorbox"></v-circle>
            <v-circle @mousemove="highlight" :config="conva.colorbox.g" dataTool="colorbox"></v-circle>
            <v-circle @mousemove="highlight" :config="conva.colorbox.b" dataTool="colorbox"></v-circle>
        </v-group>
    </v-group>
</template>

<script>
export default {
  data() {
    const defaultX = 0;
    const defaultY = 120;
    const defaultIconColor = 'white';
    const opacity = 0.8;
    return {
        highlightedItem: undefined,
        actualBrush: 'circle',
        conva: {
            background:{
                x: defaultX,
                y: defaultY,
                height: 270,
                width: 40,
                fill: '#007bff',
            },
            circle:{
                x: defaultX + 21,
                y: defaultY + 30,
                radius: 14,
                fill: defaultIconColor,
                opacity
            },
            rect:{
                x: defaultX + 8,
                y: defaultY + 70,
                height:25,
                width:25,
                fill: defaultIconColor,
                opacity
            },
            star: {
                x: defaultX + 21,
                y: defaultY + 135,
                numPoints: 6,
                fill: defaultIconColor,
                innerRadius: 8,
                outerRadius: 16,
                opacity
            },
            ring: {
                x: defaultX + 21,
                y: defaultY + 190,
                numPoints: 6,
                fill: defaultIconColor,
                innerRadius: 7,
                outerRadius: 14,
                opacity
            },
            colorbox: {
                r:{
                    x: defaultX + 21,
                    y: defaultY + 235,
                    radius: 7,
                    fill: 'red',
                    opacity
                },
                g:{
                    x: defaultX + 14,
                    y: defaultY + 246,
                    radius: 7,
                    fill: 'green',
                    opacity
                },
                b:{
                    x: defaultX + 27,
                    y: defaultY + 246,
                    radius: 7,
                    fill: 'blue',
                    opacity
                },
            }
      },
    };
  },
  methods: {
      changeBrush: function(){
        if(this.highlightedItem){
            this.actualBrush = this.highlightedItem;
            this.$emit('brushChanged', this.actualBrush);
        }
      },
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
      },
      handleScroll: function(){
          console.log('mouse wheel scrolled')
      }
  }
};
</script>

<style>
</style>