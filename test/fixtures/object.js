function useLocalStorage() {
  const a = 1, aa = 2, aaa = 3, aaaa = 4, aaaaa = 5

  function aaaaaa() {}
  function aaaaaaa() {}
  function aaaaaaaa() {}
  function aaaaaaaaa() {}
  function aaaaaaaaaa() {}
  function aaaaaaaaaaa() {}
  function aaaaaaaaaaaa() {}
  function aaaaaaaaaaaaa() {}
  function aaaaaaaaaaaaaa() {}

  return {
    aaaaaaaaaaa,
    a,
    aaaaaaaaaaaa,
    aaaa,
    aaaaaaaaaaa,
    aaa,
    aaaaaaaa,
    aa,
    aaaaaaa,
    aaaaaaaaaaaa,
    aaaaaa,
    aaaaa,
    aaaaaaaaaaaaaa,
    aaaaaaaaa,
    aaaaaaaaaaaaa,
    aaaaaaaaaa,
  }
}

function manyObjectProperties() {
  const {
    aaaaaaaaaaa,
    a,
    aaaa,
    aaa,
    aaaaaaaa,
    aa,
    aaaaaaaaaaaa,
    aaaaaa,
    aaaaaaaaaaaaaa,
    aaaaaaaaa,
    aaaaaaaaaaaaa,
    aaaaaaaaaa,
  } = useLocalStorage()

  const anObjectWithManyDifferentProperties = {
    field10: 10000,
    field12: 1,
    field13: 99999999999,
    field14: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    field15: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26 ,27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    field20: 'a long string that is very long and should not be split into multiple lines',
    field30: () => { console.log('yo thats a function how is it going to react')},
    field32: () => { 
      console.log('line')
      console.log('line')
    },
    field31: () => { 
      console.log('line')
    },
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
    field35: (a, b) => { 
      const c = a + b

      const retval = {
        value: a,
        short: 'aerijboijroijeroijerg',
        longNameButSmallValue: c
      }

      return b
    }
  }

  const { bbbbbbbbbbb, bbb, bbbb, bbbbb, bbbbbb, bbbbbbbbbb, bbbbbbb, bbbbbbbb, bbbbbbbbb, bbbbbbbbbbbb, bbbbbbbbbbbbb, b, bb, bbbbbbbbbbbbbb, bbbbbbbbbbbbbbb } = useLocalStorage()

  return {
    aaaaaaaaaaaaaa,
    aa,
    aaaaaaaaaaaa,
    aaa,
    aaaaaaaaa,
    aaaaaa,
    aaaaaaaaaa,
    aaaaaaaa,
    aaaa,
    aaaaaaaaaaaaa,
    aaaaaaaaaaa,
    a,
  }
}
