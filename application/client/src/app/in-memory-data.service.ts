import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Pest } from './pest';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const pests: Pest[] = [
      { id: 12, name: 'Ants' },
      { id: 13, name: 'Rats' },
      { id: 14, name: 'Centipedes' },
      { id: 15, name: 'Mice' },
      { id: 16, name: 'Roaches' },
      { id: 17, name: 'Silverfish' },
      { id: 18, name: 'Termites' },
      { id: 19, name: 'Spiders' },
      { id: 20, name: 'Racoons' },
      { id: 21, name: 'Moths' },
    ];
    return {pests};
  }

  // Overrides the genId method to ensure that a pest always has an id.
  // If the pests array is empty,
  // the method below returns the initial number (11).
  // if the pests array is not empty, the method below returns the highest
  // pest id + 1.
  genId(pests: Pest[]): number {
    return pests.length > 0 ? Math.max(...pests.map(pest => pest.id)) + 1 : 11;
  }
}