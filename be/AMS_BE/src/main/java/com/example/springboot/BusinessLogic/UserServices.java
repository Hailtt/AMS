package com.example.springboot.BusinessLogic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.springboot.DAO.UserDAO;
import com.example.springboot.Model.UserModel;

@Service
public class UserServices {
	private final UserDAO userDAO;
	private JWTGenerator jwtGen;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	@Autowired
	public UserServices(UserDAO userDAO, JWTGenerator jwtGen) {
		this.userDAO=userDAO;
		this.jwtGen=jwtGen;
	}

	public ResponseEntity<String> userRegister(String userName, String passWord, String fullName) {
		String hashedPassword = passwordEncoder.encode(passWord);
		boolean registered = userDAO.registerUser(userName, hashedPassword, fullName);
		if(registered == true) {
			return ResponseEntity.status(200).body("Ok rồi nha bro");
		}else {
			return ResponseEntity.status(400).body("Có người dùng username rồi bro");
		}
	}	
	public ResponseEntity<String> userLogin(String userName, String passWord){
		UserModel user = userDAO.getUser(userName, passWord);
		if(user.getUserName() == null) {
			return ResponseEntity.status(404).body("Username/Password không đúng");
		}else {
			boolean passWordValidate = passwordEncoder.matches(passWord, user.getPassWord());
			if(passWordValidate == true) {
				String jwtForU = jwtGen.createToken(userName, passWord);
				return ResponseEntity.status(200).body(jwtForU);
			}else {
				return ResponseEntity.status(404).body("Username/Password không đúng");
			}
		}
	}

}
