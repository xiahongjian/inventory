package tech.hongjian.inventory.config.freemarker;

import org.springframework.stereotype.Component;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Component
public @interface FMMethod {
    /**
     * freemarker方法名称
     */
    String value() default "";
}
