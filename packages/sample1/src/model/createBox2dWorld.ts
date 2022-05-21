import {b2BodyType, b2EdgeShape, b2PolygonShape, b2Vec2, b2World} from '@box2d/core';

export function createBox2dWorld() {
	const gravity = new b2Vec2(0, -10)
	const world = b2World.Create(gravity)

	// ground

	const ground = world.CreateBody({
		position: {
			x: 70,
			y: 20
		}
	})
	const groundShape = new b2EdgeShape
	groundShape.SetTwoSided(new b2Vec2(-40, 0), new b2Vec2(40, 0))
	ground.CreateFixture({shape: groundShape})
	groundShape.SetTwoSided(new b2Vec2(20, 0), new b2Vec2(20, 20))
	ground.CreateFixture({shape: groundShape})


	// dynamic

	const body = world.CreateBody({
		type: b2BodyType.b2_dynamicBody,
		position: {
			x: 56,
			y: 30
		}
	})

	const dynamicBox = new b2PolygonShape()
	dynamicBox.SetAsBox(3, 1)

	body.CreateFixture({
		shape: dynamicBox,
		density: 20,
		friction: 0.1
	})

	// dynamic 2

	const body2 = world.CreateBody({
		type: b2BodyType.b2_dynamicBody,
		position: {
			x: 55,
			y: 25
		}
	})

	const dynamicBox2 = new b2PolygonShape()
	dynamicBox2.SetAsBox(1, 1)

	body2.CreateFixture({
		shape: dynamicBox2,
		density: 20,
		friction: 0.1
	})

	return world
}

export function update(world: b2World, timeStep = 1 / 60) {
	const velocityIterations = 6
	const positionIterations = 2
	world.Step(timeStep, {velocityIterations, positionIterations})
}