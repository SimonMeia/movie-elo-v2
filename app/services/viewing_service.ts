import Location from '#models/location'
import Partner from '#models/partner'
import { type UserId } from '#models/user'
import Viewing from '#models/viewing'
import { DateTime } from 'luxon'
class ViewingService {
  async createViewing(
    userId: UserId,
    date: Date,
    reviewId: number,
    locations: string[],
    partners: string[]
  ) {
    const viewing = await Viewing.create({
      viewingDate: DateTime.fromJSDate(date),
      reviewId,
    })

    for (const location of locations) {
      const dbLocation = await Location.firstOrCreate({ userId: userId, name: location })
      await viewing.related('locations').attach([dbLocation.id])
    }
    for (const partner of partners) {
      const dbPartner = await Partner.firstOrCreate({ userId: userId, name: partner })
      await viewing.related('partners').attach([dbPartner.id])
    }

    return viewing
  }
}

export default new ViewingService()
