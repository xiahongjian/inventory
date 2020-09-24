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
 * @since 2020-03-25
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
public class Role extends Indentify implements GrantedAuthority {

    private static final long serialVersionUID = 1L;

    private String name;

    private String description;

    @Override
    public String getAuthority() {
        return name;
    }


}
