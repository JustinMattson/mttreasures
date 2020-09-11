<template>
  <div class="home container-fluid text-center">
    <div class="row">
      <div class="col-12 p-0">
        <img
          src="https://www.doi.gov/sites/doi.gov/files/blog-post/thumbnail-images/glaciernpshanlin.jpg"
          class="cstm-size"
          title="West side of the Going the the Sun highway, Glacier National Park"
        />
      </div>
    </div>
    <div
      class="row text-center text-secondary py-md-5 py-1 bg-primary shadow-lg justify-content-center"
    >
      <div class="col-md-12">
        <h1>
          <i class="text-dark">Montana Treasures & Retreat</i>
        </h1>
        <h3>
          <ul class="text-left">
            <li>End of the road privacy. Outdoorman's dream!</li>
            <li>South side borders US Forest Service land</li>
            <li>20 acres</li>
            <li>1900 sq ft log home</li>
            <li>2 bedrooms, 1.5 bath, loft + bonus room upstairs</li>
            <li>Two artesian wells</li>
            <li>Power available at two sites on the property</li>
            <li>Two ponds (suitable for growing trout)</li>
            <li>Sauna, Pole Cabin</li>
            <li>Lots of wild life (deer, elk, moose, bear, mountain lion, turtles, geese, turkeys, etc.)</li>
            <li>$749,000</li>
          </ul>
          <h1>
            <i class="text-dark">Attractions:</i>
          </h1>
          <ul class="text-left">
            <li>
              <small>(2 miles)</small>
              Coram's Amazing Fun Center & Glacier Distilling Company
            </li>
            <li>
              <small>(8 miles)</small>
              Eight minutes from West Glacier and Glacier National Park
            </li>
            <li>
              <small>(8 miles)</small>
              Hungry Horse Reservoir - excellent boating, fishing, camping
            </li>
            <li>
              <small>(8 miles)</small>
              Big Sky Waterpark - large site with waterslides & mini-golf
            </li>
            <li>
              <small>(16 miles)</small>
              Middle Fork of Flathead River - some of Montana's best whitewater Rafting
            </li>
            <li>
              <small>(20 miles)</small>
              Whitefish - quaint little resort town
            </li>
            <li>
              <small>(25 miles)</small>
              Big Mountain Ski Resort and some of the Northwest's best powder
            </li>
            <li>
              <small>(25 miles)</small>
              Flathead Valley Community College
            </li>
            <li>
              <small>(33 miles)</small>
              Flathead Lake - largest natural freshwater lake west of the Mississippi
            </li>
            <li>
              <small>(36 miles)</small>
              Jewel Basin - 27 lakes and 35 miles of hiking
            </li>
          </ul>
        </h3>
      </div>
    </div>
    <div class="row d-flex bg-light justify-content-around py-3">
      <router-link
        :to="{name: 'Jobs'}"
        class="col-12 col-md-5 bg-primary shadow-lg border-3 box-height no-line d-flex align-items-center justify-content-center rounded my-1"
      >
        <h1 class="text-secondary text-shadow">More Info</h1>
      </router-link>
      <router-link
        :to="{name: 'Jobs'}"
        class="col-12 col-md-5 bg-secondary shadow-lg border-4 box-height no-line d-flex align-items-center justify-content-center rounded my-1"
      >
        <h1 class="text-primary text-shadow">Amazing!</h1>
      </router-link>
    </div>
    <div class="row d-flex justify-content-around bg-secondary py-5">
      <div class="card col-12 col-md-3 height-fix my-1 bg-primary text-secondary shadow">
        <img
          src="https://i.pinimg.com/originals/0d/c5/7b/0dc57b8d66c12736c666f157a3afa3ff.jpg"
          class="card-img-top mt-3"
          alt="error loading image"
        />
        <div class="card-body">
          <h4 class="card-title">Sydney</h4>
          <p class="card-text">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </p>
          <h5
            class="card-text"
          >"I rented this property in the summer of 2016 with my family. We explored Glacier National Park and went rafting on the Middle Fork! Watching the sunset and the deer play from the front porch was so serene, I could definitely see myself writing my next book here!"</h5>
        </div>
      </div>
      <div class="card col-12 col-md-3 height-fix my-1 bg-primary text-secondary shadow">
        <img
          src="https://headshotphotographerasheville.com/wp-content/uploads/headshots-in-asheville-3.jpg"
          class="card-img-top mt-3"
          alt="error loading image"
        />
        <div class="card-body">
          <h4 class="card-title">Albert</h4>
          <p class="card-text">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </p>
          <h5
            class="card-text"
          >"This place has amazing potential, with enough space for an additional house up on the hill. One could put in a motorcross track, a nudist resort, a wedding venue, campground...the possibilites are endless!"</h5>
        </div>
      </div>
      <div class="card col-12 col-md-3 height-fix my-1 bg-primary text-secondary shadow">
        <img
          src="https://i1.wp.com/kinserstudios.com/wp-content/uploads/2019/06/man.png?fit=384%2C295&ssl=1"
          class="card-img-top mt-3"
          alt="error loading image"
        />
        <div class="card-body">
          <h4 class="card-title">Scott</h4>
          <p class="card-text">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </p>
          <h5
            class="card-text"
          >"Shared some quality time here with my family last winter. We enjoyed the wood fireplace, day trips to Big Mountain Ski resort. We were able to cross-country ski and snowshoe right from the house! The kids really enjoyed sledding and ice-skating on the pond."</h5>
        </div>
      </div>
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import CustomFooter from "@/components/CustomFooter.vue";
export default {
  name: "home",
  components: {
    CustomFooter,
  },
};
</script>
<style scoped>
.sml-img {
  height: 3rem;
}
.box-height {
  height: 18vh;
}
.big-img {
  max-width: 90vw;
  max-height: 25vh;
}
.no-line {
  text-decoration: none;
}
.rounded {
  border-radius: 120px !important;
}

.cstm-size {
  height: auto;
  width: 100%;
}
.height-fix {
  height: fit-content !important;
}
.text-black {
  color: black;
}
.border-3 {
  border: 12px solid #35495e !important;
}
.border-4 {
  border: 12px solid #41b883 !important;
}
.text-shadow {
  text-shadow: 1px 1px black !important;
}
</style>