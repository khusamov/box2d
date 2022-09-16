import {Fragment} from 'react'
import {World, Fixture, Edge, Polygon, Circle, Vec2} from 'planck';
import {convertPlanckListToArray} from '../../functions/convertPlanckListToArray';
import {toDegree} from '../../functions/toDegree';
import {Bot} from '../../model/Bot'
import {codeCommandMap} from '../../model/BotVirtualMachine'
import {PlanckRendererStyle, EdgeStyle, CircleStyle, PolygonStyle} from './PlanckRenderer.module.scss'

interface IPlanckRendererProps {
	world: World
}

function printUserData(data: any) {
	if (data instanceof Bot) {
		const statements = data.genome.sequence.map(code => {
			const CommandClass = codeCommandMap[code]
			return CommandClass ? CommandClass.name.replace('Command', '') : code
		})
		console.log(Array.from(statements))
	}
}

export function PlanckRenderer({world}: IPlanckRendererProps) {
	return (
		<g className={PlanckRendererStyle}>
			{convertPlanckListToArray(world.getBodyList()).map(
				(body, index) => {
					const x = body.getTransform().p.x
					const y = body.getTransform().p.y
					const angle = body.getTransform().q.getAngle()
					const fixtureList = convertPlanckListToArray(body.getFixtureList())
					return (
						<g
							key={index}
							transform={`translate(${x}, ${y}), rotate(${toDegree(angle)})`}
							onClick={() => printUserData(body.getUserData())}
						>
							<FixtureRenderer fixtureList={fixtureList}/>
							{body.getUserData() instanceof Bot && (
								<line x1={0} y1={0} x2={0} y2={0.5} transform={'rotate(-90)'}/>
							)}
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
		<Fragment>
			{
				fixtureList.map((fixture, index) => {
					switch (fixture.getShape().getType()) {
						case 'circle':
							const circle = fixture.getShape() as Circle
							return (
								<circle
									key={index}
									className={CircleStyle}
									r={circle.getRadius()}
									transform={`translate(${circle.getCenter().x}, ${circle.getCenter().y})`}
								/>
							)
						case 'polygon':
							return (
								<path
									key={index}
									className={PolygonStyle}
									d={pathData((fixture.getShape() as Polygon).m_vertices)}
								/>
							)
						case 'edge':
							const vertex1 = (fixture.getShape() as Edge).m_vertex1
							const vertex2 = (fixture.getShape() as Edge).m_vertex2
							return (
								<g key={index} className={EdgeStyle}>
									<path d={pathData([vertex1, vertex2], false)}/>
								</g>
							)
					}
					return null
				})
			}
		</Fragment>
	)
}