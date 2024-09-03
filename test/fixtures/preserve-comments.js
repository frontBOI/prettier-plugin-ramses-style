const object = {
  // 1
  field10: 10000,
  // 2
  field12: 1,
  // 3
  field13: 99999999999,
  // 4
  // 4
  field14: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  // 5
  field15: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26 ,27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  // 6
  field20: 'a long string that is very long and should not be split into multiple lines',
  // 7
  field30: () => { console.log('yo thats a function how is it going to react')},
  field32: () => { 
    console.log('line')
    console.log('line')
  },
  field31: () => { 
    console.log('line')
  },
  // 8
  field34: () => { 
    console.log('line')
    console.log('line')
    console.log('line')
    console.log('line')
    console.log('line')
  },
  field33: () => { 
    console.log('line')
    console.log('line')
    console.log('line')
  },
  // 9
  // 9
  // 9
  field35: (a, b) => { 
    const c = a + b
    
    const retval = {
      value: a,
      short: 'aerijboijroijeroijerg',
      longNameButSmallValue: c
    }
    
    return b
  }
  // 10
}