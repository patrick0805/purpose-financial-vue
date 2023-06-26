<template>
  <q-card
    class="flip-container position-relative"
    :class="{ flipped: isFlipped }"
    @click="flipOver"
  >
    <div class="front">
      <img src="~assets/cardFaceUp.jpg" class="h-full w-full" />
    </div>
    <div class="back">
      <img :src="randomDogImage" class="h-full w-full" />
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { LOADING_STATE } from './models';
import { getRandomImage } from '../api/randomImage.api';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const isFlipped = ref<boolean>(false);
    const randomDogImage = ref<string>('');
    const loadingStatus = ref<LOADING_STATE>(LOADING_STATE.IDEL);

    async function flipOver() {
      if (isFlipped.value === false) {
        loadingStatus.value = LOADING_STATE.LOADING;
        try {
          const randomImage = await getRandomImage();

          loadingStatus.value = LOADING_STATE.DONE;

          randomDogImage.value = randomImage.message;
          isFlipped.value = !isFlipped.value;
        } catch (err) {
          console.error('An error occured while trying to load image : ', err);
          loadingStatus.value = LOADING_STATE.ERROR;
        }
      } else {
        isFlipped.value = !isFlipped.value;
      }
    }

    return { flipOver, isFlipped, randomDogImage, loadingStatus };
  },
});
</script>
<style lang="scss" scoped>
.flip-container {
  height: 32rem;
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
