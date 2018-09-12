import memoize from 'memoize-one'

const toJS =  data => {
  if (data && data.toJS) {
    return data.toJS()
  } else {
    return data
  }
}

export default memoize(toJS)
