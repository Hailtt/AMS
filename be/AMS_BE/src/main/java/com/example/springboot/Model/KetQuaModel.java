package com.example.springboot.Model;

import java.util.Date;

public class KetQuaModel {
	private int maKetQua;
	private String maCT;
	private int bac;
	private int ketQua;
	private String nguoiDuyet;
	private Date thoiGianDuyet;
	public KetQuaModel() {
		
	}
	public KetQuaModel(int maKetQua, String maCT, int bac, int ketQua, String nguoiDuyet, Date thoiGianDuyet) {
		this.maKetQua=maKetQua;
		this.maCT=maCT;
		this.bac=bac;
		this.ketQua=ketQua;
		this.nguoiDuyet=nguoiDuyet;
		this.thoiGianDuyet=thoiGianDuyet;
	}
	public int getMaKetQua() {
		return maKetQua;
	}
	public void setMaKetQua(int maKetQua) {
		this.maKetQua = maKetQua;
	}
	public String getMaCT() {
		return maCT;
	}
	public void setMaCT(String maCT) {
		this.maCT = maCT;
	}
	public int getBac() {
		return bac;
	}
	public void setBac(int bac) {
		this.bac = bac;
	}
	public int getKetQua() {
		return ketQua;
	}
	public void setKetQua(int ketQua) {
		this.ketQua = ketQua;
	}
	public String getNguoiDuyet() {
		return nguoiDuyet;
	}
	public void setNguoiDuyet(String nguoiDuyet) {
		this.nguoiDuyet = nguoiDuyet;
	}
	public Date getThoiGianDuyet() {
		return thoiGianDuyet;
	}
	public void setThoiGianDuyet(Date thoiGianDuyet) {
		this.thoiGianDuyet = thoiGianDuyet;
	}
	
}
