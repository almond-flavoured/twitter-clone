<template>
  <div>
    <nuxt-link
      to="#"
      class="flex items-center p-3 rounded-full w-min hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white text-black"
    >
      <div class="w-6 h-6 text-dark" :class="defaultTransition">
        <slot name="icon"></slot>
      </div>
      <div class="ml-4 text-xl hidden xl:block" :class="textClasses">
        <slot name="name"></slot>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
const { defaultTransition } = useTailwindConfig();
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
const textClasses = computed(() => {
  return props.active ? 'font-semibold' : 'font-normal';
});
</script>
