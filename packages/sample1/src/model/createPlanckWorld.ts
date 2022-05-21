import {Vec2, World, Box, Math, RevoluteJoint} from 'planck';

export function createPlanckWorld() {
	const world = new World({
		gravity: new Vec2(0, -10),
		blockSolve: true
	})

	world3(world)

	return world
}

export function update(world: World, timeStep = 1 / 60) {
	const velocityIterations = 6
	const positionIterations = 2
	world.step(timeStep, velocityIterations, positionIterations)
}

function world3(world: World) {
	const COUNT = 200;

	const ground = world.createBody();

	const container = world.createDynamicBody({
		allowSleep: false,
		position: Vec2(0, 0)
	});

	container.createFixture(new Box(0.5, 20, Vec2(20, 0), 0), 5);
	container.createFixture(new Box(0.5, 20, Vec2(-20, 0), 0), 5);
	container.createFixture(new Box(20, 0.5, Vec2(0, 20), 0), 5);
	container.createFixture(new Box(20, 0.5, Vec2(0, -20), 0), 5);

	world.createJoint(new RevoluteJoint({
		motorSpeed: 0.08 * Math.PI,
		maxMotorTorque: 1e8,
		enableMotor: true,
	}, ground, container, Vec2(0, 0)));

	const shape = new Box(0.5, 0.5);
	let count = 0;
	while (count < COUNT) {
		const body = world.createDynamicBody();
		body.setPosition(Vec2(Math.random(-10, 10), 10 + Math.random(-10, 10)));
		body.createFixture(shape, 1);
		++count;
	}
}

// function world1(world: World) {
// 	const ground = world.createBody({
// 		position: new Vec2(70, 20)
// 	})
// 	ground.createFixture(new Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)))
// 	ground.createFixture(new Edge(Vec2(20.0, 0.0), Vec2(20.0, 20.0)))
//
// 	const shape = new Box(0.5, 0.5)
//
// 	const columnCount = 2
// 	const rowCount = 15
// 	const xs = [0.0, -10.0, -5.0, 5.0, 10.0]
//
// 	for (let j = 0; j < columnCount; ++j) {
// 		for (let i = 0; i < rowCount; ++i) {
// 			const body = world.createDynamicBody();
// 			const x = xs[j];
// 			if (x === undefined) {
// 				throw new Error('')
// 			}
// 			body.setPosition(Vec2(70 + x, 40 + 0.55 + 1.1 * i));
// 			body.createFixture(shape, {
// 				density : 1.0,
// 				friction : 0.3
// 			});
// 		}
// 	}
// }

// function world2(world: World) {
// 	// ground
//
// 	const ground = world.createBody({
// 		position: new Vec2(70, 20)
// 	})
// 	ground.createFixture(new Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)))
// 	ground.createFixture(new Edge(Vec2(20.0, 0.0), Vec2(20.0, 20.0)))
//
//
// 	// dynamic
//
// 	const body = world.createBody({
// 		type: 'dynamic',
// 		position: new Vec2(56, 30)
// 	})
//
// 	const dynamicBox = new Box(3, 1)
//
// 	body.createFixture({
// 		shape: dynamicBox,
// 		density: 20,
// 		friction: 0.1
// 	})
//
// 	// dynamic 2
//
// 	const body2 = world.createBody({
// 		type: 'dynamic',
// 		position: new Vec2(55, 25)
// 	})
//
// 	const dynamicBox2 = new Box(1, 1)
//
// 	body2.createFixture({
// 		shape: dynamicBox2,
// 		density: 20,
// 		friction: 0.1
// 	})
// }