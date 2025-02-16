<template>
  <div class="stepper">
    <div class="stepper__line" :style="stepperLineStyle"></div>

    <StepperItem
      v-for="(title, index) in stepTitles"
      :key="index"
      :title="title"
      :index="index"
      v-model="activeIndex"
      @stepChanged="updateStepperLine"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from "vue";
import StepperItem from "./components/StepperItem.vue";

const stepTitles = ["DRAFT", "APPROVED", "ACTIVE", "COMPLETED"];

const activeIndex = ref(0);
const stepperLineStyle = ref({});

const updateStepperLine = () => {
  nextTick(() => {
    requestAnimationFrame(() => {
      const circleElements = Array.from(
        document.querySelectorAll(".step__circle")
      ) as HTMLElement[];

      if (circleElements.length === 0) return;

      const firstCircle = circleElements[0];
      const lastCircle = circleElements[circleElements.length - 1];

      if (!firstCircle || !lastCircle) return;

      const lineHeight = lastCircle.offsetTop - firstCircle.offsetTop;

      stepperLineStyle.value = {
        marginTop: `${firstCircle.offsetTop}px`,
        height: `${lineHeight}px`,
      };
    });
  });
};

watch(stepperLineStyle, updateStepperLine);

onMounted(() => {
  nextTick(updateStepperLine);
});
</script>

<style scoped>
.stepper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.stepper__line {
  position: absolute;
  top: 22px;
  width: 2px;
  background-color: #454445;
  left: 10px;
  z-index: -1;
}
</style>
