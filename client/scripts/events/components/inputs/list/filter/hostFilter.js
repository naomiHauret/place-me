Template.hostFilter.onRendered(function () {
  $('.hostSelect').select2({
    placeholder: 'Tips: you can type or select host organization',
    allowClear: true
  });
});
