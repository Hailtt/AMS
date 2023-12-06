package com.example.springboot.DAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class NoiDungDAO {
	@Autowired
	JdbcTemplate jdbcTemplate;
	
}
