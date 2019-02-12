package io.jhipster.fileuploaddemo.web.rest;
import io.jhipster.fileuploaddemo.domain.UserFiles;
import io.jhipster.fileuploaddemo.repository.UserFilesRepository;
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
 * REST controller for managing UserFiles.
 */
@RestController
@RequestMapping("/api")
public class UserFilesResource {

    private final Logger log = LoggerFactory.getLogger(UserFilesResource.class);

    private static final String ENTITY_NAME = "userFiles";

    private final UserFilesRepository userFilesRepository;

    public UserFilesResource(UserFilesRepository userFilesRepository) {
        this.userFilesRepository = userFilesRepository;
    }

    /**
     * POST  /user-files : Create a new userFiles.
     *
     * @param userFiles the userFiles to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userFiles, or with status 400 (Bad Request) if the userFiles has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-files")
    public ResponseEntity<UserFiles> createUserFiles(@Valid @RequestBody UserFiles userFiles) throws URISyntaxException {
        log.debug("REST request to save UserFiles : {}", userFiles);
        if (userFiles.getId() != null) {
            throw new BadRequestAlertException("A new userFiles cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserFiles result = userFilesRepository.save(userFiles);
        return ResponseEntity.created(new URI("/api/user-files/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-files : Updates an existing userFiles.
     *
     * @param userFiles the userFiles to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userFiles,
     * or with status 400 (Bad Request) if the userFiles is not valid,
     * or with status 500 (Internal Server Error) if the userFiles couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-files")
    public ResponseEntity<UserFiles> updateUserFiles(@Valid @RequestBody UserFiles userFiles) throws URISyntaxException {
        log.debug("REST request to update UserFiles : {}", userFiles);
        if (userFiles.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserFiles result = userFilesRepository.save(userFiles);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userFiles.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-files : get all the userFiles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userFiles in body
     */
    @GetMapping("/user-files")
    public List<UserFiles> getAllUserFiles() {
        log.debug("REST request to get all UserFiles");
        return userFilesRepository.findAll();
    }

    /**
     * GET  /user-files/:id : get the "id" userFiles.
     *
     * @param id the id of the userFiles to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userFiles, or with status 404 (Not Found)
     */
    @GetMapping("/user-files/{id}")
    public ResponseEntity<UserFiles> getUserFiles(@PathVariable Long id) {
        log.debug("REST request to get UserFiles : {}", id);
        Optional<UserFiles> userFiles = userFilesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userFiles);
    }

    /**
     * DELETE  /user-files/:id : delete the "id" userFiles.
     *
     * @param id the id of the userFiles to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-files/{id}")
    public ResponseEntity<Void> deleteUserFiles(@PathVariable Long id) {
        log.debug("REST request to delete UserFiles : {}", id);
        userFilesRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
