package com.example.springboot.DAO;

import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.example.springboot.Model.*;

@Repository
public class ChungTuDAO {
	private final JdbcTemplate jdbcTemplate;
	
	@Autowired
	public ChungTuDAO(JdbcTemplate jdbcTemplate) {
	      this.jdbcTemplate = jdbcTemplate;	}	
	public List<ChungTuModel> getAllChungTus() {
		 String sql = "SELECT c.doc_id as doc_id, lct.form_type_name as approval_type, ams_u.full_name as user_create, c.time_create as time_create, ams_s.status_name as status_id "
		 		+ "FROM chungtu c "
		 		+ "JOIN ams_user as ams_u ON ams_u.id = c.user_create "
		 		+ "JOIN ams_status as ams_s ON ams_s.id = c.status_id "
		 		+ "JOIN ams_form_type lct ON lct.id = c.approval_type ";
	       return jdbcTemplate.query(sql, new ChungTuMapper());
	}
	public List<TrangThaiModel> getNhatKiChungTu(String maCT) {
		String sql="select ct.doc_status_id as doc_status_id, c.doc_id as doc_id, as2.status_name as status, ua.full_name as user_update, ct.time_update as time_update "
				+ "FROM chungtu c "
				+ "JOIN chungtu_trangthai ct on c.doc_id = ct.doc_id "
				+ "JOIN ams_status as2 on ct.status_id = as2.id "
				+ "JOIN ams_user ua on ct.user_update = ua.id "
				+ "where c.doc_id = ? "
				+ "order by ct.doc_status_id asc ";
		return jdbcTemplate.query(sql, new Object[] {maCT}, new TrangThaiMapper());
	}
	
	public ChiTietCTModel getChiTietChungTu(String maCT) {
		String sql= "select lc.form_type_name as loaiCT , c.doc_id as maCT , t.status_name as maTT , ua.full_name as nguoiTao, ua.id as maNguoiTao , c.time_create as thoiGianTao , cn.\"content\" as noiDung "
				+ "from chungtu c "
				+ "join chungtu_noidung cn on cn.doc_id = c.doc_id "
				+ "join ams_form_type lc on lc.id  = c.approval_type "
				+ "join ams_status t on t.id  = c.status_id "
				+ "join ams_user ua on ua.id  = c.user_create "
				+ "where c.doc_id = ? ";
		return jdbcTemplate.queryForObject(sql,new Object[] {maCT}, new ChiTietCTMapper());
	}
	
	public List<KetQuaModel> getKetQuaChungTu(String maCT) {
		String sql= "select ck.doc_result_id as doc_result_id, ck.doc_id as doc_id, ck.lvl as lvl, aak.name as required, ck.result as result, ck.user_update || ' - ' || ua.full_name  as user_update, ck.time_update as time_update "
				+ "from chungtu_ketqua ck "
				+ "join ams_approve_kind aak on aak.code = ck.approve_kind_code "
				+ "join ams_user ua on ua.id = ck.user_update "
				+ "where ck.doc_id = ? "
				+ "order by ck.lvl ";
		return jdbcTemplate.query(sql,new Object[] {maCT}, new KetQuaMapper());
	}
	public String postNewChungTu(YeuCauChungTu yeuCau) {
		try {
		String sql = "insert into chungtu (approval_type,user_create,time_create,status_id) "
				+ "values (?,?,?,?) ";
		jdbcTemplate.update(sql, yeuCau.getMaLoai(), yeuCau.getNguoiTao(), yeuCau.getThoiGianTao(), yeuCau.getMaTT());
		String sqlSelect = "select c.doc_id from chungtu c "
				+ "where c.approval_type = ?  and c.user_create = ? and c.time_create = ?  and c.status_id = ? ";
		String maCT = jdbcTemplate.queryForObject(sqlSelect, String.class,yeuCau.getMaLoai(),yeuCau.getNguoiTao(),yeuCau.getThoiGianTao(),"TT001");
		System.out.println("Them chung tu thanh cong");
		return maCT;
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	public Boolean postChungTuNoiDung(YeuCauChungTu yeuCau, String jsonString) {
		try {
			String sql = "insert into chungtu_noidung (doc_id,form_id,content) "
					+ "values (?,?,?::jsonb) ";
			jdbcTemplate.update(sql, yeuCau.getMaCT(), yeuCau.getMaForm(),jsonString);
			System.out.println("Them noi dung thanh cong");
			return true;
		}catch(Exception e) {
			System.out.println(e);
			return false;
		}
	}
	public Boolean postChungTuTrangThai(YeuCauChungTu yeuCau) {
		try {
			String sql= "insert into chungtu_trangthai (doc_id,status_id,user_update,time_update) "
					+ "values (?,?,?,?)";
			jdbcTemplate.update(sql,yeuCau.getMaCT(),yeuCau.getMaTT(),yeuCau.getNguoiTao(),yeuCau.getThoiGianTao());
			System.out.println("Them trang thai thanh cong");
			return true;
		}catch(Exception e) {
			System.out.println(e);
			return false;
		}
	}
	public Boolean postChungTuKetQua(YeuCauChungTu yeuCau) {
        String sql = "INSERT INTO chungtu_ketqua (doc_id, lvl, result, approve_kind_code, user_update, time_update) VALUES (?, ?, ?, ?, ?, ?)";
        List<Map<String, Object>> nguoiDuyetList = yeuCau.getNguoiDuyet();
        try {
        	for (Map<String, Object> nguoiDuyet : nguoiDuyetList) {
        		jdbcTemplate.update(sql, 
        			yeuCau.getMaCT(),
        			(int) nguoiDuyet.get("lvl"),
        			nguoiDuyet.get("result"),
        			(String) nguoiDuyet.get("approve_kind_code"),
        			(String) nguoiDuyet.get("user_update"),
        			nguoiDuyet.get("time_update")
        	    );
        	}
        	System.out.println("Them ket qua thanh cong");
       		return true;
        }catch(Exception e) {
        	System.out.println(e);
        	return false;
        }
	}
	public Map<String, String> getFormLabel(YeuCauChungTu yeuCau) {
		String sqlSelect = "select label, key from form_field ff "
				+ "where ff.form_id = ? and ff.important = true ";
		return jdbcTemplate.queryForObject(sqlSelect, (rs, rowNum) -> {
	        Map<String, String> formInfo = new HashMap<>();
	        formInfo.put("label", rs.getString("label"));
	        formInfo.put("key", rs.getString("key"));
	        return formInfo;
	    }, yeuCau.getMaForm());
	}
	public List<Map<String,String>> getCondition(String key, String maForm){
	    String sql = "select match, compared_value from ams_form_type_condition where form_id = ? and form_key = ?";
	    return jdbcTemplate.query(sql, (rs, rowNum) -> {
	        Map<String, String> conditionInfo = new HashMap<>();
	        conditionInfo.put("match", rs.getString("match"));
	        conditionInfo.put("compared_value", rs.getString("compared_value"));
	        return conditionInfo;
	    }, maForm, key);
	}
	public List<Map<String, String>> getApprover(String key, String match, String comparedValue, String maForm){
		String sql = "select afta.lvl ,afta.frequence ,au.id || ' - ' || au.full_name as user "
				+ "from "
				+ "	ams_form_type_approver afta "
				+ "join "
				+ "	ams_form_type_condition aftc on afta.condition_id =aftc.id "
				+ "join "
				+ "	form_field ff on ff.form_id = aftc.form_id and ff.\"key\" = aftc.form_key "
				+ "join "
				+ "	ams_team_user atu  on afta.user_team_id = atu.id "
				+ "join "
				+ "	ams_user au on au.id = atu.user_id "
				+ "where "
				+ "	ff.\"key\" = ? and aftc.\"match\" = ? and aftc.compared_value = ? and aftc.form_id = ? "
				+ "order by afta.lvl asc;";
		return jdbcTemplate.query(sql, (rs, rowNum) -> {
	        Map<String, String> approver = new HashMap<>();
	        approver.put("lvl", rs.getString("lvl"));
	        approver.put("frequence", rs.getString("frequence"));
	        approver.put("user", rs.getString("user"));
	        return approver;
	    }, key,match,comparedValue,maForm);
	}
}
