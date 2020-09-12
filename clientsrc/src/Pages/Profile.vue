<template>
  <div class="profile text-center container-fluid">
    <div class="row bg-white d-flex justify-content-center text-center">
      <!-- <div class="col-md-3 bg-secondary text-primary border border-dark rounded-right shadow">
        <div class="pt-md-4 mt-md-4 py-2">
          <h3>Your Volunteer Rating:</h3>
          <h1>{{volunteerAverage}} / 5</h1>
          <small v-if="numVolRatings > 1">({{numVolRatings}} ratings)</small>
          <small v-else>({{numVolRatings}} rating)</small>
        </div>
      </div>-->
      <div class="col-12 col-md-6">
        <h1>
          Welcome
          <span class="text-primary">{{ profile.name }}</span>
        </h1>
        <img
          class="rounded-circle shadow-lg border border-dark"
          :src="profile.picture"
          @click="toggleEdit"
        />
        <div class="font-lg unbold">{{ profile.email }}</div>
        <p class="text-muted unbold">Click on your profile image to edit user profile.</p>
      </div>
      <!-- <div
        class="col-md-3 bg-secondary text-center text-primary border border-dark rounded-left shadow"
      >
        <div class="pt-md-4 mt-md-4 py-2">
          <h3>Your Poster Rating:</h3>
          <h1>{{requesterAverage}} / 5</h1>
          <small v-if="numReqRatings > 1">({{numReqRatings}} ratings)</small>
          <small v-else>({{numReqRatings}} rating)</small>
        </div>
      </div>-->
    </div>

    <form class="form text-left" v-if="edit" style="width:100%;" @submit.prevent="updateProfile">
      <div class="form-group">
        <label class="m-0" for>Update Name...</label>
        <input
          type="text"
          name="name"
          v-model="profile.name"
          id
          class="form-control m-1 shadow border-warning"
          placeholder="Name..."
          required
        />
        <label class="m-0" for>Update Image URL...</label>
        <input
          type="text"
          name="picture"
          v-model="profile.picture"
          id
          class="form-control m-1 shadow border-warning"
          placeholder="ImgUrl..."
          required
        />
        <button type="submit" class="btn btn-warning my-2 shadow">Submit</button>
        <!-- <p class="text-warning">* Please refresh page after clicking submit.</p> -->
      </div>
    </form>

    <!-- <div class="row py-3 bg-white rounded-lg">
      <div class="col">
        <h2 class="text-secondary">Future Opportunites:</h2>
        <jobQueue
          v-for="jobQueue in jobQueues"
          :key="jobQueue.id"
          :jobQueue="jobQueue"
          :jobQueues="jobQueues"
          v-show="jobQueue.jobId.jobStatus == 'pending' && jobQueue.volunteerId == profile.id"
        />
      </div>
    </div>
    <div class="row py-3 rounded-lg">
      <div class="col">
        <h2>Opportunities Completed:</h2>
        <volunteerJob
          v-for="volunteerJob in volunteerJobs"
          :key="volunteerJob.id"
          :volunteerJob="volunteerJob"
          :volunteerJobs="volunteerJobs"
          v-show="volunteerJob.jobStatus == 'completed' "
        />
      </div>
    </div>-->
    <div class="row py-3 rounded-lg bg-secondary">
      <div class="col">
        <h2 class="text-white light-text-shadow">Things You've Posted:</h2>
        <requesterJob
          v-for="requesterJob in requesterJobs"
          :key="requesterJob.id"
          :requesterJob="requesterJob"
          :requesterJobs="requesterJobs"
          v-show="requesterJob.jobStatus != 'cancelled'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import JobQueue from "@/components/JobsQueueComponent.vue";
import VolunteerJob from "@/components/JobsCompletedComponent.vue";
import RequesterJob from "@/components/JobsRequestedComponent.vue";
export default {
  name: "Profile",
  data() {
    return {
      edit: false,
      fontSize: "10px",
      color: "#808",
    };
  },
  async mounted() {
    await this.$store.dispatch("getProfilePageData");
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    jobQueues() {
      return this.$store.state.queues;
    },
    volunteerJobs() {
      return this.$store.state.volunteerJobs;
    },
    requesterJobs() {
      return this.$store.state.postedJobs;
    },
    volunteerAverage() {
      let total = 0;
      let vr = this.$store.state.profile.volunteerRating || [];
      for (let index = 0; index < vr.length; index++) {
        total += vr[index];
      }
      let avg = total / vr.length;
      if (vr.length == 0) {
        return "No Rating";
      } else return avg.toFixed(1);
    },
    numVolRatings() {
      return this.profile.volunteerRating.length;
    },
    requesterAverage() {
      let total = 0;
      let vr = this.$store.state.profile.requesterRating || [];
      for (let index = 0; index < vr.length; index++) {
        total += vr[index];
      }
      let avg = total / vr.length;
      if (vr.length == 0) {
        return "No Rating";
      } else return avg.toFixed(1);
    },
    numReqRatings() {
      return this.profile.requesterRating.length;
    },
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", this.profile);
      this.edit = false;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    // toggleMyBlogs() {
    //   this.myBlogs = !this.myBlogs;
    // },
    // toggleMyComments() {
    //   // NOTE may need to enable debugger here to get the button to function again.
    //   // debugger
    //   this.myComments = !this.myComments;
    // }
  },
  components: {
    JobQueue,
    VolunteerJob,
    RequesterJob,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap");
.unbold {
  font-family: "Balsamiq Sans", cursive;
}
.action {
  cursor: pointer;
}
.font-lg {
  font-size: 20pt;
}
img {
  max-width: 150px;
  max-height: 150px;
}
</style>
