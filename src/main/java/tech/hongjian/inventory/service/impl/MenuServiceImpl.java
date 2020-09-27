package tech.hongjian.inventory.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import tech.hongjian.inventory.entity.Menu;
import tech.hongjian.inventory.entity.Permission;
import tech.hongjian.inventory.mapper.MenuMapper;
import tech.hongjian.inventory.service.MenuService;
import tech.hongjian.inventory.service.PermissionService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xiahongjian
 * @since 2020-03-25
 */
@Service
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu> implements MenuService {

    @Autowired
    private MenuMapper menuMapper;
    
    @Autowired
    private PermissionService permissionService;

    @Override
    public List<Menu> getUserNavMenus(Integer userId) {
        if (userId == null) {
            return Collections.emptyList();
        }
        
        List<Permission> permissions = permissionService.getUserPermission(userId);
        if (permissions.isEmpty()) {
            return Collections.emptyList();
        }
        
        List<Menu> menus = getAllMenues().stream().filter(m -> checkPermission(m, permissions)).collect(Collectors.toList());
        
        Map<Integer, Menu> map = new HashMap<>();
        menus.forEach(m -> {
            map.put(m.getId(), m);
        });
        menus.forEach(m -> {
            Integer parentId = m.getParentId();
            if (parentId == null || !map.containsKey(parentId)) {
                return;
            }
            Menu parent = map.get(parentId);
            List<Menu> subMenus = parent.getSubMenus();
            subMenus.add(m);
        });
        return menus.stream().filter(m -> m.getParentId() == null).collect(Collectors.toList());
    }
    
    private List<Menu> 
    
    private boolean checkPermission(Menu menu, List<Permission> permissions) {
        String url = menu.getUrl();
        // 当menu的url为null时，不显示
        if (url == null) {
            return false;
        }
        for (Permission permission : permissions) {
            if (url.equals(permission.getUrl()) || permission.getUrl().startsWith(url)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Menu> getBreadcrumb(String url) {
        Menu menu = getOne(lambdaQuery().eq(Menu::getUrl, url));
        if (menu == null) {
            return Collections.emptyList();
        }
        Stack<Menu> breadcrumbs = new Stack<>();
        breadcrumbs.push(menu);
        while (menu != null && menu.getParentId() != null) {
            menu = getById(menu.getParentId());
            if (menu != null) {
                breadcrumbs.push(menu);
            }
        }
        List<Menu> list = new ArrayList<>(breadcrumbs.size());
        while (!breadcrumbs.isEmpty()) {
            list.add(breadcrumbs.pop());
        }
        return list;
    }

    @Override
    public List<Menu> getAllMenues() {
        return menuMapper.findAll();
    }

}
