import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import axios from 'axios'

vi.mock('axios', () => {
  const mockAxios = vi.fn(() => Promise.resolve({ data: {} }))
  mockAxios.post = vi.fn(() => Promise.resolve({ data: { token: 'fake-token' } }))
  mockAxios.get = vi.fn(() => Promise.resolve({ data: {} }))
  return {
    default: mockAxios,
    __esModule: true
  }
})

describe('Login.vue', () => {
  it('Submit login form and test the form', async () => {
    const wrapper = mount(Login, {
      data() {
        return {
          email: 'test@test.com',
          password: 'qwe123'
        }
      }
    })

    await wrapper.find('form').trigger('submit.prevent')
    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/login', {
      email: 'test@test.com',
      password: 'qwe123'
    })
  })
})
