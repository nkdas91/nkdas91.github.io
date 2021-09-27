function setActiveShape() {
    $('input[type=radio][name=theme]').each(function () {
        if (this.checked) {
            $(this).closest('.m-shape-container').addClass('active');
        } else {
            $(this).closest('.m-shape-container').removeClass('active');
        }
    });
}

$(function () {
    if ('default' === $('html').data('theme')) {
        $('#theme-default').attr('checked', 'true');
    } else if ('light' === $('html').data('theme')) {
        $('#theme-light').attr('checked', 'true');
    } else {
        $('#theme-dark').attr('checked', 'true');
    }

    setActiveShape();

    $('input[type=radio][name=theme]').change(function() {
        $('html').data('theme', this.value).attr('data-theme', this.value);
        localStorage.setItem('theme', this.value);
        setActiveShape();
    });
});
