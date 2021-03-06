package tech.hongjian.inventory.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * @author xiahongjian
 * @time 2018-04-11 15:57:39
 *
 */
public class WebUtil {
    /**
     * 获取请求反向代理之前的IP
     */
    public static String getClientRealIp(HttpServletRequest request) {
        String header = request.getHeader("x-forwarded-for");
        if (isCorrectIP(header)) {
            // 多次反向代理后会出现如“10.47.103.13,4.2.2.2,10.96.112.230”的情况，
            // 第一个IP为客户端真实IP
            return header.indexOf(",") == -1 ? header : header.split(",")[0];
        }

        header = request.getHeader("Proxy-Client-IP");
        if (isCorrectIP(header))
            return header;

        header = request.getHeader("WL-Proxy-Client-IP");
        if (isCorrectIP(header))
            return header;

        header = request.getHeader("TTP_CLIENT_IP");
        if (isCorrectIP(header))
            return header;

        header = request.getHeader("HTTP_X_FORWARDED_FOR");
        if (isCorrectIP(header))
            return header;

        header = request.getHeader("X-Real-IP");
        if (isCorrectIP(header))
            return header;

        return request.getRemoteAddr();
    }

    private static boolean isCorrectIP(String str) {
        return str != null && !"".equals(str) && !"unknown".equalsIgnoreCase(str);
    }

    public static HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();
    }

    public static HttpServletResponse getResponse() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getResponse();
    }

    public static HttpSession getSession() {
        return getRequest().getSession();
    }

    /**
     * 创建cookie
     * 
     * @param name cookie名称
     * @param value cookie的值
     * @param path cookie作用路径
     * @param expiry cookie超时时间（单位秒）
     */
    public static void addCookie(String name, String value, String path, int expiry) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath(path == null || "".equals(path.trim()) ? "/" : path);
        cookie.setMaxAge(expiry);
        getResponse().addCookie(cookie);
    }

    /**
     * 创建cookie
     * 
     * @param name cookie名称
     * @param value cookie的值
     * @param expiry cookie的超时时间（单位秒）
     */
    public static void addCookie(String name, String value, int expiry) {
        addCookie(name, value, "/", expiry);
    }

    /**
     * 获取指定cookie的值
     * 
     * @param name cookie的名称
     * @return 对应cookie名称的值，如果不存在对应cookie返回null
     */
    public static String getCookie(String name) {
        Cookie[] cookies = getRequest().getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(name))
                return cookie.getValue();
        }
        return null;
    }

    /**
     * 删除指定cookie
     * 
     * @param name cookie的名称
     */
    public static void removeCookie(String name) {
        Cookie[] cookies = getRequest().getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(name)) {
                cookie.setMaxAge(0);
                getResponse().addCookie(cookie);
                return;
            }
        }
    }

    /**
     * 删除所有cookie
     */
    public static void deleteAllCookies() {
        HttpServletResponse resp = getResponse();
        for (Cookie cookie : getRequest().getCookies()) {
            cookie.setMaxAge(0);
            resp.addCookie(cookie);
        }
    }

    public static boolean isAjaxRequest(HttpServletRequest request) {
        String ajaxFlag = request.getHeader("X-Requested-With");
        return ajaxFlag != null && "XMLHttpRequest".equals(ajaxFlag);
    }
}
