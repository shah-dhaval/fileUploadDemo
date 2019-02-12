import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserFiles } from 'app/shared/model/user-files.model';
import { AccountService } from 'app/core';
import { UserFilesService } from './user-files.service';

@Component({
    selector: 'jhi-user-files',
    templateUrl: './user-files.component.html'
})
export class UserFilesComponent implements OnInit, OnDestroy {
    userFiles: IUserFiles[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected userFilesService: UserFilesService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.userFilesService
            .query()
            .pipe(
                filter((res: HttpResponse<IUserFiles[]>) => res.ok),
                map((res: HttpResponse<IUserFiles[]>) => res.body)
            )
            .subscribe(
                (res: IUserFiles[]) => {
                    this.userFiles = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserFiles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserFiles) {
        return item.id;
    }

    registerChangeInUserFiles() {
        this.eventSubscriber = this.eventManager.subscribe('userFilesListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
