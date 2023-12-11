package com.example.springboot.BusinessLogic;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

import org.springframework.stereotype.Repository;

@Repository
public class ConvertJSONB {
	public String convertJSONB(Map<String,Object> a) {
	 Jsonb jsonb = JsonbBuilder.create();
     String jsonString = jsonb.toJson(a);
     return jsonString;
	}
}
