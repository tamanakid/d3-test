<template>
  <article class="offset-3 col-6">
    <div>{{ graphTitle }}</div>
    <div class="row" style="height: 100%">
      <div ref="container" class="svg-container col-8" align="center">
        <svg :width="svgWidth" :height="svgHeight" v-if="treemapItems.children">
          <transition name="fade">
            <g :key="currentGraph">
              <template v-for="(item, i) in treemapItems.children" v-if="item.value">
                <Block
                  :key="`rect${i}`" :item="item" :index="i"
                  @draw-tree="drawTreemap"
                  @show-tooltip="doShowTooltip"
                />
                <template v-if="treemapItems.value < (item.value * 10)">
                  <text :key="`text-label${i}`" :x="item.x0 + 5" :y="item.y0 + 15" font-size="15px">
                    {{ item.data.name }}
                  </text>
                  <text :key="`text-value${i}`" :x="item.x0 + 5" :y="item.y0 + 40" font-size="15px">
                    {{ item.value }}
                  </text>
                </template>
              </template>
            </g>
          </transition>
        </svg>
      </div>
      <div v-if="isTooltipActive" class="rect-tooltip col-4">
        {{ tooltipData }}
      </div>
    </div>
  </article>
</template>

<script>
import { hierarchy, treemap } from "d3-hierarchy";
// import fetchData from '@/utils/fetchData';
import dataset from '@/utils/dataset';
import parseWarehouses from '@/utils/parseWarehouses';
// import Tooltip from './Tooltip.vue';
import Block from './Block.vue';


export default {
  name: 'GraphFour',

  components: {
    // tooltip: Tooltip,
    Block
    // -
  },

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
      // tooltip
      isTooltipActive: true,
      tooltipData: '',
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
    drawTreemap(itemData) {
      this.currentGraph = `${itemData.id}-${itemData.name}`;

      this.treemapItems = hierarchy(itemData, this.getChildren)
        .sum((item) => item[this.valueName]) // item[this.valueName]
        .sort((a, b) => b.value - a.value);

      treemap()
        .size([this.svgWidth, this.svgHeight])
        .paddingInner(0.5)
        .paddingOuter(1.5)(this.treemapItems);
    },


    getChildren(item) {
      /* Concats locationInfo and wareHouseChildrenInfo */
      
      // return this.childrenArrayNames.reduce((fullArray, arrayName) => {
      //   return fullArray.concat(item[arrayName])
      // }, []);
      return item.childrenArray; // item[this.childrenName];
    },

    doShowTooltip(item) {
      if (item) {
        this.isTooltipActive = true;
        this.tooltipData = item.data.name;
      } else {
        this.isTooltipActive = false;
        this.tooltipData = null;
      }
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

.bar-positive-clickable:hover {
  fill: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.svg-container {
  /*
  display: inline-block;
  */
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}


.rect-tooltip {
  background: rgba(0, 0, 0, 0.5);
  height: 10%;
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