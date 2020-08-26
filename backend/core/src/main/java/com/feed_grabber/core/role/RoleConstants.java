package com.feed_grabber.core.role;

public class RoleConstants {
    public static final String ROLE_COMPANY_OWNER = "company_owner";
    public static final String ROLE_HR = "HR";
    public static final String ROLE_EMPLOYEE = "EMPLOYEE";

    public static final String IS_HR = "hasAuthority('" + ROLE_HR + "')";
    public static final String IS_COMPANY_OWNER = "hasAuthority('" + ROLE_COMPANY_OWNER + "')";
    public static final String IS_EMPLOYEE = "hasAuthority('" + ROLE_EMPLOYEE + "')";
    public static final String IS_HR_OR_COMPANY_OWNER = IS_HR + " or " + IS_COMPANY_OWNER;
}
