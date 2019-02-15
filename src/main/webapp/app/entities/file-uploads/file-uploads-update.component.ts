import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IFileUploads } from 'app/shared/model/file-uploads.model';
import { FileUploadsService } from './file-uploads.service';
import { IUserFiles } from 'app/shared/model/user-files.model';
import { UserFilesService } from 'app/entities/user-files';

@Component({
    selector: 'jhi-file-uploads-update',
    templateUrl: './file-uploads-update.component.html'
})
export class FileUploadsUpdateComponent implements OnInit {
    fileUploads: IFileUploads;
    isSaving: boolean;

    userfiles: IUserFiles[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected fileUploadsService: FileUploadsService,
        protected userFilesService: UserFilesService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fileUploads }) => {
            this.fileUploads = fileUploads;
        });
        this.userFilesService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUserFiles[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUserFiles[]>) => response.body)
            )
            .subscribe((res: IUserFiles[]) => (this.userfiles = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fileUploads.id !== undefined) {
            this.subscribeToSaveResponse(this.fileUploadsService.update(this.fileUploads));
        } else {
            this.subscribeToSaveResponse(this.fileUploadsService.create(this.fileUploads));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFileUploads>>) {
        result.subscribe((res: HttpResponse<IFileUploads>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserFilesById(index: number, item: IUserFiles) {
        return item.id;
    }
}
