//package egovframework.map.service.impl;
//
//import java.util.List;
//import java.util.Map;
//
//import javax.annotation.Resource;
//
//import egovframework.map.service.MapService ;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Service;
//
//import egovframework.rte.psl.dataaccess.util.EgovMap;
//
//@Service("mapService")
//public class MapServiceImpl implements MapService {
//	final Logger logger = LoggerFactory.getLogger(this.getClass());
//
//	@Resource(name = "mapMapper")
//	private MapMapper mapMapper;
//
//	@Override
//	public List<EgovMap> retrieveList(Map<String, Object> param) throws Exception {
//		List<EgovMap> result = mapMapper.retrieveList(param);
//		return result;
//	}
//
//	@Override
//	public EgovMap retrieve(Map<String, Object> param) throws Exception {
//		return mapMapper.retrieve(param);
//	}
//
//	@Override
//	public int insert(Map<String, Object> param) throws Exception {
//		return mapMapper.insert(param);
//	}
//
//	@Override
//	public int update(Map<String, Object> param) throws Exception {
//		return mapMapper.update(param);
//	}
//
//	@Override
//	public int delete(Map<String, Object> param) throws Exception {
//		return mapMapper.delete(param);
//	}
//
//	@Override
//	public EgovMap retrieveByPrcptqy(Map<String, Object> param) throws Exception {
//		return mapMapper.retrieveByPrcptqy(param);
//	}
//	
//	@Override
//	public EgovMap retrieveByClttrt(Map<String, Object> param) throws Exception {
//		return mapMapper.retrieveByClttrt(param);
//	}
//	
//	@Override
//	public int updateByPrmisnSttemntNo(Map<String, Object> param) throws Exception {
//		return mapMapper.updateByPrmisnSttemntNo(param);
//	}
//	
//	@Override
//	public List<EgovMap> retrieveListByTube(Map<String, Object> param) throws Exception {
//		// TODO Auto-generated method stub
//		List<EgovMap> result = mapMapper.retrieveListByTube(param);
//		return result;
//	}
//	
//	@Override
//	public List<EgovMap> retrieveListByTubeAddr(Map<String, Object> param) throws Exception {
//		// TODO Auto-generated method stub
//		List<EgovMap> result = mapMapper.retrieveListByTubeAddr(param);
//		return result;
//	}
//	
//	@Override
//	public List<EgovMap> retrieveListByDistance(Map<String, Object> param) throws Exception {
//		// TODO Auto-generated method stub
//		List<EgovMap> result = mapMapper.retrieveListByDistance(param);
//		return result;
//	}
//
//	@Override
//	public List<EgovMap> retrieveListByPolygon(Map<String, Object> param) throws Exception {
//		// TODO Auto-generated method stub
//		List<EgovMap> result = mapMapper.retrieveListByPolygon(param);
//		return result;
//	}
//	
//	@Override
//	public List<EgovMap> retrieveListByPrmisn(Map<String, Object> param) throws Exception {
//		// TODO Auto-generated method stub
//		List<EgovMap> result = mapMapper.retrieveListByPrmisn(param);
//		return result;
//	}
//	
//	@Override
//	public List<EgovMap> retrieveListByAftfat(Map<String, Object> param) throws Exception {
//		// TODO Auto-generated method stub
//		List<EgovMap> result = mapMapper.retrieveListByAftfat(param);
//		return result;
//	}
//	
//	@Override
//	public List<EgovMap> retrieveListByPrposQltwtr(Map<String, Object> param) throws Exception {
//		// TODO Auto-generated method stub
//		List<EgovMap> result = mapMapper.retrieveListByPrposQltwtr(param);
//		return result;
//	}
//	
//	@Override
//	public List<EgovMap> retrieveListByStatTbl(Map<String, Object> param) throws Exception {
//		// TODO Auto-generated method stub
//		List<EgovMap> result = mapMapper.retrieveListByStatTbl(param);
//		return result;
//	}
//	
//	@Override
//	public List<EgovMap> retrieveListByQltwtr(Map<String, Object> param) throws Exception {
//		// TODO Auto-generated method stub
//		List<EgovMap> result = mapMapper.retrieveListByQltwtr(param);
//		return result;
//	}
//
//	@Override
//	public List<EgovMap> retrieveListByEmd(Map<String, Object> param) throws Exception {
//		// TODO Auto-generated method stub
//		List<EgovMap> result = mapMapper.retrieveListByEmd(param);
//		return result;
//	}
//	
//	@Override
//	public List<EgovMap> retrieveListByRi(Map<String, Object> param) throws Exception {
//		// TODO Auto-generated method stub
//		List<EgovMap> result = mapMapper.retrieveListByRi(param);
//		return result;
//	}
//	
//	@Override
//	public List<EgovMap> retrieveListByJibun(Map<String, Object> param) throws Exception {
//		// TODO Auto-generated method stub
//		List<EgovMap> result = mapMapper.retrieveListByJibun(param);
//		return result;
//	}
//	
//	@Override
//	public EgovMap retrieveByMain(Map<String, Object> param) throws Exception {
//		return mapMapper.retrieveByMain(param);
//	}
//	
//	@Override
//	public int insertByQltwtrInspctDta(Map<String, Object> param) throws Exception {
//		return mapMapper.insertByQltwtrInspctDta(param);
//	}
//
//	@Override
//	public int insertByLegalized(Map<String, Object> param) throws Exception {
//		return mapMapper.insertByLegalized(param);
//	}
//	
//	@Override
//	public int deleteByQltwtrInspctDta(Map<String, Object> param) throws Exception {
//		return mapMapper.deleteByQltwtrInspctDta(param);
//	}
//	
//}