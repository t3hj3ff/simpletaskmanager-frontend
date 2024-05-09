<template>
  <Layout>
    <div class="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-xl font-bold text-gray-700 mb-6">Create Task</h1>
      <form @submit.prevent="createTask" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
          <input
            id="title"
            v-model="title"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700"
            >Description:</label
          >
          <textarea
            id="description"
            v-model="description"
            rows="3"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label for="due_date" class="block text-sm font-medium text-gray-700">Due Date:</label>
          <input
            id="due_date"
            type="date"
            v-model="due_date"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Task
        </button>
      </form>
    </div>
  </Layout>
</template>

<script>
import jwtAxios from '@/services/axios'
import Layout from '@/components/Layout.vue'

export default {
  data() {
    return {
      title: '',
      description: '',
      due_date: ''
    }
  },
  components: {
    Layout
  },
  methods: {
    createTask() {
      const userId = localStorage.getItem('userId')
      const task = {
        owner_id: userId,
        title: this.title,
        description: this.description,
        due_date: this.due_date
      }
      jwtAxios
        .post('/tasks', task)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.error('There was an error creating the task!', error)
        })
    }
  }
}
</script>
