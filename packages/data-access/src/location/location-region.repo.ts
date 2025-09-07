import { and, sql } from 'drizzle-orm';
import { db } from '../db/client';
import { locationRegions } from '../entities';

export class LocationRegionRepo {
  private _db;

  constructor() {
    this._db = db;
  }

  async findNearbyRegion(latitude: number, longitude: number) {
    const RADIUS_KM = 25;

    const latitudeRadiusKm = RADIUS_KM / 111;
    const longitudeRadiusKm =
      RADIUS_KM / (111 * Math.cos((latitude * Math.PI) / 180));

    const regions = await this._db
      .select()
      .from(locationRegions)
      .where(
        and(
          sql`ABS(${locationRegions.masterLatitude} - ${latitude}) < ${latitudeRadiusKm}`,
          sql`ABS(${locationRegions.masterLongitude} - ${longitude}) < ${longitudeRadiusKm}`
        )
      )
      .limit(1);

    return regions.length > 0 ? regions[0] : null;
  }

  async createRegion(masterLatitude: number, masterLongitude: number) {
    try {
      const newRegion = await this._db
        .insert(locationRegions)
        .values({
          masterLatitude,
          masterLongitude,
        })
        .returning();

      return newRegion[0];
    } catch (error) {
      console.error('Error creating location region:', error);
      throw error;
    }
  }

  async findOrCreateRegion(latitude: number, longitude: number) {
    try {
      const existingRegion = await this.findNearbyRegion(latitude, longitude);

      if (existingRegion) {
        return existingRegion;
      }

      return await this.createRegion(latitude, longitude);
    } catch (error) {
      console.error('Error finding or creating region:', error);
      throw error;
    }
  }
}
