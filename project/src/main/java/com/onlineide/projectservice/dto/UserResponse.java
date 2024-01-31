package com.onlineide.projectservice.dto;

import org.springframework.security.core.GrantedAuthority;

import java.security.Principal;
import java.util.Collection;

public class UserResponse {
    private boolean authenticated;
    private Principal principal;
    private Collection<? extends GrantedAuthority> authorities;

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }

    public Principal getPrincipal() {
        return principal;
    }

    public void setPrincipal(Principal principal) {
        this.principal = principal;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }
}
