<template>
  <div ref="container" class="svg-container" align="center">
    <svg :width="svgWidth" :height="svgHeight" v-if="root">
      <g>
        <!-- :width="xScale.bandwidth()" :height="svgHeight - yScale(item[yKey])" -->
        <template v-for="(item, i) in rootLeaves">
          <rect
            :ref="`rect${i}`"
            :key="`rect${i}`"
            :x="item.x0"
            :y="item.y0"
            :width="item.x1 - item.x0"
            :height="item.y1 - item.y0"
            class="bar-positive"
            @click="zoom(item)"
          ></rect>
          <text
            :key="`text${i}`"
            :x="item.x0 + 5"
            :y="item.y0 + 15"
            font-size="15px"
          >{{ item.data.name }}</text>
        </template>
      </g>
    </svg>
  </div>
</template>

<script>
// https://codesandbox.io/s/d3-bar-chart-vuejs-okz1r?fontsize=14
// import { scaleLinear, scaleBand } from "d3-scale";
import { max, min } from "d3-array";
// import {  } from "d3-treemap";
import { hierarchy, treemap } from "d3-hierarchy";
import { selectAll } from "d3-selection";
// import { transition } from "d3-transition";
import children from '@/utils/children';

export default {
  name: 'GraphOne',

  props: {
    msg: String,
    xKey: {
      type: String,
      default: 'name',
    },
    yKey: {
      type: String,
      default: 'amount'
    }
  },

  data() {
    return {
      items: children,
      root: null,
      svgWidth: 0,
      svgHeight: 0,
    };
  },

  beforeMount() {
    this.items = children;
  },

  mounted() {
    this.svgWidth = this.$refs.container.offsetWidth;
    this.svgHeight = this.svgWidth / 2.5;

    this.root = hierarchy(this.items)
      .sum(function(d) {
        return d.value
      }) // Here the size of each leave is given in the 'value' field in input data
      .sort((a, b) => b.value - a.value);

    treemap()
      // .tile(treemap().tile)
      .size([this.svgWidth, this.svgHeight])
      .padding(2)(this.root)
    
    this.animateLoad();
  },

  computed: {
    rootLeaves() {
      return this.root && this.root.leaves() || [];
    },

    dataMax() {
      return max(this.items, d => {
        return d[this.yKey];
      });
    },

    dataMin() {
      return min(this.items, d => {
        return d[this.yKey];
      });
    },
  },

  methods: {
    animateLoad() {
      selectAll("rect")
        .data(this.items)
        /*
        .transition()
        .delay((d, i) => {
          return i * 150;
        })
        .duration(1000)
        */
        .attr("y", d => {
          return this.yScale(d[this.yKey]);
        })
        .attr("height", d => {
          return this.svgHeight - this.yScale(d[this.yKey]);
        });
    },

    zoom(item) {
      console.log(item);
      debugger;
      // this.$refs[`rect${i}`];
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bar-positive {
  fill: steelblue;
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
</style>
