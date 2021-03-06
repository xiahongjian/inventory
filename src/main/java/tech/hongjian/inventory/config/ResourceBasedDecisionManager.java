package tech.hongjian.inventory.config;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

import tech.hongjian.inventory.config.ConfigConsts.URL;

/**
 * @author xiahongjian
 * @since 2020-03-18 20:09:42
 */
@Component
public class ResourceBasedDecisionManager implements AccessDecisionManager {

    @Override
    public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> configAttributes)
            throws AccessDeniedException, InsufficientAuthenticationException {
        HttpServletRequest request = ((FilterInvocation) object).getRequest();
        String uri = request.getRequestURI();
        // 当请求的是登录和登出url时忽略
        if (URL.LOGIN.equals(uri) || URL.LOGOUT.equals(uri)) {
            return;
        }
        for (GrantedAuthority ga : authentication.getAuthorities()) {
            if (ga instanceof Permission) {
                Permission permission = (Permission) ga;
                String operation = permission.getOperation().name();
                AntPathRequestMatcher matcher = new AntPathRequestMatcher(permission.getUrl());
                if (matcher.matches(request)
                        && (request.getMethod().equals(operation) || Operation.ALL.name().equals(operation))) {
                    return;
                }
            }
        }
        throw new AccessDeniedException("No permission.");
    }

    @Override
    public boolean supports(ConfigAttribute attribute) {
        return true;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }

}
