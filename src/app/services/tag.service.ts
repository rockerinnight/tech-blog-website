import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URL } from '../helpers/constants';
import { Tags } from '../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}

  /**
   * Return a list of tags
   */
  getTags(): Observable<Tags> {
    return this.http.get<Tags>(`${URL.API}/tags`);
  }
}
