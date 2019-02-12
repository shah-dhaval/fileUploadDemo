package io.jhipster.fileuploaddemo.web.rest;

import io.jhipster.fileuploaddemo.FileUploadDemoApp;

import io.jhipster.fileuploaddemo.domain.UserFiles;
import io.jhipster.fileuploaddemo.domain.User;
import io.jhipster.fileuploaddemo.repository.UserFilesRepository;
import io.jhipster.fileuploaddemo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.jhipster.fileuploaddemo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserFilesResource REST controller.
 *
 * @see UserFilesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FileUploadDemoApp.class)
public class UserFilesResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private UserFilesRepository userFilesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restUserFilesMockMvc;

    private UserFiles userFiles;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserFilesResource userFilesResource = new UserFilesResource(userFilesRepository);
        this.restUserFilesMockMvc = MockMvcBuilders.standaloneSetup(userFilesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserFiles createEntity(EntityManager em) {
        UserFiles userFiles = new UserFiles()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        userFiles.setUser(user);
        return userFiles;
    }

    @Before
    public void initTest() {
        userFiles = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserFiles() throws Exception {
        int databaseSizeBeforeCreate = userFilesRepository.findAll().size();

        // Create the UserFiles
        restUserFilesMockMvc.perform(post("/api/user-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userFiles)))
            .andExpect(status().isCreated());

        // Validate the UserFiles in the database
        List<UserFiles> userFilesList = userFilesRepository.findAll();
        assertThat(userFilesList).hasSize(databaseSizeBeforeCreate + 1);
        UserFiles testUserFiles = userFilesList.get(userFilesList.size() - 1);
        assertThat(testUserFiles.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testUserFiles.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createUserFilesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userFilesRepository.findAll().size();

        // Create the UserFiles with an existing ID
        userFiles.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserFilesMockMvc.perform(post("/api/user-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userFiles)))
            .andExpect(status().isBadRequest());

        // Validate the UserFiles in the database
        List<UserFiles> userFilesList = userFilesRepository.findAll();
        assertThat(userFilesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = userFilesRepository.findAll().size();
        // set the field null
        userFiles.setTitle(null);

        // Create the UserFiles, which fails.

        restUserFilesMockMvc.perform(post("/api/user-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userFiles)))
            .andExpect(status().isBadRequest());

        List<UserFiles> userFilesList = userFilesRepository.findAll();
        assertThat(userFilesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserFiles() throws Exception {
        // Initialize the database
        userFilesRepository.saveAndFlush(userFiles);

        // Get all the userFilesList
        restUserFilesMockMvc.perform(get("/api/user-files?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userFiles.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getUserFiles() throws Exception {
        // Initialize the database
        userFilesRepository.saveAndFlush(userFiles);

        // Get the userFiles
        restUserFilesMockMvc.perform(get("/api/user-files/{id}", userFiles.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userFiles.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserFiles() throws Exception {
        // Get the userFiles
        restUserFilesMockMvc.perform(get("/api/user-files/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserFiles() throws Exception {
        // Initialize the database
        userFilesRepository.saveAndFlush(userFiles);

        int databaseSizeBeforeUpdate = userFilesRepository.findAll().size();

        // Update the userFiles
        UserFiles updatedUserFiles = userFilesRepository.findById(userFiles.getId()).get();
        // Disconnect from session so that the updates on updatedUserFiles are not directly saved in db
        em.detach(updatedUserFiles);
        updatedUserFiles
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION);

        restUserFilesMockMvc.perform(put("/api/user-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserFiles)))
            .andExpect(status().isOk());

        // Validate the UserFiles in the database
        List<UserFiles> userFilesList = userFilesRepository.findAll();
        assertThat(userFilesList).hasSize(databaseSizeBeforeUpdate);
        UserFiles testUserFiles = userFilesList.get(userFilesList.size() - 1);
        assertThat(testUserFiles.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testUserFiles.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingUserFiles() throws Exception {
        int databaseSizeBeforeUpdate = userFilesRepository.findAll().size();

        // Create the UserFiles

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserFilesMockMvc.perform(put("/api/user-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userFiles)))
            .andExpect(status().isBadRequest());

        // Validate the UserFiles in the database
        List<UserFiles> userFilesList = userFilesRepository.findAll();
        assertThat(userFilesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserFiles() throws Exception {
        // Initialize the database
        userFilesRepository.saveAndFlush(userFiles);

        int databaseSizeBeforeDelete = userFilesRepository.findAll().size();

        // Delete the userFiles
        restUserFilesMockMvc.perform(delete("/api/user-files/{id}", userFiles.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserFiles> userFilesList = userFilesRepository.findAll();
        assertThat(userFilesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserFiles.class);
        UserFiles userFiles1 = new UserFiles();
        userFiles1.setId(1L);
        UserFiles userFiles2 = new UserFiles();
        userFiles2.setId(userFiles1.getId());
        assertThat(userFiles1).isEqualTo(userFiles2);
        userFiles2.setId(2L);
        assertThat(userFiles1).isNotEqualTo(userFiles2);
        userFiles1.setId(null);
        assertThat(userFiles1).isNotEqualTo(userFiles2);
    }
}
