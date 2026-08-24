<template>
  <div id="cover">
    <div class="container py-5">
      <!-- Header  -->
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
      <!-- Before Loading  -->
      <div v-if="!isClicked">
        <img
          class="mars-img"
          @click="ShowMarsRover"
          src="../assets/planet-mars.png"
          alt="mars photo"
        />
        <div class="alert alert-danger text-center position-relative z-3">
          Click on Mars
        </div>
      </div>
      <!-- Loading  -->
      <div
        v-else-if="isLoading"
        class="d-flex flex-column justify-content-center align-items-center my-5"
        style="height: 300px"
      >
        <div
          class="spinner-border text-primary"
          style="width: 4rem; height: 4rem"
          role="status"
        ></div>
        <h5 class="text-light mt-3">Loading Mars Data...</h5>
      </div>
      <!-- No Data  -->
      <div
        v-else-if="isClicked && !isLoading && data.length === 0"
        class="alert alert-warning text-center"
      >
        No Data Found
      </div>
      <!-- Cards  -->
      <div
        v-else
        class="position-relative px-4 d-flex flex-wrap justify-content-center gap-4 pb-4"
      >
        <div
          class="card modern-card flex-shrink-0 shadow-none border-0"
          style="width: 320px"
          v-for="item in data"
          :key="item.data[0].nasa_id"
        >
          <div class="p-4 pb-2">
            <img
              loading="lazy"
              :src="item.links[0].href"
              class="card-img-top rounded-4 w-100"
              style="height: 220px; object-fit: cover"
            />
          </div>
          <div class="card-body d-flex flex-column text-start px-4 pb-4 pt-2">
            <h5 class="card-title text-white fw-bold mb-2 title-clamp">
              {{ item.data[0].title }}
            </h5>
            <p
              class="card-text mb-4 mt-auto"
              style="font-size: 0.85rem; color: #a0a0b0"
            >
              {{ formatDate(item.data[0].date_created) }}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <a
                href="#"
                @click.prevent="showDescription(item.data[0].description)"
                class="view-details text-decoration-none"
                data-bs-toggle="modal"
                data-bs-target="#descriptionModal"
              >
                View Details &rarr;
              </a>
              <button
                @click="addToFavorites(item)"
                class="btn space-fav-btn btn-sm rounded-pill shadow-none"
              >
                ⭐ Add To Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal  -->
      <div
        class="modal fade"
        id="descriptionModal"
        tabindex="-1"
        aria-labelledby="descriptionModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content text-light modern-modal">
            <div class="modal-header">
              <h5 class="modal-title fw-bold" id="descriptionModalLabel">
                Photo Description
              </h5>
            </div>
            <div
              class="modal-body text-start"
              style="line-height: 1.8; color: #d0d0e0"
            >
              {{ selectedDesc }}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn close-btn px-4"
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
const isClicked = ref(false);
const isLoading = ref(false);
const selectedRover = ref("mars");

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
    data.value = items;
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
const showDescription = (desc) => {
  selectedDesc.value = desc;
};

const formatDate = (date) => {
  if (!date) {
    return "Unknown Date";
  }
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};
const addToFavorites = (item) => {
  const storedFavorites = localStorage.getItem("favorites");
  const favoritesList = storedFavorites ? JSON.parse(storedFavorites) : [];
  const newFavorite = {
    id: item.data[0].nasa_id,
    title: item.data[0].title,
    description: item.data[0].description || "No description available.",
    image: item.links[0].href
  };
  const isAlreadySaved = favoritesList.find((fav) => fav.id === newFavorite.id);
  if (!isAlreadySaved) {
    favoritesList.push(newFavorite);
    localStorage.setItem("favorites", JSON.stringify(favoritesList));
    alert("Add To Favorites");
  } else {
    alert("Already in Favorites");
  }
};
</script>

<style scoped>
#cover {
  background-image: url("../assets/apod-banner.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-attachment: fixed;
}
.mars-img {
  position: absolute;
  bottom: 12vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  height: 90vw;
  max-width: 500px;
  max-height: 500px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease-in-out;
}
.mars-img:hover {
  box-shadow: 0px -20px 80px 20px rgba(255, 69, 0, 0.3);
}
.select {
  width: 300px !important;
}
.modern-card {
  background-color: #232338;
  border-radius: 24px;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  height: 100%;
}
.modern-card:hover {
  transform: translateY(-8px);
  background-color: #2a2a42;
}
.view-details {
  color: #a8a4f0;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}
.view-details:hover {
  color: #c4c1ff;
}
.title-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.8rem;
}
.modern-modal {
  background-color: #232338;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}
.close-btn {
  background-color: rgba(255, 255, 255, 0.03);
  color: #a8a4f0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.08);
  color: #c4c1ff;
  border-color: rgba(255, 255, 255, 0.15);
}

.space-fav-btn {
  background: rgba(167, 139, 250, 0.15);
  color: #c4b5fd;
  border: 1px solid rgba(167, 139, 250, 0.4);
  transition: all 0.3s ease;
}
.space-fav-btn:hover {
  background: rgba(167, 139, 250, 0.3);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(167, 139, 250, 0.2);
}
</style>