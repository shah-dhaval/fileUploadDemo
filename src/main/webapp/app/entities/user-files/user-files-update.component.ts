import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUserFiles } from 'app/shared/model/user-files.model';
import { UserFilesService } from './user-files.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-user-files-update',
    templateUrl: './user-files-update.component.html'
})
export class UserFilesUpdateComponent implements OnInit {
    userFiles: IUserFiles;
    isSaving: boolean;

    users: IUser[];
    @ViewChild('file') file;
    public files: Set<File> = new Set();

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected userFilesService: UserFilesService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userFiles }) => {
            this.userFiles = userFiles;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;

        const userfiles = this.file.nativeElement.files,
        formData = new FormData();

        for (let i = 0; i < userfiles.length; i++) {
            formData.append('file', userfiles[i], userfiles[i].name);
        }

        formData.append('title', this.userFiles.title);
        formData.append('description', this.userFiles.description || '');
        formData.append('user', JSON.stringify(this.userFiles.user));

        if (this.userFiles.id !== undefined) {
            this.subscribeToSaveResponse(this.userFilesService.update(formData));
        } else {
            this.subscribeToSaveResponse(this.userFilesService.create(formData));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserFiles>>) {
        result.subscribe((res: HttpResponse<IUserFiles>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
