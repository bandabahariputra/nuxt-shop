import type { IFilter, IProduct, ISort } from '~/types'

export const useProductStore = defineStore('product', () => {
  const filters: IFilter = {
    all: 'all',
    men: "men's clothing",
    women: "women's clothing",
  }

  const sorts: ISort = {
    relevance: 'Relevance',
    a_z: 'A - Z',
    z_a: 'Z - A',
    highest: 'Highest Price',
    lowest: 'Lowest Price',
    top_rated: 'Top Rated',
    most_reviewed: 'Most Reviewed',
  }

  const products = ref<IProduct[] | null>()

  const selectedFilter = ref<keyof IFilter>('all')
  const selectedSort = ref<keyof ISort>('relevance')

  const filteredProducts = computed(() => {
    if (!products.value) {
      return null
    }

    const filtered = products.value.filter((product) => {
      const matchesCategory =
        selectedFilter.value === 'all' ||
        product.category === filters[selectedFilter.value]

      return matchesCategory
    })

    switch (selectedSort.value) {
      case 'a_z':
        return filtered.slice().sort((a, b) => a.title.localeCompare(b.title))
      case 'z_a':
        return filtered.slice().sort((a, b) => b.title.localeCompare(a.title))
      case 'highest':
        return filtered.slice().sort((a, b) => b.price - a.price)
      case 'lowest':
        return filtered.slice().sort((a, b) => a.price - b.price)
      case 'top_rated':
        return filtered.slice().sort((a, b) => b.rating.rate - a.rating.rate)
      case 'most_reviewed':
        return filtered.slice().sort((a, b) => b.rating.count - a.rating.count)
      case 'relevance':
      default:
        return filtered
    }
  })

  const fetchProducts = async () => {
    const { data: results } = await useFetch<IProduct[]>('/api/product')

    products.value = results.value
  }

  return {
    products,
    filteredProducts,
    filters,
    selectedFilter,
    sorts,
    selectedSort,
    fetchProducts,
  }
})
