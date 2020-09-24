package tech.hongjian.inventory.service.impl;

import java.util.Collections;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import tech.hongjian.inventory.entity.Role;
import tech.hongjian.inventory.mapper.RoleMapper;
import tech.hongjian.inventory.service.RoleService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xiahongjian
 * @since 2020-03-24
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public Set<Role> getUserRoles(Integer userId) {
        if (userId == null) {
            return Collections.emptySet();
        }
        return roleMapper.findUserRoles(userId);
    }
}
