import _ from 'lodash'

/*
* 合并对象的交集，以第一个对象为基础，将第二个对象的值合并到第一个对象中
* */
export function mergeIntersection(oldValue, newValue) {
  const tempOldValue = _.cloneDeep(oldValue)
  const tempNewValue = _.cloneDeep(newValue)
  _.forIn(tempOldValue, (value, key) => {
    if (_.has(tempNewValue, key)) {
      if (_.isObject(tempOldValue[key]) && !_.isArray(tempOldValue[key])) {
        tempOldValue[key] = mergeIntersection(tempOldValue[key], tempNewValue[key])
      } else {
        tempOldValue[key] = tempNewValue[key]
      }
    }
  })
  return tempOldValue
}

/*
* file文件转换base64
* */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reads = new FileReader()
    reads.readAsDataURL(file)
    reads.onload = () => {
      resolve(reads.result)
    }
    reads.onerror = (err) => {
      reject(err)
    }
  })
}
