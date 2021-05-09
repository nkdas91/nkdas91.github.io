$(function () {
    if ('dark' === $('html').data('theme')) {
        $('#dark-mode').attr('checked', 'true');
    }

    $('#dark-mode').on('change', function () {
        if ('dark' === $('html').data('theme')) {
            $('html').data('theme', 'light').attr('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            $('html').data('theme', 'dark').attr('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
});
