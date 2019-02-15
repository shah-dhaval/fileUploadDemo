/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FileUploadDemoTestModule } from '../../../test.module';
import { FileUploadsDeleteDialogComponent } from 'app/entities/file-uploads/file-uploads-delete-dialog.component';
import { FileUploadsService } from 'app/entities/file-uploads/file-uploads.service';

describe('Component Tests', () => {
    describe('FileUploads Management Delete Component', () => {
        let comp: FileUploadsDeleteDialogComponent;
        let fixture: ComponentFixture<FileUploadsDeleteDialogComponent>;
        let service: FileUploadsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FileUploadDemoTestModule],
                declarations: [FileUploadsDeleteDialogComponent]
            })
                .overrideTemplate(FileUploadsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FileUploadsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileUploadsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
