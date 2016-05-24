function updateSum() {
    var spans = document.querySelectorAll('.order__cost_val');
    var sum = 0;
    for (var i = 0; i < spans.length; i++) {
        sum += +spans[i].innerHTML;
    }
    document.querySelector('.total_sum').innerHTML = 'Общая стоимость: ' + sum;
}
