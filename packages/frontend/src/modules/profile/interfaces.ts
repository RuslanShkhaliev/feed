export interface CreatedPostDto {
  content: string
  images: string[]
}

export interface PostDto {
  id: number
  authorId: number
  content: string
  images: string[]
  createdAt: Date
}
