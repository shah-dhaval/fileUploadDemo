package io.jhipster.fileuploaddemo.web.rest;

import io.jhipster.fileuploaddemo.FileUploadDemoApp;

import io.jhipster.fileuploaddemo.domain.FileUploads;
import io.jhipster.fileuploaddemo.domain.UserFiles;
import io.jhipster.fileuploaddemo.repository.FileUploadsRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.jhipster.fileuploaddemo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FileUploadsResource REST controller.
 *
 * @see FileUploadsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FileUploadDemoApp.class)
public class FileUploadsResourceIntTest {

    private static final String DEFAULT_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME = "BBBBBBBBBB";

    private static final byte[] DEFAULT_FILE_DATA = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FILE_DATA = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FILE_DATA_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FILE_DATA_CONTENT_TYPE = "image/png";

    @Autowired
    private FileUploadsRepository fileUploadsRepository;

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

    private MockMvc restFileUploadsMockMvc;

    private FileUploads fileUploads;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FileUploadsResource fileUploadsResource = new FileUploadsResource(fileUploadsRepository);
        this.restFileUploadsMockMvc = MockMvcBuilders.standaloneSetup(fileUploadsResource)
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
    public static FileUploads createEntity(EntityManager em) {
        FileUploads fileUploads = new FileUploads()
            .fileName(DEFAULT_FILE_NAME)
            .fileData(DEFAULT_FILE_DATA)
            .fileDataContentType(DEFAULT_FILE_DATA_CONTENT_TYPE);
        // Add required entity
        UserFiles userFiles = UserFilesResourceIntTest.createEntity(em);
        em.persist(userFiles);
        em.flush();
        fileUploads.setUserFiles(userFiles);
        return fileUploads;
    }

    @Before
    public void initTest() {
        fileUploads = createEntity(em);
    }

    @Test
    @Transactional
    public void createFileUploads() throws Exception {
        int databaseSizeBeforeCreate = fileUploadsRepository.findAll().size();

        // Create the FileUploads
        restFileUploadsMockMvc.perform(post("/api/file-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileUploads)))
            .andExpect(status().isCreated());

        // Validate the FileUploads in the database
        List<FileUploads> fileUploadsList = fileUploadsRepository.findAll();
        assertThat(fileUploadsList).hasSize(databaseSizeBeforeCreate + 1);
        FileUploads testFileUploads = fileUploadsList.get(fileUploadsList.size() - 1);
        assertThat(testFileUploads.getFileName()).isEqualTo(DEFAULT_FILE_NAME);
        assertThat(testFileUploads.getFileData()).isEqualTo(DEFAULT_FILE_DATA);
        assertThat(testFileUploads.getFileDataContentType()).isEqualTo(DEFAULT_FILE_DATA_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createFileUploadsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fileUploadsRepository.findAll().size();

        // Create the FileUploads with an existing ID
        fileUploads.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFileUploadsMockMvc.perform(post("/api/file-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileUploads)))
            .andExpect(status().isBadRequest());

        // Validate the FileUploads in the database
        List<FileUploads> fileUploadsList = fileUploadsRepository.findAll();
        assertThat(fileUploadsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFileNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = fileUploadsRepository.findAll().size();
        // set the field null
        fileUploads.setFileName(null);

        // Create the FileUploads, which fails.

        restFileUploadsMockMvc.perform(post("/api/file-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileUploads)))
            .andExpect(status().isBadRequest());

        List<FileUploads> fileUploadsList = fileUploadsRepository.findAll();
        assertThat(fileUploadsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFileUploads() throws Exception {
        // Initialize the database
        fileUploadsRepository.saveAndFlush(fileUploads);

        // Get all the fileUploadsList
        restFileUploadsMockMvc.perform(get("/api/file-uploads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fileUploads.getId().intValue())))
            .andExpect(jsonPath("$.[*].fileName").value(hasItem(DEFAULT_FILE_NAME.toString())))
            .andExpect(jsonPath("$.[*].fileDataContentType").value(hasItem(DEFAULT_FILE_DATA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fileData").value(hasItem(Base64Utils.encodeToString(DEFAULT_FILE_DATA))));
    }
    
    @Test
    @Transactional
    public void getFileUploads() throws Exception {
        // Initialize the database
        fileUploadsRepository.saveAndFlush(fileUploads);

        // Get the fileUploads
        restFileUploadsMockMvc.perform(get("/api/file-uploads/{id}", fileUploads.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fileUploads.getId().intValue()))
            .andExpect(jsonPath("$.fileName").value(DEFAULT_FILE_NAME.toString()))
            .andExpect(jsonPath("$.fileDataContentType").value(DEFAULT_FILE_DATA_CONTENT_TYPE))
            .andExpect(jsonPath("$.fileData").value(Base64Utils.encodeToString(DEFAULT_FILE_DATA)));
    }

    @Test
    @Transactional
    public void getNonExistingFileUploads() throws Exception {
        // Get the fileUploads
        restFileUploadsMockMvc.perform(get("/api/file-uploads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFileUploads() throws Exception {
        // Initialize the database
        fileUploadsRepository.saveAndFlush(fileUploads);

        int databaseSizeBeforeUpdate = fileUploadsRepository.findAll().size();

        // Update the fileUploads
        FileUploads updatedFileUploads = fileUploadsRepository.findById(fileUploads.getId()).get();
        // Disconnect from session so that the updates on updatedFileUploads are not directly saved in db
        em.detach(updatedFileUploads);
        updatedFileUploads
            .fileName(UPDATED_FILE_NAME)
            .fileData(UPDATED_FILE_DATA)
            .fileDataContentType(UPDATED_FILE_DATA_CONTENT_TYPE);

        restFileUploadsMockMvc.perform(put("/api/file-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFileUploads)))
            .andExpect(status().isOk());

        // Validate the FileUploads in the database
        List<FileUploads> fileUploadsList = fileUploadsRepository.findAll();
        assertThat(fileUploadsList).hasSize(databaseSizeBeforeUpdate);
        FileUploads testFileUploads = fileUploadsList.get(fileUploadsList.size() - 1);
        assertThat(testFileUploads.getFileName()).isEqualTo(UPDATED_FILE_NAME);
        assertThat(testFileUploads.getFileData()).isEqualTo(UPDATED_FILE_DATA);
        assertThat(testFileUploads.getFileDataContentType()).isEqualTo(UPDATED_FILE_DATA_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingFileUploads() throws Exception {
        int databaseSizeBeforeUpdate = fileUploadsRepository.findAll().size();

        // Create the FileUploads

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFileUploadsMockMvc.perform(put("/api/file-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fileUploads)))
            .andExpect(status().isBadRequest());

        // Validate the FileUploads in the database
        List<FileUploads> fileUploadsList = fileUploadsRepository.findAll();
        assertThat(fileUploadsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFileUploads() throws Exception {
        // Initialize the database
        fileUploadsRepository.saveAndFlush(fileUploads);

        int databaseSizeBeforeDelete = fileUploadsRepository.findAll().size();

        // Delete the fileUploads
        restFileUploadsMockMvc.perform(delete("/api/file-uploads/{id}", fileUploads.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FileUploads> fileUploadsList = fileUploadsRepository.findAll();
        assertThat(fileUploadsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FileUploads.class);
        FileUploads fileUploads1 = new FileUploads();
        fileUploads1.setId(1L);
        FileUploads fileUploads2 = new FileUploads();
        fileUploads2.setId(fileUploads1.getId());
        assertThat(fileUploads1).isEqualTo(fileUploads2);
        fileUploads2.setId(2L);
        assertThat(fileUploads1).isNotEqualTo(fileUploads2);
        fileUploads1.setId(null);
        assertThat(fileUploads1).isNotEqualTo(fileUploads2);
    }
}
