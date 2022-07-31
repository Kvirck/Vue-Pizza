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
import { onMounted } from '@vue/runtime-core';
export default {
  props: ['availableSizes'],
  setup(props, context) {
    const activeItem = ref(props.availableSizes[0]);
    const sizeItems = [26, 30, 40];
    const handleClick = (item) => {
      activeItem.value = item;
      context.emit('activeSize', item);
    };
    onMounted(() => {
      context.emit('activeSize', activeItem.value);
    });
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
