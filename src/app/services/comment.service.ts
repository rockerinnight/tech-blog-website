import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { URL } from '../helpers/constants';

import { SingleComment } from '../models/single-comment.model';
import { MultiComments } from '../models/multi-comments.model';
import { SingleCommentDto } from '../models/single-comment-dto.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  /**
   * Get comments from an article
   * @return Return a list of comments
   * @param slug Id of the selected article
   */
  getComments(slug: string): Observable<MultiComments> {
    return this.http.get<MultiComments>(`${URL.API}/articles/${slug}/comments`);
  }

  /**
   * Add a comment to an article
   * @return Return the created comment
   * @param slug Id of the selected article
   */
  addComment(slug: string, body: SingleCommentDto): Observable<SingleComment> {
    return this.http.post<SingleComment>(
      `${URL.API}/articles/${slug}/comments`,
      body
    );
  }

  /**
   * Delete a comment to an article
   * @param slug Id of the selected article
   * @param cmtId Id of the deleted comment
   */
  deleteComment(slug: string, cmtId: number): Observable<any> {
    return this.http.delete<any>(
      `${URL.API}/articles/${slug}/comments/${cmtId}`
    );
  }
}
