package com.example.springboot.DAO;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import com.example.springboot.Model.*;
public class ChungTuMapper implements RowMapper<ChungTuModel> {

    @Override
    public ChungTuModel mapRow(ResultSet resultSet, int i) throws SQLException {
        ChungTuModel chungTu = new ChungTuModel();
        chungTu.setMaCT(resultSet.getString("doc_id"));
        chungTu.setMaLoaiCT(resultSet.getString("approval_type"));
        chungTu.setNguoiTao(resultSet.getString("user_create"));
        chungTu.setThoiGianTao(resultSet.getDate("time_create"));
        chungTu.setMaTT(resultSet.getString("status_id"));
        return chungTu;
    }
}
