# Frontend for Task Management Platform

This project is built using Node Version `20.11.0` &
Vue 3 Version (`3.4`) with Vite framework `5.2` version.

## Installation

Download ZIP or Clone this repository

Then run command

```bash
  npm install
```

If you need to know more details about Vite configuration learn more here:
[Vite Configuration Reference](https://vitejs.dev/config/).

In order to run frontend use this command:

```bash
  npm run dev
```

default address will be `http://localhost:5173/`

We are using Vitest as a testing framework.

There is Login form test case present at `@/components/__tests__/Login.spec.ts`, Configure
username and password accordingly in that file and run (make sure backend url is correct in your case):

```bash
  npm run test:unit
```
