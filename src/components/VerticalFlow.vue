<template>
  <div class="verticalFlow">
    <div class="verticalFlow__line" :style="stepperLineStyle"></div>

    <VerticalFlowStep
      v-for="(step, index) in steps"
      :key="index"
      :title="step.title"
      :index="index"
      v-model="activeIndex"
      @stepChanged="updateStepperLine"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import VerticalFlowStep from "./VerticalFlowStep.vue";

const steps = ref([
  { title: "DRAFT" },
  { title: "APPROVED" },
  { title: "ACTIVE" },
  { title: "COMPLETED" },
]);

const activeIndex = ref(0);
const stepperLineStyle = ref<{ height?: string; top?: string }>({});

const updateStepperLine = () => {
  requestAnimationFrame(() => {
    const circles = Array.from(
      document.querySelectorAll(".step__circle")
    ) as HTMLElement[];

    if (circles.length < 2) return;

    const firstCircle = circles[0];
    const lastCircle = circles[circles.length - 1];

    if (!firstCircle || !lastCircle) return;

    stepperLineStyle.value = {
      height: `${lastCircle.offsetTop - firstCircle.offsetTop}px`,
      top: `${firstCircle.offsetTop + firstCircle.offsetHeight / 2}px`,
    };
  });
};

watch(stepperLineStyle, updateStepperLine);

onMounted(updateStepperLine);
</script>

<style scoped>
.verticalFlow {
  position: relative;
  display: flex;
  flex-direction: column;
}

.verticalFlow__line {
  position: absolute;
  width: 2px;
  background-color: #454445;
  left: 10px;
  z-index: -1;
}
</style>
