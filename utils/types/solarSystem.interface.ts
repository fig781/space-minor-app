import { Planet } from "./planet.interface"

export interface SolarSystem {
  id: number
  name: string,
  image_path: string,
  planets: Planet[]
}