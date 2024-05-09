<template>
  <Layout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div v-if="tasks.length > 0" class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th class="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="task in tasks" :key="task.id">
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {{ task.title }}
                  </td>

                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    <span
                      :class="{
                        'text-green-500': task.status === 1,
                        'text-red-500': task.status === 0
                      }"
                    >
                      {{ task.status ? 'Completed' : 'Pending' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                    <router-link :to="'/tasks/' + task.id">See More</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <span class="text-gray-700 text-lg"
            >You don't have any tasks.
            <a class="text-green-700" href="/create">Create Your First Task</a></span
          >
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import jwtAxios from '@/services/axios'
import Layout from '@/components/Layout.vue'

export default {
  name: 'Homepage',
  components: {
    Layout
  },
  data() {
    return {
      tasks: []
    }
  },
  created() {
    this.fetchTasks()
  },
  methods: {
    fetchTasks() {
      jwtAxios
        .get('/tasks')
        .then((response) => {
          this.tasks = response.data
        })
        .catch((error) => {
          console.error('There was an error!', error)
        })
    }
  }
}
</script>
