<template>
  <div class="vertical-flow">
    <div class="vertical-flow__line" :style="verticalLineStyle"></div>

    <VerticalFlowStep
      v-for="(step, index) in steps"
      :key="index"
      :title="step.title"
      :index="index"
      v-model="activeIndex"
      @stepChanged="updateVerticalLine"
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
const verticalLineStyle = ref<{ height?: string; top?: string }>({});

const updateVerticalLine = () => {
  requestAnimationFrame(() => {
    const circles = [
      ...document.querySelectorAll<HTMLElement>(".verticalFlowStep__circle"),
    ];
    if (circles.length < 2) return;

    const firstCircle = circles[0];
    const lastCircle = circles[circles.length - 1];

    if (!firstCircle || !lastCircle) return;

    verticalLineStyle.value = {
      height: `${lastCircle.offsetTop - firstCircle.offsetTop}px`,
      top: `${firstCircle.offsetTop + firstCircle.offsetHeight / 2}px`,
    };
  });
};

watch(verticalLineStyle, updateVerticalLine);
onMounted(updateVerticalLine);
</script>

<style lang="scss" scoped>
.vertical-flow {
  position: relative;
  display: flex;
  flex-direction: column;

  &__line {
    position: absolute;
    width: 2px;
    background-color: #454445;
    left: 10px;
    z-index: -1;
  }
}
</style>
