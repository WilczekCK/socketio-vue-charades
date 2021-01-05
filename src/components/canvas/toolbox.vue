<template>
    <v-group>
        <v-rect :config="conva.background"></v-rect>
        <v-circle :config="conva.circle" data-tool="circle"></v-circle>
        <v-rect :config="conva.rect" data-tool="rect"></v-rect>
        <v-star :config="conva.star" data-tool="star"></v-star>
        <v-ring :config="conva.ring" data-tool="ring"></v-ring>
        <v-group data-tool="colorbox">
            <v-circle :config="conva.colorbox.r" data-tool="colorbox-red"></v-circle>
            <v-circle :config="conva.colorbox.g" data-tool="colorbox-green"></v-circle>
            <v-circle :config="conva.colorbox.b" data-tool="colorbox-blue"></v-circle>
        </v-group>
    </v-group>
</template>

<script>
export default {
  data() {
    const defaultX = 1065;
    const defaultY = 60;
    return {
        conva: {
            background:{
                x: defaultX,
                y: defaultY,
                height: 400,
                width: 75,
                fill: '#007bff',
                zIndex:100
            },
            circle:{
                x: defaultX + 39,
                y: defaultY + 50,
                radius: 25,
                fill: 'black',
            },
            rect:{
                x: defaultX + 16,
                y: defaultY + 100,
                height:45,
                width:45,
                fill: 'black',
            },
            star: {
                x: defaultX + 39,
                y: defaultY + 200,
                numPoints: 6,
                fill: 'black',
                innerRadius: 14,
                outerRadius: 28
            },
            ring: {
                x: defaultX + 39,
                y: defaultY + 275,
                numPoints: 6,
                fill: 'black',
                innerRadius: 12,
                outerRadius: 24
            },
            colorbox: {
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
  }
};
</script>

<style>
</style>