<template>
  <article>
    <div>{{ graphTitle }}</div>
    <div ref="container" class="col-4 svg-container" align="center" style="height: 80vh">
      <svg :width="svgWidth" :height="svgHeight" v-if="treemapItems.children">
        <transition name="fade">
          <g :key="currentGraph">
            <template v-for="(item, i) in treemapItems.children">
              <g :ref="`rect${i}`" :key="`rect${i}`" :class="`bar-positive-${i}`">
                <template v-if="item.children && item.children.length > 1">
                  <rect
                    v-for="child in item.children"
                    :key="child.data.name"
                    :x="child.x0"
                    :y="child.y0"
                    :width="child.x1 - child.x0"
                    :height="child.y1 - child.y0"
                    @click="zoom(item)"
                  ></rect>
                </template>
                <template v-else>
                  <rect
                    :key="item.data.name"
                    :x="item.x0"
                    :y="item.y0"
                    :width="item.x1 - item.x0"
                    :height="item.y1 - item.y0"
                  ></rect>
                </template>
              </g>
              <text
                :key="`text${i}`"
                :x="item.x0 + 5"
                :y="item.y0 + 15"
                font-size="15px"
              >
                {{ item.data.name }}
              </text>
            </template>
          </g>
        </transition>
      </svg>
    </div>
  </article>
</template>

<script>
import { hierarchy, treemap } from "d3-hierarchy";
// import fetchData from '@/utils/fetchData';
import dataset from '@/utils/dataset';
import parseWarehouses from '@/utils/parseWarehouses';

export default {
  name: 'GraphFour',

  props: {
    dataName: {
      required: false,
      type: String,
      default: 'name',
    },
    valueName: {
      required: false,
      type: String,
      default: 'value',
    },
    childrenArrayNames: {
      required: false,
      type: Array,
      default: () => ['children'],
    }
  },

  data() {
    return {
      graphTitle: '',
      currentGraph: '',
      allItems: [],
      treemapItems: {},
      svgWidth: 0,
      svgHeight: 0,
    };
  },


  mounted() {
    /* Meanwhile */
    this.svgWidth = this.$refs.container.offsetWidth;
    this.svgHeight = this.$refs.container.offsetHeight;
    this.graphTitle = Object.keys(dataset)[0];

    this.currentGraph = this.graphTitle;
    this.allItems = parseWarehouses(dataset, this.graphTitle, this.childrenArrayNames);

    this.drawTreemap(this.allItems);
  },


  methods: {
    drawTreemap(items) {
      this.treemapItems = hierarchy(items, this.getChildren)
        .sum((item) => item[this.valueName]); // item[this.valueName]
        //.sort((a, b) => b.value - a.value);

      treemap()
        .size([this.svgWidth, this.svgHeight])
        .padding(2)(this.treemapItems);
    },


    getChildren(item) {
      /* Concats locationInfo and wareHouseChildrenInfo */
      
      // return this.childrenArrayNames.reduce((fullArray, arrayName) => {
      //   return fullArray.concat(item[arrayName])
      // }, []);
      return item.childrenArray; // item[this.childrenName];
    },

    zoom(item) {
      // check if has children
      /*
      const itemSelected = this.childrenArrayNames.reduce((fullArray, arrayName) => {
        return fullArray.concat(item[arrayName]);
      }, []).find(child => child.id === item.data.id);

      const itemSelectedList = this.childrenArrayNames.reduce((fullArray, arrayName) => {
        return fullArray.concat(itemSelected[arrayName]);
      }, []);
      */

      this.currentGraph = `${item.data.id}-${item.data.name}`
      this.drawTreemap(item.data);
    },
  }

};
</script>

<style scoped>
.bar-positive {
  fill: steelblue;
  transition: r 0.2s ease-in-out;
}
.bar-positive-0 {
  fill: steelblue;
  transition: r 0.2s ease-in-out;
}
.bar-positive-1 {
  fill: forestgreen;
  transition: r 0.2s ease-in-out;
}
.bar-positive-2 {
  fill: goldenrod;
  transition: r 0.2s ease-in-out;
}
.bar-positive-3 {
  fill: salmon;
  transition: r 0.2s ease-in-out;
}

.bar-positive:hover {
  fill: brown;
}

.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}


/* animations */
.fade-enter-active {
  transition: opacity 0.7s ease 0.7s;
}
.fade-leave-active {
  transition: opacity 0.7s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>