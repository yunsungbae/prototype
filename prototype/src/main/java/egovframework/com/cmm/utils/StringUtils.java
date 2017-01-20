package egovframework.com.cmm.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

/**
 * cmmn.utils</br> StringUtils.java
 * 
 * @Description<pre> String Utility </pre>
 * @author doorlove
 * @date 2015. 1. 12.
 */
public class StringUtils extends org.apache.commons.lang.StringUtils {
	final static String NEW_LINE = System.getProperty("line.separator");

	/**
	 * @Method printStackTraceToHtml
	 * @Description Exception을 Html으로 출력
	 * @author doorlove
	 * @date 2015. 1. 12.
	 * @param e
	 * @return
	 * @return_type String
	 */
	public static String printStackTraceToHtml(Throwable e) {
		StringBuffer buffer = new StringBuffer();
		buffer.append(e.toString());
		buffer.append("<br/>");
		StackTraceElement element[] = e.getStackTrace();
		for (StackTraceElement stack : element) {
			buffer.append("&nbsp;&nbsp;&nbsp;&nbsp;").append("at").append("&nbsp;").append(stack.toString()).append("<br/>");
		}
		return buffer.toString();
	}

	/**
	 * @Method printStacTraceToString
	 * @Description Exception을 String으로 출력
	 * @author doorlove
	 * @date 2015. 1. 12.
	 * @param e
	 * @return
	 * @return_type String
	 */
	public static String printStacTraceToString(Throwable e) {
		String buffer = "";
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		PrintStream printStream = new PrintStream(out);
		e.printStackTrace(printStream);
		buffer = out.toString();
		return buffer;
	}

	/**
	 * @Method getString
	 * @Description 입력값이 null일경우 ""으로 리턴
	 * @author doorlove
	 * @date 2015. 2. 5.
	 * @param str
	 * @return
	 * @return_type String
	 */
	public static String getString(Object str) {
		if (str == null) {
			return "";
		} else {
			if (str instanceof String) {
				return (String) str;
			} else {
				return String.valueOf(str);
			}
		}
	}
	
	/**
	 * @Method getString 
	 * @Description 입력값이 Null 또는 "" 일 경우 defValue 값으로 리턴
	 * 
	 * @author sjpark 
	 * @date 2015. 11. 8. 
	 * @param str
	 * @param defValue
	 * @return 
	 * @return_type String
	 */
	public static String getString(Object str,String defValue) {
		String value=defValue;
		try{
		if (str == null) {
			value = defValue;
		} else {
			if (str instanceof String) {
				value = (String) str;
			} else {
				value = String.valueOf(str);
			}
		}
		if(value.trim().equals("")) value = defValue;
		}catch(Exception ex){
			return defValue;
		}
		return value;
	}
	
	public static Object getInputData(String str) {
		if (str.trim().length() == 0) {
			return null;
		} else {
			return str;
		}
	}

	/**
	 * @Method setNullByEmpty
	 * @Description 맵에 빈값이 있을경우 null로 변환한다.
	 * @author doorlove
	 * @date 2015. 9. 16.
	 * @param param
	 * @param id
	 * @return
	 * @return_type Map<String,Object>
	 */
	public static Map<String, Object> setNullByEmpty(Map<String, Object> param, String... id) {
		for (String key : id) {
			if (getString(param.get(key)).length() == 0) {
				param.put(key, null);
			}
		}
		return param;
	}
	
	public static List<String[]> readLine(MultipartFile file) throws IOException{
		List<String[]> list = new ArrayList();
		String string =new String(file.getBytes(),Charset.forName("EUC-KR"));
		String[] lines = string.split("\n");
		for(String line : lines){
			String[] lineArray = line.split(",");
			list.add(lineArray);
		}
		return list;
	}
}
