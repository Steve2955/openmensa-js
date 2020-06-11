const openmensa = require('..');
const test = require('ava');

test('[API] Should get many canteens', async t => {
	const canteens = await openmensa.getCanteens();
	t.true(Array.isArray(canteens));
	t.true(canteens.length == 100);
	checkFields(t, canteens[0], ['id','name','city', 'address']);
});

test('[API] Should get some canteens around "Jena"', async t => {
	const canteens = await openmensa.getCanteens({ lng: 11.5933126, lat: 50.9243788, dist: 15 });
	t.true(Array.isArray(canteens));
	checkFields(t, canteens[0], ['id', 'name', 'city', 'address']);
});

test('[API] Should get some opening information about the mensa in "Ilmenau"', async t => {
	const days = await openmensa.getDays(150);
	t.true(Array.isArray(days));
	checkFields(t, days[0], ['date']);
});

test('[API] The mensa in "Ilmenau" was closed on christmas 2012', async t => {
	const day = await openmensa.getDay(150, '2012-12-24');
	checkFields(t, day, ['closed', 'date']);
	t.truthy(day.closed);
});

const checkFields = (t, object, fields) => {
	fields.forEach(field => {
		t.truthy(object[field]);
	})
}

async function mytest(){
	console.log();
	console.log(await openmensa.getCanteen(150));
	console.log(await openmensa.getDays(150));
	console.log(await openmensa.getDays(150, { start:'2012-12-24' }));
	console.log(await openmensa.getDay(150, '2012-12-24'));
	console.log(await openmensa.getMeals(150, '2019-10-01'));
	console.log(await openmensa.getMeal(150, '2019-10-01', 4537056));
}

//mytest();
