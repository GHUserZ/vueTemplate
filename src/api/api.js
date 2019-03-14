const prefix = process.env.BASE_API // api地址前缀

export default (config => {
  return Object.keys(config).reduce((copy, name) => {
    copy[name] = `${prefix}${config[name]}`
    return copy
  }, {})
})({
  'queryIndexColumns':'/xinan/func/common/queryIndexColumns',
  'queryColumnChildMap':'/xinan/func/common/queryColumnChildMap'
})