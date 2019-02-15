package io.jhipster.fileuploaddemo.web.rest;
import io.jhipster.fileuploaddemo.domain.FileUploads;
import io.jhipster.fileuploaddemo.repository.FileUploadsRepository;
import io.jhipster.fileuploaddemo.web.rest.errors.BadRequestAlertException;
import io.jhipster.fileuploaddemo.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FileUploads.
 */
@RestController
@RequestMapping("/api")
public class FileUploadsResource {

    private final Logger log = LoggerFactory.getLogger(FileUploadsResource.class);

    private static final String ENTITY_NAME = "fileUploads";

    private final FileUploadsRepository fileUploadsRepository;

    public FileUploadsResource(FileUploadsRepository fileUploadsRepository) {
        this.fileUploadsRepository = fileUploadsRepository;
    }

    /**
     * POST  /file-uploads : Create a new fileUploads.
     *
     * @param fileUploads the fileUploads to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fileUploads, or with status 400 (Bad Request) if the fileUploads has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/file-uploads")
    public ResponseEntity<FileUploads> createFileUploads(@Valid @RequestBody FileUploads fileUploads) throws URISyntaxException {
        log.debug("REST request to save FileUploads : {}", fileUploads);
        if (fileUploads.getId() != null) {
            throw new BadRequestAlertException("A new fileUploads cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FileUploads result = fileUploadsRepository.save(fileUploads);
        return ResponseEntity.created(new URI("/api/file-uploads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /file-uploads : Updates an existing fileUploads.
     *
     * @param fileUploads the fileUploads to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fileUploads,
     * or with status 400 (Bad Request) if the fileUploads is not valid,
     * or with status 500 (Internal Server Error) if the fileUploads couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/file-uploads")
    public ResponseEntity<FileUploads> updateFileUploads(@Valid @RequestBody FileUploads fileUploads) throws URISyntaxException {
        log.debug("REST request to update FileUploads : {}", fileUploads);
        if (fileUploads.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FileUploads result = fileUploadsRepository.save(fileUploads);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fileUploads.getId().toString()))
            .body(result);
    }

    /**
     * GET  /file-uploads : get all the fileUploads.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fileUploads in body
     */
    @GetMapping("/file-uploads")
    public List<FileUploads> getAllFileUploads() {
        log.debug("REST request to get all FileUploads");
        return fileUploadsRepository.findAll();
    }

    /**
     * GET  /file-uploads/:id : get the "id" fileUploads.
     *
     * @param id the id of the fileUploads to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fileUploads, or with status 404 (Not Found)
     */
    @GetMapping("/file-uploads/{id}")
    public ResponseEntity<FileUploads> getFileUploads(@PathVariable Long id) {
        log.debug("REST request to get FileUploads : {}", id);
        Optional<FileUploads> fileUploads = fileUploadsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fileUploads);
    }

    /**
     * DELETE  /file-uploads/:id : delete the "id" fileUploads.
     *
     * @param id the id of the fileUploads to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/file-uploads/{id}")
    public ResponseEntity<Void> deleteFileUploads(@PathVariable Long id) {
        log.debug("REST request to delete FileUploads : {}", id);
        fileUploadsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
