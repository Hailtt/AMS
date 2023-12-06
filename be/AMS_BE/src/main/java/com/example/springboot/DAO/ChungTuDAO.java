package com.example.springboot.DAO;

import org.springframework.stereotype.Repository;

import java.util.List;

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
		 String sql = "SELECT c.doc_id as doc_id, lct.name as approval_type, ua.name as user_create, c.time_create as time_create, tt.name as status_id "
		            + "FROM chungtu c "
		            + "JOIN user_account ua ON ua.user_id = c.user_create "
		            + "JOIN trangthai tt ON tt.status_id = c.status_id "
		            + "JOIN loai_chungtu lct ON lct.type_id = c.approval_type";
	       return jdbcTemplate.query(sql, new ChungTuMapper());
	}
	public List<TrangThaiModel> getNhatKiChungTu(String maCT) {
		String sql="SELECT ct.doc_status_id as doc_status_id, c.doc_id as doc_id, tt.name as status, ua.name as user_update, ct.time_update as time_update "
				+ "FROM chungtu c "
				+ "JOIN chungtu_trangthai ct on c.doc_id = ct.doc_id "
				+ "JOIN trangthai tt on ct.status_id = tt.status_id "
				+ "JOIN user_account ua on ct.user_update = ua.user_id "
				+ "WHERE c.doc_id = ? "
				+ "ORDER BY ct.doc_status_id ASC";
		return jdbcTemplate.query(sql, new Object[] {maCT}, new TrangThaiMapper());
	}
	
	public ChiTietCTModel getChiTietChungTu(String maCT) {
		String sql= "select lc.name as loaiCT , c.doc_id as maCT , t.name as maTT , ua.\"name\" as nguoiTao, ua.user_id as maNguoiTao , c.time_create as thoiGianTao , cn.\"content\" as noiDung, cn.attach_doc as taiLieu "
				+ "from chungtu c "
				+ "join chungtu_noidung cn on cn.doc_id = c.doc_id "
				+ "join loai_chungtu lc on lc.type_id  = c.approval_type "
				+ "join trangthai t on t.status_id  = c.status_id "
				+ "join user_account ua on ua.user_id  = c.user_create "
				+ "where c.doc_id = ?";
		return jdbcTemplate.queryForObject(sql,new Object[] {maCT}, new ChiTietCTMapper());
	}
}
