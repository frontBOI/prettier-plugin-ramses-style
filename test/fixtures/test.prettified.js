function a() {
  const { bpm, name, date, tags, mood, image, genre, isSold, duration } = ctx.request.body
  const coversFolderPath = getFolderPath('covers')
  const beatsFolderPath = getFolderPath('beats')
  const coverFile = getFileByName(image, coversFolderPath)
  const audioFile = getFileByName(`${name}.mp3`, beatsFolderPath)

  if (!coverFile) {
    return ctx.notFoundError(`Impossible de trouver la cover de nom ${image}`)
  }

  if (!audioFile) {
    return ctx.notFoundError(`Impossible de trouver l'audio de nom ${name}.mp3`)
  }

  return {
    a,
    b,
    c,
    dd,
    verv,
    efefezf,
  }
}
