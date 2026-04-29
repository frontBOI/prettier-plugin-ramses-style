interface Test {
  name: string
  age: number
}

interface User {
  email: string
  firstName: string
  id: number
  lastName: string
  age: number
  address: { street: string; city: string; zip: string }
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
    name: 'John',
    age: 42,
  }

  return object
}
