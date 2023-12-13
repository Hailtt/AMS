package com.example.springboot.BusinessLogic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import java.util.List;
import java.util.Map;

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
//    		System.out.println(yeuCau.getNguoiDuyet());
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
    public ResponseEntity<String> postChonNguoiDuyet(YeuCauChungTu yeuCau) throws JsonProcessingException{
    	Map<String, String> keyLabel = chungTuDAO.getFormLabel(yeuCau);
//    	System.out.println(keyLabel);
    	String key = keyLabel.get("key");
    	String label = keyLabel.get("label");
    	//Form label de get value
    	String value = "";
    	Map<String, Object> noiDungMap = yeuCau.getNoiDung();
    	for (Map.Entry<String, Object> entry : noiDungMap.entrySet()) {
            String labelInput = entry.getKey();
            if(labelInput.equals(label)) {
            	value = entry.getValue().toString();
            }
        }
//    	System.out.println(value);
    	//Lay duoc value roi
    	List<Map<String,String>> conditions = chungTuDAO.getCondition(key,yeuCau.getMaForm());
//    	System.out.println(conditions);
        int valueToCompare = Integer.parseInt(value);

    	 for (Map<String, String> condition : conditions) {
             String match = condition.get("match");
             String comparedValueStr = condition.get("compared_value");

             // Chuyển đổi giá trị so sánh từ String sang số
             int comparedValue = Integer.parseInt(comparedValueStr);
             
             // Thực hiện so sánh dựa trên toán tử
             switch (match) {
                 case ">":
                     if (valueToCompare > comparedValue) {
                         System.out.println("Giá trị " + valueToCompare + " lớn hơn " + comparedValue);
                         List<Map<String,String>> approver = chungTuDAO.getApprover(key, match, comparedValueStr, yeuCau.getMaForm());
                         ObjectMapper objectMapper = new ObjectMapper();
                         String approverJson = objectMapper.writeValueAsString(approver);
//                         System.out.println(approver);
                     	 return ResponseEntity.status(200).body(approverJson);
                     }
                     break;
                 case "<":
                     if (valueToCompare < comparedValue) {
                         System.out.println("Giá trị " + valueToCompare + " nhỏ hơn " + comparedValue);
                         List<Map<String,String>> approver = chungTuDAO.getApprover(key, match, comparedValueStr, yeuCau.getMaForm());
                         ObjectMapper objectMapper = new ObjectMapper();
                         String approverJson = objectMapper.writeValueAsString(approver);
//                         System.out.println(approver);
                     	 return ResponseEntity.status(200).body(approverJson);
                     }
                     break;
                 case "==":
                     if (valueToCompare == comparedValue) {
                         System.out.println("Giá trị " + valueToCompare + " bằng " + comparedValue);
                         List<Map<String,String>> approver = chungTuDAO.getApprover(key, match, comparedValueStr, yeuCau.getMaForm());
                         ObjectMapper objectMapper = new ObjectMapper();
                         String approverJson = objectMapper.writeValueAsString(approver);
//                         System.out.println(approver);
                     	 return ResponseEntity.status(200).body(approverJson);
                     }
                     break;
                 default:
                     System.out.println("Toán tử không hợp lệ: " + match);
             }
         }
     	 return ResponseEntity.status(400).body("Có lỗi");
    }
    public ResponseEntity<String> cancelChungTu(String maCT){
    	Boolean check = chungTuDAO.checkCT(maCT);
    	if(check.equals(false))
    	{
    		return ResponseEntity.status(404).body("Không thấy chứng từ");
    	}
    	Boolean checkKetQua = chungTuDAO.checkKetQua(maCT);
    	if(checkKetQua.equals(false)) {
    		return ResponseEntity.status(401).body("Chứng từ đã có người duyệt");
    	}
    	String nguoiCapNhat = chungTuDAO.getNguoiTao(maCT);
//    	System.out.println(nguoiCapNhat);
    	Boolean capNhatTrangThai = chungTuDAO.updateStatus(maCT,nguoiCapNhat);
//    	System.out.println(capNhatTrangThai);
    	return ResponseEntity.status(200).body("Đã hủy");
    }
    public List<LoaiChungTuModel> getAllLoaiCT(){
    	return chungTuDAO.getAllLoaiCT();
    }
    public List<FormFieldModel> getAllFormFields(String formId){
    	return chungTuDAO.getAllFormFields(formId);
    }
}

