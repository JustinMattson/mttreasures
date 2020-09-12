<template>
  <div class="requesterJobs container justify-content-center">
    <div class="row border border-secondary rounded-lg mb-1 text-secondary shadow" :class="rIndex">
      <div class="col-12 d-flex justify-content-between">
        <router-link :to="{ name: 'job', params: { jobId: requesterJob.id } }">
          <span class="d-flex align-items-center text-left">{{requesterJob.title}}</span>
        </router-link>
        <span class="d-flex align-items-center unbold">{{when}}</span>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import VolunteerId from "@/components/RatingsComponent";
export default {
  name: "requesterJob",
  props: ["requesterJob", "requesterJobs"],
  data() {
    return {
      volunteerRatings: false,
    };
  },
  computed: {
    rIndex() {
      let num = this.requesterJobs.findIndex(
        (q) => q.id == this.requesterJob.id
      );
      return num % 2 == 0 ? "bg-light" : "altColor";
    },
    when() {
      if (this.requesterJob.startDate == this.requesterJob.endDate) {
        return moment(String(this.requesterJob.startDate)).format("MM/DD/YYYY");
      } else {
        return (
          moment(String(this.requesterJob.startDate)).format("MM/DD/YYYY") +
          " - " +
          moment(String(this.requesterJob.endDate)).format("MM/DD/YYYY")
        );
      }
    },
  },
  methods: {
    toggleRatings() {
      this.volunteerRatings = !this.volunteerRatings;
    },
    // volunteers() {
    //   let arr = this.$state.store.profile.find(
    //     p => p.id == this.requestorJob.volunteerIds
    //   );
    // }
  },
  components: {
    VolunteerId,
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
.altColor {
  background-color: #dadada;
}
/* .bg-grey{
  background: rgba(218, 218, 218, 0.712);
} */
</style>