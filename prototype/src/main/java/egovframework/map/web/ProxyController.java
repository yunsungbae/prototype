package egovframework.map.web;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;
import java.util.Locale;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 이 클래스는 프록시 컨트롤러 입니다.
 * @author gis team
 */
/**
 * @author libraleo
 *
 */
@Controller
public class ProxyController {
	
	// 로거
	Logger logger = LoggerFactory.getLogger(getClass());
	
	/// 메세지 소스
	@Resource
    private MessageSource messageSource;
	
	/**
	 * 프록시 (TMS 에서 사용)
	 * @param request 요청 객체
	 * @param response 응답 객체
	 * @throws IOException
	 */
	@RequestMapping(value="/proxy.do", method=RequestMethod.GET)
	public void proxy(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String urlStr = request.getParameter("url");
		URL url = null;
		URLConnection connection = null;
		HttpURLConnection huc = null;
		OutputStream ios = null;
		try {
			url = new URL(urlStr);
			connection = url.openConnection();
			huc = (HttpURLConnection)connection;
			huc.setRequestMethod("GET");
			huc.setDoOutput(true);
			huc.setDoInput(true);
			huc.setUseCaches(false);
			huc.setDefaultUseCaches(false);
			response.reset();
			response.setContentType(huc.getContentType());
			ios = response.getOutputStream();
			IOUtils.copy(huc.getInputStream(), ios);
			
		} catch (IOException e) {
			logger.warn(e.getMessage());
			//throw e;
		} finally {
			if(ios != null) {
				ios.close();
			}
			if(huc != null) {
				huc.disconnect();
			}
		}
	}
	
	/**
	 * Get 방식 WMS 프록시
	 * @param request 요청 객체 
	 * @param response 응답 객체
	 * @throws Exception
	 */
	@RequestMapping(value="/proxy/wms.do", method=RequestMethod.GET)
	public void proxyWMSGet(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String urlStr = messageSource.getMessage("GeoServer.WMS", null, Locale.getDefault());
		proxyGet(urlStr, request, response);
	}
	
	/**
	 * Post 방식 WMS 프록시
	 * @param request 요청 객체
	 * @param response 응답 객체
	 * @throws Exception
	 */
	@RequestMapping(value="/proxy/wms.do", method=RequestMethod.POST)
	public void proxyWMSPost(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String urlStr = messageSource.getMessage("GeoServer.WMS", null, Locale.getDefault());
		proxyPost(urlStr, request, response);
	}
	
	/**
	 * Get 방식 WFS 프록시
	 * @param request 요청 객체
	 * @param response 응답 객체
	 * @throws Exception
	 */
	@RequestMapping(value="/proxy/wfs.do", method=RequestMethod.GET)
	public void proxyWFSGet(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String urlStr = messageSource.getMessage("GeoServer.WFS", null, Locale.getDefault());
		proxyGet(urlStr, request, response);
	}
	
	/**
	 * Post 방식 WFS 프록시
	 * @param request 요청 객체
	 * @param response 응답 객체
	 * @throws Exception
	 */
	@RequestMapping(value="/proxy/wfs.do", method=RequestMethod.POST)
	public void proxyWFSPost(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String urlStr = messageSource.getMessage("GeoServer.WFS", null, Locale.getDefault());
		proxyPost(urlStr, request, response);
	}
	
	/**
	 * Get 방식 프록시
	 * @param urlStr 요청 주소
	 * @param request 요청 객체
	 * @param response 응답 객체
	 * @throws IOException
	 */
	public void proxyGet(String urlStr, HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpURLConnection huc = null;
		OutputStream ios = null;
		
		try {
			request.setCharacterEncoding("UTF-8");
			StringBuffer params = new StringBuffer();
			for(Object param : request.getParameterMap().entrySet()) {
				@SuppressWarnings("unchecked")
				Entry<String, String[]> entry = (Entry<String, String[]>) param;
				
				if(entry.getKey().indexOf('=') >= 0)
				{
					params.append(getLocaleString(entry.getKey()));
				}
				else {
					params.append(entry.getKey());
					params.append("=");
					
					String[] values = entry.getValue();
					if(values.length > 0) {
						if (request.getCharacterEncoding() == null)
							params.append(URLEncoder.encode(getLocaleString(values[0]), "UTF-8"));
						else
							params.append(URLEncoder.encode(values[0], "UTF-8"));
					}
					params.append("&");
				}
			}
			if(params.length() > 0 && params.substring(params.length()-1).equals("&"))
				params.deleteCharAt(params.length()-1);
			
			URL url = new URL(urlStr.concat("?")+params);

			URLConnection connection = url.openConnection();
			huc = (HttpURLConnection)connection;
			huc.setRequestMethod("GET");
			huc.setDoOutput(true);
			huc.setDoInput(true);
			huc.setUseCaches(false);
			huc.setDefaultUseCaches(false);
			
			response.reset();
			response.setContentType(huc.getContentType());
			
			ios = response.getOutputStream();
			IOUtils.copy(huc.getInputStream(), ios);
		} catch (IOException e) {
			logger.warn(e.getMessage());
			//throw e;
		} finally {
			if(ios != null) {
				ios.close();
			}
			if(huc != null) {
				huc.disconnect();
			}
		}
		
		
	}
	
	/**
	 * Post 방식 프록시
	 * @param urlStr 요청 주소
	 * @param request 요청 객체
	 * @param response 응답 객체
	 * @throws IOException
	 */
	public void proxyPost(String urlStr, HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpURLConnection huc = null;
		OutputStream ios = null;
		
		URL url;
		try {
			url = new URL(urlStr+"?");
			URLConnection connection = url.openConnection();
			huc = (HttpURLConnection)connection;
			huc.setRequestMethod("POST");
			huc.setDoOutput(true);
			huc.setDoInput(true);
			huc.setUseCaches(false);
			huc.setDefaultUseCaches(false);
			huc.setRequestProperty("Content-Type", "text/xml;charset=utf-8");
			
			IOUtils.copy(request.getInputStream(), huc.getOutputStream());

			response.reset();
			response.setContentType(huc.getContentType());
			
			ios = response.getOutputStream();
			
			IOUtils.copy(huc.getInputStream(), ios);
		} catch (IOException e) {
			logger.warn(e.getMessage());
			//throw e;
		} finally {
			if(ios != null) {
				ios.close();
			}
			if(huc != null) {
				huc.disconnect();
			}
		}
	}
	
	/**
	 * 한글 값 처리
	 * @param value 인코딩할 문자열
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	private String getLocaleString(String value) throws UnsupportedEncodingException {
		byte[] b;
		b = value.getBytes("8859_1");
		final CharsetDecoder decoder = Charset.forName("UTF-8").newDecoder();
		try {
			final CharBuffer r = decoder.decode(ByteBuffer.wrap(b));
			return r.toString();
		} catch (final CharacterCodingException e) {
			return new String(b, "EUC-KR");
		}
	}
	
}
