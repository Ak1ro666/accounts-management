import boundaries from 'eslint-plugin-boundaries'

export const eslintBoundariesConfig = {
  plugins: {
    boundaries
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    },

    'boundaries/elements': [
      {
        type: 'app',
        pattern: './src/app'
      },
      {
        type: 'domains',
        pattern: './src/domains/*'
      },
      {
        type: 'contracts',
        pattern: './src/domains/contacts/*'
      },
      {
        type: 'core',
        pattern: './src/domains/core/*'
      },
      {
        type: 'supports',
        pattern: './src/domains/supports/*'
      },
      {
        type: 'platform',
        pattern: './src/platform'
      }
    ]
  },
  rules: {
    'boundaries/element-types': [
      2,
      {
        default: 'allow',
        rules: [
          {
            from: 'platform',
            disallow: ['app', 'domains'],
            message:
              'Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})'
          },
          {
            from: 'domains',
            disallow: ['app'],
            message:
              'Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})'
          }
        ]
      }
    ],
    'boundaries/entry-point': [
      2,
      {
        default: 'disallow',
        message:
          'Модуль (${file.type}) должен импортироваться через public API. Прямой импорт из ${dependency.source} запрещен',

        rules: [
          {
            target: ['platform', 'app'],
            allow: '**'
          },
          {
            target: ['supports', 'core', 'contracts'],
            allow: ['index.(ts|tsx)']
          }
        ]
      }
    ]
  }
}
