import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFileUploads } from 'app/shared/model/file-uploads.model';
import { FileUploadsService } from './file-uploads.service';

@Component({
    selector: 'jhi-file-uploads-delete-dialog',
    templateUrl: './file-uploads-delete-dialog.component.html'
})
export class FileUploadsDeleteDialogComponent {
    fileUploads: IFileUploads;

    constructor(
        protected fileUploadsService: FileUploadsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fileUploadsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fileUploadsListModification',
                content: 'Deleted an fileUploads'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-file-uploads-delete-popup',
    template: ''
})
export class FileUploadsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fileUploads }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FileUploadsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.fileUploads = fileUploads;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/file-uploads', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/file-uploads', { outlets: { popup: null } }]);
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
