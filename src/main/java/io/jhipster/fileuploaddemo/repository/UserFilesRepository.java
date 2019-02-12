package io.jhipster.fileuploaddemo.repository;

import io.jhipster.fileuploaddemo.domain.UserFiles;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserFiles entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserFilesRepository extends JpaRepository<UserFiles, Long> {

    @Query("select user_files from UserFiles user_files where user_files.user.login = ?#{principal.username}")
    List<UserFiles> findByUserIsCurrentUser();

}
