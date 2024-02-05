const { argv } = process

const [,,lambdaName, functionName] = argv

const moduleName = `../packages/${lambdaName}/index.js`

async function loadModule() {
  try {
    const module = await import(moduleName);
    function callback(error, response) {
      console.dir(JSON.parse(response.body), { depth: null });
    }

    module[functionName]({}, {}, callback)
  } catch (err) {
    console.error('Failed to load the module:', err);
  }
}

loadModule()


