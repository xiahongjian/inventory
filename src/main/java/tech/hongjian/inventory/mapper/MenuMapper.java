package tech.hongjian.inventory.mapper;

import java.util.List;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import tech.hongjian.inventory.entity.Menu;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author xiahongjian
 * @since 2020-03-25
 */
public interface MenuMapper extends BaseMapper<Menu> {
    List<Menu> getUserNavMenus(Integer userId);
}
