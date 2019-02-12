/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FileUploadDemoTestModule } from '../../../test.module';
import { UserFilesDetailComponent } from 'app/entities/user-files/user-files-detail.component';
import { UserFiles } from 'app/shared/model/user-files.model';

describe('Component Tests', () => {
    describe('UserFiles Management Detail Component', () => {
        let comp: UserFilesDetailComponent;
        let fixture: ComponentFixture<UserFilesDetailComponent>;
        const route = ({ data: of({ userFiles: new UserFiles(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FileUploadDemoTestModule],
                declarations: [UserFilesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserFilesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserFilesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userFiles).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
