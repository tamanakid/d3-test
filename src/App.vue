<template>
  <div id="app" style="height: 100vh">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div class="pt-2" style="height: 10vh">
      <button @click="active = 1">GraphOne</button>
      <button @click="active = 2">GraphTwo</button>
      <button @click="active = 3">GraphThree</button>
      <button @click="active = 4">GraphFour</button>
    </div>
    <div class="container">
      <div class="row graphs">
        <GraphOne v-if="active === 1"/>
        <GraphTwo v-if="active === 2"/>
        <GraphThree v-if="active === 3"/>
        <GraphFour
          v-if="active === 4"
          :dataName="'warehouses'"
          :valueName="'itemCount'"
          :childrenArrayNames="['locationInfo', 'warehouseChildrenInfo']"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GraphOne from './components/GraphOne.vue'
import GraphTwo from './components/GraphTwo.vue'
import GraphThree from './components/GraphThree.vue'
import GraphFour from './components/GraphFour.vue'


export default {
  name: 'app',

  components: {
    GraphOne,
    GraphTwo,
    GraphThree,
    GraphFour
  },

  data() {
    return {
      active: 1,
      // -
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
}

.graphs {
  height: 80vh;
}
</style>
