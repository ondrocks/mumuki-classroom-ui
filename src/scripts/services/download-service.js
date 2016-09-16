
angular
  .module('classroom')
  .service('Download', function () {

    this.json = (filename = 'download', data) => {
      const blob = new Blob([JSON.stringify(data)], {type: 'text/json'});
      const a = document.getElementById('downloadAnchor');
      a.download = `${filename}.json`;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      a.click();
    }

  });
