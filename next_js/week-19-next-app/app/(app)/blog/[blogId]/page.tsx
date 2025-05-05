import React from 'react'

const page = async({params} : any) => {
  const postId = await params.blogId
  return (
    <div>Blog</div>
  )
}

export default page