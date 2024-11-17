<template>
  <div class="container">
    <header class="header">
      <img
        v-if="country"
        :src="getFlagImage(country.name)"
        alt="Flag"
        class="flag"
        @error="onImageError"
      />
      <h1>{{ country?.name }}</h1>
    </header>
    <section v-if="country" class="medal-section">
      <div class="medal">
        <span class="medal-label">Gold:</span>
        <span class="medal-value">{{ country.gold }}</span>
      </div>
      <div class="medal">
        <span class="medal-label">Silver:</span>
        <span class="medal-value">{{ country.silver }}</span>
      </div>
      <div class="medal">
        <span class="medal-label">Bronze:</span>
        <span class="medal-value">{{ country.bronze }}</span>
      </div>
      <div class="medal">
        <span class="medal-label">Total:</span>
        <span class="medal-value">{{ totalMedals(country) }}</span>
      </div>
    </section>
    <section v-if="country" class="sports-section">
      <h2>Sports</h2>
      <ul>
        <li v-for="sport in country.sports" :key="sport.name" class="sport-item">
          <span class="sport-name">{{ sport.name }}</span>
          <span class="sport-medals">{{ sport.medals }}</span>
        </li>
      </ul>
    </section>
    <section class="comments-section">
      <h2>Comments</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.comment" class="comment-item">
          {{ comment.comment }}
        </li>
      </ul>
      <form @submit.prevent="addComment" class="comment-form">
        <input
          v-model="newComment"
          type="text"
          placeholder="Write a comment"
          class="comment-input"
        />
        <button type="submit" class="comment-button">Add Comment</button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOlympicStore } from '../store'

interface Country {
  name: string
  gold: number
  silver: number
  bronze: number
  sports: Array<{ name: string; medals: string }>
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useOlympicStore()

    const newComment = ref('')

    const country = computed<Country | undefined>(() => {
      return store.medalTable.find((c) => c.name === route.params.country) as Country | undefined
    })

    const comments = computed(() => {
      return store.comments.filter((c) => c.country === route.params.country)
    })

    const addComment = () => {
      if (newComment.value.trim()) {
        store.addComment(route.params.country as string, newComment.value)
        newComment.value = ''
      }
    }

    const totalMedals = (country: Country | undefined) => {
      if (country) {
        return country.gold + country.silver + country.bronze
      }
      return 0
    }

    const getFlagImage = (countryName: string): string => {
      const flagPath = `/images/${getCountryCode(countryName)}.png`
      console.log('Flag path:', flagPath) // 调试信息
      return flagPath
    }

    const getCountryCode = (countryName: string): string => {
      const countryCodeMap: { [key: string]: string } = {
        'United States': 'us',
        China: 'cn',
        Russia: 'ru',
        Japan: 'jp',
        Germany: 'de',
        Australia: 'au',
      }
      return countryCodeMap[countryName] || ''
    }

    const onImageError = (event: Event) => {
      const img = event.target as HTMLImageElement
      const countryValue = unref(country)
      console.warn(`Failed to load flag image for ${countryValue?.name}`)
    }

    return {
      country,
      comments,
      newComment,
      addComment,
      totalMedals,
      getFlagImage,
      onImageError,
    }
  },
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.flag {
  width: 50px;
  height: 30px;
  margin-right: 10px;
  border-radius: 5px;
}

h1 {
  font-size: 24px;
  color: #34495e;
}

.medal-section {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.medal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #ecf0f1;
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.medal:hover {
  transform: scale(1.05);
}

.medal-label {
  font-weight: bold;
  color: #34495e;
}

.medal-value {
  font-size: 18px;
  color: #2c3e50;
}

.sports-section {
  margin-bottom: 20px;
}

.sport-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #ecf0f1;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
}

.sport-item:hover {
  transform: scale(1.05);
}

.sport-name {
  font-weight: bold;
  color: #34495e;
}

.sport-medals {
  color: #2c3e50;
}

.comments-section {
  margin-bottom: 20px;
}

.comment-item {
  padding: 10px;
  background-color: #ecf0f1;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
}

.comment-item:hover {
  transform: scale(1.05);
}

.comment-form {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.comment-input {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
}

.comment-button {
  background-color: #34495e;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.comment-button:hover {
  background-color: #2c3e50;
}
</style>
