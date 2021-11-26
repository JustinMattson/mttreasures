<template>
  <div class="job">
    <!-- CARD TEMPLATE API -->
    <div class="card shadow bg-primary text-secondary rounded-lg border border-secondary">
      <router-link :to="{ name: 'job', params: { jobId: job.id } }">
        <img :src="job.imgUrl" class="card-img-top p-2" alt="..." />
      </router-link>
      <div class="card-body p-2">
        <div class="d-flex text-left text-primary font-weight-bold font-lg justify-content-between">
          <h3 class="text-white light-text-shadow">{{job.title}}</h3>
          <span v-show="job.creatorEmail == profile.email">
            <i class="far fa-trash-alt action text-danger" @click="deleteJob"></i>
          </span>
        </div>
        <div class="d-flex text-left text-secondary align-self-center">
          <span>
            <img class="rounded-circle" :src="job.creator.picture" style="height:50px;width:50px" />
          </span>
          <span class="d-flex align-items-center">
            <h4 style="font-size:2vh" class="d-flex align-self-center pl-2">{{job.creator.name}}</h4>
            <span class="pl-2" v-show="requestorRating != 'No Ratings'">
              {{requestorRating}}/5
              <small v-if="numRatings > 1">({{numRatings}} ratings)</small>
              <small v-else>({{numRatings}} rating)</small>
            </span>
            <h4 class="ml-1"></h4>
          </span>
          <!-- <span class>
              <img class="rounded-lg" :src="job.creator.picture" style="height:35px;width:35px" />
              {{ job.creator.name }}
              <span v-show="requestorRating != 'No Ratings'">
                {{requestorRating}}/5
                <small v-if="numRatings > 1">({{numRatings}} ratings)</small>
                <small v-else>({{numRatings}} rating)</small>
          </span>-->
        </div>
        <h5 class="card-text text-left py-2">{{ job.description }}</h5>
        <h6>General Location: {{ job.generalLocation }}</h6>
        <p>
          <small>Post expires: {{ when }}</small>
        </p>
        <!-- <div>{{job.jobStatus}}</div> -->
        <div class="hide">{{expireCheck}}</div>


        <span class="d-flex justify-content-between" style="align-items:flex-end;">
          <router-link :to="{ name: 'job', params: { jobId: job.id } }">
            <button class="btn btn-secondary d-flex my-3 justify-content-center">
              <i class="fas fa-mountain action text-white light-text-shadow font-lg">&nbsp;More Info</i>
            </button>
          </router-link>
          <a href="#top">
            <i class="fas fa-angle-double-up text-warning" title="Return to top of page."></i>
          </a>
        </span>
        <!-- <p class="small text-muted mb-0 text-center unbold">#{{ job.id }}</p> -->
      </div>
    </div>
    <!-- END CARD TEMPLATE -->
  </div>
</template>

<script>
import moment from "moment";
import swal from "sweetalert";
export default {
  name: "job",
  props: ["job"],
  data() {
    return {
      start: moment(String(this.job.startDate)).format("MM/DD/YYYY"),
      end: moment(String(this.job.startDate)).format("MM/DD/YYYY"),
    };
  },
  mounted() {},
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    when() {
      if (this.job.startDate == this.job.endDate) {
        return moment(String(this.job.startDate)).format("MM/DD/YYYY");
      } else {
        return (
          moment(String(this.job.startDate)).format("MM/DD/YYYY") +
          " - " +
          moment(String(this.job.endDate)).format("MM/DD/YYYY")
        );
      }
    },
    requestorRating() {
      if (this.job) {
        //this.job.jobCreatorRating = specific to this job
        let rateArr = this.job.jobCreatorRatings;
        let length = rateArr.length;
        let x = 0;
        let i = 0;
        while (i < length) {
          x += +rateArr[i];
          i++;
        }
        if (length == 0) {
          return "No Ratings";
        } else return x.toFixed(1) / length;
      }
    },
    numRatings() {
      // Total ratings of requestor for this job
      return this.job.jobCreatorRatings.length;
    },
    // NOTE format needs to be Year, Month, Day in order to perform the inequality.
    expireCheck() {
      let jobDate = moment(String(this.job.endDate)).format("YYYY/MM/DD");
      let currentDate = moment(String(new Date())).format("YYYY/MM/DD");
      if (jobDate < currentDate) {
        this.job.jobStatus = "completed";
        this.$store.dispatch("changeJobStatus", this.job);
        this.$store.dispatch("removeOldJob", this.job.id);
        return "completed";
      } else {
        this.job.jobStatus = "pending";
        this.$store.dispatch("changeJobStatus", this.job);
        return "upcoming";
      }
    },
  },
  methods: {
    // deleting is bad because it orphans contacts. Just update to cancelled.
    deleteJob() {
      swal({
        title: "Are you sure?",
        text:
          "Click 'Ok' to confirm you wish to cancel this request.  This action cannot be undone.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.job.jobStatus = "cancelled";
          let data = this.$store.dispatch("editJob", this.job);
          swal("Poof! Your help request has been cancelled!", {
            icon: "success",
          });
          this.editJob = false;
        } else {
          swal("Close cancelled");
        }
      });
    },
  },
  components: {},
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
  font-size: 16pt;
}
img {
  border-radius: 13px;
}

.hide {
  display: none;
}
</style>
