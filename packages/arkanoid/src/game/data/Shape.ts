import {IData} from '../base/interfaces/IData';
import {Shape as PlanckShape} from 'planck'

export abstract class Shape implements IData {
	public shape: PlanckShape | undefined
	abstract clone(): IData
}