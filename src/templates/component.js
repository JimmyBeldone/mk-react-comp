import { isEntry, withFull, withLifecycle, withRedux } from '../constants/env_vars'
import * as deps from '../constants/npm-imports'
import lifecycleTemplate from './lifecycleTemplate'

const generateTemplate = (component) => {
    let template = ``
    let reactImports = []
    let compBody = ``
    let compEnd = ``
    let render = ``
    let templateDeps
    let styleDeps
    let reduxFunc = [deps.mapStateToProps, deps.mapDispatchToProps].join('\n')

    if (withFull) {
        templateDeps = `\nimport ${component}Template from './${component}Template'`
        styleDeps = `import './${component}.styl'`
        render = `return (<${component}Template />)`
    } else {
        render =
        `
                return (
                    <div className="${component.toLowerCase()}">

                    </div>
                )
        `
    }

    // Generate Component
    withFull
        ? reactImports.push(deps.ReactPure, deps.PropTypes, templateDeps, styleDeps)
        : reactImports.push(deps.ReactPure, deps.PropTypes)

    if (withRedux) {
        reactImports.splice(1, 0, deps.Redux)
    }

    compBody =
    `
${withRedux ? reduxFunc : ''}
class ${component} extends PureComponent {

    static propTypes = {

    }
    ${withLifecycle ? lifecycleTemplate() : ''}
    render() {
        ${render}
    }
}
    `

    compEnd = withRedux
    ? `
export default connect(mapStateToProps, mapDispatchToProps)(${component})`
    : `
export default ${component}`

    // Mounts component to the DOM
    if (isEntry) {
        reactImports.push(deps.ReactDOM)
        compEnd += `ReactDOM.render(<${component}/>, document.getElementById('app'))`
    }

    template = reactImports.join('\n') + compBody + compEnd

    return template
}

export default generateTemplate
