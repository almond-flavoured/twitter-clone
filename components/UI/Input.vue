<template>
  <div>
    <label for=""></label>
    <input type="text" :value="props.value" />
  </div>
</template>
<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});
</script>
