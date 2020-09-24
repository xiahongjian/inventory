package tech.hongjian.inventory.service;

import java.util.Set;

import com.baomidou.mybatisplus.extension.service.IService;

import tech.hongjian.inventory.entity.Role;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xiahongjian
 * @since 2020-03-24
 */
public interface RoleService extends IService<Role> {
    Set<Role> getUserRoles(Integer userId);
}
