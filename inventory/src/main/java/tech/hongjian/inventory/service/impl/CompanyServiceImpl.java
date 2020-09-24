package tech.hongjian.inventory.service.impl;

import tech.hongjian.inventory.entity.Company;
import tech.hongjian.inventory.mapper.CompanyMapper;
import tech.hongjian.inventory.service.CompanyService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xiahongjian
 * @since 2020-03-24
 */
@Service
public class CompanyServiceImpl extends ServiceImpl<CompanyMapper, Company> implements CompanyService {

}
