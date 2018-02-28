const path = require('path')
const log = console.log
const cssTemplateFolder = 'css_template'

const {
  installDependencies,
  copy,
  remove
} = require('./utils')

module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project'
    },
    keywords: {
      type: 'string',
      required: true,
      message: 'keywords'
    },
    author: {
      type: 'string',
      required: true,
      message: 'Author'
    },
    cssFramework: {
      type: 'list',
      message: 'Select which CSS Framework to install',
      choices: [
        {
          name: 'Bootstrap 4 (http://getbootstrap.com)',
          value: 'bootstrap'
        },
        {
          name: 'Bulma (https://bulma.io)',
          value: 'bulma'
        },
        {
          name: 'UIkit (https://getuikit.com)',
          value: 'uikit'
        },
        {
          name: 'Zurb Foundation 5 (https://foundation.zurb.com)',
          value: 'zurb-foundation-5'
        },
        {
          name: 'Tachyons (http://tachyons.io)',
          value: 'tachyons'
        },
        {
          name: 'Tailwind (https://tailwindcss.com)',
          value: 'tailwind'
        }
      ]
    },
    license: {
      type: 'string',
      label: 'License',
      default: 'MIT'
    },
    sass: {
      type: 'confirm',
      message: 'Use sass/scss?',
      default: true
    },
    autoInstall: {
      type: 'list',
      message: 'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm'
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn'
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no'
        }
      ]
    }
  },
  complete: function (data, { chalk }) {
    const green = chalk.green
    const red = chalk.red
    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)
    log(data)
    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          copy(`${cwd}/${cssTemplateFolder}/${data.cssFramework}`, `${cwd}/src/assets/scss/`)
        })
        .then(() => {
          remove(`${cwd}/${cssTemplateFolder}`)
        })
        .catch(e => {
          log(red('Error:'), e)
        })
    } else {
      log(red('Fail'))
    }
  }
}
