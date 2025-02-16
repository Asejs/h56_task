// composables/useTransitionHooks.ts
import { ref } from "vue";

export function useTransitionHooks() {
  const content = ref<HTMLElement | null>(null);

  const beforeEnter = (el: Element) => {
    const element = el as HTMLElement;
    element.style.height = "0";
    element.style.opacity = "0";
  };

  const enter = (el: Element, done: () => void) => {
    const element = el as HTMLElement;
    void element.offsetHeight;
    element.style.transition = "height 0.3s ease, opacity 0.3s ease";
    element.style.height = element.scrollHeight + "px";
    element.style.opacity = "1";
    element.addEventListener("transitionend", done, { once: true });
  };

  const afterEnter = (el: Element) => {
    const element = el as HTMLElement;
    element.style.height = "auto";
    element.style.transition = "";
  };

  const beforeLeave = (el: Element) => {
    const element = el as HTMLElement;
    element.style.height = element.scrollHeight + "px";
    element.style.opacity = "1";
    element.style.transition = "height 0.3s ease, opacity 0.3s ease";
  };

  const leave = (el: Element, done: () => void) => {
    const element = el as HTMLElement;
    void element.offsetHeight; // Force reflow
    element.style.height = "0";
    element.style.opacity = "0";
    element.addEventListener("transitionend", done, { once: true });
  };

  const afterLeave = (el: Element) => {
    const element = el as HTMLElement;
    element.style.transition = "";
  };

  return {
    content,
    beforeEnter,
    enter,
    afterEnter,
    beforeLeave,
    leave,
    afterLeave,
  };
}
