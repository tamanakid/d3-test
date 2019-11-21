<template>
  <div ref="container" class="svg-container" align="center">
    <svg :width="svgWidth" :height="svgHeight" v-if="root">
      <transition name="fade">
        <g v-if="isFirst" key="isFirstTrue">
          <!-- :width="xScale.bandwidth()" :height="svgHeight - yScale(item[yKey])" -->
          <!-- <template v-if="isFirst"> -->
            <template v-for="(item, i) in rootDepth1">
              <!-- -->
              <g
                :ref="`rect${i}`"
                :key="`rect${i}`"
                class="bar-positive"
              >
                <template v-if="item.children">
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
              </g>
              <text
                :key="`text${i}`"
                :x="item.x0 + 5"
                :y="item.y0 + 15"
                font-size="15px"
              >{{ item.data.name }}</text>
            </template>
          <!-- </template> -->
          </g>
          <g v-else key="isFirstFalse">
          <!-- <template v-else> -->
            <template v-for="(item, i) in root.children">
              <!-- -->
              <g
                :ref="`rect${item.data.name}-depth`"
                :key="`rect${item.data.name}-depth`"
                class="bar-positive"
              >
                <template v-if="item.children">
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
                :key="`text${item.data.name}-depth`"
                :x="item.x0 + 5"
                :y="item.y0 + 15"
                font-size="15px"
              >{{ item.data.name }}</text>
            </template>
          <!-- </template> -->
        </g>
      </transition>
    </svg>
  </div>
</template>

<script>
// https://codesandbox.io/s/d3-bar-chart-vuejs-okz1r?fontsize=14
// import { scaleLinear, scaleBand } from "d3-scale";
import { max, min } from "d3-array";
// import {  } from "d3-treemap";
import { hierarchy, treemap } from "d3-hierarchy";
// import { selectAll } from "d3-selection";
// import { transition } from "d3-transition";
import children from './children';

export default {
  name: 'GraphThree',

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
      isFirst: true,
      items: children,
      root: null,
      svgWidth: 0,
      svgHeight: 0,
      rootDepth2: [],
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
      .padding(2)(this.root);
    
    // this.animateLoad(this.items);
  },

  computed: {
    rootLeaves() {
      return this.root && this.root.leaves() || [];
    },

    rootDepth1() {
      return this.root.descendants().filter(node => node.depth === 1);
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
    zoom(item) {
      console.log(item);
      this.rootDepth2 = this.items.children.find(child => child.name === item.data.name);
      // this.rootDepth2 = item.children;

      this.root = hierarchy(this.rootDepth2)
      .sum(function(d) {
        return d.value
      }) // Here the size of each leave is given in the 'value' field in input data
      .sort((a, b) => b.value - a.value);

      treemap()
        // .tile(treemap().tile)
        .size([this.svgWidth, this.svgHeight])
        .padding(2)(this.root);

      this.isFirst = false;
    }
  }



  /*

  function display(d) {
    grandparent
        .datum(d.parent)
        .on("click", transition)
      .select("text")
        .text(name(d));

  var g1 = svg.insert("g", ".grandparent")
        .datum(d)
        .attr("class", "depth")

  var g = g1.selectAll("g")
        .data(d._children)
      .enter().append("g");

    g...
    return g;
  }


  function transition(d) {
      if (transitioning || !d) return;
      transitioning = true;

      var g2 = display(d),
          t1 = g1.transition().duration(750),
          t2 = g2.transition().duration(750);

      // Update the domain only after entering new elements.
      x.domain([d.x, d.x + d.dx]);
      y.domain([d.y, d.y + d.dy]);

      // Enable anti-aliasing during the transition.
      svg.style("shape-rendering", null);

      // Draw child nodes on top of parent nodes.
      svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });

      // Fade-in entering text.
      g2.selectAll("text").style("fill-opacity", 0);

      // Transition to the new view.
      t1.selectAll("text").call(text).style("fill-opacity", 0);
      t2.selectAll("text").call(text).style("fill-opacity", 1);
      t1.selectAll("rect").call(rect);
      t2.selectAll("rect").call(rect);

      // Remove the old node when the transition is finished.
      t1.remove().each("end", function() {
        svg.style("shape-rendering", "crispEdges");
        transitioning = false;
      });
    }
  */

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


/* animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
