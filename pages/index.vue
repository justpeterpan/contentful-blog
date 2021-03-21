<template>
  <div class="flex flex-col min-h-screen m-auto">
    <section
      v-for="post in posts"
      :key="post.fields.slug"
      class="flex flex-row px-2 py-2"
    >
      <h2>
        <nuxt-link :to="post.fields.slug">{{ post.fields.title }}</nuxt-link>
      </h2>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.state.posts
    },
  },
  head: {
    title: 'just a test',
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
