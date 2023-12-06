package com.example.springboot.Model;

import java.util.Date;

public class ChungTuModel {
	private String maCT;
	private String maLoaiCT;
	private String nguoiTao;
	private Date thoiGianTao;
	private String maTT;
	public ChungTuModel() {
		
	}
	public ChungTuModel(String maCT, String maLoaiCT, String nguoiTao, Date thoiGianTao, String maTT) {
		this.maCT=maCT;
		this.maLoaiCT=maLoaiCT;
		this.nguoiTao=nguoiTao;
		this.thoiGianTao=thoiGianTao;
		this.maTT= maTT;
	}
	public String getMaCT() {
		return maCT;
	}
	public void setMaCT(String maCT) {
		this.maCT = maCT;
	}
	public String getMaLoaiCT() {
		return maLoaiCT;
	}
	public void setMaLoaiCT(String maLoaiCT) {
		this.maLoaiCT = maLoaiCT;
	}
	public String getNguoiTao() {
		return nguoiTao;
	}
	public void setNguoiTao(String nguoiTao) {
		this.nguoiTao = nguoiTao;
	}
	public Date getThoiGianTao() {
		return thoiGianTao;
	}
	public void setThoiGianTao(Date thoiGianTao) {
		this.thoiGianTao = thoiGianTao;
	}
	public String getMaTT() {
		return maTT;
	}
	public void setMaTT(String maTT) {
		this.maTT = maTT;
	}
	
}
