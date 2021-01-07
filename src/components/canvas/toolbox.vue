<template>
    <v-group>
        <v-rect @click="changeBrush" @mousemove="highlight" @mouseout="unhighlight" :config="conva.background"></v-rect>
        <v-circle @click="changeBrush" @mousemove="highlight" @mouseout="unhighlight" :config="conva.circle" dataTool="circle"></v-circle>
        <v-rect @click="changeBrush" @mousemove="highlight" @mouseout="unhighlight" :config="conva.rect" dataTool="rect"></v-rect>
        <v-star @click="changeBrush" @mousemove="highlight" @mouseout="unhighlight" :config="conva.star" dataTool="star"></v-star>
        <v-ring @click="changeBrush" @mousemove="highlight" @mouseout="unhighlight" :config="conva.ring" dataTool="ring"></v-ring>
        
        <v-group @click="colorPicker = !colorPicker">
            <v-circle @mousemove="highlight" :config="conva.colorbox.r" dataTool="colorbox"></v-circle>
            <v-circle @mousemove="highlight" :config="conva.colorbox.g" dataTool="colorbox"></v-circle>
            <v-circle @mousemove="highlight" :config="conva.colorbox.b" dataTool="colorbox"></v-circle>
        </v-group>

        <v-group v-if="colorPicker">
            <v-rect :config="conva.colorbox.gradient"></v-rect>
            <v-rect :config="conva.colorbox.graR"></v-rect>
            <v-rect :config="conva.colorbox.graG"></v-rect>
            <v-rect :config="conva.colorbox.graB"></v-rect>
        </v-group>

    </v-group>
</template>

<script>
export default {
  data() {
    const defaultX = 1100;
    const defaultY = 120;
    const defaultIconColor = 'white';
    const opacity = 0.8;
    return {
        colorPicker: false,
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
                gradient: {
                    x: defaultX - 105,
                    y: defaultY + 220,
                    height:50,
                    width:100,
                    fillLinearGradientStartPoint: { x: -50, y: -50 },
                    fillLinearGradientEndPoint: { x: 50, y: 50 },
                    fillLinearGradientColorStops: [0, 'red', 1, 'yellow'],
                },
                graR: {
                    fill: 'red',
                    x: defaultX - 105,
                    y: defaultY + 275,
                    height:25,
                    width:31,
                },
                graG: {
                    fill: 'green',
                    x: defaultX - 71,
                    y: defaultY + 275,
                    height:25,
                    width:31,
                },
                graB: {
                    fill: 'blue',
                    x: defaultX - 36,
                    y: defaultY + 275,
                    height:25,
                    width:31,
                }
            }
      },
    };
  },
  methods: {
      toggleColorPicker: function(){
      },
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
      }
  }
};
</script>

<style>
</style>