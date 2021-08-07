export const formatDate = (dateInMilliseconds: number): string => {
  const date = new Date(dateInMilliseconds)
  // const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  const hours = `0${date.getHours()}`.slice(-2)
  const minutes = `0${date.getMinutes()}`.slice(-2)

  const currentDay = `0${new Date().getDate()}`.slice(-2)

  if (day === currentDay) {
    return `${hours}:${minutes}`
  }

  return `${day}/${month} ${hours}:${minutes}`
}
