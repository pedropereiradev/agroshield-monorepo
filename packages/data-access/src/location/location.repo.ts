import { and, eq } from 'drizzle-orm';
import { db } from '../db/client';
import { locations } from '../entities';

export class LocationRepo {
  private _db;

  constructor() {
    this._db = db;
  }

  async findOrCreateLocation(latitude: number, longitude: number) {
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
        return existingLocation[0];
      }

      const newLocation = await this._db
        .insert(locations)
        .values({
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
