<template>
  <section class="update-container">
    <form @submit.prevent="addUpdate">
      <el-input
        class="update-input"
        type="text"
        placeholder="Write an update.."
        v-model="updateToEdit.update"
      ></el-input>
      <div class="add-uptate-btns flex-between">
        <div 
          v-if="!isAddFile"
          @click="toggleAddFile"
          class="file-btn"
        ><i class="el-icon-paperclip"></i>Add File</div>
        <img-upload
          v-else
          @save="saveImg"
        ></img-upload>
        <el-button @click.native="addUpdate" size="small">Update</el-button>
      </div>
    </form>
    <div v-if="comments">
      <div
        class="comment-content"
        v-for="comment in comments"
        :key="comment.id"
      >
        <div class="member-content flex">
          <div class="flex-center">
            <el-avatar
              class="comment-avatar"
              :src="comment.byMember.imgUrl"
            ></el-avatar>
            <div class="comment-fullname">{{ comment.byMember.fullname }}</div>
          </div>
          <div class="comment-time">{{ comment.createdAt | moment }}</div>
        </div>
        <div class="comment-update">{{ comment.update }}</div>
        <img v-if="comment.file" :src="comment.file">
        <div class="btns flex">
          <div class="like-btn flex-center">Like</div>
          <div class="reply-btn flex-center">Reply</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import imgUpload from "./img-upload.cmp.vue"
var moment = require("moment");

export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      updateToEdit: {
        update: null,
        file: null,
        createdAt: null,
        byMember: null,
      },
      isAddFile: false,
    };
  },
  filters: {
    moment(timestamp) {
      return moment(timestamp).fromNow();
    },
  },
  methods: {
    addUpdate() {
      this.updateToEdit.createdAt = Date.now();
      this.$emit('addUpdate', this.updateToEdit);
      this.updateToEdit = {
        update: null,
        file: null,
        createdAt: null,
        byMember: null,
      }
    },
    toggleAddFile() {
      this.isAddFile = !this.isAddFile;
    },
    saveImg(imgUrl) {
      this.updateToEdit.file = imgUrl

    },
  },
  components: {
    imgUpload
  }
};
</script>

