interface Test {
  name: string
  age: number
}

// @ts-ignore
async function test(): Promise<Test> {
  const object: Test = {
    name: 'John',
    age: 42,
  }

  return object
}
