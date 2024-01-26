export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface IFilter {
  all: string
  men: string
  women: string
}

export interface ISort {
  a_z: string
  z_a: string
  highest: string
  lowest: string
  top_rated: string
  most_reviewed: string
  relevance: string
}
