import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserFiles } from 'app/shared/model/user-files.model';

@Component({
    selector: 'jhi-user-files-detail',
    templateUrl: './user-files-detail.component.html'
})
export class UserFilesDetailComponent implements OnInit {
    userFiles: IUserFiles;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userFiles }) => {
            this.userFiles = userFiles;
        });
    }

    previousState() {
        window.history.back();
    }
}
