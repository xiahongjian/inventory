package tech.hongjian.inventory.mapper;

import java.util.List;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import tech.hongjian.inventory.entity.Permission;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author xiahongjian
 * @since 2020-09-27
 */
public interface PermissionMapper extends BaseMapper<Permission> {
    public List<Permission> findByUserId(Integer userId);
}
