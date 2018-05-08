import moji from 'moji-translate'

const main = document.querySelector('[role="main"]')

const fn = async () => {
	return await Promise.resolve('Example')
}

main.textContent = moji.translate('Hello world!!!')