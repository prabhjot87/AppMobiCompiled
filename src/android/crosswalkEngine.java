package com.appMobiCloud;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPreferences;
import org.apache.cordova.CordovaResourceApi;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.NativeToJsMessageQueue;
import org.apache.cordova.PluginManager;
import org.crosswalk.engine.XWalkWebViewEngine;

import android.content.Context;
import android.content.res.AssetManager;
import android.util.Log;

public class crosswalkEngine extends XWalkWebViewEngine {

	public crosswalkEngine(Context context, CordovaPreferences preferences) {
		super(context, preferences);
		// TODO Auto-generated constructor stub
	}
	
	
	@Override
	public void init(CordovaWebView parentWebView, CordovaInterface cordova,
			Client client, CordovaResourceApi resourceApi,
			PluginManager pluginManager,
			NativeToJsMessageQueue nativeToJsMessageQueue) {
		// TODO Auto-generated method stub
		super.init(parentWebView, cordova, client, resourceApi, pluginManager,
				nativeToJsMessageQueue);
		moveFilesToFilesDir();
	}
	
	@Override
	public void loadUrl(String url, boolean clearNavigationStack) {
		// TODO Auto-generated method stub
		super.loadUrl("file:///" + cordova.getActivity().getFilesDir()
				+ File.separator + "AppMobiCloud" + File.separator + "www"
				+ File.separator + "index.html", clearNavigationStack);
	}
	private void moveFilesToFilesDir() {
		String indexFileStr= cordova.getActivity().getFilesDir()+File.separator+"AppMobiCloud"+File.separator+"www"+File.separator+"index.html";
		File indexFile=new File(indexFileStr);
		boolean isFileexists= indexFile.isFile();
		Log.v("[appMobi]","File exists:-"+isFileexists);
		if(!isFileexists)
		copyFileOrDir("");
	}

	private void copyFileOrDir(String path) {
		AssetManager assetManager = cordova.getActivity().getAssets();
		String assets[] = null;
		try {
			Log.i("tag", "copyFileOrDir() " + path);
			assets = assetManager.list(path);
			if (assets.length == 0) {
				copyFile(path);
			} else {
				String fullPath = cordova.getActivity().getFilesDir() + "/"+"AppMobiCloud"+"/"
						+ path;
				Log.i("tag", "path=" + fullPath);
				File dir = new File(fullPath);
				if (!dir.exists() && !path.startsWith("images")
						&& !path.startsWith("sounds")
						&& !path.startsWith("webkit"))
					if (!dir.mkdirs())
						Log.i("tag", "could not create dir " + fullPath);
				for (int i = 0; i < assets.length; ++i) {
					String p;
					if (path.equals(""))
						p = "";
					else
						p = path + "/";

					if (!path.startsWith("images")
							&& !path.startsWith("sounds")
							&& !path.startsWith("webkit"))
						copyFileOrDir(p + assets[i]);
				}
			}
		} catch (IOException ex) {
			Log.e("tag", "I/O Exception", ex);
		}
	}

	private void copyFile(String filename) {
		AssetManager assetManager = cordova.getActivity().getAssets();

		InputStream in = null;
		OutputStream out = null;
		String newFileName = null;
		try {
			Log.i("tag", "copyFile() " + filename);
			in = assetManager.open(filename);
			if (filename.endsWith(".jpg")) // extension was added to avoid
											// compression on APK file
				newFileName = cordova.getActivity().getFilesDir() + "/"
						+ filename.substring(0, filename.length() - 4);
			else
				newFileName = cordova.getActivity().getFilesDir() + "/"+"AppMobiCloud"+"/"
						+ filename;
			out = new FileOutputStream(newFileName);

			byte[] buffer = new byte[1024];
			int read;
			while ((read = in.read(buffer)) != -1) {
				out.write(buffer, 0, read);
			}
			in.close();
			in = null;
			out.flush();
			out.close();
			out = null;
			

		} catch (Exception e) {
		}

	}

	
}
