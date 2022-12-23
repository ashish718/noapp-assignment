require("dotenv").config();
const jwt = require('jsonwebtoken');


module.exports.verifyToken = (req, res, next) => {
	try{
		console.log( process.env.TOKEN_SECRET, " process.env.TOKEN_SECRET");
    const token = req.header('x-auth-token');
  	if(!token) return res.status(401).send('Access Denied!!!!!!!');

		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	}
	catch(err){
		console.log(err);
		res.status(400).send('Invalid or expired Token!!!!!!!!')
	}
}

module.exports.genToken = async() => {
	try {
		let generateToken = await jwt.sign({data: {user: 'ashish', description: 'noapp-assignment'}}, process.env.TOKEN_SECRET, { expiresIn: '10m' });
		return generateToken
	} catch (e) {
		return e;
	}
}
