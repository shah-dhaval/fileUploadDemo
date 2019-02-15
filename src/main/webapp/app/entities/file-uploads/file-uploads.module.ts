import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FileUploadDemoSharedModule } from 'app/shared';
import {
    FileUploadsComponent,
    FileUploadsDetailComponent,
    FileUploadsUpdateComponent,
    FileUploadsDeletePopupComponent,
    FileUploadsDeleteDialogComponent,
    fileUploadsRoute,
    fileUploadsPopupRoute
} from './';

const ENTITY_STATES = [...fileUploadsRoute, ...fileUploadsPopupRoute];

@NgModule({
    imports: [FileUploadDemoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FileUploadsComponent,
        FileUploadsDetailComponent,
        FileUploadsUpdateComponent,
        FileUploadsDeleteDialogComponent,
        FileUploadsDeletePopupComponent
    ],
    entryComponents: [FileUploadsComponent, FileUploadsUpdateComponent, FileUploadsDeleteDialogComponent, FileUploadsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FileUploadDemoFileUploadsModule {}
