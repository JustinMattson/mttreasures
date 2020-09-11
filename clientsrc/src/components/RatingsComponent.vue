<template>
  <div class="volunteerId">
    <div class="col-12 d-flex my-2 justify-content-between border-bottom px-0">
      <span class="mb-2 text-left" style="max-width:40%;">
        <img :src="volunteerId.picture" style="height:25px;width:25px;" />
        {{volunteerId.name}}
      </span>
      <span v-if="reviewSubmitted == false" class="form-inline d-flex align-self-center">
        <span class="mx-2">Rating:</span>
        <form @submit.prevent="submitRating" :id="volunteerId.id + requesterJob.id">
          <select v-model="obj.rating" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </form>
        <button
          type="submit"
          class="btn btn-secondary text-primary btn-sm ml-1"
          :form="volunteerId.id + requesterJob.id"
        >Submit</button>
      </span>
      <span v-if="reviewSubmitted == true" class="d-flex align-self-center">Thanks for the feedback!</span>
    </div>
  </div>
</template>


<script>
export default {
  name: "volunteerId",
  props: ["volunteerId", "requesterJob"],
  data() {
    return {
      obj: {
        recipientId: this.volunteerId.id, //volunteer being rated
        userId: this.$store.state.profile.id, //person who posted job
        jobId: this.requesterJob.id
      }
    };
  },
  computed: {
    reviewSubmitted() {
      let id = this.volunteerId.id;
      let data = this.requesterJob.completedVolunteerReviews.find(v => v == id);
      if (data) {
        return true;
      } else return false;
    }
  },
  methods: {
    submitRating() {
      this.$store.dispatch("jobVolunteerRating", this.obj);
      // debugger;
      this.requesterJob.completedVolunteerReviews.push(this.volunteerId.id);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>