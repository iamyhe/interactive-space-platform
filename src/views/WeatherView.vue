<template>
  <div id="weather" class="weather-page py-5">
    <div class="container">
      <!-- search section  -->
      <div class="row justify-content-center mb-5">
        <div class="col-md-6 col-lg-5 text-center">
          <h2 class="page-title mb-4">Space Weather Station</h2>
          <div class="search-box position-relative">
            <input type="text" class="form-control custom-input" v-model="searchArea" placeholder="Enter city name..."
              @keyup.enter="fetchWeatherData" />
            <button @click="fetchWeatherData" class="search-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                viewBox="0 0 16 16">
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- information card  -->
      <div v-if="data" class="row justify-content-center mt-4">
        <div class="col-md-8 col-lg-6">
          <div class="weather-card p-4 p-md-5">
            <!-- city name  -->
            <div class="text-center mb-4 border-bottom border-secondary pb-3">
              <h3 class="location-name mb-1">
                {{
                  searchArea === "" ? "Current Location" : data.location.name
                }}
              </h3>
              <p class="date-text mb-0">{{ formatDate(data.data.time) }}</p>
            </div>
            <!-- temperature -->
            <div class="main-temp text-center mb-4">
              <h1 class="display-1 fw-bold mb-0">
                {{ Math.round(data.data.values.temperature)
                }}<span class="celsius">°C</span>
              </h1>
              <p class="feels-like mt-2">
                Feels like
                {{ Math.round(data.data.values.temperatureApparent) }}°C
              </p>
            </div>
            <!-- anther info  -->
            <div class="row text-center details-grid pt-3">
              <div class="col-4">
                <div class="detail-item">
                  <span class="detail-icon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                      fill="currentColor" class="bi bi-moisture" viewBox="0 0 16 16">
                      <path
                        d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
                    </svg></span>
                  <h5 class="detail-value mb-0">
                    {{ data.data.values.humidity }}%
                  </h5>
                  <small class="detail-label">Humidity</small>
                </div>
              </div>
              <div class="col-4 border-start border-end border-secondary">
                <div class="detail-item">
                  <span class="detail-icon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                      fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                      <path
                        d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                    </svg></span>
                  <h5 class="detail-value mb-0">
                    {{ data.data.values.windSpeed }} m/s
                  </h5>
                  <small class="detail-label">Wind</small>
                </div>
              </div>
              <div class="col-4">
                <div class="detail-item">
                  <span class="detail-icon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                      fill="currentColor" class="bi bi-cloud-fill" viewBox="0 0 16 16">
                      <path
                        d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
                    </svg></span>
                  <h5 class="detail-value mb-0">
                    {{ data.data.values.cloudCover }}%
                  </h5>
                  <small class="detail-label">Clouds</small>
                </div>
              </div>
              <!-- Rain and state  -->
              <div class="container justify-content-around row mt-5">
                <div class="col-6 col-sm-3">
                  <div class="detail-item">
                    <span class="detail-icon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                        fill="currentColor" class="bi bi-cloud-rain-fill" viewBox="0 0 16 16">
                        <path
                          d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973" />
                      </svg></span>
                    <h5 class="detail-value mb-0">
                      {{ data.data.values.precipitationProbability }}%
                    </h5>
                    <small class="detail-label">Rain Probability</small>
                  </div>
                </div>
                <div class="col-6 col-sm-3">
                  <div class="detail-item">
                    <span class="detail-icon">{{
                      getWeatherCondition(
                        `${data.data.values.weatherCode}`,
                        "icon",
                      )
                    }}</span>
                    <h5 class="detail-value mb-0">
                      {{
                        getWeatherCondition(
                          `${data.data.values.weatherCode}`,
                          "text",
                        )
                      }}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Loading Animation Section -->
      <div v-else>
        <div class="d-flex flex-column align-items-center justify-content-center mt-5" style="min-height: 40vh">
          <div class="weather-pulse text-primary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="white"
              class="bi bi-cloud-rain-fill" viewBox="0 0 16 16">
              <path
                d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973" />
            </svg>
          </div>
          <h4 class="text-light mt-3" style="letter-spacing: 1px">
            Loading Your Local Weather...
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const Latitude = ref(null);
const Longitude = ref(null);
const data = ref(null);
const searchArea = ref("");
const api_keys = [
  "2yS3JLIQx2pZshFBzp8nQ0niyv6tRqyd",
  "Jc71Eg4BTF9RgTRe2P69ZQkYlm7RjkCX",
  "VYRDkEEKW8Ob05XFxO1qA1DY4cEvd9WG",
];

const success = (p) => {
  Latitude.value = p.coords.latitude;
  Longitude.value = p.coords.longitude;
  fetchWeatherData();
};
const fail = () => {
  alert("Sorry,We Cannot Acess Your Location");
};
navigator.geolocation.getCurrentPosition(success, fail);
const fetchWeatherData = async () => {
  try {
    let location =
      searchArea.value == ""
        ? `${Latitude.value},${Longitude.value}`
        : searchArea.value;

    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${api_keys[1]}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to locate region`);
    }

    data.value = await response.json();
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
const getWeatherCondition = (code, text) => {
  const weatherCodes = {
    1000: { text: "Clear, Sunny", icon: "☀️" },
    1100: { text: "Mostly Clear", icon: "🌤️" },
    1101: { text: "Partly Cloudy", icon: "⛅" },
    1102: { text: "Mostly Cloudy", icon: "🌥️" },
    1001: { text: "Cloudy", icon: "☁️" },
    2000: { text: "Fog", icon: "🌫️" },
    2100: { text: "Light Fog", icon: "🌫️" },
    4000: { text: "Drizzle", icon: "🌦️" },
    4001: { text: "Rain", icon: "🌧️" },
    4200: { text: "Light Rain", icon: "🌦️" },
    4201: { text: "Heavy Rain", icon: "🌧️" },
    5000: { text: "Snow", icon: "❄️" },
    5001: { text: "Flurries", icon: "🌨️" },
    5100: { text: "Light Snow", icon: "🌨️" },
    5101: { text: "Heavy Snow", icon: "❄️" },
    6000: { text: "Freezing Drizzle", icon: "🌧️❄️" },
    6001: { text: "Freezing Rain", icon: "🌧️❄️" },
    6200: { text: "Light Freezing Rain", icon: "🌧️❄️" },
    6201: { text: "Heavy Freezing Rain", icon: "🌧️❄️" },
    7000: { text: "Ice Pellets", icon: "🧊" },
    7101: { text: "Heavy Ice Pellets", icon: "🧊" },
    7102: { text: "Light Ice Pellets", icon: "🧊" },
    8000: { text: "Thunderstorm", icon: "⛈️" },
  };
  return weatherCodes[code][text];
};
</script>

<style scoped>
.weather-page {
  min-height: calc(100vh - 70px);
  background-color: #03050c;
  color: #ffffff;
}

.page-title {
  letter-spacing: 2px;
  font-weight: 600;
  text-transform: uppercase;
}

.custom-input {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 12px 20px;
  border-radius: 30px;
  box-shadow: none;
  transition: all 0.3s ease;
}

.custom-input:focus {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: #5a4fcf;
  box-shadow: 0 0 15px rgba(90, 79, 207, 0.3);
  color: #fff;
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.search-btn {
  position: absolute;
  right: 5px;
  top: 5px;
  bottom: 5px;
  border: none;
  background-color: #5a4fcf;
  color: white;
  border-radius: 50%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.search-btn:hover {
  background-color: #483eb8;
  transform: scale(1.05);
}

.weather-card {
  background: rgba(20, 24, 44, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.weather-card:hover {
  transform: translateY(-5px);
  border-color: rgba(90, 79, 207, 0.5);
}

.location-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
}

.date-text {
  color: #94a3b8;
  font-size: 0.9rem;
}

.main-temp h1 {
  font-size: 5rem;
  letter-spacing: -2px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.celsius {
  font-size: 2rem;
  vertical-align: super;
  color: #5a4fcf;
}

.feels-like {
  color: #94a3b8;
  font-size: 1.1rem;
}

.details-grid .detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-icon {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.detail-value {
  font-size: 1.1rem;
  font-weight: 600;
}

.detail-label {
  color: #94a3b8;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.weather-pulse {
  animation: pulse-effect 1.5s infinite;
}

@keyframes pulse-effect {
  0% {
    transform: scale(0.9);
    opacity: 0.6;
  }

  25% {
    transform: scale(1);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  75% {
    transform: scale(1);
    opacity: 0.8;
  }

  100% {
    transform: scale(0.9);
    opacity: 0.6;
  }
}
</style>
