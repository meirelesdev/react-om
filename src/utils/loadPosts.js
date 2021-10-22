export const loadPosts = async () => {
  const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts")
  const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos")
  
  const [ posts, photos ] = await Promise.all([
    postsResponse,
    photosResponse
  ])
  const [ postsJson, photosJson ] = await Promise.all([
    posts.json(),
    photos.json()
  ])
  return postsJson.map((post, index)=>{
    return {...post, cover: photosJson[index].url}
  })
}