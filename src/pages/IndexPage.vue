<template>
  <q-page class="">
    <div class="row justify-center q-col-gutter-md">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <div class="q-pa-md">
          <q-btn-group spread>
            <q-btn
              :text-color="tab === 1 ? 'white' : 'purple'"
              :color="tab === 1 ? 'purple' : 'white'"
              label="Design 1"
              @click="switchTab(1)"
            />
            <q-btn
              :text-color="tab === 2 ? 'white' : 'purple'"
              :color="tab === 2 ? 'purple' : 'white'"
              label="Design 2"
              @click="switchTab(2)"
            />
          </q-btn-group>
        </div>
        <div>
          <div v-if="tab === 1">
            <div
              class="row items-center q-col-gutter-md"
              v-if="loadingStatus === LOADING_STATE.LOADING"
            >
              <div
                v-for="image in 10"
                :key="image"
                class="col-12 col-sm-6 col-md-4 col-md-55"
              >
                <q-skeleton animation="blink" width="100%" height="24rem" />
              </div>
            </div>
            <div
              class="row items-center q-col-gutter-md"
              v-if="loadingStatus === LOADING_STATE.DONE"
            >
              <div
                v-for="image in images"
                :key="image"
                class="col-12 col-sm-6 col-md-4 col-md-55"
              >
                <dog-card-face-down :imageSrc="image"></dog-card-face-down>
              </div>
            </div>
            <div
              class="row items-center q-col-gutter-md"
              v-if="loadingStatus === LOADING_STATE.ERROR"
            >
              An Error Occured while Trying to load lovely dog images
            </div>
          </div>
          <div v-if="tab === 2" class="row items-center q-col-gutter-md">
            <div class="col-12 col-sm-6 col-md-4 col-md-55">
              <dog-card></dog-card>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-md-55">
              <dog-card></dog-card>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-md-55">
              <dog-card></dog-card>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-md-55">
              <dog-card></dog-card>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-md-55">
              <dog-card></dog-card>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { promises } from 'dns';
import DogCard from 'src/components/DogCard.vue';
import DogCardFaceDown from 'src/components/DogCardFaceDown.vue';
import { LOADING_STATE } from 'src/components/models';
import { defineComponent, ref } from 'vue';
import { getMultipleRandomImage } from '../api/randomImage.api';

export default defineComponent({
  name: 'IndexPage',
  components: { DogCard, DogCardFaceDown },
  setup() {
    const tab = ref<number>(1);
    const images = ref<string[]>([]);
    const loadingStatus = ref<LOADING_STATE>(LOADING_STATE.IDEL);

    function switchTab(tabVal: number): void {
      tab.value = tabVal;
    }
    async function allImages(): Promise<void> {
      loadingStatus.value = LOADING_STATE.LOADING;
      try {
        const response = await getMultipleRandomImage(10);
        loadingStatus.value = LOADING_STATE.DONE;
        images.value = response.message;
      } catch (err) {
        console.error('An error occured while trying to load image : ', err);
        loadingStatus.value = LOADING_STATE.ERROR;
      }
    }
    allImages();
    return { tab, images, switchTab, loadingStatus, LOADING_STATE };
  },
});
</script>
