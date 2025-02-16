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

        <div class="container" v-if="isActive">
          <div class="flex">
            <img
              src="@/assets/pre-execution-icon.svg"
              alt="icon"
              class="step__icon"
            />
            <div class="step__label">Pre execution</div>
          </div>
          <div class="step__details" :style="{ height: dynamicHeight }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

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
  emit("stepChanged"); // Notify parent to update stepper line
  emit("update:modelValue", props.index); // Update the active step
};

// ** Dynamic height calculation for content expansion **
const dynamicHeight = computed(() => {
  switch (props.title) {
    case "DRAFT":
      return "160px";
    case "APPROVED":
      return "80px";
    case "ACTIVE":
      return "40px";
    case "COMPLETED":
      return "20px";
    default:
      return "0px";
  }
});
</script>

<style lang="scss" scoped>
.step {
  padding: 16px 0;
  margin-top: &__container {
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
    /* transition: background-color 0.3s; */

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

  &__label {
    color: rgba(255, 255, 255, 0.5);
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

  &__details {
    display: flex;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    margin-top: 8px;
    width: 240px;
    background-color: #222123;
  }
}

.flex {
  display: flex;
  gap: 4px;
}
</style>
