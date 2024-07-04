export { Post };

declare global {
  interface Post {
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
