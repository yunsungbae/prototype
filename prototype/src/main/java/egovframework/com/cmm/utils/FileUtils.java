package egovframework.com.cmm.utils;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public class FileUtils extends org.apache.commons.io.FileUtils {

	public static String FILE_NOT_FOUND = "_!file_not_found";

	public static String saveFile(final MultipartHttpServletRequest multiRequest, String name, String uploadPath) throws IllegalStateException, IOException {
		MultipartFile multipartFile = multiRequest.getFile(name);
		if (multipartFile == null) {
			return FILE_NOT_FOUND;
		}

		File saveFolder = new File(uploadPath);
		if (!saveFolder.exists() || saveFolder.isFile()) {
			saveFolder.mkdirs();
		}

		String fileName = getUniqueName(uploadPath, multipartFile.getOriginalFilename());
		multipartFile.transferTo(new File(uploadPath + fileName));
		return fileName;
	}

	public static String getUniqueName(String path, String name) {
		String fileName = name;
		if (new File(path + name).isFile()) {
			int i = 1;
			String tempName;
			while (true) {
				tempName = i + "_" + name;
				if (!new File(path + tempName).isFile()) {
					return tempName;
				}
				i++;
			}
		}
		return fileName;
	}
}
