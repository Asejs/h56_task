<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <div v-if="isActive" ref="content" class="verticalFlowStepDetails">
      <div class="verticalFlowStepDetails__container">
        <img src="@/assets/pre-execution-icon.svg" alt="icon" />

        <div class="verticalFlowStepDetails__title">Pre execution</div>
      </div>

      <div
        class="verticalFlowStepDetails__details"
        :style="{ height: computedHeight }"
      ></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useTransitionHooks } from "../hooks/useTransitionHooks"; // Import the hook

const props = defineProps<{
  index: number;
  isActive: boolean;
}>();

const { beforeEnter, enter, afterEnter, beforeLeave, leave, afterLeave } =
  useTransitionHooks();

const computedHeight = computed(() => {
  const heights = [160, 80, 40, 20];
  return `${heights[props.index] || 0}px`;
});
</script>

<style scoped lang="scss">
.verticalFlowStepDetails {
  overflow: hidden;

  &__container {
    display: flex;
    gap: 4px;
  }

  &__title {
    color: rgba(255, 255, 255, 0.5);
  }

  &__details {
    width: 240px;
    background-color: #222123;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    margin-top: 8px;
    display: flex;
    align-items: center;
  }
}
</style>
