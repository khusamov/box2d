/**
 * Вспомогательные линии для проверки центрирования объектов.
 * @constructor
 */
export function DebugCenterLines() {
	return (
		<g>
			<line x1={0} y1={100} x2={0} y2={-100} style={{stroke: '#9df5ff'}}/>
			<line x1={100} y1={0} x2={-100} y2={0} style={{stroke: '#9df5ff'}}/>
		</g>
	)
}