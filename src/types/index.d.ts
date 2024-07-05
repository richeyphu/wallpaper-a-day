export { GetPosts, Post };

declare global {
  interface GetPosts {
    found: number;
    posts: Post[];
  }

  interface Post {
    ID: number;
    date: Date;
    modified: Date;
    title: string;
    content: HTMLBodyElement;
    URL: string;
    attachments: {
      [key: string]: {
        URL: string;
        thumbnails: {
          thumbnail: string;
          medium: string;
          large: string;
        };
      };
    };
  }
}
