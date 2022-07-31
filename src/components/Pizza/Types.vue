<template>
  <ul>
    <li
      @click="handleClick(index, item)"
      :class="{ active: activeItem === index, disabled: !availableTypes.includes(index) }"
      v-for="(item, index) in typeItems"
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
  props: ['availableTypes'],
  setup(props, context) {
    const typeItems = ['тонкое', 'традиционное'];
    const activeItem = ref(props.availableTypes[0]);
    const activeItemCart = ref(typeItems[0]);
    const handleClick = (index, item) => {
      activeItem.value = index;
      activeItemCart.value = item;
      context.emit('activeType', item);
    };
    onMounted(() => {
      context.emit('activeType', activeItemCart.value);
    });
    return { typeItems, activeItem, handleClick };
  },
};
</script>

<style scoped>
li.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
