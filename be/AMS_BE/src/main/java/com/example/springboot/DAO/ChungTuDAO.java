package com.example.springboot.DAO;

import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.example.springboot.Model.*;

@Repository
public class ChungTuDAO {
//	@Autowired
//	private JdbcTemplate jdbcTemplate;
	private final JdbcTemplate jdbcTemplate;

	@Autowired
	public ChungTuDAO(JdbcTemplate jdbcTemplate) {
	      this.jdbcTemplate = jdbcTemplate;
	}	
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
		String sql= "select ck.doc_result_id as doc_result_id, ck.doc_id as doc_id, ck.lvl as lvl, ck.required as required, ck.result as result, ck.user_update || ' - ' || ua.full_name  as user_update, ck.time_update as time_update "
				+ "from chungtu_ketqua ck "
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

        String sql = "INSERT INTO chungtu_ketqua (doc_id, lvl, result, required, user_update, time_update) VALUES (?, ?, ?, ?, ?, ?)";
        List<Map<String, Object>> nguoiDuyetList = yeuCau.getNguoiDuyet();
        try {
        	for (Map<String, Object> nguoiDuyet : nguoiDuyetList) {
        		jdbcTemplate.update(sql, 
        			yeuCau.getMaCT(),
        			(int) nguoiDuyet.get("lvl"),
        			nguoiDuyet.get("result"),
        			(int) nguoiDuyet.get("required"),
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
}
