<template>
  <g :ref="`rect${index}`" :class="barClasses(item, index)" @mouseenter="showTooltip" @mouseleave="hideTooltip">
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
    <template v-else-if="item.children && item.children.length === 0">
      <rect
        :key="item.data.name"
        :x="item.x0"
        :y="item.y0"
        :width="item.x1 - item.x0"
        :height="item.y1 - item.y0"
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
</template>

<script>
export default {
  name: 'Block',

  props: {
    item: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: Number,
    },
    childrenArrayNames: {
      required: false,
      type: Array,
      default: () => ['children'],
    }
  },

  data() {
    return {
      isShowTooltip: false,
      // -
    };
  },

  methods: {
    barClasses(item, i) {
      let classes = `bar-positive-${i} `;
      if (item.children && item.children.length > 0) {
        classes += 'bar-positive-clickable';
      }
      return classes;
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
      this.$emit('draw-tree', item.data);
    },

    showTooltip(item) {
      console.log('Enter:', item);
      // const childHovered = this.treemapItems.children.find(child => child.data.id === item.data.id);
      // childHovered.showTooltip = true;
      this.isShowTooltip = true;
    },

    hideTooltip(item) {
      console.log('Leave:', item);
      // const childHovered = this.treemapItems.children.find(child => child.data.id === item.data.id);
      // childHovered.showTooltip = false;
      this.isShowTooltip = false;
    },
  }
}
</script>

<style>
.rect-tooltip {
  position: absolute;
}
</style>