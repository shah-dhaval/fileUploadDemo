import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'user-files',
                loadChildren: './user-files/user-files.module#FileUploadDemoUserFilesModule'
            },
            {
                path: 'file-uploads',
                loadChildren: './file-uploads/file-uploads.module#FileUploadDemoFileUploadsModule'
            },
            {
                path: 'file-uploads',
                loadChildren: './file-uploads/file-uploads.module#FileUploadDemoFileUploadsModule'
            },
            {
                path: 'file-uploads',
                loadChildren: './file-uploads/file-uploads.module#FileUploadDemoFileUploadsModule'
            },
            {
                path: 'file-uploads',
                loadChildren: './file-uploads/file-uploads.module#FileUploadDemoFileUploadsModule'
            },
            {
                path: 'file-uploads',
                loadChildren: './file-uploads/file-uploads.module#FileUploadDemoFileUploadsModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FileUploadDemoEntityModule {}
