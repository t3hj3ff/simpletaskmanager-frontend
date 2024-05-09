<template>
  <div class="bg-gray-100 min-h-screen">
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center text-lg font-semibold">Task Management</div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >Homepage</a
              >
              <a
                href="/create"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >Create Task</a
              >
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <!-- Conditional rendering based on authentication -->
            <template v-if="isAuthenticated">
              <button
                @click="logout"
                class="text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700 transition ease-in-out duration-150 font-medium"
              >
                Logout
              </button>
            </template>
            <template v-else>
              <button
                @click="navigateToLogin"
                class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition ease-in-out duration-150 font-medium"
              >
                Login
              </button>
              <button
                @click="navigateToRegister"
                class="ml-4 text-blue-500 hover:text-blue-700 focus:outline-none focus:text-blue-700 transition ease-in-out duration-150 font-medium"
              >
                Register
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      isAuthenticated: false
    }
  },
  created() {
    this.checkAuth()
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem('token')
    },
    navigateToLogin() {
      this.$router.push('/login')
    },
    navigateToRegister() {
      this.$router.push('/register')
    },
    logout() {
      localStorage.removeItem('token')
      this.checkAuth()
      this.$router.push('/login')
    }
  }
}
</script>
