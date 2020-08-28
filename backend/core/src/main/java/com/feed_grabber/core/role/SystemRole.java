package com.feed_grabber.core.role;

import static com.feed_grabber.core.role.RoleConstants.*;

public enum SystemRole {
    company_owner(ROLE_COMPANY_OWNER),
    hr(ROLE_HR),
    employee(ROLE_EMPLOYEE);

    private String value;

    SystemRole(final String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return this.getValue();
    }
}
