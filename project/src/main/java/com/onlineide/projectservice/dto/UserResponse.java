package com.onlineide.projectservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserResponse {
    private boolean authenticated;

    @JsonProperty("username")
    private String username;

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    @Override
    public String toString() {
        return "UserResponse{" +
                "authenticated=" + authenticated +
                ", username='" + username + '\'' +
                '}';
    }
}
