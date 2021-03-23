import test from 'ava';

import {
	_zeros,
	_pow_double,
	_pow_double_recursive,
} from '../../../src/index.js';

function macro(t, x) {
	const r = 10;

	const c1 = _zeros(1);
	const c2 = _zeros(1);

	t.throws(() => _pow_double(r, x, [], 0, 0, c1, 0, c1.length), {
		message: /assert/,
	});

	t.throws(() => _pow_double_recursive(r, x, [], 0, 0, c2, 0, c2.length), {
		message: /assert/,
	});
}

macro.title = (_, x) => `bugs _pow_double: 0 ([]) ^ ${x} throws`;

test(macro, 0);
test(macro, 1);
test(macro, 2);
test(macro, 3);
test(macro, 10000);
