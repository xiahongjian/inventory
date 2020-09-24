package tech.hongjian.inventory.entity;

import tech.hongjian.inventory.entity.Indentify;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author xiahongjian
 * @since 2020-03-25
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
public class Company extends Indentify {

    private static final long serialVersionUID = 1L;

    private String name;

    private String description;


}
