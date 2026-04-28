export default factories.createCoreService('api::beat.beat', ({ strapi }) => ({
  async getProspectAvailableBeats() {
    await computeLoweredBitrateForRecentBeat(strapi)

    const availableBasicBeats = await strapi.query('api::beat.beat').findMany({
      where: { sentToProspects: false, placement: null, canBeSold: true, loweredBitrateSize: { $ne: null } },
      populate: ['image', 'audioFile'],
    })

    const availableAgainBeats = await strapi.query('api::beat.beat').findMany({
      where: { can_be_sent_again: true, placement: null, canBeSold: true, loweredBitrateSize: { $ne: null } },
      populate: ['image', 'audioFile'],
    })

    const availableBeats = [...availableBasicBeats, ...availableAgainBeats]
    const uniqueBeats = availableBeats
      .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // chronologique

    // on ne renvoie que les prods qui ne sont pas déjà dans un next sending, peu importe à quel ordonnanceur il est lié
    const sendingsToCome = await strapi.db.query('api::ordonnanceur-sending.ordonnanceur-sending').findMany({
      where: {
        isDone: false,
      },
      populate: ['beats', 'beats.image', 'beats.audioFile'],
    })

    if (sendingsToCome.length > 0) {
      const allBeatsToSend = sendingsToCome.reduce((prev, cur) => prev.concat(cur.beats), [])
      return uniqueBeats.filter(beat => !allBeatsToSend.find(b => b.id === beat.id))
    }

    return uniqueBeats
  },
}))
