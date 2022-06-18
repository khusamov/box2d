Parcel v2 transformer: package.json
===================================

Если вам нужно использовать пакетную версию вашего package.json 
в вашем проекте, вы можете добавить этот преобразователь 
в свой проект. 

PACKAGE_VERSION будет заменен версией в вашем package.json.

.parcelrc
---------

```json
{
	"extends": "@parcel/config-default",
	"transformers": {
		"*.{ts,tsx}": ["parcel-transformer-package-json"]
	}
}
```

