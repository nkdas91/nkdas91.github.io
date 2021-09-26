$(function () {
    if ('default' === $('html').data('theme')) {
        $('#theme-default').attr('checked', 'true');
    } else if ('light' === $('html').data('theme')) {
        $('#theme-light').attr('checked', 'true');
    } else {
        $('#theme-dark').attr('checked', 'true');
    }

    $('input[type=radio][name=theme]').change(function() {
        $('html').data('theme', this.value).attr('data-theme', this.value);
        localStorage.setItem('theme', this.value);
    });
});
