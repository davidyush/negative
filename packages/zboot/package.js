Package.describe({
  name: 'fleple:zboot',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'What this does',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('templating',['web.browser','client']);
  api.use('jquery',['web.browser','client']);
  api.addFiles(['zboot.js','zboot.css'],'web.browser');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('fleple:zboot');
  api.addFiles('zboot-tests.js');
});
