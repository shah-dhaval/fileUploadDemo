package io.jhipster.fileuploaddemo.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FileUploads.
 */
@Entity
@Table(name = "file_uploads")
public class FileUploads implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "file_name", nullable = false)
    private String fileName;

    
    @Lob
    @Column(name = "file_data", nullable = false)
    private byte[] fileData;

    @Column(name = "file_data_content_type", nullable = false)
    private String fileDataContentType;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("fileUploads")
    private UserFiles userFiles;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public FileUploads fileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public FileUploads fileData(byte[] fileData) {
        this.fileData = fileData;
        return this;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public String getFileDataContentType() {
        return fileDataContentType;
    }

    public FileUploads fileDataContentType(String fileDataContentType) {
        this.fileDataContentType = fileDataContentType;
        return this;
    }

    public void setFileDataContentType(String fileDataContentType) {
        this.fileDataContentType = fileDataContentType;
    }

    public UserFiles getUserFiles() {
        return userFiles;
    }

    public FileUploads userFiles(UserFiles userFiles) {
        this.userFiles = userFiles;
        return this;
    }

    public void setUserFiles(UserFiles userFiles) {
        this.userFiles = userFiles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        FileUploads fileUploads = (FileUploads) o;
        if (fileUploads.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fileUploads.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FileUploads{" +
            "id=" + getId() +
            ", fileName='" + getFileName() + "'" +
            ", fileData='" + getFileData() + "'" +
            ", fileDataContentType='" + getFileDataContentType() + "'" +
            "}";
    }
}
