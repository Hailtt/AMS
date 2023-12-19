package com.example.springboot.Model;

import java.time.LocalDateTime;

public class GhiNhanDuyet {
	private String maCT;
	private String toKen;
	private String result;
	private LocalDateTime timeUpdate;
	public GhiNhanDuyet() {
		
	}
	public GhiNhanDuyet(String maCT, String toKen, String result, LocalDateTime timeUpdate) {
		super();
		this.maCT = maCT;
		this.toKen = toKen;
		this.result = result;
		this.timeUpdate = timeUpdate;
	}
	public String getMaCT() {
		return maCT;
	}
	public void setMaCT(String maCT) {
		this.maCT = maCT;
	}
	public String getToKen() {
		return toKen;
	}
	public void setToKen(String toKen) {
		this.toKen = toKen;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public LocalDateTime getTimeUpdate() {
		return timeUpdate;
	}
	public void setTimeUpdate(LocalDateTime timeUpdate) {
		this.timeUpdate = timeUpdate;
	}
}
