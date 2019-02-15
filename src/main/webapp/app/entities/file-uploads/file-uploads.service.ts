import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFileUploads } from 'app/shared/model/file-uploads.model';

type EntityResponseType = HttpResponse<IFileUploads>;
type EntityArrayResponseType = HttpResponse<IFileUploads[]>;

@Injectable({ providedIn: 'root' })
export class FileUploadsService {
    public resourceUrl = SERVER_API_URL + 'api/file-uploads';

    constructor(protected http: HttpClient) {}

    create(fileUploads: IFileUploads): Observable<EntityResponseType> {
        return this.http.post<IFileUploads>(this.resourceUrl, fileUploads, { observe: 'response' });
    }

    update(fileUploads: IFileUploads): Observable<EntityResponseType> {
        return this.http.put<IFileUploads>(this.resourceUrl, fileUploads, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFileUploads>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFileUploads[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
