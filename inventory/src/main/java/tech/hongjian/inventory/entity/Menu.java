package tech.hongjian.inventory.entity;

import java.util.ArrayList;
import java.util.List;

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
public class Menu extends Indentify {

    private static final long serialVersionUID = 1L;

    private String name;

    private String url;

    private Integer sort;

    private String iconClass;

    private Integer parentId;

    private Integer roleId;

    private List<Menu> subMenus = new ArrayList<>();
}
