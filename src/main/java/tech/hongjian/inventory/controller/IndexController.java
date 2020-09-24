package tech.hongjian.inventory.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

/**
 * @author xiahongjian
 * @since  2020-03-26 21:18:00
 */
@Slf4j
@Controller
public class IndexController {

    @GetMapping("/login")
    public String login(HttpServletRequest req) {
        log.info(req.getRequestURI());
        log.info(req.getRequestURL().toString());
        return "login";
    }

    @GetMapping
    public String dashboard() {
        return "dashboard";
    }
}
