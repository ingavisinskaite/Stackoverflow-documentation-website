import { Observable } from 'rxjs';
import {  TopicHistories,
  DocTagVersions,
  Examples,
  Doctags,
  Topics,
  TopicsData,
  Contributors } from '../models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor(private _http: HttpClient) { }

  public addDoctag(data: {name: string, tag: string}) {
    const url = 'http://localhost:1337/Doctags';
    return this._http.post<any>(url, data);
  }

  public addTopic(data: TopicsData) {
    const url = 'http://localhost:1337/Topics';
    return this._http.post<any>(url, data);
  }

  public getDoctags(): Promise<Array<Doctags>> {
    const url = 'http://localhost:1337/Doctags';
    return this._http.get<Array<Doctags>>(url).toPromise();
  }

  public getTopic(id: string): Observable<Topics> {
    const url = 'http://localhost:1337/Topic/' + id;
    return this._http.get<Topics>(url);
  }

  public getTopics(id: string | number, topicsFrom: number, topicsTo: number, orderBy: string, direction: string): Promise<Array<Topics>> {
    const url = 'http://localhost:1337/Topics?id=' + id + '&skip=' + topicsFrom +
    '&take=' + topicsTo + '&orderBy=' + orderBy + '&direction=' + direction;
    return this._http.get<Array<Topics>>(url).toPromise();
  }

  public getExamples(id: string): Promise<Array<Examples>> {
    const url = 'http://localhost:1337/Examples?id=' + id;
    return this._http.get<Array<Examples>>(url).toPromise();
  }

  public getDoctagVersions(id: string): Promise<Array<DocTagVersions>> {
    const url = 'http://localhost:1337/DoctagVersions?id=' + id;
    return this._http.get<Array<DocTagVersions>>(url).toPromise();
  }

  public getTopicHistories(id: number): Promise<Array<TopicHistories>> {
    const url = 'http://localhost:1337/TopicHistories?id=' + id;
    return this._http.get<Array<TopicHistories>>(url).toPromise();
  }

  public getContributors(DocExampleId: number): Promise<Array<Contributors>> {
    const url = 'http://localhost:1337/Contributors?DocExampleId=' + DocExampleId;
    return this._http.get<Array<Contributors>>(url).toPromise();
  }

  public getTopicsCount(id: number): Promise<any> {
    const url = 'http://localhost:1337/TopicsCount?id=' + id;
    return this._http.get<any>(url).toPromise();
  }

}
