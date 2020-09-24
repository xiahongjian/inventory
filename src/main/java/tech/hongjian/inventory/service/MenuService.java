package tech.hongjian.inventory.service;

import java.util.List;

import com.baomidou.mybatisplus.extension.service.IService;

import tech.hongjian.inventory.entity.Menu;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xiahongjian
 * @since 2020-03-25
 */
public interface MenuService extends IService<Menu> {
    List<Menu> getUserNavMenus(Integer userId);

    List<Menu> getBreadcrumb(String url);
}
