import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserFiles } from 'app/shared/model/user-files.model';
import { UserFilesService } from './user-files.service';
import { UserFilesComponent } from './user-files.component';
import { UserFilesDetailComponent } from './user-files-detail.component';
import { UserFilesUpdateComponent } from './user-files-update.component';
import { UserFilesDeletePopupComponent } from './user-files-delete-dialog.component';
import { IUserFiles } from 'app/shared/model/user-files.model';

@Injectable({ providedIn: 'root' })
export class UserFilesResolve implements Resolve<IUserFiles> {
    constructor(private service: UserFilesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserFiles> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UserFiles>) => response.ok),
                map((userFiles: HttpResponse<UserFiles>) => userFiles.body)
            );
        }
        return of(new UserFiles());
    }
}

export const userFilesRoute: Routes = [
    {
        path: '',
        component: UserFilesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserFiles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UserFilesDetailComponent,
        resolve: {
            userFiles: UserFilesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserFiles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UserFilesUpdateComponent,
        resolve: {
            userFiles: UserFilesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserFiles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UserFilesUpdateComponent,
        resolve: {
            userFiles: UserFilesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserFiles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userFilesPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UserFilesDeletePopupComponent,
        resolve: {
            userFiles: UserFilesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserFiles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
