package com.example.springboot.BusinessLogic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import java.util.List;

import com.example.springboot.BusinessLogic.ConvertJSONB;
import com.example.springboot.DAO.*;
import com.example.springboot.Model.*;
@Service
public class ChungTuServices {

    private final ChungTuDAO chungTuDAO;
    @Autowired
    public ChungTuServices(ChungTuDAO chungTuDAO) {
        this.chungTuDAO = chungTuDAO;
    }

    public List<ChungTuModel> getAllChungTus() {
        return chungTuDAO.getAllChungTus();
    }
    
    public List<TrangThaiModel> getNhatKiChungTu(String maCT) {
    	return chungTuDAO.getNhatKiChungTu(maCT);
    }
    
    public ChiTietCTModel getChiTietChungTu(String maCT) {
    	return chungTuDAO.getChiTietChungTu(maCT);
    }
    public List<KetQuaModel> getKetQuaChungTu(String maCT){
    	return chungTuDAO.getKetQuaChungTu(maCT);
    }
    @Transactional
    public ResponseEntity<String> postYeuCauChungTu (YeuCauChungTu yeuCau) {
    	 try {
    	  	Jsonb jsonb = JsonbBuilder.create();
    	  	String jsonString = jsonb.toJson(yeuCau.getNoiDung());

    	  	yeuCau.setMaTT("TT001");

    	  	String maCT = chungTuDAO.postNewChungTu(yeuCau);
    	 	if (maCT == null) {
    	  	    throw new RuntimeException("Không thể thêm chứng từ mới");
    	  	}

    	  	yeuCau.setMaCT(maCT);
    	  	System.out.println(yeuCau.getMaCT());

    	  	Boolean checkInsertNoiDung = chungTuDAO.postChungTuNoiDung(yeuCau, jsonString);
    	  	if (!checkInsertNoiDung) {
    	  	    throw new RuntimeException("Không thể thêm nội dung");
    	  	}

    	  	Boolean checkInsertTrangThai = chungTuDAO.postChungTuTrangThai(yeuCau);
    	  	if (!checkInsertTrangThai) {
    	  	    throw new RuntimeException("Không thể thêm trạng thái");
    	  	}
    	  	Boolean checkInsertKetQua = chungTuDAO.postChungTuKetQua(yeuCau);
    	  	if (!checkInsertKetQua) {
    	  	    throw new RuntimeException("Không thể thêm kết quả");
    	  	}

    	    return ResponseEntity.status(200).body("Thêm thành công");
    	} catch (Exception e) {
    	     e.printStackTrace();
    	     return ResponseEntity.status(402).body("Có lỗi xảy ra: " + e.getMessage());
    	}
    }
}

