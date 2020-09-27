package tech.hongjian.inventory.service.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import tech.hongjian.inventory.entity.Permission;
import tech.hongjian.inventory.mapper.PermissionMapper;
import tech.hongjian.inventory.service.PermissionService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xiahongjian
 * @since 2020-09-27
 */
@Service
public class PermissionServiceImpl extends ServiceImpl<PermissionMapper, Permission> implements PermissionService {

    @Autowired
    private PermissionMapper permissionMapper;
    
    
    @Override
    public List<Permission> getUserPermission(Integer userId) {
        if (userId == null) {
            return Collections.emptyList();
        }
        return permissionMapper.findByUserId(userId);
    }
}
