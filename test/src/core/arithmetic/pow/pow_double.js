import test from 'ava' ;
import { parse , _zeros , _pow_double , _pow_double_recursive , stringify } from '../../../../../src' ;

function macro ( t , A , x , C ) {

	const r = 10 ;
	const a = parse( 10 , r , A ) ;
	const c1 = _zeros( Math.max( 1 , a.length * x ) ) ;
	const c2 = _zeros( Math.max( 1 , a.length * x ) ) ;

	_pow_double( r , x , a , 0 , a.length , c1 , 0 , c1.length ) ;
	_pow_double_recursive( r , x , a , 0 , a.length , c2 , 0 , c2.length ) ;

	const result1 = stringify( r , 10 , c1 , 0 , c1.length ) ;
	const result2 = stringify( r , 10 , c2 , 0 , c2.length ) ;

	t.is( C , result1 ) ;
	t.is( C , result2 ) ;

}

macro.title = ( _ , A , x , C ) => `${A} ^ ${x} = ${C}`;

test( macro , '0' , 0 , '1' ) ;
test( macro , '1' , 0 , '1' ) ;
test( macro , '2' , 0 , '1' ) ;
test( macro , '1928091820198' , 0 , '1' ) ;

test( macro , '0' , 1 , '0' ) ;
test( macro , '1' , 1 , '1' ) ;
test( macro , '2' , 1 , '2' ) ;
test( macro , '1928091820198' , 1 , '1928091820198' ) ;

test( macro , '0' , 2 , '0' ) ;
test( macro , '1' , 2 , '1' ) ;
test( macro , '2' , 2 , '4' ) ;
test( macro , '1928091820198' , 2 , '3717538067114436760759204' ) ;

test( macro , '0' , 3 , '0' ) ;
test( macro , '1' , 3 , '1' ) ;
test( macro , '2' , 3 , '8' ) ;
test( macro , '1928091820198' , 3 , '7167754738478029059615776700741602392' ) ;

test( macro , '0' , 10000 , '0' ) ;
test( macro , '1' , 10000 , '1' ) ;

test( macro , '2' , 100 , '1267650600228229401496703205376' ) ;
test( macro , '3' , 100 , '515377520732011331036461129765621272702107522001' ) ;
test( macro , '4' , 100 , '1606938044258990275541962092341162602522202993782792835301376' ) ;
test( macro , '5' , 100 , '7888609052210118054117285652827862296732064351090230047702789306640625' ) ;
test( macro , '6' , 100 , '653318623500070906096690267158057820537143710472954871543071966369497141477376' ) ;

test( macro , '3' , 255 , '46336150792381577588313262263220434371406283602843045997201608143345357543255478647000589718036536507270555180182966478507' ) ;
test( macro , '999' , 10 , '990044880209748209880044990001' ) ;
test( macro , '1234567890' , 3 , '1881676371789154860897069000' ) ;
