export const maskNumber = num => {
  const str = num && num.toString()
  if (num && num.length < 4) return num // just in case
  const start = str && str?.slice(0, 1)
  const end = str && str?.slice(-1)
  return num ? `${start}********${end}` : `*******`
}
