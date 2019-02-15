/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FileUploadDemoTestModule } from '../../../test.module';
import { FileUploadsComponent } from 'app/entities/file-uploads/file-uploads.component';
import { FileUploadsService } from 'app/entities/file-uploads/file-uploads.service';
import { FileUploads } from 'app/shared/model/file-uploads.model';

describe('Component Tests', () => {
    describe('FileUploads Management Component', () => {
        let comp: FileUploadsComponent;
        let fixture: ComponentFixture<FileUploadsComponent>;
        let service: FileUploadsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FileUploadDemoTestModule],
                declarations: [FileUploadsComponent],
                providers: []
            })
                .overrideTemplate(FileUploadsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FileUploadsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileUploadsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FileUploads(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fileUploads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
