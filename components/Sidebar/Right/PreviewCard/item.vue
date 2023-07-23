<template>
  <div
    class="p-3 border-b hover:bg-gray-100 curosr-pointer dark:hover:bg-dim-300"
    :class="wrapperClasses"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const wrapperClasses = computed(
  () => `${twitterBorderColor} ${defaultTransition}`
);
const { twitterBorderColor, defaultTransition } = useTailwindConfig();
</script>
