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
		 String sql = "SELECT c.doc_id as doc_id, c.approval_type as approval_type, ua.name as user_create, c.time_create as time_create, c.status_id as status_id "
		            + "FROM chungtu c "
		            + "JOIN user_account ua ON ua.user_id = c.user_create";
	       return jdbcTemplate.query(sql, new ChungTuMapper());
	}
	public List<TrangThaiModel> getNhatKiChungTu(String maCT) {
		String sql="SELECT ct.doc_status_id as doc_status_id, c.doc_id as doc_id, tt.name as status, ua.name as user_update, ct.time_update as time_update "
				+ "FROM chungtu c "
				+ "JOIN chungtu_trangthai ct on c.doc_id = ct.doc_id "
				+ "JOIN trangthai tt on ct.status_id = tt.status_id "
				+ "JOIN user_account ua on ct.user_update = ua.user_id "
				+ "WHERE c.doc_id = ?";
		return jdbcTemplate.query(sql, new Object[] {maCT}, new TrangThaiMapper());
	}
}
