import test from 'ava' ;

import operator from  '@aureooms/js-operator' ;

import * as integer from '../../../../src' ;

function check (t, Ctor, cmp, transform) {

	cmp = cmp[1];

	const f = 16;
	const r = Math.pow(2, Ctor.BYTES_PER_ELEMENT * 8);

	for (let k = 0; k < TEST.length; ++k) {
		const test = TEST[k];

		const as = test[0] ;
		const a = new Ctor( integer.parse( f , r , as ) ) ;
		const ai = 0 ;
		const aj = a.length ;

		const bs = test[1] ;
		const b = new Ctor( integer.parse( f , r , bs ) ) ;
		const bi = 0 ;
		const bj = b.length ;

		const actual = cmp(a, ai, aj, b, bi, bj);
		const expected = transform(test[2], 0);

		t.deepEqual(actual, expected, `cmp('${as}','${bs}') === ${expected}`);
	}

}

check.title = (_, Ctor, cmp, transform) => `integer.cmp<${Ctor.name}, ${cmp[0]}>` ;

const TEST = [
	['0123456789', '9876543210', -1],
	['0000000000', '9876543210', -1],
	['9876543209', '9876543210', -1],
	['0123456788', '0123456789', -1],
	['0123456780', '0123456789', -1],
	['0000000000', '0000000007', -1],
	['4545464646', '9989748488', -1],
	['4747474747', '4848484848', -1],
	['1541548548', '1541548549', -1],

	['0000000000', '0000000000', 0],
	['0000000001', '0000000001', 0],
	['0123456789', '0123456789', 0],
	['1213245874', '1213245874', 0],
	['4548848484', '4548848484', 0],
	['6465664848', '6465664848', 0],
	['7887878787', '7887878787', 0],
	['9824564878', '9824564878', 0],
	['9876543210', '9876543210', 0],

	['9876543210', '0123456789', 1],
	['9876543210', '0000000000', 1],
	['9876543210', '9876543209', 1],
	['0123456789', '0123456788', 1],
	['0123456789', '0123456780', 1],
	['0000000007', '0000000000', 1],
	['9989748488', '4545464646', 1],
	['4848484848', '4747474747', 1],
	['1541548549', '1541548548', 1],

	['00123456789', '9876543210', -1],
	['00000000000', '9876543210', -1],
	['09876543209', '9876543210', -1],
	['00123456788', '0123456789', -1],
	['00123456780', '0123456789', -1],
	['00000000000', '0000000007', -1],
	['04545464646', '9989748488', -1],
	['04747474747', '4848484848', -1],
	['01541548548', '1541548549', -1],

	['00000000000', '0000000000', 0],
	['00000000001', '0000000001', 0],
	['00123456789', '0123456789', 0],
	['01213245874', '1213245874', 0],
	['04548848484', '4548848484', 0],
	['06465664848', '6465664848', 0],
	['07887878787', '7887878787', 0],
	['09824564878', '9824564878', 0],
	['09876543210', '9876543210', 0],

	['09876543210', '0123456789', 1],
	['09876543210', '0000000000', 1],
	['09876543210', '9876543209', 1],
	['00123456789', '0123456788', 1],
	['00123456789', '0123456780', 1],
	['00000000007', '0000000000', 1],
	['09989748488', '4545464646', 1],
	['04848484848', '4747474747', 1],
	['01541548549', '1541548548', 1],

	['10123456789', '9876543210', 1],
	['10000000000', '9876543210', 1],
	['19876543209', '9876543210', 1],
	['10123456788', '0123456789', 1],
	['10123456780', '0123456789', 1],
	['10000000000', '0000000007', 1],
	['14545464646', '9989748488', 1],
	['14747474747', '4848484848', 1],
	['11541548548', '1541548549', 1],

	['10000000000', '0000000000', 1],
	['10000000001', '0000000001', 1],
	['10123456789', '0123456789', 1],
	['11213245874', '1213245874', 1],
	['14548848484', '4548848484', 1],
	['16465664848', '6465664848', 1],
	['17887878787', '7887878787', 1],
	['19824564878', '9824564878', 1],
	['19876543210', '9876543210', 1],

	['19876543210', '0123456789', 1],
	['19876543210', '0000000000', 1],
	['19876543210', '9876543209', 1],
	['10123456789', '0123456788', 1],
	['10123456789', '0123456780', 1],
	['10000000007', '0000000000', 1],
	['19989748488', '4545464646', 1],
	['14848484848', '4747474747', 1],
	['11541548549', '1541548548', 1],
];


const TRAITS = [
	Uint8Array,
	Uint16Array,
	Uint32Array,
];

const OPERATOR = [
	[['integer.cmp', integer.cmp], operator.identity],
	[['integer.eq', integer.eq], operator.eq],
	[['integer.ge', integer.ge], operator.ge],
	[['integer.gt', integer.gt], operator.gt],
	[['integer.le', integer.le], operator.le],
	[['integer.lt', integer.lt], operator.lt],
	[['integer.ne', integer.ne], operator.ne],
];

for (let j = 0; j < OPERATOR.length; ++j)
for (let i = 0; i < TRAITS.length; ++i)
	test(check, TRAITS[i], OPERATOR[j][0], OPERATOR[j][1]);
