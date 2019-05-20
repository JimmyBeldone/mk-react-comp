import { withFull } from '../constants/env_vars';
import * as deps from '../constants/npm-imports';

const generateTemplate = component => {
    // Generate Stateless Functional Component
    return `
${deps.React}

const ${withFull ? `${component}Template` : component} = ({}) => (
    <div className="${component.toLowerCase()}">

    </div>
)

export default ${withFull ? `${component}Template` : component}
    `;
};

export default generateTemplate;
