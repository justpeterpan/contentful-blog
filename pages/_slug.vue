<template>
  <div class="rounded bg-white border-gray-200">
    <h1 class="font-black">{{ currentPost.title }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['currentPost', 'isLoadingPost']),
  },
}
</script>

<style></style>
