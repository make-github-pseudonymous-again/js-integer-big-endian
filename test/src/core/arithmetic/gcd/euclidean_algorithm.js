import test from 'ava' ;

import { parse , stringify , _trim_positive , euclidean_algorithm } from '../../../../../src' ;

function macro ( t , A , B , D ) {

	const r = 10 ;

	const a = parse( 10 , r , A ) ;
	const aj = a.length ;
	const ai = 0 ;

	const b = parse( 10 , r , B ) ;
	const bj = b.length ;
	const bi = 0 ;

	const [ d , di , dj ] = euclidean_algorithm( r , a , ai , aj , b , bi , bj ) ;

	// only works with r = 10
	t.is( D.length , dj - di , 'length' ) ;

	const GCD = stringify( r , 10 , d , di , dj ) ;

	t.is( GCD , D , 'value' ) ;

	const [ d2 , d2i , d2j ] = euclidean_algorithm( r , b , bi , bj , a , ai , aj ) ;
	t.deepEqual([d, di, dj], [d2, d2i, d2j], 'can reverse operands') ;

}

macro.title = ( _ , A , B , D ) => `GCD(${A}, ${B}) = ${D}` ;

// a >= b
test( macro ,   '1' ,  '0' , '1' ) ;
test( macro , '240' , '46' , '2' ) ;
test( macro , '999' ,  '1' , '1' ) ;
test( macro , '999' ,  '2' , '1' ) ;
test( macro , '999' ,  '3' , '3' ) ;
test( macro , '999' ,  '4' , '1' ) ;
test( macro , '999' ,  '5' , '1' ) ;
test( macro , '999' ,  '6' , '3' ) ;
test( macro , '89798763754892653453379597352537489494736' , '978' , '6' ) ;
test( macro , '1234567891011121314151617181920212223242526272829' , '1221' , '3' ) ;
test( macro , '8918391893892839282938092838273908' , '9238902830982083209836079238902830' , '18' ) ;

test( macro ,
	'37650526072328171936695291762250209370684337226819795603338569781977444693437332193180866661042770508342415236941382410000000000000000' ,
	'5696107759173612435215985096515090524728819689625373634782109911819800000000' ,
	'12272004900965151087327615491240194950486574150898137749184200000000'
) ;

test( macro ,
	'1190123836642658560840761071891016078481041702312810707143326670670432949517058417889154419284901949562938334619095499692024995029105632277035683758772387607076113677721573438092031886401618806857997945318882041459017486587638738415145269222274916860852961811503745930414299919883445224894613390932992405456336506652332370422683889806726971268976041976718262282347845717718281899447015786618619450921170775291265314853539735292720990307650250834385715075734147351055183226092562902527220319132819529325866121746730165427705936404042523277642451461144852157830864303534189971379917712085036407171089179281934699936793898385939385576944526569405089151310335695539680966312811076081350524871041683154930799815149681250522323804579605756183079035037738322452348416113780582923224911060464135442236143468063778988889971473901480275085979311867478325034256330670764918534857228905789913668905873042428952972071593700143398464600517680624944946179425207441010260237715670339701649513776' ,
	'1090927970419064175550080675198724277143274753776223525603158539909830244388682713830752950995164229747284150070545573064009732417687021717203739744813981583931778400388611812613005309007679898872789143545971827428263215553954228912439677915191023163827729504723604707296655288586122174418324054093283511672862188574424480308268835502789027027725591653731938884499322308018350351735118319204769236686483379598054368410215549331846009986891417148133003574199443258765294469622374806900146809' ,
	'81'
) ;
