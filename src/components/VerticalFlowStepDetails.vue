<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <div v-if="isActive" ref="content" class="step-details">
      <div class="flex">
        <img
          src="@/assets/pre-execution-icon.svg"
          alt="icon"
          class="step__icon"
        />
        <div class="step__label">Pre execution</div>
      </div>
      <div class="step__details" :style="{ height: computedHeight }"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useTransitionHooks } from "../hooks/useTransitionHooks"; // Import the hook

interface StepDetailsProps {
  index: number;
  isActive: boolean;
}
const props = defineProps<StepDetailsProps>();
const { beforeEnter, enter, afterEnter, beforeLeave, leave, afterLeave } =
  useTransitionHooks();

const computedHeight = computed(() => {
  const heights = [160, 80, 40, 20];
  return `${heights[props.index] || 0}px`;
});
</script>

<style scoped lang="scss">
.step-details {
  overflow: hidden;
}

.step__details {
  width: 240px;
  background-color: #222123;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  margin-top: 8px;
  display: flex;
  align-items: center;
}

.flex {
  display: flex;
  gap: 4px;
}

.step__label {
  color: rgba(255, 255, 255, 0.5);
}
</style>
