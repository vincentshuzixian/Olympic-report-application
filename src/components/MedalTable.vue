<template>
  <div class="container">
    <h1>Olympic Medal Table</h1>
    <input
      v-model="searchCountry"
      type="text"
      placeholder="Search by country name"
      @keyup.enter="navigateToCountry"
    />
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Gold</th>
          <th>Silver</th>
          <th>Bronze</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="country in paginatedCountries"
          :key="country.name"
          @click="showCountryDetails(country.name)"
        >
          <td>
            <span>{{ country.name }}</span>
            <img :src="getFlagImage(country.name)" alt="Flag" class="flag" />
          </td>
          <td>{{ country.gold }}</td>
          <td>{{ country.silver }}</td>
          <td>{{ country.bronze }}</td>
          <td>{{ totalMedals(country) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useOlympicStore } from '../store'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useOlympicStore()
    const router = useRouter()
    const countriesPerPage = 5
    const currentPage = ref(1)
    const searchCountry = ref('')

    const paginatedCountries = computed(() => {
      const start = (currentPage.value - 1) * countriesPerPage
      const end = start + countriesPerPage
      return store.medalTable.slice(start, end)
    })

    const totalPages = computed(() => {
      return Math.ceil(store.medalTable.length / countriesPerPage)
    })

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const showCountryDetails = (countryName: string) => {
      router.push(`/country/${countryName}`)
    }

    const totalMedals = (country: { gold: number; silver: number; bronze: number }) => {
      return country.gold + country.silver + country.bronze
    }

    const navigateToCountry = () => {
      const foundCountry = store.medalTable.find(
        (country) => country.name.toLowerCase() === searchCountry.value.toLowerCase(),
      )
      if (foundCountry) {
        router.push(`/country/${foundCountry.name}`)
      } else {
        alert('Country not found')
      }
    }

    const getFlagImage = (countryName: string) => {
      const flagMap = {
        'United States': '/images/us.png',
        China: '/images/cn.png',
        Russia: '/images/ru.png',
        Japan: '/images/jp.png',
        Germany: '/images/de.png',
        Australia: '/images/au.png',
      }

      // 使用类型断言
      return flagMap[countryName as keyof typeof flagMap] || '/images/default-flag.png'
    }

    return {
      paginatedCountries,
      currentPage,
      searchCountry,
      prevPage,
      nextPage,
      showCountryDetails,
      totalMedals,
      navigateToCountry,
      getFlagImage,
      totalPages,
    }
  },
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1,
h2 {
  color: #34495e;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #34495e;
  color: white;
}

tr:hover {
  background-color: #f1f1f1;
}

button {
  background-color: #34495e;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 5px;
  border-radius: 5px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #2c3e50;
}

input[type='text'] {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

.flag {
  width: 20px;
  height: 15px;
  vertical-align: middle;
  margin-left: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>
