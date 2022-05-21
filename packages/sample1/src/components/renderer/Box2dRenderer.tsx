import {b2EdgeShape, b2PolygonShape, b2ShapeType, b2World, XY} from '@box2d/core';
import {convertBox2dListToArray} from '../../functions/convertBox2dListToArray';
import {toDegree} from '../../functions/toDegree';

function pathData(vertices: XY[], close = true) {
	const drawCommands = vertices.map((vertex, index) => `${index === 0 ? 'M' : 'L'} ${vertex.x} ${vertex.y}`)
	if (close) drawCommands.push('Z')
	return drawCommands.join(', ')
}

interface IBox2dRendererProps {
	world: b2World
}

export function Box2dRenderer({world}: IBox2dRendererProps) {
	return (
		<g>
			{convertBox2dListToArray(world.GetBodyList()).map((body, index) => {
				const x = body.GetTransform().GetPosition().x
				const y = body.GetTransform().GetPosition().y
				const angle = body.GetTransform().GetAngle()
				const fixtureList = convertBox2dListToArray(body.GetFixtureList())
				return (
					<g key={index} transform={`translate(${x}, ${y}), rotate(${toDegree(angle)})`}>
						{
							fixtureList.map((fixture, index) => {
								switch (fixture.GetShape().GetType()) {
									case b2ShapeType.e_polygon:
										return (
											<path
												key={index}
												d={pathData((fixture.GetShape() as b2PolygonShape).m_vertices)}
											/>
										)
									case b2ShapeType.e_edge:
										const vertex1 = (fixture.GetShape() as b2EdgeShape).m_vertex1
										const vertex2 = (fixture.GetShape() as b2EdgeShape).m_vertex2
										const oneSided = (fixture.GetShape() as b2EdgeShape).m_oneSided
										const pointSize = 1
										return (
											<g key={index}>
												{!oneSided && (
													<g transform={`translate(-${pointSize / 2}, -${pointSize / 2})`}>
														<rect width={pointSize} height={pointSize} transform={`translate(${vertex1.x}, ${vertex1.y})`}/>
														<rect width={pointSize} height={pointSize} transform={`translate(${vertex2.x}, ${vertex2.y})`}/>
													</g>
												)}
												<path d={pathData([vertex1, vertex2], false)}
												/>
											</g>
										)
								}
								return null
							})
						}
					</g>
				)
			})}
		</g>
	)
}