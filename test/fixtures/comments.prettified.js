const commentsOrderShouldBePreserved = {
  // field12
  field12: 1,
  // field10
  field10: 10000,
  // field13
  field13: 99999999999,
  // field14 avant avant
  // field14 avant
  field14: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // même ligne que field14
  // field20
  field20: 'a long string that is very long and should not be split into multiple lines', // field15
  field15: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40,
  ],
  field31: () => {
    console.log('line')
  }, // field30
  field30: () => {
    console.log('yo thats a function how is it going to react')
  },
  field32: () => {
    console.log('line')
    console.log('line')
  },
  field33: () => {
    console.log('line')
    console.log('line')
    console.log('line')
  }, // field34
  field34: () => {
    console.log('line')
    console.log('line')
    console.log('line')
    console.log('line')
    console.log('line')
  }, // field35.1
  // field35.2
  // field35.3
  field35: (a, b) => {
    const c = a + b
    const retval = { value: a, longNameButSmallValue: c, short: 'aerijboijroijeroijerg' }
    return b
  }, // commentaire après field35
}
