export const modifyContent = (content: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')

  // Modify <a> tags
  const links = doc.querySelectorAll('a')
  links.forEach(link => {
    link.setAttribute('target', '_blank')
  })

  // Modify <img> tags
  const images = doc.querySelectorAll('img')
  images.forEach(img => {
    if (img.getAttribute('loading') === 'lazy') {
      img.removeAttribute('loading')
    }
    img.removeAttribute('role')
  })

  const serializer = new XMLSerializer()
  return serializer.serializeToString(doc.body)
}

export const convertHtmlToText = (content: string) =>{
  content.replace(/<[^>]*>/g, '')
}
export const firstAttachment = (post: Post): Attachment | undefined =>
  post.attachments[Object.keys(post.attachments)[0]]
