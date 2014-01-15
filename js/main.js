curl.config({
  apiName: 'require',
  baseUrl: '/js',
  preloads: ['liftjs'],
  packages: [
    {
      name: 'liftjs',
      path: 'liftjs/',
      main: 'lift'
    }
  ]
});

function $(id) {
  return document.getElementById(id);
}

curl(['liftjs', 'domReady!'], function(liftJS) {
  function createEl(name, attrs, child) {
    var el = document.createElement(name);

    if(attrs) {
      for(var attr in attrs) {
        el.setAttribute(attr, attrs[attr]);
      }
    }

    if(child) {
      if(typeof child == 'string') {
        el.appendChild(document.createTextNode(child));
      } else {
        el.appendChild(child);
      }
    }

    return el;
  }

  var tbody = $('features');

  function walk(obj, path) {
    for(var name in obj) {
      var value = obj[name];
      if(typeof value === 'object') {
        walk(value, path + name + ':');
      } else {
        var tr = createEl('tr', { 'class': value ? 'danger' : 'success' });
        tr.appendChild(createEl(
          'td', { 'class': 'feature' }, createEl(
            'a', { href: 'https://github.com/seamus-oconnor/lift-js/blob/master/src/modules/' + path.replace(/\:/g, '/') + name + '.js' }, path + name
          )
        ));
        tr.appendChild(createEl('td', { 'class': 'needs-shim ' + (value ? 'no' : 'yes') }, value ? 'no' : 'yes'));
        tbody.appendChild(tr);
      }
    }
  }

  walk(liftJS.support, '');
});
