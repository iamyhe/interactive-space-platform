<template>
  <div id="cover">
    <div id="MarsPhoto" class="container py-5">
      <div
        v-if="isClicked"
        class="d-flex justify-content-between align-items-center mb-4 fade-in"
      >
        <h2 class="text-light m-0">Mars Rover Data</h2>
        <select
          v-model="selectedRover"
          @change="fetchMarsData"
          class="form-select select bg-dark text-light border-secondary shadow-sm"
        >
          <option value="mars">All Rovers</option>
          <option value="Curiosity">Curiosity</option>
          <option value="Perseverance">Perseverance</option>
          <option value="Opportunity">Opportunity</option>
          <option value="Spirit">Spirit</option>
        </select>
      </div>

      <div
        class="mars-hotspot"
        v-if="!isClicked"
        @click="ShowMarsRover"
        title="Click to Explore Mars!"
      >
        <div class="pulse-ring"></div>
      </div>

      <div v-if="!isClicked" class="alert alert-danger text-center">
        Click on Mars
      </div>
      <div
        v-else-if="isClicked && !isLoading && data.length === 0"
        class="alert alert-warning text-center"
      >
        No Data Found
      </div>
      <div
        v-else-if="isLoading"
        class="d-flex flex-column justify-content-center align-items-center my-5"
        style="height: 300px"
      >
        <div
          class="spinner-border text-primary"
          style="width: 4rem; height: 4rem"
          role="status"
        >
        </div>
        <h5 class="text-light mt-3">Loading Mars Data...</h5>
      </div>
      <div v-else class="position-relative px-4">
        <button
          @click="scrollLeft"
          class="btn btn-primary position-absolute top-50 start-0 translate-middle-y z-3 rounded-circle"
          style="width: 40px; height: 40px"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
            />
          </svg>
        </button>

        <div
          ref="slider"
          class="d-flex flex-nowrap overflow-hidden gap-3 py-3"
          style="scroll-behavior: smooth"
        >
          <div
            id="cards"
            class="card flex-shrink-0 shadow-sm border-2 border-black bg-dark"
            style="width: 300px"
            v-for="item in data"
            :key="item.data[0].nasa_id"
          >
            <img
              loading="lazy"
              :src="item.links[0].href"
              class="card-img-top"
              style="height: 250px; object-fit: cover"
            />

            <div class="card-body d-flex flex-column">
              <h6 class="card-title text-primary mb-3">
                {{ item.data[0].title }}
              </h6>

              <p class="card-text text-muted mb-3 mt-auto">
                <b>Date :</b>
                <span class="badge bg-secondary">{{
                  item.data[0].date_created
                }}</span>
              </p>
              <button
                @click="showDescription(item.data[0].description)"
                class="btn btn-primary btn-sm w-100"
                data-bs-toggle="modal"
                data-bs-target="#descriptionModal"
              >
                Description
              </button>
            </div>
          </div>
        </div>

        <button
          @click="scrollRight"
          class="btn btn-primary position-absolute top-50 end-0 translate-middle-y z-3 rounded-circle"
          style="width: 40px; height: 40px"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-right-short"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
          </svg>
        </button>
      </div>
      <div
        class="modal fade"
        id="descriptionModal"
        tabindex="-1"
        aria-labelledby="descriptionModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content bg-dark text-light">
            <div class="modal-header">
              <h5 class="modal-title" id="descriptionModalLabel">
                Photo Description
              </h5>
            </div>
            <div class="modal-body text-start bg-dark">
              {{ selectedDesc }}
            </div>
            <div class="modal-footer bg-dark">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const data = ref([]);
const selectedDesc = ref("");
const slider = ref(null);
const isClicked = ref(false);
const isLoading = ref(false);
const selectedRover = ref("mars");

const showDescription = (desc) => {
  selectedDesc.value = desc;
};

const scrollLeft = () => {
  if (slider.value) {
    slider.value.scrollBy({ left: -320, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (slider.value) {
    slider.value.scrollBy({ left: 320, behavior: "smooth" });
  }
};

const fetchMarsData = async () => {
  isLoading.value = true;
  data.value = [];
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${selectedRover.value}%20rover&media_type=image`,
    );
    if (!response.ok) {
      throw new Error("Error when getting data");
    }
    const result = await response.json();
    const items = result.collection.items;
    data.value = [];
    for (let i = 0; i < 25; i++) {
      data.value.push(items[i]);
    }
  } catch (error) {
    console.error("Error fetching photos:", error);
  } finally {
    isLoading.value = false;
  }
};
const ShowMarsRover = () => {
  if (!isClicked.value) {
    fetchMarsData();
    isClicked.value = true;
  }
};
</script>

<style scoped>
#cover {
  background-image: url("/public/mars.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}
.select {
  width: 300px !important;
}
#cards:hover {
  transform: scale(1.05);
}
.mars-hotspot {
  position: absolute;
  bottom: 12vh;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vw;
  max-width: 510px;
  max-height: 510px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease-in-out;
}
.mars-hotspot:hover {
  box-shadow: 0px -20px 80px 20px rgba(255, 69, 0, 0.3);
}
</style>
