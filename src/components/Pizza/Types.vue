<template>
  <ul>
    <li
      @click="handleClick(index)"
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
export default {
  props: ['availableTypes'],
  setup(props) {
    const typeItems = ['тонкое', 'традиционное'];
    const activeItem = ref(props.availableTypes[0]);
    const handleClick = (index) => {
      activeItem.value = index;
    };
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
