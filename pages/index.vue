<template>
  <div class="flex flex-col min-h-screen m-auto">
    <section
      v-for="(post, index) in posts"
      :key="index"
      class="grid grid-cols-1 px-2 py-2 border border-gray bg-white hover:bg-blue-300 hover:text-white cursor-pointer m-1 rounded"
      @click="fetchPost(post.sys.id)"
    >
      <h2 class="m-2">
        <nuxt-link :to="post.slug" class="font-black">{{
          post.title
        }}</nuxt-link>
        <p class="font-thin">{{ post.publishDate }} | {{ post.sys.id }}</p>
      </h2>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  head: {
    title: 'just a test',
  },
  computed: {
    ...mapState(['posts']),
  },
  methods: {
    ...mapActions(['getPostById']),
    fetchPost(id) {
      this.getPostById(id)
    },
  },
}
</script>
