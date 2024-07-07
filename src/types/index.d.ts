export { GetPosts, Post }

declare global {
  interface GetPostsResponse {
    found: number
    posts: Post[]
  }

  interface Post {
    ID: number
    date: Date
    modified: Date
    title: string
    content: string
    URL: string
    attachments: {
      [key: string]: {
        URL: string
        thumbnails: {
          thumbnail: string
          medium: string
          large: string
        }
      }
    }
  }
}
