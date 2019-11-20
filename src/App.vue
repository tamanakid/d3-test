<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <button @click="active = 1">GraphOne</button>
      <button @click="active = 2">GraphTwo</button>
    </div>
    <GraphOne v-if="active === 1"/>
    <GraphTwo v-if="active === 2"/>
  </div>
</template>

<script>
import GraphOne from './components/GraphOne.vue'
import GraphTwo from './components/GraphTwo.vue'


export default {
  name: 'app',

  components: {
    GraphOne,
    GraphTwo
  },

  data() {
    return {
      active: 1,
    };
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
