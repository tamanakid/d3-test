<template>
  <div ref="container" class="svg-container" align="center">
    <svg :width="svgWidth" :height="svgHeight">
      <g>
        <!-- :y="yScale(0)" :height="0" -->
        <rect
          v-for="item in items"
          :key="item.name"
          :x="xScale(item[xKey])"
          :y="yScale(item[yKey])"
          :width="xScale.bandwidth()"
          :height="svgHeight - yScale(item[yKey])"
          class="bar-positive"
        ></rect>
      </g>
    </svg>
  </div>
</template>

<script>
// https://codesandbox.io/s/d3-bar-chart-vuejs-okz1r?fontsize=14
import { scaleLinear, scaleBand } from "d3-scale";
import { max, min } from "d3-array";
import { selectAll } from "d3-selection";
// import { transition } from "d3-transition";

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
      items: [],
      svgWidth: 0,
    };
  },

  mounted() {
    this.svgWidth = this.$refs.container.offsetWidth;
    this.items = [
      { name: "Roses", amount: 25 },
      { name: "Tulips", amount: 40 },
      { name: "Daisies", amount: 15 },
      { name: "Narcissuses", amount: 9 }
    ];
    this.animateLoad();
  },

  computed: {
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

    xScale() {
      return scaleBand()
        .rangeRound([0, this.svgWidth])
        .padding(0.1)
        .domain(
          this.items.map(d => {
            return d[this.xKey];
          })
        );
    },

    yScale() {
      return scaleLinear()
        .rangeRound([this.svgHeight, 0])
        .domain([this.dataMin > 0 ? 0 : this.dataMin, this.dataMax]);
    },

    svgHeight() {
      // return this.svgWidth / 1.61803398875; // golden ratio
      return this.svgWidth / 3;
    }
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
