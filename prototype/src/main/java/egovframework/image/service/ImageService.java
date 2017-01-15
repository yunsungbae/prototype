package egovframework.image.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface ImageService {

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

}
