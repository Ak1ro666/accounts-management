export function delay(time: number) {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('done')
    }, time)
  })
}
