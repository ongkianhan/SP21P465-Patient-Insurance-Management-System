package com.p565sp21group1.patientmanagerspring.payload;



public class DoctorSearchRequest
{
    private String keywords;

    private String specialization;

    private long latitude;

    private long longitude;

    private boolean supportsCovidCare;

    public DoctorSearchRequest() {
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public long getLatitude() {
        return latitude;
    }

    public void setLatitude(long latitude) {
        this.latitude = latitude;
    }

    public long getLongitude() {
        return longitude;
    }

    public void setLongitude(long longitude) {
        this.longitude = longitude;
    }

    public boolean isSupportsCovidCare() {
        return supportsCovidCare;
    }

    public void setSupportsCovidCare(boolean supportsCovidCare) {
        this.supportsCovidCare = supportsCovidCare;
    }
}
