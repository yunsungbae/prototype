package egovframework.image.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kr.co.door.utils.StringUtils;
import  egovframework.image.service.ImageService;
import kr.co.mangoe.admin.menu.service.impl.MenuMapper;
import kr.co.mangoe.cmmn.BaseConstant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("imageService")
public class ImageServiceImpl implements egovframework.image.service.ImageService {
	final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Resource(name = "imageMapper")
	private ImageMapper imageMapper;

	@Resource(name = "menuMapper")
	private MenuMapper menuMapper;

	@Override
	public List<EgovMap> retrieveList(Map<String, Object> param) throws Exception {
		return imageMapper.retrieveList(param);
	}

	@Override
	public EgovMap retrieve(Map<String, Object> param) throws Exception {
		return imageMapper.retrieve(param);
	}

	@Override
	public int insert(Map<String, Object> param) throws Exception {

		return imageMapper.insert(param);
	}

	@Override
	public int update(Map<String, Object> param) throws Exception {
		return imageMapper.update(param);
	}

	@Override
	public int delete(Map<String, Object> param) throws Exception {
		return imageMapper.delete(param);
	}
	
}
