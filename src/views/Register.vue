<template>
  <Layout>
    <div class="max-w-sm mx-auto my-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Register</h1>
      <form @submit.prevent="register" class="space-y-4">
        <div>
          <input
            v-model="name"
            type="text"
            placeholder="Name"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios'
import Layout from '@/components/Layout.vue'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  components: {
    Layout
  },
  methods: {
    register() {
      axios
        .post('http://127.0.0.1:8000/api/register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userId', response.data.user.id)
          this.$router.push('/login')
        })
        .catch((error) => {
          alert('Error during registration!')
        })
    }
  }
}
</script>
