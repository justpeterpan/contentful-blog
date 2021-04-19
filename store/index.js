import gql from 'graphql-tag'

export const state = () => ({
  posts: null,
  currentPost: null,
  isLoadingPost: false,
})

export const mutations = {
  updatePosts: (state, posts) => {
    state.posts = posts
  },
  updateCurrentPost: (state, post) => {
    state.currentPost = post
  },
  updateIsLoadingPost: (state, payload) => {
    state.isLoadingPost = payload
  },
}

export const actions = {
  async getPosts({ commit }) {
    const response = await this.app.apolloProvider.defaultClient.query({
      query: gql`
        {
          blogPostCollection {
            total
            items {
              title
              slug
              publishDate
              sys {
                id
              }
            }
          }
        }
      `,
    })
    await commit('updatePosts', response.data.blogPostCollection.items)
  },

  async getPostById({ commit }, id) {
    await commit('updateIsLoadingPost', true)
    const response = await this.app.apolloProvider.defaultClient.query({
      query: gql`
        {
          blogPost(id: "${id}") {
            title
            slug
            body
            publishDate
            sys {
              id
            }
          }
        }
      `,
    })
    await commit('updateCurrentPost', response.data.blogPost)
    await commit('updateIsLoadingPost', false)
  },
}
