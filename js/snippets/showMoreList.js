function showMoreList() {

    $('[data-item-limit]').each((index, item) => {

        const $this = $(item);
        let $children = $this.children();

        const itemLimit = parseInt($this.attr('data-item-limit'), 10);

        //  For filters, if an item of a list has 'is-active' class, expand the list by default
        const hasActiveItem = !!$children.find('.is-active').length;

        const linkId = 'item-list-' + index;
        const linkWrapperClass = $this.attr('data-link-wrapper-class') || '';
        const linkClass = $this.attr('data-link-class') || '';
        const linkLabel = $this.attr('data-label-expand');
        const linkIcon =  hasActiveItem ? '<span class="icon icon--remove">' : '<span class="icon icon--add">';

        $this.attr('id', linkId);

        console.log($children.length, itemLimit);

        if ($children.length > itemLimit) {

            $this.after(`
                <div class="${linkWrapperClass}">
                    <a href="javascript:void(0);" data-list="#${linkId}" class="${linkClass} js-toggle-item-list">${linkIcon}${linkLabel}</a>
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

        if (isExpanded) {
            $this.html(`<span class="icon icon--remove"></span>${$list.attr('data-label-collapse')}`);
        } else {
            $this.html(`<span class="icon icon--add"></span>${$list.attr('data-label-expand')}`);
        }

        $this.blur();
    });
}
