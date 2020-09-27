package tech.hongjian.inventory.entity;

import org.springframework.security.core.GrantedAuthority;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author xiahongjian
 * @since 2020-09-27
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
public class Permission extends BaseEntity implements GrantedAuthority {

    private static final long serialVersionUID = 1L;

    private String name;

    private String url;

    private String operation;

    private String group;

    @Override
    public String getAuthority() {
        return url + ";" + operation;
    }


}
