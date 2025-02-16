<template>
  <transition name="expand">
    <div v-if="isActive">
      <div class="flex">
        <img src="@/assets/pre-execution-icon.svg" alt="icon" />
        <div class="step__label">Pre execution</div>
      </div>
      <div class="step__details" :style="{ height: computedHeight }">
        <!-- Your expandable content here -->
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps<{
  index: number;
  isActive: boolean;
}>();

const computedHeight = computed(() => {
  const heights = [160, 80, 40, 20];
  return `${heights[props.index] || 0}px`;
});
</script>

<style scoped lang="scss">
.step-details {
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
  max-height: 0;
  opacity: 0;
}

/* Existing styles for inner elements */
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

.expand-enter-active,
.expand-leave-active {
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 200px; /* Fixed maximum height */
  opacity: 1;
}
</style>
