interface Test {
  age: number
  name: string
}

interface User {
  id: number
  age: number
  email: string
  lastName: string
  firstName: string
  address: { zip: string; city: string; street: string }
}

type Config = {
  apiUrl: string
  debug: boolean
  timeout: number
  retryCount: number
  longPropertyNameHere: string
}

// @ts-ignore
async function test(): Promise<Test> {
  const object: Test = {
    age: 42,
    name: 'John',
  }

  return object
}
