export const devHeaderExtension = {
  name: 'extension-dev-headers',
  hooks: (req, res) => {
    return {
      beforeCreate: ({ configuration }) => {
        const devMode = req.headers['dev-mode'];
    
        console.log('{{{{{{{{{{{{{{{{{{{{{', devMode)
        console.log('dev cookie is passed: ', devMode)
        configuration.headers = { devMode };
        
        return configuration;
      }
    };
  },
};
