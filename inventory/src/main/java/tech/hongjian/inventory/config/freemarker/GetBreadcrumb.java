package tech.hongjian.inventory.config.freemarker;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModelException;
import tech.hongjian.inventory.service.MenuService;
import tech.hongjian.inventory.util.WebUtil;

/**
 * @author xiahongjian
 * @since  2020-03-28 12:53:38
 */
@Component
@FMMethod("breadcrumb")
public class GetBreadcrumb implements TemplateMethodModelEx {

    @Autowired
    private MenuService menuService;

    @Override
    public Object exec(List arguments) throws TemplateModelException {
        String url = WebUtil.getRequest().getRequestURI();
        return menuService.getBreadcrumb(url);
    }

}
