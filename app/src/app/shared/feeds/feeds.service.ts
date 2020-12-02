import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/api-response.model';
import { environment } from 'src/environments/environment';
import { IArticle } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  constructor(private httpClient:HttpClient) { }

  postArticle(article:IArticle):Observable<IApiResponse>{
      return this.httpClient.post(`${environment.API_URL}/api/v1/articles/add`,article) as Observable<IApiResponse>;
  }

  deleteArticle(id){
    return this.httpClient.delete(`${environment.API_URL}/api/v1/articles/delete/${id}`) as Observable<IApiResponse>;;
  }


  updateArticle(id,article:IArticle):Observable<IApiResponse>{
     let _article={...article};
    return this.httpClient.put(`${environment.API_URL}/api/v1/articles/update/${id}`,_article) as Observable<IApiResponse>;
  }

  getAllArticles():Observable<IApiResponse>{
    return this.httpClient.get(`${environment.API_URL}/api/v1/articles`) as Observable<IApiResponse>;
  }

  getArticleById(id):Observable<IApiResponse>{
    return this.httpClient.get(`${environment.API_URL}/api/v1/articles/${id}`) as Observable<IApiResponse>;
  }

  getArticlesByAuthor(authorId):Observable<IApiResponse>{
    return this.httpClient.get(`${environment.API_URL}/api/v1/articles/author/${authorId}`) as Observable<IApiResponse>;

  }

  setFaturedArticle(userId,articleId):Observable<IApiResponse>{
    return this.httpClient.put(`${environment.API_URL}/api/v1/articles/featured/${userId}/${articleId}`,{}) as Observable<IApiResponse>;
  }

  getFeaturedArticle(userId):Observable<IApiResponse>{
    return this.httpClient.get(`${environment.API_URL}/api/v1/articles/featured/${userId}`,{}) as Observable<IApiResponse>;
  }
}
