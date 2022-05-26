import {World, Fixture, Edge, Polygon, Circle, Vec2} from 'planck';
import {convertPlanckListToArray} from '../../functions/convertPlanckListToArray';
import {toDegree} from '../../functions/toDegree';

interface IPlanckRendererProps {
	world: World
}

export function PlanckRenderer({world}: IPlanckRendererProps) {
	return (
		<g>
			{convertPlanckListToArray(world.getBodyList()).map(
				(body, index) => {
					const x = body.getTransform().p.x
					const y = body.getTransform().p.y
					const angle = body.getTransform().q.getAngle()
					const fixtureList = convertPlanckListToArray(body.getFixtureList())
					return (
						<g key={index} transform={`translate(${x}, ${y}), rotate(${toDegree(angle)})`}>
							<FixtureRenderer fixtureList={fixtureList}/>
						</g>
					)
				}
			)}
		</g>
	)
}

function pathData(vertices: Vec2[], close = true) {
	const drawCommands = vertices.map((vertex, index) => `${index === 0 ? 'M' : 'L'} ${vertex.x} ${vertex.y}`)
	if (close) drawCommands.push('Z')
	return drawCommands.join(', ')
}

interface IFixtureRendererProps {
	fixtureList: Fixture[]
}

function FixtureRenderer({fixtureList}: IFixtureRendererProps) {
	return (
		<>
			{
				fixtureList.map((fixture, index) => {
					switch (fixture.getShape().getType()) {
						case 'circle':
							const circle = fixture.getShape() as Circle
							return (
								<circle
									key={index}
									r={circle.getRadius()}
									transform={`translate(${circle.getCenter().x}, ${circle.getCenter().y})`}
								/>
							)
						case 'polygon':
							return (
								<path
									key={index}
									d={pathData((fixture.getShape() as Polygon).m_vertices)}
								/>
							)
						case 'edge':
							const vertex1 = (fixture.getShape() as Edge).m_vertex1
							const vertex2 = (fixture.getShape() as Edge).m_vertex2
							const pointSize = 1
							return (
								<g key={index}>
									<g transform={`translate(-${pointSize / 2}, -${pointSize / 2})`}>
										<rect width={pointSize} height={pointSize} transform={`translate(${vertex1.x}, ${vertex1.y})`}/>
										<rect width={pointSize} height={pointSize} transform={`translate(${vertex2.x}, ${vertex2.y})`}/>
									</g>
									<path d={pathData([vertex1, vertex2], false)}
									/>
								</g>
							)
					}
					return null
				})
			}
		</>
	)
}