import {Transformer} from '@parcel/plugin'
import {resolve} from 'path'

/**
 * @link https://github.com/CIMonitor/parcel-transformer-package-version/blob/master/index.js
 * @link https://parceljs.org/plugin-system/transformer/
 */
export default new Transformer({
	async transform({asset}) {
		let source = await asset.getCode();

		const packageJson = await import(resolve(process.cwd(), 'package.json'));

		asset.setCode(source.replace(/PACKAGE_VERSION/g, packageJson.version));

		return [asset];
	}
})