export class NotDefinedRuleContextError extends Error {
	public constructor() {
		super('Не определен игровой контекст')
	}
}