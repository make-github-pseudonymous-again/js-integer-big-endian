import test from 'ava';
import {XorShift128Plus} from 'xorshift.js/index.js';
import {
	_convert_dc,
	trim_natural,
	THRESHOLD_MUL_TOOM22,
	_to_string,
	_from_string,
	_convert,
	_zeros,
} from '../../../src/index.js';

function translate(f, t, string) {
	const a = parse(f, t, string);
	return stringify(t, t, a, 0, a.length);
}

function parse(f, t, string) {
	const b = parse_keep_zeros(f, t, string);

	return trim_natural(b, 0, b.length);
}

function stringify(f, t, a, ai, aj) {
	if (t > 36) throw new Error('t > 36 not implemented');

	const b = convert(f, t, a, ai, aj);

	return _to_string(b);
}

function parse_keep_zeros(f, t, string) {
	if (f > 36) throw new Error('f > 36 not implemented');

	const a = _from_string(string);

	return convert_keep_zeros(f, t, a, 0, a.length);
}

function convert(f, t, a, ai, aj) {
	const b = convert_keep_zeros(f, t, a, ai, aj);

	return trim_natural(b, 0, b.length);
}

function convert_keep_zeros(f, t, a, ai, aj) {
	const bi = 0;
	const bj = Math.ceil((Math.log(f) / Math.log(t)) * (aj - ai));
	const b = _zeros(bj - bi);

	// MOCK CONVERT WITH LOWER THRESHOLD FOR DC CONVERSION AND NO COPY FALLBACK
	if (aj - ai >= 4 * THRESHOLD_MUL_TOOM22) {
		_convert_dc(2 * THRESHOLD_MUL_TOOM22, f, t, a, ai, aj, b, bi, bj);
	} else {
		_convert(f, t, a, ai, aj, b, bi, bj);
	}

	return b;
}

function macro_parse(t, r, s) {
	// Only works for base <= 10
	t.true(r <= 10);
	t.is(s, parse(r, r, s).join(''));
}

macro_parse.title = (_, r, s) =>
	`convert_dc bug parse ${r} ${s.slice(0, 40) + '...'}`;

test(macro_parse, 10, '1267650600228229401496703205376');
test(macro_parse, 10, '515377520732011331036461129765621272702107522001');
test(
	macro_parse,
	10,
	'1606938044258990275541962092341162602522202993782792835301376',
);
test(
	macro_parse,
	10,
	'7888609052210118054117285652827862296732064351090230047702789306640625',
);
test(
	macro_parse,
	10,
	'653318623500070906096690267158057820537143710472954871543071966369497141477376',
);
test(
	macro_parse,
	10,
	'46336150792381577588313262263220434371406283602843045997201608143345357543255478647000589718036536507270555180182966478507',
);
test(
	macro_parse,
	10,
	'7696436915158194113318351373463845221171356145956582163352457594358867621369111939116411591286644215669468216857934835317654199357729258249751557319148431184429671129493281347861351938333111711595191294654521519168223111179372164712642323113738666356144516',
);

function macro_convert(t, f, _t, e) {
	const a = parse(f, _t, e);
	const s = stringify(_t, f, a, 0, a.length);
	t.is(e, s);
}

macro_convert.title = (_, f, _t, s) =>
	`convert_dc bug convert ${f} ${_t} ${s.slice(0, 40) + '...'}`;

const PROBLEM =
	'7aca1358dcd766fea62e85a01d212c033ee131f73699549048ea4ff82340e8527da2600626bb62ac40a691226b708325be13cb77c424f53d6ea72ab95e6f02b07475aa66d75f0752621eaddc85e247f23dfcc1079346466cf998e5e2e216fbaa3796a2c2cd8a0bb12b6cc277402b37ba5938cbd2c214d7b401ac6b9096ecde7dc312e1d82eb0772c792e1ad712592d80da27fb4af123905abda111f967827e3fbb02a5e999c28e93faadaeeffb0a1084367c04bb533ff3f7b3d10d7d6838b6f1982757878c44c6dea5827490890fdf9cc0a1094c6ae2ce035357bfad82d499b23c615c9b212bd1db8f4abe2d6060a994a436464cb19f4fcf3bbc140048d367d1';

test(`convert_dc bug parse 16 94906266 ${
	PROBLEM.slice(0, 40) + '...'
}`, (t) => {
	const e = [
		86,
		78312951,
		94374105,
		26624213,
		56693695,
		75296934,
		52733292,
		89892400,
		54699504,
		48281904,
		10809218,
		85508125,
		49276796,
		87865021,
		72206610,
		5697942,
		69159977,
		94774286,
		21492437,
		39742495,
		34925480,
		81393355,
		36486614,
		23554825,
		86860493,
		7638516,
		79195555,
		14338633,
		4251794,
		16199573,
		56267139,
		43815017,
		77069067,
		65464041,
		22569049,
		9250901,
		40595367,
		27577914,
		385664,
		17176549,
		25188154,
		66306515,
		85000594,
		30136354,
		13339295,
		80846790,
		75889458,
		86325523,
		25930160,
		80454574,
		5478079,
		74084772,
		68678456,
		52611002,
		86734364,
		67384514,
		43111198,
		61749912,
		26407909,
		12660282,
		88491445,
		54448031,
		14651560,
		77560284,
		52827888,
		17065922,
		91075304,
		62456048,
		22864492,
		57190597,
		90254267,
		80332605,
		71663268,
		25184985,
		64032247,
		17816350,
		70011326,
		89986917,
	];
	const a = parse(16, 94906266, PROBLEM);
	t.deepEqual(e, a);
});

test(`convert_dc bug stringify 94906266 16 ${
	PROBLEM.slice(0, 40) + '...'
}`, (t) => {
	const a = [
		86,
		78312951,
		94374105,
		26624213,
		56693695,
		75296934,
		52733292,
		89892400,
		54699504,
		48281904,
		10809218,
		85508125,
		49276796,
		87865021,
		72206610,
		5697942,
		69159977,
		94774286,
		21492437,
		39742495,
		34925480,
		81393355,
		36486614,
		23554825,
		86860493,
		7638516,
		79195555,
		14338633,
		4251794,
		16199573,
		56267139,
		43815017,
		77069067,
		65464041,
		22569049,
		9250901,
		40595367,
		27577914,
		385664,
		17176549,
		25188154,
		66306515,
		85000594,
		30136354,
		13339295,
		80846790,
		75889458,
		86325523,
		25930160,
		80454574,
		5478079,
		74084772,
		68678456,
		52611002,
		86734364,
		67384514,
		43111198,
		61749912,
		26407909,
		12660282,
		88491445,
		54448031,
		14651560,
		77560284,
		52827888,
		17065922,
		91075304,
		62456048,
		22864492,
		57190597,
		90254267,
		80332605,
		71663268,
		25184985,
		64032247,
		17816350,
		70011326,
		89986917,
	];
	const s = stringify(94906266, 16, a, 0, a.length);
	t.is(PROBLEM, s);
});

test(macro_convert, 16, 16, PROBLEM);

test(macro_convert, 16, 94906266, PROBLEM);

test('convert_dc bug 16 32', (t) => {
	const s16 =
		'7696436905158094003308350373463845221071356045956582063352457594358867621369100939016411590286644205669468206857934835307654199357729258249751557309048431184429670029493281347861350938333001700595191294654520509068223010179372164702642323113738666356044506';
	const s32 = translate(16, 32, s16);
	t.is(s16, translate(32, 16, s32));
});

test('convert_dc bug 16 36', (t) => {
	const s16 =
		'7696436905158094003308350373463845221071356045956582063352457594358867621369100939016411590286644205669468206857934835307654199357729258249751557309048431184429670029493281347861350938333001700595191294654520509068223010179372164702642323113738666356044506';
	const s36 = translate(16, 36, s16);
	t.is(s16, translate(36, 16, s36));
});

test('convert_dc bug 16 35', (t) => {
	const s16 =
		'7696436905158094003308350373463845221071356045956582063352457594358867621369100939016411590286644205669468206857934835307654199357729258249751557309048431184429670029493281347861350938333001700595191294654520509068223010179372164702642323113738666356044506';
	const s35 = translate(16, 35, s16);
	t.is(s16, translate(35, 16, s35));
});

test('convert_dc bug 9 8', (t) => {
	const s9 =
		'7676436715158174113318351373463845221171356145756582163352457574358867621367111737116411571286644215667468216857734835317654177357727258247751557317148431184427671127473281347861351738333111711575171274654521517168223111177372164712642323113738666356144516';
	const s8 =
		'2341511753762417574267007637275674131142156520746203057314467730455404277272762246772544705373444735202465304444063665456343411166473401205724176607231571765573377253513617567037636027453057070427750527740414020063465317231626405252605557043305357513631417320631516523047';

	const out = translate(9, 8, s9);
	t.is(s8, out);
});

test('convert_dc bug 8 9', (t) => {
	const s8 =
		'2341511753762417574267117637275674131142156521746213157314467731455414277272762246772544715373444735212465314444163665456343411166473411215724176617231571765573377253513617567137636127453157171427751527741414121163465317231626415252615557143315357513631417321631516523147';
	const s9 =
		'7676436715158174113324628077245537553715217783000327125164316171175261487176551270283528223665306534361832552387385342283811063603446045453853316005761148822334514681534233512340787628370085234700131650275200138738633568337374662744606600607032773544166071';

	const out = translate(8, 9, s8);
	t.is(s9, out);
});

test('convert_dc bug 9 8 translate', (t) => {
	const s9 =
		'7676436715158174113318351373463845221171356145756582163352457574358867621367111737116411571286644215667468216857734835317654177357727258247751557317148431184427671127473281347861351738333111711575171274654521517168223111177372164712642323113738666356144516';

	const out = translate(9, 8, s9);
	t.is(s9, translate(8, 9, out));
});

const seed = '1';
const prng = new XorShift128Plus(seed);
const _b8192 = prng.randomBytes(8192).toString('hex').replace(/^0*/, '');
test(macro_convert, 16, 94906266, _b8192);
