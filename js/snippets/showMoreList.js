function showMoreList() {

    $('.js-show-more-list').each((index, item) => {

        const $this = $(item);
        let $children = $this.children();

        const itemLimit = parseInt($this.attr('data-item-limit'), 10);

        //  For filters, if an item of a list has 'is-active' class, expand the list by default
        const hasActiveItem = !!$children.find('.is-active').length;

        const linkId = 'item-list-' + index;
        const linkWrapperClass = $this.attr('data-link-wrapper-class') || '';
        const linkClass = $this.attr('data-link-class') || '';
        const linkHtml = hasActiveItem ? $this.attr('data-link-html-collapse') : $this.attr('data-link-html-expand');

        $this.attr('id', linkId);

        if ($children.length > itemLimit) {

            $this.after(`
                <div class="${ linkWrapperClass }">
                    <a href="javascript:void(0);" data-list="#${ linkId }" class="${ linkClass } js-toggle-item-list">${ linkHtml }</a>
                </div>
            `);

            if (!hasActiveItem) {
                $children.slice(itemLimit).hide();
            }
        }
    });

    $('.js-toggle-item-list').on('click', (e) => {

        const $this = $(e.currentTarget);
        const $list = $($this.attr('data-list'));
        let $children = $list.children();

        const itemLimit = parseInt($list.attr('data-item-limit'), 10);

        $children.slice(itemLimit).toggle();

        var isExpanded = $children.last().is(':visible');

        $this.html(isExpanded ? $list.attr('data-link-html-collapse') : $list.attr('data-link-html-expand'));

        $this.blur();
    });
}
