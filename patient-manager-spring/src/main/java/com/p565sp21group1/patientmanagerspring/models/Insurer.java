package com.p565sp21group1.patientmanagerspring.models;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "Insurer")
@DiscriminatorValue("INS")
public class Insurer extends User
{
    @Column(name = "firmName", nullable = false, unique = false)
    private String firmName;

    public Insurer() {
    }

    public String getFirmName() {
        return firmName;
    }

    public void setFirmName(String firmName) {
        this.firmName = firmName;
    }
}
