<template>
  <div class="container-fluid">
    <div class="row bg-secondary text-center py-5">
      <div class="col-12 col-md-6 col-lg-4">
        <a
          href="https://www.google.com/maps/search/Montana%20Treasurers%20&%20Retreat,%20330%20Wagner%20Rd,%20Martin%20City,%20MT,%2059926?hl=en&source=opensearch"
        >
          <img
            class="mx-img border border-secondary"
            src="../assets/img/proximity.png"
            style="width:100%;"
          />
        </a>

        <h1 class="text-white light-text-shadow pb-3">Northwest Montana</h1>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <a
          href="https://www.google.com/maps/search/Montana%20Treasurers%20&%20Retreat,%20330%20Wagner%20Rd,%20Martin%20City,%20MT,%2059926?hl=en&source=opensearch"
        >
          <img
            class="mx-img border border-secondary"
            src="../assets/img/20_acres.png"
            style="width:100%;"
          />
        </a>
        <h1 class="text-white light-text-shadow pb-3">Approximate Property Boundary</h1>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <img
          class="mx-img border border-secondary"
          src="../assets/img/FrontPorchView.jpg"
          style="width:100%;"
        />
        <h1 class="text-white light-text-shadow pb-3">Front Porch View</h1>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <img
          class="mx-img border border-secondary"
          src="../assets/img/LivingRoom.jpg"
          style="width:100%;"
        />
        <h1 class="text-white light-text-shadow pb-3">Living Room</h1>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <img
          class="mx-img border border-secondary"
          src="../assets/img/OpenLoft.jpg"
          style="width:100%;"
        />
        <h1 class="text-white light-text-shadow pb-3">Open Loft</h1>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <img
          class="mx-img border border-secondary"
          src="../assets/img/MasterBedroom.jpg"
          style="width:100%;"
        />
        <h1 class="text-white light-text-shadow pb-3">Master Bedroom</h1>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <img
          class="mx-img border border-secondary"
          src="../assets/img/Bedroom2a.jpg"
          style="width:100%;"
        />
        <h1 class="text-white light-text-shadow pb-3">2nd Bedroom</h1>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <img
          class="mx-img border border-secondary"
          src="../assets/img/Bedroom2b.jpg"
          style="width:100%;"
        />
        <h1 class="text-white light-text-shadow pb-3">2nd Bedroom</h1>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <img
          class="mx-img border border-secondary"
          src="../assets/img/Bathroom1.jpg"
          style="width:100%;"
        />
        <h1 class="text-white light-text-shadow pb-3">Downstairs Bathroom</h1>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <img
          class="mx-img border border-secondary"
          src="../assets/img/Bathroom2.jpg"
          style="width:100%;"
        />
        <h1 class="text-white light-text-shadow pb-3">Downstairs Bathroom</h1>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <img
          class="mx-img border border-secondary"
          src="../assets/img/SideEntryway2.jpg"
          style="width:100%;"
        />
        <h1 class="text-white light-text-shadow pb-3">Side Entry</h1>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <img
          class="mx-img border border-secondary"
          src="../assets/img/SideEntryway.jpg"
          style="width:100%;"
        />
        <h1 class="text-white light-text-shadow pb-3">Side Entry</h1>
      </div>

      <div class="col-12 mt-3">
        <!-- MODAL FORM -->
        <button
          type="button"
          class="btn btn-primary btn-lg shadow my-1"
          data-toggle="modal"
          data-target="#myModal"
          v-if="$auth.isAuthenticated"
        >
          <h2 class="light-text-shadow">Share some memories!</h2>
        </button>
      </div>
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header bg-primary shadow-sm">
              <h4 class="modal-title text-white light-text-shadow">New Memory</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body shadow-sm container text-secondary">
              <!-- add submit method here -->
              <form @submit.prevent="addJob">
                <div class="row justify-content-center">
                  <div class="col text-center">
                    <!-- add v-model -->
                    <h5>Title:</h5>
                    <input
                      type="text"
                      placeholder="Title..."
                      class="mb-3"
                      required
                      v-model="newJob.title"
                    />
                  </div>
                  <div class="col text-center">
                    <h5>Location:</h5>
                    <input
                      type="text"
                      placeholder="City..."
                      class="mb-3"
                      required
                      v-model="newJob.generalLocation"
                    />
                  </div>
                </div>
                <div class="row justify-content-center mt-3">
                  <div class="col text-center">
                    <!-- add v-model -->
                    <h5>Description:</h5>
                    <textarea
                      class="mb-3"
                      rows="3"
                      type="text"
                      placeholder="Description..."
                      required
                      v-model="newJob.description"
                      style="width:90%;"
                    />
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col text-center">
                    <h5>Image (optional):</h5>
                    <input
                      type="text"
                      class="mb-3"
                      placeholder="Copy/Paste Image Link..."
                      v-model="newJob.imgUrl"
                    />
                  </div>
                </div>

                <div class="row justify-content-center mt-3">
                  <!-- <div class="col text-center">
                    <h5>Start Date:</h5>
                    <input type="date" placeholder="start date" required v-model="newJob.startDate" />
                  </div>-->
                  <div class="col text-center">
                    <h5>Post Until:</h5>
                    <input
                      type="date"
                      placeholder="end date"
                      class="mb-3"
                      required
                      v-model="newJob.endDate"
                    />
                  </div>
                </div>
                <div class="row mt-3 align-items-end">
                  <!-- <div class="col">
                    <h5>Estimated Hours:</h5>
                    <input type="number" placeholder="0" required v-model="newJob.estimatedHours" />
                  </div>-->
                  <div class="col text-center">
                    <button type="submit" class="btn btn-secondary btn-lg shadow">Add Memory</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer bg-primary shadow-sm">
              <button type="button" class="btn btn-light shadow" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <!-- END MODAL FORM -->
    </div>
    <div class="row bg-white p-3">
      <div class="col-12 list-container px-0">
        <div id="jobs" class="card-columns p-2" style="column-gap: 1rem;">
          <!-- CARD TEMPLATE API -->
          <job v-for="job in jobs" :key="job.id" :job="job" v-show="job.jobStatus == 'pending'" />
          <!-- END CARD TEMPLATE -->
        </div>
      </div>
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import Job from "@/components/JobComponent.vue";
import CustomFooter from "@/components/CustomFooter.vue";
import moment from "moment";
export default {
  name: "jobs",
  data() {
    return {
      newJob: {},
    };
  },
  async mounted() {
    await this.$store.dispatch("getAllJobs");
    await this.$store.dispatch("initializeSocket");
    this.$store.dispatch("joinRoom", "requests");
  },
  beforedestry() {
    this.$store.dispatch("leaveRoom", "requests");
  },
  methods: {
    toggleSort() {
      if (this.sort == "desc") {
        this.sort = "asc";
      } else {
        this.sort = "desc";
      }
    },
    addJob() {
      this.newJob.requesterId = this.profile.id;
      // this.newJob.startDate = moment(this.newJob.startDate).format(
      //   "MM-DD-YYYY"
      // );
      this.newJob.endDate = moment(this.newJob.endDate).format("MM-DD-YYYY");
      this.newJob.startDate = this.newJob.endDate;
      this.$store.dispatch("addJob", { ...this.newJob });
      this.newJob = {};
      $("#myModal").modal("hide");
      // this.jobForm = false; // REVIEW what is this line doing?
    },
    jobSortAsc() {
      function compare(a, b) {
        if (a.updatedAt < b.updatedAt) return -1;
        if (a.updatedAt > b.updatedAt) return 1;
        return 0;
      }
      return this.jobs.sort(compare);
    },
    jobSortDesc() {
      function compare(a, b) {
        if (a.updatedAt < b.updatedAt) return 1;
        if (a.updatedAt > b.updatedAt) return -1;
        return 0;
      }
      return this.jobs.sort(compare);
    },
  },
  computed: {
    jobs() {
      return this.$store.state.jobs;
    },
    profile() {
      return this.$store.state.profile;
    },
  },
  components: {
    Job,
    CustomFooter,
  },
};
</script>
<style scoped>
.mx-img {
  border-radius: 10px;
  box-shadow: 4px 4px 5px black;
}
</style>