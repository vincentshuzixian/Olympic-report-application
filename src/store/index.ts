// src/store/index.ts
import { createPinia, defineStore } from 'pinia'
import { ref } from 'vue'

export const useOlympicStore = defineStore('olympic', () => {
  const medalTable = ref([
    {
      name: 'United States',
      gold: 39,
      silver: 41,
      bronze: 33,
      sports: [
        { name: 'Athletics', medals: 'Gold: 10, Silver: 8, Bronze: 5' },
        { name: 'Swimming', medals: 'Gold: 12, Silver: 10, Bronze: 8' },
      ],
    },
    {
      name: 'China',
      gold: 38,
      silver: 32,
      bronze: 18,
      sports: [
        { name: 'Diving', medals: 'Gold: 5, Silver: 3, Bronze: 2' },
        { name: 'Gymnastics', medals: 'Gold: 4, Silver: 2, Bronze: 1' },
      ],
    },
    {
      name: 'Russia',
      gold: 20,
      silver: 28,
      bronze: 23,
      sports: [
        { name: 'Wrestling', medals: 'Gold: 3, Silver: 4, Bronze: 2' },
        { name: 'Artistic Gymnastics', medals: 'Gold: 2, Silver: 3, Bronze: 1' },
      ],
    },
    {
      name: 'Japan',
      gold: 27,
      silver: 14,
      bronze: 17,
      sports: [
        { name: 'Judo', medals: 'Gold: 6, Silver: 2, Bronze: 1' },
        { name: 'Baseball/Softball', medals: 'Gold: 1, Silver: 0, Bronze: 0' },
      ],
    },
    {
      name: 'Germany',
      gold: 10,
      silver: 11,
      bronze: 16,
      sports: [
        { name: 'Cycling', medals: 'Gold: 2, Silver: 3, Bronze: 1' },
        { name: 'Canoeing', medals: 'Gold: 2, Silver: 1, Bronze: 2' },
      ],
    },
    {
      name: 'Australia',
      gold: 17,
      silver: 7,
      bronze: 22,
      sports: [
        { name: 'Swimming', medals: 'Gold: 9, Silver: 3, Bronze: 6' },
        { name: 'Cycling', medals: 'Gold: 2, Silver: 2, Bronze: 2' },
      ],
    },
  ])

  const comments = ref<{ country: string; comment: string }[]>([])

  function addComment(country: string, comment: string) {
    comments.value.push({ country, comment })
  }

  return { medalTable, comments, addComment }
})

const pinia = createPinia()
export default pinia
