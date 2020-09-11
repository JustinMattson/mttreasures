<template>
  <div name="Queue container">
    <div class="row border border-secondary rounded-lg mb-1 mx-1 shadow" :class="qIndex">
      <div class="col-3">
        <img :src="queue.volunteerPic" class="profile-pic" />
      </div>
      <div class="col-md-2 col-6">
        {{queue.volunteerName}}
        {{queue.volunteerRating}}
      </div>
      <div class="col-3 d-flex justify-content-end">{{queue.jobApproval}}</div>
      <div v-if="isCreator" class="col-12 col-md-3 d-flex justify-content-end">
        <button @click="cancelQueue" class="btn btn-danger m-1">Cancel</button>
      </div>
      <div v-else class="col-md-3 col-12 d-flex justify-content-end">
        <button
          v-if="isJobCreator && !acceptanceToggle"
          @click="approve"
          class="btn btn-success m-1"
        >Approve</button>
        <button
          v-if="isJobCreator && !acceptanceToggle"
          @click="deny"
          class="btn btn-danger m-1"
        >Deny</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Queue",
  props: ["queue", "queues"],
  data() {
    return {
      altColor: ""
    };
  },
  mounted() {},
  computed: {
    isCreator() {
      return this.$store.state.profile.email == this.queue.creatorEmail;
    },
    isJobCreator() {
      return this.$store.state.profile.email == this.queue.jobCreatorEmail;
    },
    acceptanceToggle() {
      return (
        this.queue.jobApproval == "accepted" ||
        this.queue.jobApproval == "rejected"
      );
    },
    qIndex() {
      let num = this.queues.findIndex(q => q.id == this.queue.id);
      if (num % 2 == 0) {
        return "even";
      } else {
        return "odd";
      }
    }
  },
  methods: {
    cancelQueue() {
      this.$store.dispatch("cancelQueue", this.queue.id);
    },
    approve() {
      this.queue.jobApproval = "accepted";
      this.$store.dispatch("approveDeny", this.queue);
    },
    deny() {
      this.queue.jobApproval = "rejected";
      this.$store.dispatch("approveDeny", this.queue);
    }
  }
};
</script>

<style scoped>
.profile-pic {
  height: 75px;
  width: 75px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
  box-shadow: 4px 4px 5px black;
}
.smol-button {
  height: 60%;
}
.odd {
  background-color: #dadada;
}
</style>