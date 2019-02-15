/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FileUploadDemoTestModule } from '../../../test.module';
import { FileUploadsUpdateComponent } from 'app/entities/file-uploads/file-uploads-update.component';
import { FileUploadsService } from 'app/entities/file-uploads/file-uploads.service';
import { FileUploads } from 'app/shared/model/file-uploads.model';

describe('Component Tests', () => {
    describe('FileUploads Management Update Component', () => {
        let comp: FileUploadsUpdateComponent;
        let fixture: ComponentFixture<FileUploadsUpdateComponent>;
        let service: FileUploadsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FileUploadDemoTestModule],
                declarations: [FileUploadsUpdateComponent]
            })
                .overrideTemplate(FileUploadsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FileUploadsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileUploadsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FileUploads(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fileUploads = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FileUploads();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fileUploads = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
