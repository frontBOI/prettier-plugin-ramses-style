function useLocalStorage() {
  const a = 1,
    aa = 2,
    aaa = 3,
    aaaa = 4,
    aaaaa = 5

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
    a,
    aa,
    aaa,
    aaaa,
    aaaaa,
    aaaaaa,
    aaaaaaa,
    aaaaaaaa,
    aaaaaaaaa,
    aaaaaaaaaa,
    aaaaaaaaaaa,
    aaaaaaaaaaa,
    aaaaaaaaaaaa,
    aaaaaaaaaaaa,
    aaaaaaaaaaaaa,
    aaaaaaaaaaaaaa,
  }
}

function manyObjectProperties() {
  const {
    a,
    aa,
    aaa,
    aaaa,
    aaaaaa,
    aaaaaaaa,
    aaaaaaaaa,
    aaaaaaaaaa,
    aaaaaaaaaaa,
    aaaaaaaaaaaa,
    aaaaaaaaaaaaa,
    aaaaaaaaaaaaaa,
  } = useLocalStorage()

  const anObjectWithManyDifferentProperties = {
    field12: 1,
    field10: 10000,
    field13: 99999999999,

    field14: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    field20: 'a long string that is very long and should not be split into multiple lines',
    field15: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      32, 33, 34, 35, 36, 37, 38, 39, 40,
    ],
    field31: () => {
      console.log('line')
    },
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
    },
    field34: () => {
      console.log('line')
      console.log('line')
      console.log('line')
      console.log('line')
      console.log('line')
    },
    field35: (a, b) => {
      const c = a + b
      const retval = { value: a, longNameButSmallValue: c, short: 'aerijboijroijeroijerg' }
      return b
    },
  }

  const {
    b,
    bb,
    bbb,
    bbbb,
    bbbbb,
    bbbbbb,
    bbbbbbb,
    bbbbbbbb,
    bbbbbbbbb,
    bbbbbbbbbb,
    bbbbbbbbbbb,
    bbbbbbbbbbbb,
    bbbbbbbbbbbbb,
    bbbbbbbbbbbbbb,
    bbbbbbbbbbbbbbb,
  } = useLocalStorage()

  return {
    a,
    aa,
    aaa,
    aaaa,
    aaaaaa,
    aaaaaaaa,
    aaaaaaaaa,
    aaaaaaaaaa,
    aaaaaaaaaaa,
    aaaaaaaaaaaa,
    aaaaaaaaaaaaa,
    aaaaaaaaaaaaaa,
  }
}
