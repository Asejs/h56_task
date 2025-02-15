<template>
  <div class="step" :class="{ 'step--active': isActive }" @click="activateStep">
    <div class="step__container">
      <div class="step__indicator">
        <div class="step__circle" :class="{ 'step__circle--active': isActive }"></div>
      </div>

      <div class="step__content">
        <div class="step__title" :class="{ 'step__title--active': isActive }">{{ title }}</div>

        <transition name="expand">
          <div class="container" v-if="isActive">
            <div class="flex">
              <img src="@/assets/pre-execution-icon.svg" alt="icon" class="step__icon" />
              <div class="step__label">Pre execution</div>
            </div>
            <div class="step__details" :style="{ height: dynamicHeight }"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ title: string; index: number; modelValue: number }>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
  (event: 'stepChanged'): void
}>()

const isActive = computed(() => props.index === props.modelValue)

// ** Function to handle step activation **
const activateStep = () => {
  emit('stepChanged') // Notify parent to update stepper line
  emit('update:modelValue', props.index) // Update the active step
}

// ** Dynamic height calculation for content expansion **
const dynamicHeight = computed(() => {
  switch (props.title) {
    case 'DRAFT':
      return '160px'
    case 'APPROVED':
      return '80px'
    case 'ACTIVE':
      return '40px'
    case 'COMPLETED':
      return '20px'
    default:
      return '0px'
  }
})
</script>

<style lang="scss" scoped>
$primary-color: #454445;
$active-color: #49a171;
$white-color: #ffffff;
$text-color: rgba(255, 255, 255, 0.5);
$border-color: rgba(255, 255, 255, 0.2);
$secondary-color: #222123;

.step {
  cursor: pointer;
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
    width: 22px;
    height: 22px;
    background-color: $primary-color;
    border-radius: 50%;
    transition: background-color 0.3s;

    &--active {
      border: 7px solid $active-color;
      background-color: $white-color;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    position: relative;
    left: 33px;
    gap: 10px;
  }

  &__title {
    font-size: 14px;
    height: 18px;
    color: $text-color;

    &--active {
      color: $white-color;
    }
  }

  &__details {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border: 1px solid $border-color;
    border-radius: 8px;
    margin-top: 8px;
    width: 240px;
    background-color: $secondary-color;
  }
}

.flex {
  display: flex;
  gap: 4px;
}

.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
}
</style>
