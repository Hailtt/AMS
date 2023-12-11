package com.example.springboot.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.DAO.*;
import com.example.springboot.BusinessLogic.*;
import com.example.springboot.Model.*;

import java.util.List;

@RestController
@RequestMapping("/chung-tu")
public class ChungTuController {

    private final ChungTuServices chungTuService;

    @Autowired
    public ChungTuController(ChungTuServices chungTuService) {
        this.chungTuService = chungTuService;
    }

    @GetMapping("/all")
    public List<ChungTuModel> getAllChungTus() {
        return chungTuService.getAllChungTus();
    }

    @GetMapping("/nhat-ki/{maCT}")
    public List<TrangThaiModel> getNhatKiChungTu(@PathVariable(value="maCT") String maCT) {
    	return chungTuService.getNhatKiChungTu(maCT);
    }
    @GetMapping("/noi-dung/{maCT}")
    public ChiTietCTModel getChiTietChungTu(@PathVariable(value="maCT") String maCT) {
    	return chungTuService.getChiTietChungTu(maCT);
    }
    @GetMapping("/ket-qua-duyet/{maCT}")
    public List<KetQuaModel> getKetQuaChungTu(@PathVariable(value="maCT") String maCT){
    	return chungTuService.getKetQuaChungTu(maCT);
    }
    @PostMapping("/tao-moi-chung-tu")
    public ResponseEntity<String> postYeuCauChungTu(@RequestBody YeuCauChungTu yeuCau) {
    	if(yeuCau.getMaForm().equals(null) 
    			|| yeuCau.getNoiDung().equals(null)
    			|| yeuCau.getMaLoai().equals(null)
    			|| yeuCau.getNguoiTao().equals(null)
    			|| yeuCau.getNguoiDuyet().equals(null))
    	{
    		return ResponseEntity.status(404).body("Vui lòng nhập đủ thông tin");
    	}
    	return chungTuService.postYeuCauChungTu(yeuCau);
    }
}
