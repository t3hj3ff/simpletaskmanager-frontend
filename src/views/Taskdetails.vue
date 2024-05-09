<template>
  <Layout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div v-if="task">
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
                  Description
                </th>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Due Date
                </th>
                <th class="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                  {{ task.title }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                  {{ task.description }}
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
                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                  {{ task.due_date }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                  <label class="switch">
                    <input
                      type="checkbox"
                      :checked="task.status === 'Complete'"
                      @change="toggleStatus(task)"
                    />
                    <span class="slider round"></span>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>Task not found.</p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import jwtAxios from '@/services/axios'
import Layout from '@/components/Layout.vue'

export default {
  data() {
    return {
      task: null
    }
  },
  components: {
    Layout
  },
  methods: {
    fetchTask() {
      jwtAxios
        .get(`/tasks/${this.$route.params.id}`)
        .then((response) => {
          this.task = response.data
        })
        .catch((error) => {
          console.error('There was an error fetching the task!', error)
        })
    },
    toggleStatus() {
      const newStatus = { status: !this.task.status }
      jwtAxios
        .put(`/tasks/${this.$route.params.id}`, newStatus)
        .then((response) => {
          this.task = response.data
        })
        .catch((error) => {
          console.error('There was an error updating the task!', error)
        })
    }
  },
  created() {
    this.fetchTask()
  }
}
</script>
<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #10b981; /* Tailwind CSS green-500 */
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Optional: styles for focus state to increase accessibility */
input:focus + .slider {
  box-shadow: 0 0 1px #10b981;
}
</style>
