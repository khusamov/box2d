import {PropsWithChildren} from 'react'
import {FloatPanelStyle} from './FloatPanel.module.scss'

export function FloatPanel({children}: PropsWithChildren<{}>) {
	return (
		<div className={FloatPanelStyle}>
			{children}
		</div>
	)
}