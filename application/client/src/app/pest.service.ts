import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Pest } from './pest';
import { PESTS } from './mock-pests';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class PestService {

  constructor(private messageService: MessageService) { }

  getPests(): Observable<Pest[]> {
    const pests = of(PESTS);
    this.messageService.add('PestService: fetched pests');
    return pests;
  }

  getPest(id: number): Observable<Pest> {
    // For now, assume that a pest with the specified `id` always exists.
    // Error handling needs to be added.
    const pest = PESTS.find(h => h.id === id)!;
    this.messageService.add(`PestService: fetched pest id=${id}`);
    return of(pest);
  }
}