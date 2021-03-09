package com.p565sp21group1.patientmanagerspring.security;

public class SecurityConstants
{
    public static final String SIGN_UP_URLS = "/api/account/**";
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 80_000; //80 seconds
}