/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FileUploadDemoTestModule } from '../../../test.module';
import { UserFilesUpdateComponent } from 'app/entities/user-files/user-files-update.component';
import { UserFilesService } from 'app/entities/user-files/user-files.service';
import { UserFiles } from 'app/shared/model/user-files.model';

describe('Component Tests', () => {
    describe('UserFiles Management Update Component', () => {
        let comp: UserFilesUpdateComponent;
        let fixture: ComponentFixture<UserFilesUpdateComponent>;
        let service: UserFilesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FileUploadDemoTestModule],
                declarations: [UserFilesUpdateComponent]
            })
                .overrideTemplate(UserFilesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserFilesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFilesService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserFiles(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userFiles = entity;
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
                    const entity = new UserFiles();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userFiles = entity;
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
