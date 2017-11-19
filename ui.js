$(function() {
  var matrix;
  var items;

  $('#submit').click(function(e) {
    e.preventDefault();
    items = _(_(_($('#items').val().split("\n")).map(function(s){return s.trim();})).reject(function(s){return s==="";})).uniq();
    matrix = new ComparisonMatrix(items);
    tryQuickSort();
  });

  function tryQuickSort() {
    try {
      quickSort(items, matrix);
      showResults();
    } catch(e) {
      askUser(e.items[0], e.items[1]);
    }
  }

  function askUser(a, b) {
    $('#input').hide();
    $('#ask').show();
    $('#ask_a span img').attr('src', a);
    $('#ask_a').prop('text', a);
    $('#ask_b span img').attr('src', b);
    $('#ask_b').prop('text', b);
  }

  $('.ask_answer').click(function(e) {
    e.preventDefault();
    var a = $('#ask_a').prop('text');
    var b = $('#ask_b').prop('text');
    var result =$(this).data('result');
    matrix.set(a,b,result);
    tryQuickSort();
  });

  function showResults() {
    $('#input').hide();
    $('#ask').hide();
    $('#results').show();
    $('#results_list').html('');
    $('#explicit_count').text(matrix.explicitCount);
    _(items).each(function(item) {
      var li = $('<li />').appendTo($('#results_list'));
      $('<img />').appendTo(li).attr('src', item);
    });
  }

  $('#start_over').click(function(e) {
    e.preventDefault();
    $('#results').hide();
    $('#input').show();
  });
});

