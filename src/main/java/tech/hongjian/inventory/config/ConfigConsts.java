package tech.hongjian.inventory.config;
/**
 * @author xiahongjian
 * @time   2020-01-09 20:34:03
 */
public interface ConfigConsts {
    interface SessionKey {
        String NAV_MENU = "navMenus";
    }

    interface URL {
        String LOGIN = "/login";
        String LOGOUT = "/logout";
    }

    String PARAM_USERNAME = "username";
    String PARAM_PASSWORD = "password";
    String PARAM_REMEMBER_ME = "rememberMe";

    String CONTENT_TYPE = "application/json;charset=UTF-8";
}
