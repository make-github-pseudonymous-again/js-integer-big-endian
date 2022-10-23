import test from 'ava';
import {parse, _zeros, _idivmod, _divmod, stringify} from '#module';

function test_idivmod(t, dividend, divisor, quotient, remainder) {
	const B = 10;

	const D = parse(10, B, dividend);
	const d = parse(10, B, divisor);
	const q = _zeros(D.length);

	_idivmod(B, D, 0, D.length, d, 0, d.length, q, 0, q.length);

	t.is(divisor, stringify(B, 10, d, 0, d.length));

	t.is(
		quotient,
		stringify(B, 10, q, 0, q.length),
		dividend + ' / ' + divisor + ' = ' + quotient,
	);

	t.is(
		remainder,
		stringify(B, 10, D, 0, D.length),
		dividend + ' % ' + divisor + ' = ' + remainder,
	);
}

function test_divmod(t, dividend, divisor, quotient, remainder) {
	const B = 10;

	const D = parse(10, B, dividend);
	const d = parse(10, B, divisor);
	const q = _zeros(D.length);
	const R = _zeros(D.length);

	_divmod(B, D, 0, D.length, d, 0, d.length, q, 0, q.length, R, 0, R.length);

	t.is(dividend, stringify(B, 10, D, 0, D.length));
	t.is(divisor, stringify(B, 10, d, 0, d.length));

	t.is(
		quotient,
		stringify(B, 10, q, 0, q.length),
		dividend + ' / ' + divisor + ' = ' + quotient,
	);

	t.is(
		remainder,
		stringify(B, 10, R, 0, R.length),
		dividend + ' % ' + divisor + ' = ' + remainder,
	);
}

function macro(...args) {
	test_idivmod(...args);
	test_divmod(...args);
}

macro.title = (title, D, d, q, r) =>
	`${title || ''} ${D} / ${d} = ${q} % ${r}`.trim();

test(macro, '7', '10', '0', '7');
test(macro, '10', '7', '1', '3');
test(macro, '7', '7', '1', '0');
test(macro, '4', '2', '2', '0');
test(macro, '15', '3', '5', '0');
test(macro, '16', '3', '5', '1');

test(macro, '89', '7', '12', '5');
test(macro, '789', '77', '10', '19');

test(macro, '120', '39', '3', '3');
test(macro, '250', '59', '4', '14');
test(macro, '500', '59', '8', '28');

test(macro, '400', '59', '6', '46');

test(macro, '421', '23', '18', '7');
test(macro, '23', '421', '0', '23');

test(macro, '3611', '12', '300', '11');
test(macro, '3899', '300', '12', '299');

test(macro, '1', '9999999999999', '0', '1');
test(macro, '9999999999999', '1', '9999999999999', '0');

test(macro, '9999999999999', '7777777777777', '1', '2222222222222');

test(macro, '9999999999999', '777777777777', '12', '666666666675');

test(
	macro,
	'27389247928379827398729874923879287398273982739724723937203',
	'273892739827938296487254837632',
	'99999904873659598945208306076',
	'3689578978384602245584885171',
);

test(
	macro,
	'1000000000000000000000000000000000000000000000000',
	'9',
	'111111111111111111111111111111111111111111111111',
	'1',
);

test(
	macro, // 2**1000 / 2**625 = 2**(1000-625) = 2**375 remainder 0
	'10715086071862673209484250490600018105614048117055336074437503883703510511249361224931983788156958581275946729175531468251871452856923140435984577574698574803934567774824230985421074605062371141877954182153046474983581941267398767559165543946077062914571196477686542167660429831652624386837205668069376',
	'139234637988958594318883410818490335842688858253435056475195084164406590796163250320615014993816265862385324388842602762167013693889631286567769205313788274787963704661873320009853338386432',
	'76957043352332967211482500195592995713046365762627825523336510555167425334955489475418488779072100860950445293568',
	'0',
);

test(
	macro, // ( 2**1000 - 1 ) / 2**625 = 2**(1000-625) - 1 = 2**375 - 1 remainder 2**625 - 1
	'10715086071862673209484250490600018105614048117055336074437503883703510511249361224931983788156958581275946729175531468251871452856923140435984577574698574803934567774824230985421074605062371141877954182153046474983581941267398767559165543946077062914571196477686542167660429831652624386837205668069375',
	'139234637988958594318883410818490335842688858253435056475195084164406590796163250320615014993816265862385324388842602762167013693889631286567769205313788274787963704661873320009853338386432',
	'76957043352332967211482500195592995713046365762627825523336510555167425334955489475418488779072100860950445293567',
	'139234637988958594318883410818490335842688858253435056475195084164406590796163250320615014993816265862385324388842602762167013693889631286567769205313788274787963704661873320009853338386431',
);
