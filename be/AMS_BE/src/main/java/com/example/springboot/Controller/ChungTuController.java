package com.example.springboot.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.DAO.*;
import com.example.springboot.BusinessLogic.*;
import com.example.springboot.Model.*;

import java.util.List;

@RestController
@RequestMapping("/api/chungtu")
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
}
