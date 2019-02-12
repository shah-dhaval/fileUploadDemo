/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FileUploadDemoTestModule } from '../../../test.module';
import { UserFilesComponent } from 'app/entities/user-files/user-files.component';
import { UserFilesService } from 'app/entities/user-files/user-files.service';
import { UserFiles } from 'app/shared/model/user-files.model';

describe('Component Tests', () => {
    describe('UserFiles Management Component', () => {
        let comp: UserFilesComponent;
        let fixture: ComponentFixture<UserFilesComponent>;
        let service: UserFilesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FileUploadDemoTestModule],
                declarations: [UserFilesComponent],
                providers: []
            })
                .overrideTemplate(UserFilesComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserFilesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFilesService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserFiles(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userFiles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
