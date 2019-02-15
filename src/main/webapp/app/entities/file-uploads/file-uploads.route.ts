import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FileUploads } from 'app/shared/model/file-uploads.model';
import { FileUploadsService } from './file-uploads.service';
import { FileUploadsComponent } from './file-uploads.component';
import { FileUploadsDetailComponent } from './file-uploads-detail.component';
import { FileUploadsUpdateComponent } from './file-uploads-update.component';
import { FileUploadsDeletePopupComponent } from './file-uploads-delete-dialog.component';
import { IFileUploads } from 'app/shared/model/file-uploads.model';

@Injectable({ providedIn: 'root' })
export class FileUploadsResolve implements Resolve<IFileUploads> {
    constructor(private service: FileUploadsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFileUploads> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FileUploads>) => response.ok),
                map((fileUploads: HttpResponse<FileUploads>) => fileUploads.body)
            );
        }
        return of(new FileUploads());
    }
}

export const fileUploadsRoute: Routes = [
    {
        path: '',
        component: FileUploadsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileUploads'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FileUploadsDetailComponent,
        resolve: {
            fileUploads: FileUploadsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileUploads'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FileUploadsUpdateComponent,
        resolve: {
            fileUploads: FileUploadsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileUploads'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FileUploadsUpdateComponent,
        resolve: {
            fileUploads: FileUploadsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileUploads'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fileUploadsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FileUploadsDeletePopupComponent,
        resolve: {
            fileUploads: FileUploadsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FileUploads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
