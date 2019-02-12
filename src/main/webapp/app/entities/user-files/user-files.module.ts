import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FileUploadDemoSharedModule } from 'app/shared';
import {
    UserFilesComponent,
    UserFilesDetailComponent,
    UserFilesUpdateComponent,
    UserFilesDeletePopupComponent,
    UserFilesDeleteDialogComponent,
    userFilesRoute,
    userFilesPopupRoute
} from './';

const ENTITY_STATES = [...userFilesRoute, ...userFilesPopupRoute];

@NgModule({
    imports: [FileUploadDemoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserFilesComponent,
        UserFilesDetailComponent,
        UserFilesUpdateComponent,
        UserFilesDeleteDialogComponent,
        UserFilesDeletePopupComponent
    ],
    entryComponents: [UserFilesComponent, UserFilesUpdateComponent, UserFilesDeleteDialogComponent, UserFilesDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FileUploadDemoUserFilesModule {}
