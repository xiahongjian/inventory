package tech.hongjian.inventory.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.baomidou.mybatisplus.extension.service.IService;

import tech.hongjian.inventory.entity.User;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xiahongjian
 * @since 2020-09-27
 */
public interface UserService extends IService<User>, UserDetailsService {

}
