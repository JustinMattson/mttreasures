<template>
  <div class="volunteerJob container">
    <div
      class="row border border-secondary rounded-lg text-secondary mb-1 shadow"
      :class="vIndex"
      style="background-color:#dadada;"
    >
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <router-link :to="{ name: 'job', params: { jobId: volunteerJob.id } }">
          <span class="d-flex align-items-center">{{volunteerJob.title}}</span>
        </router-link>
        <span class="d-flex align-items-center unbold">{{when}}</span>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-between align-items-center">
        <span
          class="d-flex align-items-center text-left"
          style="max-width:65%;"
        >Rate {{volunteerJob.creator.name}}'s Help Request</span>
        <span class="form-inline d-flex align-self-center">
          <form
            v-if="this.reviewSubmitted == false"
            @submit.prevent="submitRating"
            :id="volunteerJob.id"
          >
            <select v-model="obj.rating" required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </form>
          <button
            v-if="this.reviewSubmitted == false"
            type="submit"
            :form="volunteerJob.id"
            class="btn btn-secondary text-primary btn-sm mb-2 ml-1"
          >Submit</button>
          <div class="text-right" v-if="this.reviewSubmitted == true">Thanks for the feedback!</div>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "volunteerJob",
  props: ["volunteerJob", "volunteerJobs"],
  data() {
    return {
      obj: {
        recipientId: this.volunteerJob.creator.id,
        userId: this.$store.state.profile.id,
        jobId: this.volunteerJob.id,
        rating: 0
      }
    };
  },
  computed: {
    vIndex() {
      let num = this.volunteerJobs.findIndex(v => v.id == this.volunteerJob.id);
      return num % 2 == 0 ? "bg-light" : "altColor";
    },
    // vIndex() {
    //   let num = this.$store.state.volunteerJobs.findIndex(
    //     v => v.id == this.volunteerJob.id
    //   );
    //   return num % 2;
    // },
    when() {
      if (this.volunteerJob.startDate == this.volunteerJob.endDate) {
        return moment(String(this.volunteerJob.startDate)).format("MM/DD/YYYY");
      } else {
        return (
          moment(String(this.volunteerJob.startDate)).format("MM/DD/YYYY") +
          " - " +
          moment(String(this.volunteerJob.endDate)).format("MM/DD/YYYY")
        );
      }
    },
    reviewSubmitted() {
      let id = this.$store.state.profile.id;
      let data = this.volunteerJob.completedRequesterReviews.find(v => v == id);
      if (data) {
        return true;
      } else return false;
    }
  },
  methods: {
    submitRating() {
      this.$store.dispatch("jobPosterRating", this.obj);
      this.volunteerJob.completedRequesterReviews.push(
        this.$store.state.profile.id
      );
    }
  }
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
.altColor {
  background-color: #dadada;
}
</style>