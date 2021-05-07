$(function () {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme == 'light') {
        $('html').data('theme', 'light').attr('data-theme', 'light');
    }

    if ('dark' === $('html').data('theme')) {
        $('#dark-mode').attr('checked', 'true');
        $('#light-mode-icon, #dark-mode-icon').attr('fill', '#FFFFFF');
    } else {
        $('#light-mode-icon, #dark-mode-icon').attr('fill', '#adb5bd');
        $('.btn-pink-a100').not('.btn-fab').addClass('btn-dark').removeClass('btn-pink-a100');
        $('.btn-fab.btn-indigo-a100').addClass('btn-grey-200').removeClass('btn-indigo-a100');
    }

    $('#dark-mode').on('change', function () {
        if ('dark' === $('html').data('theme')) {
            $('html').data('theme', 'light').attr('data-theme', 'light');
            $('#light-mode-icon, #dark-mode-icon').attr('fill', '#adb5bd');
            $('.btn-pink-a100').not('.btn-fab').addClass('btn-dark').removeClass('btn-pink-a100');
            $('.btn-fab.btn-indigo-a100').addClass('btn-grey-200').removeClass('btn-indigo-a100');
            localStorage.setItem('theme', 'light');
        } else {
            $('html').data('theme', 'dark').attr('data-theme', 'dark');
            $('#light-mode-icon, #dark-mode-icon').attr('fill', '#FFFFFF');
            $('.btn-dark').addClass('btn-pink-a100').removeClass('btn-dark');
            $('.btn-fab.btn-grey-200').addClass('btn-indigo-a100').removeClass('btn-grey-200');
            localStorage.setItem('theme', 'dark');
        }
    });
});
