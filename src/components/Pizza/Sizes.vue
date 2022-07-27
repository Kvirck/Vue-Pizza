<template>
  <ul>
    <li
      @click="handleClick(item)"
      :class="{ active: sizeItems[index] === activeItem, disabled: !availableSizes.includes(item) }"
      v-for="(item, index) in sizeItems"
      :key="item"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  props: ['availableSizes'],
  setup(props) {
    const activeItem = ref(props.availableSizes[0]);
    const sizeItems = [26, 30, 40];
    const handleClick = (item) => {
      activeItem.value = item;
    };
    return { activeItem, handleClick, sizeItems };
  },
};
</script>

<style scoped>
li.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
