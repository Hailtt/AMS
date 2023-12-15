package com.example.springboot.BusinessLogic;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

@Repository
public class JWTGenerator {
	private static final SecretKey secretKey = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
	private long validityInMilliseconds = 3600000; //ms
	 public String createToken(String user, String fullname) {
	        Claims claims = Jwts.claims().setSubject(user);
	        claims.put("user",user);

	        Date now = new Date();
	        Date validity = new Date(now.getTime() + validityInMilliseconds);

	        return Jwts.builder()
	                .setClaims(claims)
	                .setIssuedAt(now)
	                .setExpiration(validity)
	                .signWith(SignatureAlgorithm.HS256, secretKey)
	                .compact();
	    }
}	
