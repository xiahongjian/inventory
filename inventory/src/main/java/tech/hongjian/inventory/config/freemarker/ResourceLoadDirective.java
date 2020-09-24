package tech.hongjian.inventory.config.freemarker;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;
import freemarker.template.TemplateScalarModel;
import tech.hongjian.inventory.util.WebUtil;


/**
 * resource指令用于加载css和js等静态资源，确保不会因为contextpath和静态资源统一目录导致加载失败
 * 需要传入连个参数type, res
 *
 * type(可选) 默认为"js"，可以传入的只有"css"和"js"
 * res(必填)  相对于静态资源目录的路径
 *
 */
@FMDirective("loader")
public class ResourceLoadDirective implements TemplateDirectiveModel {
    private static final String RES_TYPE_KEY = "type";
    private static final String RES_KEY = "res";
    private static final String EXTRA_KEY = "extra";

    public static final String CSS_RES = "css";
    public static final String JS_RES = "js";

    private static final Map<String, String> TEMPLATE_MAP = new HashMap<>(2);

    static {
        TEMPLATE_MAP.put(CSS_RES, "<link rel=\"stylesheet\" href=\"{0}\" {1} />\n");
        TEMPLATE_MAP.put(JS_RES, "<script type=\"text/javascript\" src=\"{0}\" {1}></script>\n");
    }


    @Override
    public void execute(Environment environment, Map map, TemplateModel[] templateModels, TemplateDirectiveBody
            templateDirectiveBody) throws TemplateException, IOException {
        TemplateModel paramVal = (TemplateModel) map.get(RES_KEY);
        if (paramVal == null)
            throw new TemplateModelException("The " + RES_KEY + " parameter must not be null.");

        stringChecker(paramVal, RES_KEY);

        String res = ((TemplateScalarModel) paramVal).getAsString();

        String resType = JS_RES;
        paramVal = (TemplateModel) map.get(RES_TYPE_KEY);

        if (paramVal != null) {
            stringChecker(paramVal, RES_TYPE_KEY);
            resType = ((TemplateScalarModel) paramVal).getAsString().toLowerCase();
            if (!CSS_RES.equals(resType) && !JS_RES.equals(resType)) {
                throw new TemplateModelException("The " + RES_TYPE_KEY + " parameter must be css or js.");
            }
        } else {
            if (res.endsWith(".js")) {
                resType = JS_RES;
            } else if (res.endsWith(".css")) {
                resType = CSS_RES;
            } else {
                throw new TemplateModelException("The resource must be css or js.");
            }
        }

        res = WebUtil.getRequest().getContextPath() + "/" + res;

        paramVal = (TemplateModel) map.get(EXTRA_KEY);
        String extra = "";
        if (paramVal != null) {
            stringChecker(paramVal, EXTRA_KEY);
            extra = ((TemplateScalarModel) paramVal).getAsString();
        }

        environment.getOut().write(MessageFormat.format(TEMPLATE_MAP.get(resType), res, extra));
    }

    private void stringChecker(TemplateModel param, String paramName) throws TemplateModelException {
        if (!(param instanceof TemplateScalarModel))
            throw new TemplateModelException("The " + paramName + " parameter must be a string.");
    }

}
