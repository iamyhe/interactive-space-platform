<template>
  <div class="search-page">

    <!-- Background -->
    <div class="space-background"></div>
    <div class="stars stars-one"></div>
    <div class="stars stars-two"></div>

    <div class="page-content">

      <!-- HERO -->
      <section class="search-hero">
        <div class="container hero-content">

          <div class="hero-badge">
            ✦ NASA SPACE LIBRARY
          </div>

          <h1>
            Explore the
            <span>Universe</span>
          </h1>

          <p>
            Search NASA's collection of space images and videos.
            Discover planets, galaxies, astronauts and more.
          </p>

          <!-- SEARCH -->
          <div class="search-wrapper">

            <div class="search-input-box">

              <span class="search-icon">⌕</span>

              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search for Mars, Moon, Galaxy..."
                @keyup.enter="searchNASA"
              />

              <button
                @click="searchNASA"
                :disabled="loading || !searchQuery.trim()"
              >
                <span v-if="!loading">
                  Explore
                </span>

                <span v-else>
                  Searching...
                </span>
              </button>

            </div>

          </div>

          <div class="search-hint">
            Press <b>Enter</b> to search
          </div>

        </div>
      </section>


      <!-- LOADING -->
      <section
        v-if="loading"
        class="loading-section"
      >

        <div class="space-loader">

          <div class="planet-loader"></div>

          <div class="orbit orbit-one"></div>

          <div class="orbit orbit-two"></div>

        </div>

        <h3>
          Exploring the universe...
        </h3>

        <p>
          NASA is searching through its space archive
        </p>

      </section>


      <!-- ERROR -->
      <div
        v-if="error"
        class="container"
      >

        <div class="message-box error-box">

          <span class="error-icon">
            ⚠
          </span>

          <div>

            <h4>
              Something went wrong
            </h4>

            <p>
              {{ error }}
            </p>

          </div>

        </div>

      </div>


      <!-- NO RESULTS -->
      <section
        v-if="
          !loading &&
          searched &&
          results.length === 0 &&
          !error
        "
        class="no-results"
      >

        <div class="empty-icon">
          ✦
        </div>

        <h2>
          No discoveries found
        </h2>

        <p>
          We couldn't find anything matching
          <strong>"{{ searchQuery }}"</strong>
        </p>

        <span>
          Try another keyword like Mars, Earth, Moon or Galaxy.
        </span>

      </section>


      <!-- RESULTS -->
      <section
        v-if="!loading && results.length > 0"
        class="results-section"
      >

        <div class="container">

          <div class="results-header">

            <div>

              <span class="section-label">
                NASA ARCHIVE
              </span>

              <h2>
                Discoveries
              </h2>

            </div>

            <div class="result-count">
              {{ results.length }} results
            </div>

          </div>


          <!-- CARDS -->
          <div class="row g-4">

            <div
              v-for="item in results"
              :key="item.id"
              class="col-xl-4 col-md-6"
            >

              <article class="result-card">

                <!-- MEDIA -->
                <div class="media-wrapper">

                  <!-- IMAGE -->
                  <img
                    v-if="item.media_type === 'image'"
                    :src="item.thumbnail"
                    :alt="item.title"
                    class="result-image"
                    loading="lazy"
                  />


                  <!-- VIDEO -->
                  <video
                    v-else-if="item.media_type === 'video'"
                    :src="item.video_url"
                    :poster="item.thumbnail"
                    class="result-video"
                    controls
                    preload="metadata"
                    @error="handleVideoError(item)"
                  ></video>


                  <!-- MEDIA TYPE -->
                  <div class="media-type">

                    <span
                      v-if="item.media_type === 'image'"
                    >
                      IMAGE
                    </span>

                    <span v-else>
                      ▶ VIDEO
                    </span>

                  </div>

                </div>


                <!-- CONTENT -->
                <div class="card-content">

                  <span class="date">
                    {{ item.date_created }}
                  </span>

                  <h3>
                    {{ item.title }}
                  </h3>

                  <p>
                    {{ item.description }}
                  </p>


                  <!-- FOOTER -->
                  <div class="card-footer">

                    <span>
                      NASA
                    </span>


                    <!-- IMAGE LINK -->
                    <a
                      v-if="item.media_type === 'image'"
                      :href="item.image_url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Full Image ↗
                    </a>


                    <!-- VIDEO LINK -->
                    <a
                      v-else-if="item.media_type === 'video'"
                      :href="item.video_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="video-link"
                    >
                      Open NASA Video ↗
                    </a>

                  </div>

                </div>

              </article>

            </div>

          </div>

        </div>

      </section>


      <!-- INITIAL STATE -->
      <section
        v-if="!searched && !loading"
        class="initial-state"
      >

        <div class="initial-orbit">

          <div class="initial-planet"></div>

        </div>

        <h2>
          Your journey starts here
        </h2>

        <p>
          Enter something you're curious about
          and explore NASA's universe.
        </p>

      </section>

    </div>

  </div>
</template>


<script>

export default {

  name: "SearchView",

  data() {

    return {

      searchQuery: "",

      results: [],

      loading: false,

      error: "",

      searched: false

    };

  },


  methods: {

    async searchNASA() {

      const query =
        this.searchQuery.trim();

      if (!query || this.loading) {
        return;
      }

      this.loading = true;

      this.error = "";

      this.results = [];

      this.searched = true;


      try {

        const response = await fetch(
          `https://images-api.nasa.gov/search?q=${encodeURIComponent(
            query
          )}&media_type=image,video`
        );


        if (!response.ok) {

          throw new Error(
            "NASA API request failed."
          );

        }


        const data =
          await response.json();


        const items =
          data.collection?.items || [];


        const formattedResults = [];


        for (const item of items) {

          const info =
            item.data?.[0];


          if (!info) {
            continue;
          }


          /* =========================
             THUMBNAIL
          ========================= */

          const thumbnail =
            item.links?.find(
              link =>
                link.rel === "preview"
            )?.href;


          if (!thumbnail) {
            continue;
          }


          let mediaUrl = "";

          let videoSources = [];


          /* =========================
             GET NASA ASSETS
          ========================= */

          if (item.href) {

            try {

              const assetResponse =
                await fetch(item.href);


              if (assetResponse.ok) {

                const assets =
                  await assetResponse.json();


                /* =====================
                   VIDEO
                ===================== */

                if (
                  info.media_type === "video"
                ) {

                  videoSources =
                    assets.filter(
                      asset =>
                        typeof asset === "string" &&
                        /\.mp4(\?.*)?$/i.test(
                          asset
                        )
                    );


                  /*
                   Remove duplicates
                  */

                  videoSources =
                    [...new Set(
                      videoSources
                    )];


                  /*
                   Sort video quality
                  */

                  videoSources.sort(
                    (a, b) => {

                      const quality =
                        url => {

                          if (
                            url.includes(
                              "~large.mp4"
                            )
                          ) {
                            return 5;
                          }

                          if (
                            url.includes(
                              "~medium.mp4"
                            )
                          ) {
                            return 4;
                          }

                          if (
                            url.includes(
                              "~orig.mp4"
                            )
                          ) {
                            return 3;
                          }

                          if (
                            url.includes(
                              "~small.mp4"
                            )
                          ) {
                            return 2;
                          }

                          if (
                            url.includes(
                              "~mobile.mp4"
                            )
                          ) {
                            return 1;
                          }

                          return 0;

                        };


                      return (
                        quality(b) -
                        quality(a)
                      );

                    }
                  );


                  if (
                    videoSources.length > 0
                  ) {

                    mediaUrl =
                      videoSources[0];

                  }

                }


                /* =====================
                   IMAGE
                ===================== */

                else {

                  const images =
                    assets.filter(
                      asset =>
                        typeof asset === "string" &&
                        /\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(
                          asset
                        )
                    );


                  if (
                    images.length > 0
                  ) {

                    mediaUrl =
                      images[
                        images.length - 1
                      ];

                  }

                }

              }

            } catch (assetError) {

              console.log(
                "NASA asset request failed:",
                assetError
              );

            }

          }


          /* =========================
             VIDEO RESULT
          ========================= */

          if (
            info.media_type === "video"
          ) {

        

            if (
              videoSources.length === 0
            ) {

              continue;

            }


            formattedResults.push({

              id:
                info.nasa_id,

              title:
                info.title ||
                "Untitled Discovery",

              description:
                info.description ||
                "No description available.",

              date_created:
                info.date_created
                  ? new Date(
                      info.date_created
                    ).toLocaleDateString()
                  : "Unknown date",

              media_type:
                "video",

              thumbnail:
                thumbnail,

              video_url:
                videoSources[0],

              video_sources:
                videoSources,

              video_failed:
                false

            });

          }


          /* =========================
             IMAGE RESULT
          ========================= */

          else {

            formattedResults.push({

              id:
                info.nasa_id,

              title:
                info.title ||
                "Untitled Discovery",

              description:
                info.description ||
                "No description available.",

              date_created:
                info.date_created
                  ? new Date(
                      info.date_created
                    ).toLocaleDateString()
                  : "Unknown date",

              media_type:
                "image",

              thumbnail:
                thumbnail,

              image_url:
                mediaUrl ||
                thumbnail

            });

          }

        }


        this.results =
          formattedResults;


      } catch (err) {

        console.error(err);

        this.error =
          "We could not reach NASA right now. Please try again.";

      } finally {

        this.loading = false;

      }

    },


    /* =========================
       VIDEO ERROR
    ========================= */

    handleVideoError(item) {

      const currentIndex =
        item.video_sources.indexOf(
          item.video_url
        );


      const nextIndex =
        currentIndex + 1;



      if (
        nextIndex <
        item.video_sources.length
      ) {

        item.video_url =
          item.video_sources[nextIndex];

        return;

      }


      this.results =
        this.results.filter(
          result =>
            result.id !== item.id
        );

    }

  }

};

</script>


<style scoped>

/* =========================================
   PAGE
========================================= */

.search-page {

  position: relative;

  min-height: 100vh;

  overflow: hidden;

  color: white;

  background: #030712;

}


/* =========================================
   BACKGROUND
========================================= */

.space-background {

  position: fixed;

  inset: -12%;

  z-index: 0;

  background-image:

    linear-gradient(
      rgba(2, 6, 20, 0.42),
      rgba(2, 6, 20, 0.68)
    ),

    url("\public\space-photo.jpeg");

  background-size: 120% 120%;

  background-position: center;

  background-repeat: no-repeat;

  animation:
    spaceMove 10s ease-in-out infinite alternate;

  pointer-events: none;

}


@keyframes spaceMove {

  0% {

    transform: scale(1);

    background-position:
      42% 48%;

  }

  50% {

    transform: scale(1.08);

    background-position:
      58% 52%;

  }

  100% {

    transform: scale(1.15);

    background-position:
      45% 58%;

  }

}


/* =========================================
   STARS
========================================= */

.stars {

  position: fixed;

  inset: 0;

  z-index: 1;

  pointer-events: none;

  background-image:

    radial-gradient(
      2px 2px at 20px 30px,
      white,
      transparent
    ),

    radial-gradient(
      1px 1px at 80px 100px,
      white,
      transparent
    ),

    radial-gradient(
      2px 2px at 150px 180px,
      white,
      transparent
    ),

    radial-gradient(
      1px 1px at 250px 70px,
      white,
      transparent
    ),

    radial-gradient(
      2px 2px at 400px 200px,
      white,
      transparent
    );

  background-size:
    450px 300px;

}


.stars-one {

  opacity: 0.55;

  animation:
    starsMove 7s linear infinite;

}


.stars-two {

  opacity: 0.25;

  transform: scale(1.5);

  animation:
    starsMoveReverse 11s linear infinite;

}


@keyframes starsMove {

  from {

    background-position:
      0 0;

  }

  to {

    background-position:
      0 -300px;

  }

}


@keyframes starsMoveReverse {

  from {

    background-position:
      0 -300px;

  }

  to {

    background-position:
      0 0;

  }

}


/* =========================================
   CONTENT
========================================= */

.page-content {

  position: relative;

  z-index: 2;

}


/* =========================================
   HERO
========================================= */

.search-hero {

  min-height: 620px;

  display: flex;

  align-items: center;

  justify-content: center;

  text-align: center;

}


.hero-content {

  padding-top: 20px;

}


.hero-badge {

  display: inline-block;

  padding: 8px 18px;

  margin-bottom: 25px;

  border:
    1px solid
    rgba(255,255,255,0.2);

  border-radius: 30px;

  background:
    rgba(255,255,255,0.08);

  backdrop-filter:
    blur(12px);

  color: #c4ceff;

  font-size: 11px;

  letter-spacing: 2px;

}


.hero-content h1 {

  margin-bottom: 25px;

  font-size:
    clamp(3rem, 7vw, 6rem);

  font-weight: 800;

  line-height: 1;

  letter-spacing: -3px;

}


.hero-content h1 span {

  display: block;

  background:
    linear-gradient(
      90deg,
      #ffffff,
      #9baeff,
      #d2c2ff
    );

  -webkit-background-clip:
    text;

  -webkit-text-fill-color:
    transparent;

}


.hero-content p {

  max-width: 650px;

  margin: auto;

  color: #d0d5e4;

  font-size: 17px;

  line-height: 1.8;

}


/* =========================================
   SEARCH
========================================= */

.search-wrapper {

  max-width: 750px;

  margin:
    40px auto 12px;

}


.search-input-box {

  display: flex;

  align-items: center;

  padding: 7px;

  border:
    1px solid
    rgba(255,255,255,0.22);

  border-radius: 18px;

  background:
    rgba(10,15,35,0.55);

  backdrop-filter:
    blur(20px);

  box-shadow:
    0 20px 60px
    rgba(0,0,0,0.45);

  transition: 0.3s;

}


.search-input-box:focus-within {

  border-color:
    rgba(135,155,255,0.8);

  box-shadow:
    0 0 35px
    rgba(80,110,255,0.25);

}


.search-icon {

  width: 50px;

  font-size: 28px;

  color: #a8b5ff;

}


.search-input-box input {

  flex: 1;

  height: 55px;

  border: none;

  outline: none;

  background: transparent;

  color: white;

  font-size: 16px;

}


.search-input-box input::placeholder {

  color: #8c95a9;

}


.search-input-box button {

  height: 55px;

  padding: 0 30px;

  border: none;

  border-radius: 13px;

  background:
    linear-gradient(
      135deg,
      #6479ff,
      #906cff
    );

  color: white;

  font-weight: 600;

  transition: 0.3s;

}


.search-input-box button:hover:not(:disabled) {

  transform:
    translateY(-2px);

  box-shadow:
    0 10px 30px
    rgba(100,110,255,0.5);

}


.search-input-box button:disabled {

  opacity: 0.5;

  cursor: not-allowed;

}


.search-hint {

  color: #8d96aa;

  font-size: 12px;

}


.search-hint b {

  color: #d4d9e8;

}


/* =========================================
   LOADING
========================================= */

.loading-section {

  text-align: center;

  padding: 80px 20px;

}


.space-loader {

  position: relative;

  width: 100px;

  height: 100px;

  margin:
    0 auto 30px;

}


.planet-loader {

  position: absolute;

  top: 32px;

  left: 32px;

  width: 36px;

  height: 36px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle at 30% 30%,
      #e1e6ff,
      #6478df 50%,
      #283364
    );

  box-shadow:
    0 0 30px
    rgba(120,140,255,0.7);

}


.orbit {

  position: absolute;

  border:
    1px solid
    rgba(150,165,255,0.5);

  border-radius: 50%;

}


.orbit-one {

  width: 90px;

  height: 35px;

  top: 32px;

  left: 5px;

  transform:
    rotate(-25deg);

  animation:
    orbitOne 2s linear infinite;

}


.orbit-two {

  width: 70px;

  height: 90px;

  top: 5px;

  left: 15px;

  transform:
    rotate(25deg);

  animation:
    orbitTwo 2.5s linear infinite reverse;

}


@keyframes orbitOne {

  to {

    transform:
      rotate(335deg);

  }

}


@keyframes orbitTwo {

  to {

    transform:
      rotate(385deg);

  }

}


/* =========================================
   RESULTS
========================================= */

.results-section {

  padding:
    30px 0 100px;

}


.results-header {

  display: flex;

  align-items: end;

  justify-content: space-between;

  margin-bottom: 35px;

}


.section-label {

  color: #9ba9ff;

  font-size: 11px;

  letter-spacing: 2px;

}


.results-header h2 {

  margin:
    5px 0 0;

  font-size: 38px;

}


.result-count {

  color: #a0a8b9;

  font-size: 14px;

}


/* =========================================
   CARD
========================================= */

.result-card {

  height: 100%;

  overflow: hidden;

  border:
    1px solid
    rgba(255,255,255,0.13);

  border-radius: 18px;

  background:
    rgba(10,15,32,0.68);

  backdrop-filter:
    blur(15px);

  box-shadow:
    0 15px 45px
    rgba(0,0,0,0.4);

  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;

}


.result-card:hover {

  transform:
    translateY(-8px);

  box-shadow:
    0 25px 60px
    rgba(50,70,160,0.35);

}


/* =========================================
   MEDIA
========================================= */

.media-wrapper {

  position: relative;

  height: 245px;

  overflow: hidden;

  background: #020617;

}


.result-image,
.result-video {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


.result-image {

  transition:
    transform 0.6s ease;

}


.result-card:hover .result-image {

  transform:
    scale(1.08);

}


.result-video {

  display: block;

  background: #000;

}


/* =========================================
   MEDIA TYPE
========================================= */

.media-type {

  position: absolute;

  top: 15px;

  left: 15px;

  z-index: 3;

  padding: 6px 12px;

  border-radius: 20px;

  background:
    rgba(0,0,0,0.7);

  color: #e1e5ff;

  font-size: 10px;

  letter-spacing: 1px;

}


/* =========================================
   CARD CONTENT
========================================= */

.card-content {

  padding: 22px;

}


.date {

  color: #8490ad;

  font-size: 11px;

}


.card-content h3 {

  margin:
    8px 0 12px;

  font-size: 18px;

  line-height: 1.4;

}


.card-content p {

  display:
    -webkit-box;

  -webkit-line-clamp: 3;

  -webkit-box-orient:
    vertical;

  overflow: hidden;

  color: #a0a8ba;

  font-size: 13px;

  line-height: 1.7;

}


.card-footer {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;

  margin-top: 20px;

  padding-top: 15px;

  border-top:
    1px solid
    rgba(255,255,255,0.08);

}


.card-footer > span:first-child {

  color: #9ba9ff;

  font-size: 12px;

}


.card-footer a {

  color: #c1caff;

  font-size: 12px;

  text-decoration: none;

  transition: 0.3s;

}


.card-footer a:hover {

  color: white;

  text-decoration: underline;

}


/* =========================================
   EMPTY / ERROR
========================================= */

.no-results,
.initial-state {

  padding:
    90px 20px;

  text-align: center;

}


.empty-icon {

  margin-bottom: 20px;

  color: #8c9aff;

  font-size: 45px;

}


.no-results h2,
.initial-state h2 {

  margin-bottom: 12px;

}


.no-results p,
.initial-state p {

  color: #a1a9bb;

}


.no-results > span {

  color: #737d92;

  font-size: 13px;

}


.message-box {

  max-width: 700px;

  display: flex;

  align-items: center;

  gap: 15px;

  margin:
    30px auto;

  padding: 20px;

  border:
    1px solid
    rgba(255,255,255,0.12);

  border-radius: 15px;

  background:
    rgba(255,255,255,0.06);

}


.error-icon {

  font-size: 25px;

}


.error-box {

  color: #ffb8b8;

}


.error-box h4 {

  margin:
    0 0 5px;

}


.error-box p {

  margin: 0;

  color: #c19b9b;

}


/* =========================================
   INITIAL
========================================= */

.initial-state {

  padding-bottom: 100px;

}


.initial-orbit {

  width: 100px;

  height: 100px;

  display: flex;

  align-items: center;

  justify-content: center;

  margin:
    auto auto 30px;

  border:
    1px solid
    rgba(130,150,255,0.35);

  border-radius: 50%;

  animation:
    spin 8s linear infinite;

}


.initial-planet {

  width: 35px;

  height: 35px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle at 30% 30%,
      #e0e5ff,
      #6478df
    );

  box-shadow:
    0 0 30px
    rgba(100,120,255,0.7);

}


@keyframes spin {

  to {

    transform:
      rotate(360deg);

  }

}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 768px) {

  .search-hero {

    min-height: 600px;

  }


  .hero-content {

    padding:
      30px 15px 0;

  }


  .hero-content h1 {

    font-size: 3rem;

    letter-spacing: -1px;

  }


  .hero-content p {

    font-size: 15px;

  }


  .search-input-box {

    flex-direction: column;

    gap: 8px;

    padding: 10px;

  }


  .search-icon {

    display: none;

  }


  .search-input-box input {

    width: 100%;

    text-align: center;

  }


  .search-input-box button {

    width: 100%;

  }


  .results-header {

    align-items: flex-start;

    flex-direction: column;

    gap: 10px;

  }

}

</style>