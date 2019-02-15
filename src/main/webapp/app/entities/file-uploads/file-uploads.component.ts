import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFileUploads } from 'app/shared/model/file-uploads.model';
import { AccountService } from 'app/core';
import { FileUploadsService } from './file-uploads.service';

@Component({
    selector: 'jhi-file-uploads',
    templateUrl: './file-uploads.component.html'
})
export class FileUploadsComponent implements OnInit, OnDestroy {
    fileUploads: IFileUploads[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected fileUploadsService: FileUploadsService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.fileUploadsService
            .query()
            .pipe(
                filter((res: HttpResponse<IFileUploads[]>) => res.ok),
                map((res: HttpResponse<IFileUploads[]>) => res.body)
            )
            .subscribe(
                (res: IFileUploads[]) => {
                    this.fileUploads = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFileUploads();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFileUploads) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInFileUploads() {
        this.eventSubscriber = this.eventManager.subscribe('fileUploadsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
