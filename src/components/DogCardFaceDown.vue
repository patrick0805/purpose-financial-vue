<template>
  <q-card
    class="flip-container position-relative"
    :class="{ flipped: isFlipped }"
    @click="flipOver"
  >
    <div class="front">
      <img :src="imageSrc" class="h-full w-full" />
    </div>
    <div class="back">
      <div class="column h-full">
        <div class="col">Header</div>
        <div class="col">Body</div>
        <div class="col">Footer</div>
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  props: {
    imageSrc: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup() {
    const isFlipped = ref<boolean>(false);

    async function flipOver() {
      isFlipped.value = !isFlipped.value;
    }

    return { flipOver, isFlipped };
  },
});
</script>
<style lang="scss" scoped>
.flip-container {
  height: 24rem;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  .back {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
  }
  .front {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
  }
}
.front,
.back {
  backface-visibility: hidden;
  transition: 0.6s;
  transform-style: preserve-3d;
  top: 0;
  left: 0;
  width: 100%;
}
.back {
  transform: rotateY(-180deg);
  position: absolute;
}
.flip-container.flipped .back {
  transform: rotateY(0deg);
}
.flip-container.flipped .front {
  transform: rotateY(180deg);
}
.h-full {
  height: 100%;
}
.w-full {
  width: 100%;
}
</style>
