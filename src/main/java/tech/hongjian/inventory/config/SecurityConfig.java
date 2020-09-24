package tech.hongjian.inventory.config;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import tech.hongjian.inventory.entity.User;
import tech.hongjian.inventory.model.RestResponse;
import tech.hongjian.inventory.service.MenuService;
import tech.hongjian.inventory.service.UserService;
import tech.hongjian.inventory.util.JSONUtil;
import tech.hongjian.inventory.util.WebUtil;

/**
 * @author xiahongjian
 * @time 2020-01-15 22:37:28
 */
@Configuration
@EnableWebSecurity(debug = true)
//@EnableGlobalMethodSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserService userService;

    @Autowired
    private DataSource dataSource;

    @Autowired
    private MenuService menuService;

    @Autowired
    private ResourceBasedDecisionManager customUrlDecisionManager;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public PersistentTokenRepository tokenRepository() {
        JdbcTokenRepositoryImpl jdbcTokenRepositoryImpl = new JdbcTokenRepositoryImpl();
        jdbcTokenRepositoryImpl.setDataSource(dataSource);
//        jdbcTokenRepositoryImpl.setCreateTableOnStartup(true);
        return jdbcTokenRepositoryImpl;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/css/**",
                "/js/**", "/plugins/**", "/index.html", "/img/**", "/fonts/**", "/favicon.ico");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .anyRequest().authenticated()
            .withObjectPostProcessor(new ObjectPostProcessor<FilterSecurityInterceptor>() {
                @Override
                public <O extends FilterSecurityInterceptor> O postProcess(O object) {
                    object.setAccessDecisionManager(customUrlDecisionManager);
                    return object;
                }})
            .and()
            .rememberMe()
            .rememberMeParameter(ConfigConsts.PARAM_REMEMBER_ME)
            .tokenRepository(tokenRepository())
            .tokenValiditySeconds(60 * 60 * 24 * 7) // 7天
            .and()
            .formLogin()
            .loginPage(ConfigConsts.URL.LOGIN)
            .usernameParameter(ConfigConsts.PARAM_USERNAME)
            .passwordParameter(ConfigConsts.PARAM_PASSWORD)
            .successHandler(new AuthenticationSuccessHandler() {
                @Override
                public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                        Authentication authentication) throws IOException, ServletException {
                    HttpSession session = request.getSession();
                    User user = (User) authentication.getPrincipal();
                    session.setAttribute(ConfigConsts.SessionKey.NAV_MENU, menuService.getUserNavMenus(user.getId()));

                    response.setContentType(ConfigConsts.CONTENT_TYPE);
                    PrintWriter out = response.getWriter();
                    out.print(JSONUtil.toJSON(RestResponse.ok()));
                    out.close();
                }
            })
            .failureHandler(new AuthenticationFailureHandler() {
                @Override
                public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                        AuthenticationException exception) throws IOException, ServletException {
                    response.setContentType(ConfigConsts.CONTENT_TYPE);
                    PrintWriter out = response.getWriter();
                    String msg = null;
                    if (exception instanceof LockedException) {
                        msg = "账户被锁定，请联系管理员!";
                    } else if (exception instanceof CredentialsExpiredException) {
                        msg = "密码过期，请联系管理员!";
                    } else if (exception instanceof AccountExpiredException) {
                        msg = "账户过期，请联系管理员!";
                    } else if (exception instanceof DisabledException) {
                        msg = "账户被禁用，请联系管理员!";
                    } else if (exception instanceof BadCredentialsException) {
                        msg = "用户名或者密码输入错误，请重新输入!";
                    }
                    out.print(JSONUtil.toJSON(RestResponse.fail(msg)));
                    out.close();
                }
            })
            .permitAll()
            .and()
            .logout()
            .logoutUrl(ConfigConsts.URL.LOGOUT)
            .logoutSuccessHandler(new LogoutSuccessHandler() {
                @Override
                public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response,
                        Authentication authentication) throws IOException, ServletException {
                    response.setContentType(ConfigConsts.CONTENT_TYPE);
                    PrintWriter out = response.getWriter();
                    out.print(JSONUtil.toJSON(RestResponse.ok()));
                    out.close();
                }
             })
            .permitAll()
            .and()
            .csrf().disable().exceptionHandling()
            .authenticationEntryPoint(new AuthenticationEntryPoint() {
                @Override
                public void commence(HttpServletRequest request, HttpServletResponse response,
                        AuthenticationException authException) throws IOException, ServletException {
                    if (WebUtil.isAjaxRequest(request)) {
                        response.setContentType(ConfigConsts.CONTENT_TYPE);
                        response.setStatus(HttpStatus.UNAUTHORIZED.value());
                        PrintWriter out = response.getWriter();
                        out.print(JSONUtil.toJSON(RestResponse.fail("Unauthorized")));
                        out.close();
                    } else {
//                        String url = request.getRequestURL().toString();
//                        request.getSession().setAttribute("from", url);
//                        response.sendRedirect(ConfigConsts.URL.LOGIN);
                    }
                }
            });
    }
}
