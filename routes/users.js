var express = require( 'express' );
var router  = express.Router();

/* GET users listing. */
router.get( '/login', function ( req, res, next ) {
	res.render( 'login.ejs', req.params );
} );

module.exports = router;
