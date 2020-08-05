package com.feed_grabber.core.role;

public enum SystemRole {
    admin("admin"), company_owner("company_owner"), hr("hr"), employee("employee");

    private String name;

    SystemRole(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
