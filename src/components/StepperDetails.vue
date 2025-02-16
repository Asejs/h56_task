<template>
  <transition name="expand">
    <div class="container" v-if="isActive">
      <div class="flex">
        <img src="@/assets/pre-execution-icon.svg" alt="icon" />
        <div class="step__label">Pre execution</div>
      </div>
      <!-- This inner element keeps your computed height if needed -->
      <div class="step__details" :style="{ height: computedHeight }"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

interface StepDetailsProps {
  index: number;
  isActive: boolean;
}

const props = defineProps<StepDetailsProps>();

const computedHeight = computed(() => {
  const heights = [160, 80, 40, 20];
  return `${heights[props.index] || 0}px`;
});
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden; /* Hide content during the scale transition */
  /* Optional: you can set a transform-origin if desired */
  transform-origin: top;
}

/* Use a combined scale and opacity transition for a smoother effect */
.expand-enter-active,
.expand-leave-active {
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;
}
.expand-enter-from,
.expand-leave-to {
  transform: scaleY(0.95);
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  transform: scaleY(1);
  opacity: 1;
}

/* Keep your existing styles for the inner elements */
.step__details {
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  margin-top: 8px;
  width: 240px;
  background-color: #222123;
}

.flex {
  display: flex;
  gap: 4px;
}

.step__label {
  color: rgba(255, 255, 255, 0.5);
}
</style>
