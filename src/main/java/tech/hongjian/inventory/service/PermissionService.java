package tech.hongjian.inventory.service;

import java.util.List;

import com.baomidou.mybatisplus.extension.service.IService;

import tech.hongjian.inventory.entity.Permission;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xiahongjian
 * @since 2020-09-27
 */
public interface PermissionService extends IService<Permission> {
    public List<Permission> getUserPermission(Integer userId);
}
