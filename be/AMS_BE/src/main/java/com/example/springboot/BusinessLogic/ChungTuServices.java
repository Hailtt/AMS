package com.example.springboot.BusinessLogic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}

