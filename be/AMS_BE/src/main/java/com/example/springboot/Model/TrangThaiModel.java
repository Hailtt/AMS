package com.example.springboot.Model;

import java.util.Date;

public class TrangThaiModel {
	private int maTrangThaiCT;
	private String maCT;
	private String maTT;
	private String nguoiCapNhat;
	private Date thoiGianCapNhat;
	public TrangThaiModel() {
		
	}
	public TrangThaiModel(int maTrangThaiCT, String maCT, String maTT, String nguoiCapNhat, Date thoiGianCapNhat) {
		this.maTrangThaiCT = maTrangThaiCT;
		this.maCT = maCT;
		this.maTT = maTT;
		this.nguoiCapNhat = nguoiCapNhat;
		this.thoiGianCapNhat = thoiGianCapNhat;
	}
	public int getMaTrangThaiCT() {
		return maTrangThaiCT;
	}
	public void setMaTrangThaiCT(int maTrangThaiCT) {
		this.maTrangThaiCT = maTrangThaiCT;
	}
	public String getMaCT() {
		return maCT;
	}
	public void setMaCT(String maCT) {
		this.maCT = maCT;
	}
	public String getMaTT() {
		return maTT;
	}
	public void setMaTT(String maTT) {
		this.maTT = maTT;
	}
	public String getNguoiCapNhat() {
		return nguoiCapNhat;
	}
	public void setNguoiCapNhat(String nguoiCapNhat) {
		this.nguoiCapNhat = nguoiCapNhat;
	}
	public Date getThoiGianCapNhat() {
		return thoiGianCapNhat;
	}
	public void setThoiGianCapNhat(Date thoiGianCapNhat) {
		this.thoiGianCapNhat = thoiGianCapNhat;
	}
	
}
