const initialState = {
  foundClassList: [],
}

const reducerMap = {
  multipeer: {
    set: (state, action) => {
      return {
        ...state,
        searchPage: {
          foundClassList: [{
            title: '小海豚MV舞蹈課程123',
            teacher: '蔡丞昊',
            color: 'red',
          }, {
            title: '印尼文化史',
            teacher: '宋玉美',
            color: 'blue',
          }, {
            title: '佛教經義賞析',
            teacher: '陳秉珏',
            color: 'green',
          }],
        },
      }
    },
  },
}

export default { reducerMap, initialState }
