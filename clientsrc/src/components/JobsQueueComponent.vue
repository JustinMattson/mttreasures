<template>
  <!-- Future Opportunities -->
  <div class="jobQueue container">
    <div
      class="row border border-secondary rounded-lg mb-1 shadow text-secondary py-1"
      :class="qIndex"
    >
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <router-link :to="{ name: 'job', params: { jobId: jobQueue.jobId.id } }">
          <span class="d-flex align-items-center text-left">{{jobQueue.jobId.title}}</span>
        </router-link>
        <span class="d-flex align-items-center unbold">{{when}}</span>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <span class="d-flex align-items-center">Status: {{jobQueue.jobApproval}}</span>
        <span title="Remove from Queue">
          <i
            class="far fa-trash-alt text-danger action"
            v-if="jobQueue.jobApproval == 'rejected'"
            alt="Delete"
            @click="cancelQueue"
          ></i>
          <i class="fas fa-ban text-danger action" v-else alt="Cancel" @click="cancelQueue"></i>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
export default {
  name: "jobQueue",
  props: ["jobQueue", "jobQueues"],
  data() {
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    // FIXME once completed, the index is not sequential, colors can be all white or gray.
    qIndex() {
      let num = this.jobQueues.findIndex(
        q => q.id == this.jobQueue.id
        // &&
        // q.jobId.jobStatus == "pending"
        // &&
        // q.jobQueue.volunteerId == profile.id
      );
      return num % 2 == 0 ? "bg-light" : "altColor";
    },
    // qnum() {
    //   let num = this.jobQueues.findIndex(q => q.id == this.jobQueue.id);
    //   return num;
    // },
    when() {
      if (this.jobQueue.jobId.startDate == this.jobQueue.jobId.endDate) {
        return moment(String(this.jobQueue.jobId.startDate)).format(
          "MM/DD/YYYY"
        );
      } else {
        return (
          moment(String(this.jobQueue.jobId.startDate)).format("MM/DD/YYYY") +
          " - " +
          moment(String(this.jobQueue.jobId.endDate)).format("MM/DD/YYYY")
        );
      }
    }
  },
  methods: {
    cancelQueue() {
      this.$store.dispatch("cancelQueue", this.jobQueue.id);
    }
  },
  components: {}
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