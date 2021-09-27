function setActiveShape() {
    $('input[type=radio][name=theme]').each(function () {
        if (this.checked) {
            $(this).closest('.m-shape-container').addClass('active');
        } else {
            $(this).closest('.m-shape-container').removeClass('active');
        }
    });
}

function toggleExampleVisibility(theme) {
    if ('light' == theme) {
        $('#example-light').show();
        $('#example-dark').hide();
    } else {
        $('#example-light').hide();
        $('#example-dark').show();
    }

    reDrawExamples(theme);
}

function reDrawExamples(theme) {
    if ('light' == theme) {
        $('#example-light .btn').ripple('redraw');
        $('#example-light .m-text-field').textfield('redraw');
        $('#example-light .m-text-field-outline').textfield('redraw');
        $('#example-light .m-select-outline').selectfield('redraw');
    } else {
        $('#example-dark .btn').ripple('redraw');
        $('#example-dark .m-text-field').textfield('redraw');
        $('#example-dark .m-text-field-outline').textfield('redraw');
        $('#example-dark .m-select-outline').selectfield('redraw');
    }
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
    toggleExampleVisibility($('html').data('theme'));

    $('input[type=radio][name=theme]').change(function() {
        $('html').data('theme', this.value).attr('data-theme', this.value);
        localStorage.setItem('theme', this.value);
        setActiveShape();
        toggleExampleVisibility(this.value);
    });
});
