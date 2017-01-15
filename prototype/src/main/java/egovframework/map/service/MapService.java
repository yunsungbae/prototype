package egovframework.map.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface MapService {

	/**
	 * @Description 목록 조회
	 */
	public List<EgovMap> retrieveList(Map<String, Object> param) throws Exception;

	/**
	 * @Description 상세 조회
	 */
	public EgovMap retrieve(Map<String, Object> param) throws Exception;

	/**
	 * @Description 등록
	 */
	public int insert(Map<String, Object> param) throws Exception;

	/**
	 * @Description 수정
	 */
	public int update(Map<String, Object> param) throws Exception;

	/**
	 * @Description 삭제
	 */
	public int delete(Map<String, Object> param) throws Exception;
	
	public EgovMap retrieveByPrcptqy(Map<String, Object> param) throws Exception;
	
	public EgovMap retrieveByClttrt(Map<String, Object> param) throws Exception;
	
	public int updateByPrmisnSttemntNo(Map<String, Object> param) throws Exception;
	
	public List<EgovMap> retrieveListByTube(Map<String, Object> param) throws Exception;
	
	public List<EgovMap> retrieveListByTubeAddr(Map<String, Object> param) throws Exception;
	
	public List<EgovMap> retrieveListByDistance(Map<String, Object> param) throws Exception;

	public List<EgovMap> retrieveListByPolygon(Map<String, Object> param) throws Exception;
	
	public List<EgovMap> retrieveListByPrmisn(Map<String, Object> param) throws Exception;
	
	public List<EgovMap> retrieveListByPrposQltwtr(Map<String, Object> param) throws Exception;
	
	public List<EgovMap> retrieveListByAftfat(Map<String, Object> param) throws Exception;
	
	public List<EgovMap> retrieveListByStatTbl(Map<String, Object> param) throws Exception;

	public List<EgovMap> retrieveListByQltwtr(Map<String, Object> param) throws Exception;
	
	public List<EgovMap> retrieveListByEmd(Map<String, Object> param) throws Exception;
	
	public List<EgovMap> retrieveListByRi(Map<String, Object> param) throws Exception;
	
	public List<EgovMap> retrieveListByJibun(Map<String, Object> param) throws Exception;
	
	public EgovMap retrieveByMain(Map<String, Object> param) throws Exception;
	
	public int insertByQltwtrInspctDta(Map<String, Object> param) throws Exception;
	
	public int insertByLegalized(Map<String, Object> param) throws Exception;
	
	public int deleteByQltwtrInspctDta(Map<String, Object> param) throws Exception;
	
}
