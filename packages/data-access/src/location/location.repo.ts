import { and, eq } from 'drizzle-orm';
import { db } from '../db/client';
import { locations } from '../entities';

export class LocationRepo {
  private _db;

  constructor() {
    this._db = db;
  }

  async findOrCreateLocation(
    latitude: number,
    longitude: number,
    regionId: number
  ) {
    try {
      const existingLocation = await this._db
        .select()
        .from(locations)
        .where(
          and(
            eq(locations.latitude, latitude),
            eq(locations.longitude, longitude)
          )
        )
        .limit(1);

      if (existingLocation.length > 0) {
        if (existingLocation[0].regionId !== regionId) {
          const updatedLocation = await this._db
            .update(locations)
            .set({ regionId })
            .where(eq(locations.id, existingLocation[0].id))
            .returning();

          return updatedLocation[0];
        }
        return existingLocation[0];
      }

      const newLocation = await this._db
        .insert(locations)
        .values({
          regionId,
          latitude,
          longitude,
        })
        .returning();

      return newLocation[0];
    } catch (error) {
      console.error('Error finding or creating location:', error);
      throw error;
    }
  }
}
