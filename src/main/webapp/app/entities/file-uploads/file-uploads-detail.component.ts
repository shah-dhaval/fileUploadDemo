import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFileUploads } from 'app/shared/model/file-uploads.model';

@Component({
    selector: 'jhi-file-uploads-detail',
    templateUrl: './file-uploads-detail.component.html'
})
export class FileUploadsDetailComponent implements OnInit {
    fileUploads: IFileUploads;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fileUploads }) => {
            this.fileUploads = fileUploads;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
