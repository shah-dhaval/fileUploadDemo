import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserFiles } from 'app/shared/model/user-files.model';
import { UserFilesService } from './user-files.service';

@Component({
    selector: 'jhi-user-files-delete-dialog',
    templateUrl: './user-files-delete-dialog.component.html'
})
export class UserFilesDeleteDialogComponent {
    userFiles: IUserFiles;

    constructor(
        protected userFilesService: UserFilesService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userFilesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userFilesListModification',
                content: 'Deleted an userFiles'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-files-delete-popup',
    template: ''
})
export class UserFilesDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userFiles }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserFilesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.userFiles = userFiles;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/user-files', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/user-files', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
