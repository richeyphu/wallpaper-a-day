export { GetPosts, Post, Attachment }

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
    attachments: { [key: string]: Attachment } | Record<string, never>
  }

  interface Attachment {
    URL: string
    thumbnails: {
      thumbnail: string
      medium: string
      large: string
    }
  }
}
