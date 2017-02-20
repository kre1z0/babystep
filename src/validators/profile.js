export const normalizePostalCode = (value) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  return onlyNums
}

export default normalizePostalCode
