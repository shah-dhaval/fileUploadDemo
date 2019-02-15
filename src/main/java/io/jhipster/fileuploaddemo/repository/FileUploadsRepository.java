package io.jhipster.fileuploaddemo.repository;

import io.jhipster.fileuploaddemo.domain.FileUploads;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FileUploads entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FileUploadsRepository extends JpaRepository<FileUploads, Long> {

}
