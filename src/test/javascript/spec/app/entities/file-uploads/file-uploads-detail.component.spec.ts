/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FileUploadDemoTestModule } from '../../../test.module';
import { FileUploadsDetailComponent } from 'app/entities/file-uploads/file-uploads-detail.component';
import { FileUploads } from 'app/shared/model/file-uploads.model';

describe('Component Tests', () => {
    describe('FileUploads Management Detail Component', () => {
        let comp: FileUploadsDetailComponent;
        let fixture: ComponentFixture<FileUploadsDetailComponent>;
        const route = ({ data: of({ fileUploads: new FileUploads(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FileUploadDemoTestModule],
                declarations: [FileUploadsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FileUploadsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FileUploadsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fileUploads).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
