<template>
  <v-label :config="conva.label">
    <v-tag :config="conva.label.tag" />
    <v-text :config="conva.label.text" />
  </v-label>
</template>

<script>
export default {
  data() {
    return {
      conva: {
        label: {
          x: 5,
          y: 5,
          tag: {
            fill: "#007bff",
            lineJoin: "round",
          },
          text: {
            text: "VueJS + SocketIO Charades",
            fontSize: 16,
            padding: 10,
            fill: "white",
          },
        },
      },
    };
  }
};
</script>

<style>
</style>