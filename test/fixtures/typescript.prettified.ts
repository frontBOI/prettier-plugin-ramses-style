interface Test {
  name: string
  age: number
}

// @ts-ignore
async function test(): Promise<Test> {
  const object: Test = {
    age: 42,
    name: 'John',
  }

  return object
}
