$(function () {
    if ('dark' === $('html').data('theme')) {
        $('#dark-mode').attr('checked', 'true');
        $('#light-mode-icon, #dark-mode-icon').attr('fill', '#FFFFFF');
    } else {
        $('#light-mode-icon, #dark-mode-icon').attr('fill', '#adb5bd');
    }

    $('#dark-mode').on('change', function () {
        if ('dark' === $('html').data('theme')) {
            $('html').data('theme', 'light').attr('data-theme', 'light');
            $('#light-mode-icon, #dark-mode-icon').attr('fill', '#adb5bd');
            localStorage.setItem('theme', 'light');
        } else {
            $('html').data('theme', 'dark').attr('data-theme', 'dark');
            $('#light-mode-icon, #dark-mode-icon').attr('fill', '#FFFFFF');
            localStorage.setItem('theme', 'dark');
        }
    });
});
