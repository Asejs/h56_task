<template>
  <div
    class="vertical-flow-step"
    :class="{ 'vertical-flow-step--active': isActive }"
  >
    <div class="vertical-flow-step__container">
      <div class="vertical-flow-step__indicator">
        <div
          class="vertical-flow-step__circle"
          :class="{ 'vertical-flow-step__circle--active': isActive }"
          @click="activateStep"
        ></div>
      </div>

      <div class="vertical-flow-step__content">
        <div
          class="vertical-flow-step__title"
          :class="{ 'vertical-flow-step__title--active': isActive }"
          @click="activateStep"
        >
          {{ title }}
        </div>

        <VerticalFlowStepDetails :index="index" :isActive="isActive" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import VerticalFlowStepDetails from "./VerticalFlowStepDetails.vue";

const props = defineProps<{
  title: string;
  index: number;
  modelValue: number;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: number): void;
  (event: "stepChanged"): void;
}>();

const isActive = computed(() => props.index === props.modelValue);

const activateStep = () => {
  emit("update:modelValue", props.index);
  emit("stepChanged");
};
</script>

<style lang="scss" scoped>
.vertical-flow-step {
  padding: 20px 0;

  &__container {
    display: flex;
  }

  &__indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 17px;
  }

  &__circle {
    cursor: pointer;
    box-sizing: border-box;
    width: 22px;
    height: 22px;
    background-color: #454445;
    border-radius: 50%;

    &--active {
      border: 7px solid #49a171;
      background-color: #ffffff;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 10px;
  }

  &__title {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    height: 22px;
    color: rgba(255, 255, 255, 0.5);

    &--active {
      color: #ffffff;
    }
  }
}
</style>
