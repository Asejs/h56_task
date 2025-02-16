<template>
  <div class="step" :class="{ 'step--active': isActive }">
    <div class="step__container">
      <div class="step__indicator">
        <div
          class="step__circle"
          :class="{ 'step__circle--active': isActive }"
          @click="activateStep"
        ></div>
      </div>

      <div class="step__content">
        <div
          class="step__title"
          :class="{ 'step__title--active': isActive }"
          @click="activateStep"
        >
          {{ title }}
        </div>

        <StepperDetails :index="index" :isActive="isActive" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import StepperDetails from "./StepperDetails.vue";

interface StepperProps {
  title: string;
  index: number;
  modelValue: number;
}

const props = defineProps<StepperProps>();

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
.step {
  padding: 16px 0;

  &__container {
    display: flex;
  }

  &__indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 16px;
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
    cursor: pointer;
    font-size: 14px;
    height: 18px;
    color: rgba(255, 255, 255, 0.5);

    &--active {
      color: #ffffff;
    }
  }
}
</style>
