package tech.hongjian.inventory.mapper;

import java.util.Set;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import tech.hongjian.inventory.entity.Role;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author xiahongjian
 * @since 2020-03-24
 */
public interface RoleMapper extends BaseMapper<Role> {

    public Set<Role> findUserRoles(Integer userId);
}
