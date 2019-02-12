import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserFiles } from 'app/shared/model/user-files.model';

type EntityResponseType = HttpResponse<IUserFiles>;
type EntityArrayResponseType = HttpResponse<IUserFiles[]>;

@Injectable({ providedIn: 'root' })
export class UserFilesService {
    public resourceUrl = SERVER_API_URL + 'api/user-files';

    constructor(protected http: HttpClient) {}

    create(userFiles: IUserFiles): Observable<EntityResponseType> {
        return this.http.post<IUserFiles>(this.resourceUrl, userFiles, { observe: 'response' });
    }

    update(userFiles: IUserFiles): Observable<EntityResponseType> {
        return this.http.put<IUserFiles>(this.resourceUrl, userFiles, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserFiles>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserFiles[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
