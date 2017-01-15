package egovframework.map.web;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
/*import java.util.List;*/
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.door.utils.StringUtils;
import kr.co.mangoe.admin.image.service.ImageService;
/*import kr.co.door.utils.StringUtils;*/
import egovframework.map.service.MapService;
import kr.co.mangoe.cmmn.BaseController;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/*import org.springframework.beans.factory.annotation.Autowired;*/
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.rte.psl.dataaccess.util.EgovMap;
/*import kr.co.mangoe.cmmn.BasePaginationInfo;
import kr.co.mangoe.env.CodeManager;*/

@Controller
public class MapController extends BaseController {
	final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Resource(name = "mapService")
	private MapService mapService;
	
	
	@Resource(name = "imageService")
	private ImageService imageService;
	
	/*@Autowired
	private CodeManager codeManager;*/

	/**
	 * @Description 메인
	 */
	@RequestMapping("/admin/map/main.do")
	public String main(@RequestParam Map<String, Object> param, ModelMap model) throws Exception {
		model.put("result", mapService.retrieveByMain(param));
		return "/admin/map/main";
	}
	
	/**
	 * 인쇄
	 * @return
	 */
	@RequestMapping("/admin/map/print.do")
	public String print() {
		return "/admin/map/print";
	}
	
	/**
	 * 저장
	 * @param request
	 * @param response
	 * @param userAgent
	 * @throws Exception
	 */
	@RequestMapping("/admin/map/save.do")
	public void downloadImage(HttpServletRequest request, HttpServletResponse response, @RequestHeader(value="User-Agent") String userAgent) throws Exception {
		String data = request.getParameter("data");
		String base64Str = null;
		if(StringUtils.isBlank(data)) {
			data = IOUtils.toString(request.getInputStream());
			String[] split = data.split("%2C");
			base64Str = split[1];
		}
		else {
			String[] split = data.split(",");
			if(split.length == 2) {
				base64Str = split[1];
			}
		}
		
		if(StringUtils.isNotBlank(data)) {
			byte[] bytes = Base64.decodeBase64(base64Str);
			BufferedImage image = ImageIO.read(new ByteArrayInputStream(bytes));
			
			
			BufferedImage bi = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_INT_ARGB);
			Graphics2D graphics = bi.createGraphics();
			graphics.setColor(Color.white);
			graphics.fillRect(0, 0, bi.getWidth(), bi.getHeight());
			graphics.drawImage(image, 0, 0, null);
			
			String fileName = "export.png";
			String docName = null;
			if(StringUtils.contains(userAgent, "MSIE") || StringUtils.contains(userAgent, "rv:11.0") || StringUtils.contains(userAgent, "Chrome")) {
				docName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20")+";";
			}
			else {
				docName = "\"" + new String(fileName.getBytes("UTF-8"), "ISO-8859-1") + "\"";
			}
			response.setHeader("Content-Disposition", "attachment; filename="+docName);
			
			OutputStream os = response.getOutputStream();
			ImageIO.write(bi, "png", os);
			os.close();
		}
	}

	@RequestMapping("/admin/map/popupmenuByDudt.do")
	public String popupmenuByDudt(@RequestParam Map<String, Object> param, ModelMap model) throws Exception {
		
		List<EgovMap> resultListByPrposQltwtr = mapService.retrieveListByPrposQltwtr(param);
		model.addAttribute("resultListByPrposQltwtr", resultListByPrposQltwtr);

		List<EgovMap> resultListByAftfat = mapService.retrieveListByAftfat(param);
		model.addAttribute("resultListByAftfat", resultListByAftfat);

		List<EgovMap> resultListByPrmisn = mapService.retrieveListByPrmisn(param);
		model.addAttribute("resultListByPrmisn", resultListByPrmisn);
		
		return "/admin/map/popupmenuByDudt";
	}
	

	@RequestMapping(value = "/admin/map/searchJibun.do")
	public void searchJibun(@RequestParam HashMap<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("KSC5601");
		String searchText = request.getParameter("searchText");
		request.setCharacterEncoding("UTF-8");
		
		StringBuffer result = new StringBuffer();
		// 지번 부분
		String reqUrl = "http://map.vworld.kr/search.do?q=" + searchText + "&category=Jibun&pageUnit=30&pageIndex=" + (String)params.get("pageIndex") + "&output=json&apiKey=" + "0C465811-B58B-356B-ABAD-050E2206D2FB";

		HttpURLConnection con;

		try {

			URL url = new URL(reqUrl.replaceAll("\\p{Z}", "+"));

			con = (HttpURLConnection) url.openConnection();

			con.setDoOutput(true);

			BufferedReader rd = new BufferedReader(new InputStreamReader(con.getInputStream(),"UTF-8"));

			String line;

			while ((line = rd.readLine()) != null) {
				result.append(line.trim());
			}

			rd.close();

		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json");
		response.getWriter().println(result.toString());
		
	}
	
	@RequestMapping(value = "/admin/map/searchJuso.do")
	public void searchJuso(@RequestParam HashMap<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception {
			request.setCharacterEncoding("KSC5601");
			String searchText = request.getParameter("searchText");
			request.setCharacterEncoding("UTF-8");
		
		StringBuffer result = new StringBuffer();
//@@                      주소 부분
		String reqUrl = "http://map.vworld.kr/search.do?q=" + searchText + "&category=Juso&pageUnit=30&pageIndex=" + params.get("pageIndex").toString() + "&output=json&apiKey=" + "0C465811-B58B-356B-ABAD-050E2206D2FB";
		
		HttpURLConnection con;
		
		
		try {

			URL url = new URL(reqUrl.replaceAll("\\p{Z}", "+"));
			con = (HttpURLConnection) url.openConnection();
			con.setDoOutput(true);
			BufferedReader rd = new BufferedReader(new InputStreamReader(con.getInputStream(),"UTF-8"));
			String line;
			while ((line = rd.readLine()) != null) {
				result.append(line.trim());
				System.out.println(line.trim());
			}

			rd.close();
		
			

		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json");
		response.getWriter().println(result.toString());
		
	}
	
	@RequestMapping(value = "/admin/map/searchJibunFromXY.do")
	public void searchJibunFromXY(@RequestParam HashMap<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception {
			request.setCharacterEncoding("KSC5601");
			String crdntX = request.getParameter("crdntX");
			String crdntY = request.getParameter("crdntY");
			request.setCharacterEncoding("UTF-8");
		
		StringBuffer result = new StringBuffer();
		//@@주소 부분
		String reqUrl = "http://apis.vworld.kr/coord2jibun.do?x=" + crdntX + "&y=" + crdntY + "&output=json&apiKey=" + "0C465811-B58B-356B-ABAD-050E2206D2FB"+"&domain=" + "http://localhost:8080/admin/map/main.do";
		
		HttpURLConnection con;
		
		
		try {

			URL url = new URL(reqUrl.replaceAll("\\p{Z}", "+"));
			con = (HttpURLConnection) url.openConnection();
			con.setDoOutput(true);
			BufferedReader rd = new BufferedReader(new InputStreamReader(con.getInputStream(),"UTF-8"));
			String line;
			while ((line = rd.readLine()) != null) {
				result.append(line.trim());
				System.out.println(line.trim());
			}

			rd.close();
		
			

		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json");
		response.getWriter().println(result.toString());
		
	}
	
	/**
	 * @Description setFeature
	 */
	@RequestMapping("/admin/map/retrieveByInfo.do")
	public String retrieveByInfo(@RequestParam Map<String, Object> param, ModelMap model) throws Exception {
		String url = "/admin/map/popupmenuBy";
		
		
		EgovMap result = mapService.retrieve(param);
		
		if(!param.get("dbname").equals("SEOUL_DISTANCE") ){
			model.addAttribute("resultByTotal", result);
		} else {
			Map<String, Object> paramBySpt =  new HashMap<String, Object>();
			paramBySpt.put("dbname", "spt_examin_result");
			paramBySpt.put("prmisnSttemntNo", result.get("prmisnSttemntNo"));
			EgovMap resultBySpt = mapService.retrieve(paramBySpt); 
			model.addAttribute("resultByTotal", resultBySpt);
		}
		
		
		if(param.get("dbname").equals("FTTDC_GEOM")){
			url = url.concat("Fttdc");
		}else if(param.get("dbname").equals("SPCIFY_GRL_GEOM")){
			url = url.concat("Spcify");
		}else if(param.get("dbname").equals("USE_END_RCLMLND_GEOM")){
			url = url.concat("Rclmlnd");
		}else if(param.get("dbname").equals("STALL_FCLTY_STTUS_DTA_GEOM")){
			url = url.concat("Stall");
		}else if(param.get("dbname").equals("MINERAL_SPRING_GEOM")){
			url = url.concat("Mineral");
		}else if(param.get("dbname").equals("SMALL_SCALE_GEOM")){
			url = url.concat("Small");
		}else if(param.get("dbname").equals("FRMNG_LGZ_WELL_GEOM")){
			url = url.concat("FrmngLgz");
		}else {
			url = url.concat("Spt");
		}
		
		//System.out.println(param.get("dbname"));
		if(result.get("prmisnSttemntNo")!=null && result.get("prmisnSttemntNo")!=""){
			Map<String, Object> paramBySeoul =  new HashMap<String, Object>();
			
			paramBySeoul.put("dbname", "seoul_administ_dta");
			paramBySeoul.put("prmisnSttemntNo", result.get("prmisnSttemntNo") );
	
			EgovMap resultBySeoul = mapService.retrieve(paramBySeoul);
			
			model.addAttribute("resultBySeoul", resultBySeoul);
			
			List<EgovMap> resultListByQltwtr = mapService.retrieveListByQltwtr(paramBySeoul);
					
			model.addAttribute("resultListByQltwtr", resultListByQltwtr);
			
			Map<String,Object> imgParam = getParamByAllData(param);
			imgParam.put("fileType","pdf");
			List<EgovMap> pdfFilelist = imageService.retrieveList(imgParam);
			
			imgParam.put("fileType","img");
			List<EgovMap> imgFilelist = imageService.retrieveList(imgParam);
			
			model.addAttribute("pdfFilelist",pdfFilelist);
			model.addAttribute("imgFilelist",imgFilelist);
		}
	
		
		return url;
	}

	@RequestMapping("/admin/map/popupmenuByDevPosbl.do")
	public String popupmenuByDevPosbl(@RequestParam Map<String, Object> param, ModelMap model) throws Exception {
		
		Map<String, Object> paramByFiveHund =  new HashMap<String, Object>();
		
		paramByFiveHund.putAll(param);
		
		paramByFiveHund.put("distance", "500");
		
		paramByFiveHund.put("wspPopltn", "2.90");
		
		List<EgovMap> resultByFiveHund = mapService.retrieveListByDistance(paramByFiveHund);
		
		model.addAttribute("resultByFiveHund", resultByFiveHund);
		
		Map<String, Object> paramByFifty =  new HashMap<String, Object>();
		
		paramByFifty.putAll(param);
		
		paramByFifty.put("distance", "50");
		
		paramByFifty.put("wspPopltn", "2.90");
		
		List<EgovMap> resultByFifty = mapService.retrieveListByDistance(paramByFifty);
		
		model.addAttribute("resultByFifty", resultByFifty);
		
		EgovMap resultByPrcptqy = mapService.retrieveByPrcptqy(param);
		model.addAttribute("resultByPrcptqy", resultByPrcptqy);
		
		EgovMap resultByClttrt = mapService.retrieveByClttrt(param);
		model.addAttribute("resultByClttrt", resultByClttrt);
		
		return "/admin/map/popupmenuByDevPosbl";
	}
	@RequestMapping("/admin/map/popupmenuByPolygontab1.do")
	public String popupmenuByPolygontab1(@RequestParam Map<String, Object> param, ModelMap model) throws Exception {
		
		Map<String, Object> paramByPolygon =  new HashMap<String, Object>();
		
		paramByPolygon.putAll(param);
		
		String str = "'";
		str = str.concat(param.get("prmisnSttemntNoList").toString());
		str = str.concat("'");
		str = str.replace(",", "', '");
		
		paramByPolygon.put("prmisnSttemntNo", str);
		paramByPolygon.put("wspPopltn", "2.90");
		/*
		List<EgovMap> resultListByPolygon = mapService.retrieveListByPolygon(paramByPolygon);
		
		model.addAttribute("resultListByPolygon", resultListByPolygon);
		*/
		EgovMap resultByPrcptqy = mapService.retrieveByPrcptqy(param);
		model.addAttribute("resultByPrcptqy", resultByPrcptqy);
		
		EgovMap resultByClttrt = mapService.retrieveByClttrt(param);
		model.addAttribute("resultByClttrt", resultByClttrt);
		
		return "/admin/map/popupmenuByPolygontab1";
	}
	@RequestMapping("/admin/map/popupmenuByPolygon.do")
	public String popupmenuByPolygon(@RequestParam Map<String, Object> param, ModelMap model) throws Exception {
		
		Map<String, Object> paramByPolygon =  new HashMap<String, Object>();
		
		paramByPolygon.putAll(param);
		
		String str = "'";
		str = str.concat(param.get("prmisnSttemntNoList").toString());
		str = str.concat("'");
		str = str.replace(",", "', '");
		
		paramByPolygon.put("prmisnSttemntNo", str);
		paramByPolygon.put("wspPopltn", "2.90");
		
		List<EgovMap> resultListByPolygon = mapService.retrieveListByPolygon(paramByPolygon);
		
		model.addAttribute("resultListByPolygon", resultListByPolygon);
		
		EgovMap resultByPrcptqy = mapService.retrieveByPrcptqy(param);
		model.addAttribute("resultByPrcptqy", resultByPrcptqy);
		
		EgovMap resultByClttrt = mapService.retrieveByClttrt(param);
		model.addAttribute("resultByClttrt", resultByClttrt);
		
		return "/admin/map/popupmenuByPolygon";
	}
	
	@RequestMapping("/admin/map/popupmenuByStatTbl.do")
	public String popupmenuByStatTbl(@RequestParam Map<String, Object> param, ModelMap model) throws Exception {
		
		
		List<EgovMap> resultList = mapService.retrieveListByStatTbl(param);
		
		model.addAttribute("resultList", resultList);
		
		return "/admin/map/popupmenuByStatTbl";
	}
	
	
	
	
	@RequestMapping("/admin/map/ajaxSetFeatureByDB.do")
	@ResponseBody
	public Map<String, Object> ajaxRetrieveListByTube(@RequestParam Map<String, Object> param) throws Exception {
		ModelMap model = new ModelMap();
		if(param.get("groupNo").equals("0")){
			Map<String,String> map = new HashMap<>();
			map.put("seoul_distance","1");
			/*map.put("use_end_rclmlnd_geom","4");
			map.put("stall_fclty_sttus_dta_geom","4");
			map.put("fttdc_geom","4");
			map.put("spcify_grl_geom","4");
			map.put("small_scale_geom","5");
			map.put("mineral_spring_geom","5");
			map.put("frmng_lgz_well_geom","5");*/
			
			List<EgovMap> resultList = new ArrayList<>();
			for(String key:map.keySet()){
				
				param.put("dbname", key);
				param.put("groupNo", map.get(key));
				param.put("serchVal", "");
				
				List<EgovMap> result = mapService.retrieveListByTube(param);
				resultList.addAll(result);
				
			}
			model.addAttribute("resultList", resultList);
		}else{
			List<EgovMap> resultList = mapService.retrieveListByTube(param);
			model.addAttribute("resultList", resultList);
		}
		

		return super.getSuccessResult(model);
	}
	
	@RequestMapping("/admin/map/ajaxRetrieveListByTubeAddr.do")
	@ResponseBody
	public Map<String, Object> ajaxRetrieveListByTubeAddr(@RequestParam Map<String, Object> param) throws Exception {
		ModelMap model = new ModelMap();
		if(param.get("flag").equals("1")){
			
			param.put("dbname","seoul_distance");
			
			List<EgovMap> resultList = mapService.retrieveListByTubeAddr(param);
			model.addAttribute("resultList", resultList);
			
		}else{
			param.put("dbname","undeclared");
			
			List<EgovMap> resultList = mapService.retrieveListByTubeAddr(param);
			model.addAttribute("resultList", resultList);
		}
		
		return super.getSuccessResult(model);
	}
	
	@RequestMapping("/admin/map/ajaxSearchDistance.do")
	@ResponseBody
	public Map<String, Object> ajaxSearchDistance(@RequestParam Map<String, Object> param) throws Exception {

		ModelMap model = new ModelMap();
		List<EgovMap> resultList = mapService.retrieveListByDistance(param);
		model.addAttribute("resultList", resultList);
		
		return super.getSuccessResult(model);
	}
	

	@RequestMapping("/admin/map/ajaxUpdateByPrmisnSttemntNo.do")
	@ResponseBody
	public Map<String, Object> ajaxUpdateByPrmisnSttemntNo(@RequestParam Map<String, Object> param) throws Exception {

		mapService.updateByPrmisnSttemntNo(param);
		
		param.put("rm", "미신고관정 양성화");
		mapService.insertByLegalized(param);

		return super.getSuccessResult();
	}
	
	@RequestMapping("/admin/map/ajaxRetrieveByDudt.do")
	@ResponseBody
	public Map<String, Object> ajaxRetrieveByDudt(@RequestParam Map<String, Object> param) throws Exception {

		ModelMap model = new ModelMap();
		popupmenuByDudt(param, model);

		return super.getSuccessResult(model);
	}
	
	@RequestMapping("/admin/map/ajaxRetrieveListByEmd.do")
	@ResponseBody
	public Map<String, Object> ajaxRetrieveListByEmd(@RequestParam Map<String, Object> param) throws Exception {

		ModelMap model = new ModelMap();
		List<EgovMap> resultList = mapService.retrieveListByEmd(param);
		model.addAttribute("resultList", resultList);

		return super.getSuccessResult(model);
	}
	
	@RequestMapping("/admin/map/ajaxRetrieveListByRi.do")
	@ResponseBody
	public Map<String, Object> ajaxRetrieveListByRi(@RequestParam Map<String, Object> param) throws Exception {

		ModelMap model = new ModelMap();
		List<EgovMap> resultList = mapService.retrieveListByRi(param);
		model.addAttribute("resultList", resultList);

		return super.getSuccessResult(model);
	}
	
	@RequestMapping("/admin/map/ajaxRetrieveListByJibun.do")
	@ResponseBody
	public Map<String, Object> ajaxRetrieveListByJibun(@RequestParam Map<String, Object> param) throws Exception {

		ModelMap model = new ModelMap();
		List<EgovMap> resultList = mapService.retrieveListByJibun(param);
		model.addAttribute("resultList", resultList);

		return super.getSuccessResult(model);
	}
	
	@RequestMapping("/admin/map/ajaxInsertByQltwtrInspctDta.do")
	@ResponseBody
	public Map<String, Object> ajaxInsertByQltwtrInspctDta(@RequestParam Map<String, Object> param) throws Exception {

		mapService.insertByQltwtrInspctDta(param);

		return super.getSuccessResult();
	}
	
	@RequestMapping("/admin/map/ajaxDeleteByQltwtrInspctDta.do")
	@ResponseBody
	public Map<String, Object> ajaxDeleteByQltwtrInspctDta(@RequestParam Map<String, Object> param) throws Exception {

		mapService.deleteByQltwtrInspctDta(param);

		return super.getSuccessResult();
	}
}
