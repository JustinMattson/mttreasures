<template>
  <div class="comment container my-3">
    <!-- COMMENT TEMPLATE API -->

    <div class="row border border-secondary rounded-lg mb-1 shadow" :class="cIndex">
      <div class="d-flex col-12 m-0 px-3 justify-content-between" v-if="comment.creator">
        <h3>{{comment.creator.name}}</h3>
        <small class="text-muted align-self-center">{{updated}}</small>
      </div>
      <div class="col-3 col-md-2 text-left m-0 d-flex align-self-center" v-if="comment.creator">
        <img
          :src="comment.creator.picture"
          class="card-img-top p-2 rounded-circle"
          alt="http://placehold.it/100x100"
          style="width:100px;height:100px;"
        />
      </div>
      <div class="col-9 col-md-10 m-0 d-flex align-self-center">
        <textarea
          class="text-left text-primary unbold font-md border-0 py-0 pl-2 ml-2"
          :class="cIndex"
          v-model="comment.body"
          style="height:88px;width:99%"
          placeholder="comment.body"
        ></textarea>
      </div>

      <div class="d-flex col-12 m-0 justify-content-between">
        <span class="pb-2">
          <i
            class="far fa-edit text-secondary action"
            v-show="comment.creatorEmail == profile.email"
            @click="toggleEditForm()"
          ></i>
        </span>
        <span>
          <!-- REVIEW seems to work without parens deleteComment() -->
          <i
            class="far fa-trash-alt text-danger action"
            v-show="comment.creatorEmail == profile.email || job.creatorEmail == profile.email"
            @click="deleteComment"
          ></i>
        </span>
      </div>

      <!-- EDIT COMMENT FORM -->
      <form
        v-show="this.editForm"
        class="form border border-top"
        @submit.prevent="editComment"
        style="height:88px;width:99%"
      >
        <div class="d-flex justify-content-between">
          <span class="d-flex text-center align-self-center px-3">
            <button type="submit" class="btn btn-outline-secondary">Update</button>
          </span>
          <span class="text-right" style="height:88px;width:99%">
            <textarea
              class="text-left text-primary unbold border-0 p-2"
              :class="cIndex"
              v-model="comment.body"
              placeholder="comment.body"
              style="width:99%;height:85px;"
            ></textarea>
          </span>
        </div>
      </form>
      <!-- END EDIT COMMENT FORM -->
    </div>

    <!-- END COMMENT TEMPLATE -->
  </div>
</template>

<script>
import moment from "moment";
import swal from "sweetalert";
export default {
  name: "comment",
  props: ["comment", "comments"],
  data() {
    return {
      editForm: false,
      updated: moment(String(this.comment.updatedAt)).format(
        "MM/DD/YYYY h:mm A"
      )
    };
  },
  mounted() {},
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    // TODO idea below was to alternate the comment row background based on % = 0
    cIndex() {
      let num = this.comments.findIndex(c => c.id == this.comment.id);
      if (num % 2 == 0) {
        return "bg-light";
      } else {
        return "altColor";
      }
    },
    job() {
      return this.$store.state.activeJob;
    }
  },
  methods: {
    toggleEditForm() {
      this.editForm == false ? (this.editForm = true) : (this.editForm = false);
    },
    addComment() {
      // TODO this method has not bee tested from the app.
      this.$store.dispatch("addComment", this.comment);
    },
    // REVIEW in the event comments need sorted by date.
    // commentSortAsc() {
    //   function compare(a, b) {
    //     if (a.updatedAt < b.updatedAt) return -1;
    //     if (a.updatedAt > b.updatedAt) return 1;
    //     return 0;
    //   }
    //   return this.comments.sort(compare);
    // },
    // commentSortDesc() {
    //   function compare(a, b) {
    //     if (a.updatedAt < b.updatedAt) return 1;
    //     if (a.updatedAt > b.updatedAt) return -1;
    //     return 0;
    //   }
    //   return this.comments.sort(compare);
    // },
    toggleEditForm() {
      this.editForm = !this.editForm;
    },
    editComment() {
      this.$store.dispatch("editComment", this.comment);
      this.editForm = false;
    },
    deleteComment() {
      swal({
        title: "Are you sure?",
        text:
          "Click 'Ok' to confirm you wish to delete this comment.  This action cannot be undone.",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          let data = this.$store.dispatch("deleteComment", this.comment.id);
          swal("Poof! Your comment has been deleted!", {
            icon: "success"
          });
          this.edit = false;
        } else {
          swal("Deletion cancelled");
        }
      });
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
img {
  border-radius: 13px;
}
.font-md {
  font-size: 1.7em;
}
.altColor {
  background-color: #dadada;
}
</style>