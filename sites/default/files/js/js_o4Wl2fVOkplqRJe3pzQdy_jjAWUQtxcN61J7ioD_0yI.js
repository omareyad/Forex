/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);;
(function ($) {
  'use strict';

  // Case insensitive search
  $.expr[':'].icontains = function (obj, index, meta) {
    return icontains($(obj).text(), meta[3]);
  };

  // Case and accent insensitive search
  $.expr[':'].aicontains = function (obj, index, meta) {
    return icontains($(obj).data('normalizedText') || $(obj).text(), meta[3]);
  };

  /**
   * Actual implementation of the case insensitive search.
   * @access private
   * @param {String} haystack
   * @param {String} needle
   * @returns {boolean}
   */
  function icontains(haystack, needle) {
    return haystack.toUpperCase().indexOf(needle.toUpperCase()) === 0;
  }

  /**
   * Remove all diatrics from the given text.
   * @access private
   * @param {String} text
   * @returns {String}
   */
  function normalizeToBase(text) {
    var rExps = [
      {re: /[\xC0-\xC6]/g, ch: "A"},
      {re: /[\xE0-\xE6]/g, ch: "a"},
      {re: /[\xC8-\xCB]/g, ch: "E"},
      {re: /[\xE8-\xEB]/g, ch: "e"},
      {re: /[\xCC-\xCF]/g, ch: "I"},
      {re: /[\xEC-\xEF]/g, ch: "i"},
      {re: /[\xD2-\xD6]/g, ch: "O"},
      {re: /[\xF2-\xF6]/g, ch: "o"},
      {re: /[\xD9-\xDC]/g, ch: "U"},
      {re: /[\xF9-\xFC]/g, ch: "u"},
      {re: /[\xC7-\xE7]/g, ch: "c"},
      {re: /[\xD1]/g, ch: "N"},
      {re: /[\xF1]/g, ch: "n"}
    ];
    $.each(rExps, function () {
      text = text.replace(this.re, this.ch);
    });
    return text;
  }


  function htmlEscape(html) {
    var escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '`': '&#x60;'
    };
    var source = '(?:' + Object.keys(escapeMap).join('|') + ')',
        testRegexp = new RegExp(source),
        replaceRegexp = new RegExp(source, 'g'),
        string = html == null ? '' : '' + html;
    return testRegexp.test(string) ? string.replace(replaceRegexp, function (match) {
      return escapeMap[match];
    }) : string;
  }

  var Selectpicker = function (element, options, e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    this.$element = $(element);
    this.$newElement = null;
    this.$button = null;
    this.$menu = null;
    this.$lis = null;
    this.options = options;

    // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
    // data-attribute)
    if (this.options.title === null) {
      this.options.title = this.$element.attr('title');
    }

    //Expose public methods
    this.val = Selectpicker.prototype.val;
    this.render = Selectpicker.prototype.render;
    this.refresh = Selectpicker.prototype.refresh;
    this.setStyle = Selectpicker.prototype.setStyle;
    this.selectAll = Selectpicker.prototype.selectAll;
    this.deselectAll = Selectpicker.prototype.deselectAll;
    this.destroy = Selectpicker.prototype.remove;
    this.remove = Selectpicker.prototype.remove;
    this.show = Selectpicker.prototype.show;
    this.hide = Selectpicker.prototype.hide;

    this.init();
  };

  Selectpicker.VERSION = '1.6.3';

  // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
  Selectpicker.DEFAULTS = {
    noneSelectedText: 'Nothing selected',
    noneResultsText: 'No results match',
    countSelectedText: function (numSelected, numTotal) {
      return (numSelected == 1) ? "{0} item selected" : "{0} items selected";
    },
    maxOptionsText: function (numAll, numGroup) {
      var arr = [];

      arr[0] = (numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)';
      arr[1] = (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)';

      return arr;
    },
    selectAllText: 'Select All',
    deselectAllText: 'Deselect All',
    multipleSeparator: ', ',
    style: 'btn-default',
    size: 'auto',
    title: null,
    selectedTextFormat: 'values',
    width: false,
    container: false,
    hideDisabled: false,
    showSubtext: false,
    showIcon: true,
    showContent: true,
    dropupAuto: true,
    header: false,
    liveSearch: false,
    actionsBox: false,
    iconBase: 'glyphicon',
    tickIcon: 'glyphicon-ok',
    maxOptions: false,
    mobile: false,
    selectOnTab: false,
    dropdownAlignRight: false,
    searchAccentInsensitive: false
  };

  Selectpicker.prototype = {

    constructor: Selectpicker,

    init: function () {
      var that = this,
          id = this.$element.attr('id');

      this.$element.hide();
      this.multiple = this.$element.prop('multiple');
      this.autofocus = this.$element.prop('autofocus');
      this.$newElement = this.createView();
      this.$element.after(this.$newElement);
      this.$menu = this.$newElement.find('> .dropdown-menu');
      this.$button = this.$newElement.find('> button');
      this.$searchbox = this.$newElement.find('input');

      if (this.options.dropdownAlignRight)
        this.$menu.addClass('dropdown-menu-right');

      if (typeof id !== 'undefined') {
        this.$button.attr('data-id', id);
        $('label[for="' + id + '"]').click(function (e) {
          e.preventDefault();
          that.$button.focus();
        });
      }

      this.checkDisabled();
      this.clickListener();
      if (this.options.liveSearch) this.liveSearchListener();
      this.render();
      this.liHeight();
      this.setStyle();
      this.setWidth();
      if (this.options.container) this.selectPosition();
      this.$menu.data('this', this);
      this.$newElement.data('this', this);
      if (this.options.mobile) this.mobile();
    },

    createDropdown: function () {
      // Options
      // If we are multiple, then add the show-tick class by default
      var multiple = this.multiple ? ' show-tick' : '',
          inputGroup = this.$element.parent().hasClass('input-group') ? ' input-group-btn' : '',
          autofocus = this.autofocus ? ' autofocus' : '',
          btnSize = this.$element.parents().hasClass('form-group-lg') ? ' btn-lg' : (this.$element.parents().hasClass('form-group-sm') ? ' btn-sm' : '');
      // Elements
      var header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + '</div>' : '';
      var searchbox = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="input-block-level form-control" autocomplete="off" /></div>' : '';
      var actionsbox = this.options.actionsBox ? '<div class="bs-actionsbox">' +
      '<div class="btn-group btn-block">' +
      '<button class="actions-btn bs-select-all btn btn-sm btn-default">' +
      this.options.selectAllText +
      '</button>' +
      '<button class="actions-btn bs-deselect-all btn btn-sm btn-default">' +
      this.options.deselectAllText +
      '</button>' +
      '</div>' +
      '</div>' : '';
      var drop =
          '<div class="btn-group bootstrap-select' + multiple + inputGroup + '">' +
          '<button type="button" class="btn dropdown-toggle selectpicker' + btnSize + '" data-toggle="dropdown"' + autofocus + '>' +
          '<span class="filter-option pull-left"></span>&nbsp;' +
          '<span class="caret"></span>' +
          '</button>' +
          '<div class="dropdown-menu open">' +
          header +
          searchbox +
          actionsbox +
          '<ul class="dropdown-menu inner selectpicker" role="menu">' +
          '</ul>' +
          '</div>' +
          '</div>';

      return $(drop);
    },

    createView: function () {
      var $drop = this.createDropdown();
      var $li = this.createLi();
      $drop.find('ul').append($li);
      return $drop;
    },

    reloadLi: function () {
      //Remove all children.
      this.destroyLi();
      //Re build
      var $li = this.createLi();
      this.$menu.find('ul').append($li);
    },

    destroyLi: function () {
      this.$menu.find('li').remove();
    },

    createLi: function () {
      var that = this,
          _li = [],
          optID = 0;

      // Helper functions
      /**
       * @param content
       * @param [index]
       * @param [classes]
       * @returns {string}
       */
      var generateLI = function (content, index, classes) {
        return '<li' +
        (typeof classes !== 'undefined' ? ' class="' + classes + '"' : '') +
        (typeof index !== 'undefined' | null === index ? ' data-original-index="' + index + '"' : '') +
        '>' + content + '</li>';
      };

      /**
       * @param text
       * @param [classes]
       * @param [inline]
       * @param [optgroup]
       * @returns {string}
       */
      var generateA = function (text, classes, inline, optgroup) {
        var normText = normalizeToBase(htmlEscape(text));
        return '<a tabindex="0"' +
        (typeof classes !== 'undefined' ? ' class="' + classes + '"' : '') +
        (typeof inline !== 'undefined' ? ' style="' + inline + '"' : '') +
        (typeof optgroup !== 'undefined' ? 'data-optgroup="' + optgroup + '"' : '') +
        ' data-normalized-text="' + normText + '"' +
        '>' + text +
        '<span class="' + that.options.iconBase + ' ' + that.options.tickIcon + ' check-mark"></span>' +
        '</a>';
      };

      this.$element.find('option').each(function () {
        var $this = $(this);

        // Get the class and text for the option
        var optionClass = $this.attr('class') || '',
            inline = $this.attr('style'),
            text = $this.data('content') ? $this.data('content') : $this.html(),
            subtext = typeof $this.data('subtext') !== 'undefined' ? '<small class="muted text-muted">' + $this.data('subtext') + '</small>' : '',
            icon = typeof $this.data('icon') !== 'undefined' ? '<span class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></span> ' : '',
            isDisabled = $this.is(':disabled') || $this.parent().is(':disabled'),
            index = $this[0].index;
        if (icon !== '' && isDisabled) {
          icon = '<span>' + icon + '</span>';
        }

        if (!$this.data('content')) {
          // Prepend any icon and append any subtext to the main text.
          text = icon + '<span class="text">' + text + subtext + '</span>';
        }

        if (that.options.hideDisabled && isDisabled) {
          return;
        }

        if ($this.parent().is('optgroup') && $this.data('divider') !== true) {
          if ($this.index() === 0) { // Is it the first option of the optgroup?
            optID += 1;

            // Get the opt group label
            var label = $this.parent().attr('label');
            var labelSubtext = typeof $this.parent().data('subtext') !== 'undefined' ? '<small class="muted text-muted">' + $this.parent().data('subtext') + '</small>' : '';
            var labelIcon = $this.parent().data('icon') ? '<span class="' + that.options.iconBase + ' ' + $this.parent().data('icon') + '"></span> ' : '';
            label = labelIcon + '<span class="text">' + label + labelSubtext + '</span>';

            if (index !== 0 && _li.length > 0) { // Is it NOT the first option of the select && are there elements in the dropdown?
              _li.push(generateLI('', null, 'divider'));
            }

            _li.push(generateLI(label, null, 'dropdown-header'));
          }

          _li.push(generateLI(generateA(text, 'opt ' + optionClass, inline, optID), index));
        } else if ($this.data('divider') === true) {
          _li.push(generateLI('', index, 'divider'));
        } else if ($this.data('hidden') === true) {
          _li.push(generateLI(generateA(text, optionClass, inline), index, 'hide is-hidden'));
        } else {
          _li.push(generateLI(generateA(text, optionClass, inline), index));
        }
      });

      //If we are not multiple, we don't have a selected item, and we don't have a title, select the first element so something is set in the button
      if (!this.multiple && this.$element.find('option:selected').length === 0 && !this.options.title) {
        this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
      }

      return $(_li.join(''));
    },

    findLis: function () {
      if (this.$lis == null) this.$lis = this.$menu.find('li');
      return this.$lis;
    },

    /**
     * @param [updateLi] defaults to true
     */
    render: function (updateLi) {
      var that = this;

      //Update the LI to match the SELECT
      if (updateLi !== false) {
        this.$element.find('option').each(function (index) {
          that.setDisabled(index, $(this).is(':disabled') || $(this).parent().is(':disabled'));
          that.setSelected(index, $(this).is(':selected'));
        });
      }

      this.tabIndex();
      var notDisabled = this.options.hideDisabled ? ':not([disabled])' : '';
      var selectedItems = this.$element.find('option:selected' + notDisabled).map(function () {
        var $this = $(this);
        var icon = $this.data('icon') && that.options.showIcon ? '<i class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></i> ' : '';
        var subtext;
        if (that.options.showSubtext && $this.attr('data-subtext') && !that.multiple) {
          subtext = ' <small class="muted text-muted">' + $this.data('subtext') + '</small>';
        } else {
          subtext = '';
        }
        if ($this.data('content') && that.options.showContent) {
          return $this.data('content');
        } else if (typeof $this.attr('title') !== 'undefined') {
          return $this.attr('title');
        } else {
          return icon + $this.html() + subtext;
        }
      }).toArray();

      //Fixes issue in IE10 occurring when no default option is selected and at least one option is disabled
      //Convert all the values into a comma delimited string
      var title = !this.multiple ? selectedItems[0] : selectedItems.join(this.options.multipleSeparator);

      //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
      if (this.multiple && this.options.selectedTextFormat.indexOf('count') > -1) {
        var max = this.options.selectedTextFormat.split('>');
        if ((max.length > 1 && selectedItems.length > max[1]) || (max.length == 1 && selectedItems.length >= 2)) {
          notDisabled = this.options.hideDisabled ? ', [disabled]' : '';
          var totalCount = this.$element.find('option').not('[data-divider="true"], [data-hidden="true"]' + notDisabled).length,
              tr8nText = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;
          title = tr8nText.replace('{0}', selectedItems.length.toString()).replace('{1}', totalCount.toString());
        }
      }

      this.options.title = this.$element.attr('title');

      if (this.options.selectedTextFormat == 'static') {
        title = this.options.title;
      }

      //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
      if (!title) {
        title = typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText;
      }

      this.$button.attr('title', title);
      this.$newElement.find('.filter-option').html(title);
    },

    /**
     * @param [style]
     * @param [status]
     */
    setStyle: function (style, status) {
      if (this.$element.attr('class')) {
        this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|validate\[.*\]/gi, ''));
      }

      var buttonClass = style ? style : this.options.style;

      if (status == 'add') {
        this.$button.addClass(buttonClass);
      } else if (status == 'remove') {
        this.$button.removeClass(buttonClass);
      } else {
        this.$button.removeClass(this.options.style);
        this.$button.addClass(buttonClass);
      }
    },

    liHeight: function () {
      if (this.options.size === false) return;

      var $selectClone = this.$menu.parent().clone().find('> .dropdown-toggle').prop('autofocus', false).end().appendTo('body'),
          $menuClone = $selectClone.addClass('open').find('> .dropdown-menu'),
          liHeight = $menuClone.find('li').not('.divider').not('.dropdown-header').filter(':visible').children('a').outerHeight(),
          headerHeight = this.options.header ? $menuClone.find('.popover-title').outerHeight() : 0,
          searchHeight = this.options.liveSearch ? $menuClone.find('.bs-searchbox').outerHeight() : 0,
          actionsHeight = this.options.actionsBox ? $menuClone.find('.bs-actionsbox').outerHeight() : 0;

      $selectClone.remove();

      this.$newElement
          .data('liHeight', liHeight)
          .data('headerHeight', headerHeight)
          .data('searchHeight', searchHeight)
          .data('actionsHeight', actionsHeight);
    },

    setSize: function () {
      this.findLis();
      var that = this,
          menu = this.$menu,
          menuInner = menu.find('.inner'),
          selectHeight = this.$newElement.outerHeight(),
          liHeight = this.$newElement.data('liHeight'),
          headerHeight = this.$newElement.data('headerHeight'),
          searchHeight = this.$newElement.data('searchHeight'),
          actionsHeight = this.$newElement.data('actionsHeight'),
          divHeight = this.$lis.filter('.divider').outerHeight(true),
          menuPadding = parseInt(menu.css('padding-top')) +
              parseInt(menu.css('padding-bottom')) +
              parseInt(menu.css('border-top-width')) +
              parseInt(menu.css('border-bottom-width')),
          notDisabled = this.options.hideDisabled ? ', .disabled' : '',
          $window = $(window),
          menuExtras = menuPadding + parseInt(menu.css('margin-top')) + parseInt(menu.css('margin-bottom')) + 2,
          menuHeight,
          selectOffsetTop,
          selectOffsetBot,
          posVert = function () {
            // JQuery defines a scrollTop function, but in pure JS it's a property
            //noinspection JSValidateTypes
            selectOffsetTop = that.$newElement.offset().top - $window.scrollTop();
            selectOffsetBot = $window.height() - selectOffsetTop - selectHeight;
          };
      posVert();
      if (this.options.header) menu.css('padding-top', 0);

      if (this.options.size == 'auto') {
        var getSize = function () {
          var minHeight,
              lisVis = that.$lis.not('.hide');

          posVert();
          menuHeight = selectOffsetBot - menuExtras;

          if (that.options.dropupAuto) {
            that.$newElement.toggleClass('dropup', (selectOffsetTop > selectOffsetBot) && ((menuHeight - menuExtras) < menu.height()));
          }
          if (that.$newElement.hasClass('dropup')) {
            menuHeight = selectOffsetTop - menuExtras;
          }

          if ((lisVis.length + lisVis.filter('.dropdown-header').length) > 3) {
            minHeight = liHeight * 3 + menuExtras - 2;
          } else {
            minHeight = 0;
          }

          menu.css({
            'max-height': menuHeight + 'px',
            'overflow': 'hidden',
            'min-height': minHeight + headerHeight + searchHeight + actionsHeight + 'px'
          });
          menuInner.css({
            'max-height': menuHeight - headerHeight - searchHeight - actionsHeight - menuPadding + 'px',
            'overflow-y': 'auto',
            'min-height': Math.max(minHeight - menuPadding, 0) + 'px'
          });
        };
        getSize();
        this.$searchbox.off('input.getSize propertychange.getSize').on('input.getSize propertychange.getSize', getSize);
        $(window).off('resize.getSize').on('resize.getSize', getSize);
        $(window).off('scroll.getSize').on('scroll.getSize', getSize);
      } else if (this.options.size && this.options.size != 'auto' && menu.find('li' + notDisabled).length > this.options.size) {
        var optIndex = this.$lis.not('.divider' + notDisabled).find(' > *').slice(0, this.options.size).last().parent().index();
        var divLength = this.$lis.slice(0, optIndex + 1).filter('.divider').length;
        menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding;
        if (that.options.dropupAuto) {
          //noinspection JSUnusedAssignment
          this.$newElement.toggleClass('dropup', (selectOffsetTop > selectOffsetBot) && (menuHeight < menu.height()));
        }
        menu.css({'max-height': menuHeight + headerHeight + searchHeight + actionsHeight + 'px', 'overflow': 'hidden'});
        menuInner.css({'max-height': menuHeight - menuPadding + 'px', 'overflow-y': 'auto'});
      }
    },

    setWidth: function () {
      if (this.options.width == 'auto') {
        this.$menu.css('min-width', '0');

        // Get correct width if element hidden
        var selectClone = this.$newElement.clone().appendTo('body');
        var ulWidth = selectClone.find('> .dropdown-menu').css('width');
        var btnWidth = selectClone.css('width', 'auto').find('> button').css('width');
        selectClone.remove();

        // Set width to whatever's larger, button title or longest option
        this.$newElement.css('width', Math.max(parseInt(ulWidth), parseInt(btnWidth)) + 'px');
      } else if (this.options.width == 'fit') {
        // Remove inline min-width so width can be changed from 'auto'
        this.$menu.css('min-width', '');
        this.$newElement.css('width', '').addClass('fit-width');
      } else if (this.options.width) {
        // Remove inline min-width so width can be changed from 'auto'
        this.$menu.css('min-width', '');
        this.$newElement.css('width', this.options.width);
      } else {
        // Remove inline min-width/width so width can be changed
        this.$menu.css('min-width', '');
        this.$newElement.css('width', '');
      }
      // Remove fit-width class if width is changed programmatically
      if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
        this.$newElement.removeClass('fit-width');
      }
    },

    selectPosition: function () {
      var that = this,
          drop = '<div />',
          $drop = $(drop),
          pos,
          actualHeight,
          getPlacement = function ($element) {
            $drop.addClass($element.attr('class').replace(/form-control/gi, '')).toggleClass('dropup', $element.hasClass('dropup'));
            pos = $element.offset();
            actualHeight = $element.hasClass('dropup') ? 0 : $element[0].offsetHeight;
            $drop.css({
              'top': pos.top + actualHeight,
              'left': pos.left,
              'width': $element[0].offsetWidth,
              'position': 'absolute'
            });
          };
      this.$newElement.on('click', function () {
        if (that.isDisabled()) {
          return;
        }
        getPlacement($(this));
        $drop.appendTo(that.options.container);
        $drop.toggleClass('open', !$(this).hasClass('open'));
        $drop.append(that.$menu);
      });
      $(window).resize(function () {
        getPlacement(that.$newElement);
      });
      $(window).on('scroll', function () {
        getPlacement(that.$newElement);
      });
      $('html').on('click', function (e) {
        if ($(e.target).closest(that.$newElement).length < 1) {
          $drop.removeClass('open');
        }
      });
    },

    setSelected: function (index, selected) {
      this.findLis();
      this.$lis.filter('[data-original-index="' + index + '"]').toggleClass('selected', selected);
    },

    setDisabled: function (index, disabled) {
      this.findLis();
      if (disabled) {
        this.$lis.filter('[data-original-index="' + index + '"]').addClass('disabled').find('a').attr('href', '#').attr('tabindex', -1);
      } else {
        this.$lis.filter('[data-original-index="' + index + '"]').removeClass('disabled').find('a').removeAttr('href').attr('tabindex', 0);
      }
    },

    isDisabled: function () {
      return this.$element.is(':disabled');
    },

    checkDisabled: function () {
      var that = this;

      if (this.isDisabled()) {
        this.$button.addClass('disabled').attr('tabindex', -1);
      } else {
        if (this.$button.hasClass('disabled')) {
          this.$button.removeClass('disabled');
        }

        if (this.$button.attr('tabindex') == -1) {
          if (!this.$element.data('tabindex')) this.$button.removeAttr('tabindex');
        }
      }

      this.$button.click(function () {
        return !that.isDisabled();
      });
    },

    tabIndex: function () {
      if (this.$element.is('[tabindex]')) {
        this.$element.data('tabindex', this.$element.attr('tabindex'));
        this.$button.attr('tabindex', this.$element.data('tabindex'));
      }
    },

    clickListener: function () {
      var that = this;

      this.$newElement.on('touchstart.dropdown', '.dropdown-menu', function (e) {
        e.stopPropagation();
      });

      this.$newElement.on('click', function () {
        that.setSize();
        if (!that.options.liveSearch && !that.multiple) {
          setTimeout(function () {
            that.$menu.find('.selected a').focus();
          }, 10);
        }
      });

      this.$menu.on('click', 'li a', function (e) {
        var $this = $(this),
            clickedIndex = $this.parent().data('originalIndex'),
            prevValue = that.$element.val(),
            prevIndex = that.$element.prop('selectedIndex');

        // Don't close on multi choice menu
        if (that.multiple) {
          e.stopPropagation();
        }

        e.preventDefault();

        //Don't run if we have been disabled
        if (!that.isDisabled() && !$this.parent().hasClass('disabled')) {
          var $options = that.$element.find('option'),
              $option = $options.eq(clickedIndex),
              state = $option.prop('selected'),
              $optgroup = $option.parent('optgroup'),
              maxOptions = that.options.maxOptions,
              maxOptionsGrp = $optgroup.data('maxOptions') || false;

          if (!that.multiple) { // Deselect all others if not multi select box
            $options.prop('selected', false);
            $option.prop('selected', true);
            that.$menu.find('.selected').removeClass('selected');
            that.setSelected(clickedIndex, true);
          } else { // Toggle the one we have chosen if we are multi select.
            $option.prop('selected', !state);
            that.setSelected(clickedIndex, !state);
            $this.blur();

            if ((maxOptions !== false) || (maxOptionsGrp !== false)) {
              var maxReached = maxOptions < $options.filter(':selected').length,
                  maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

              if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
                if (maxOptions && maxOptions == 1) {
                  $options.prop('selected', false);
                  $option.prop('selected', true);
                  that.$menu.find('.selected').removeClass('selected');
                  that.setSelected(clickedIndex, true);
                } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                  $optgroup.find('option:selected').prop('selected', false);
                  $option.prop('selected', true);
                  var optgroupID = $this.data('optgroup');

                  that.$menu.find('.selected').has('a[data-optgroup="' + optgroupID + '"]').removeClass('selected');

                  that.setSelected(clickedIndex, true);
                } else {
                  var maxOptionsArr = (typeof that.options.maxOptionsText === 'function') ?
                          that.options.maxOptionsText(maxOptions, maxOptionsGrp) : that.options.maxOptionsText,
                      maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
                      maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
                      $notify = $('<div class="notify"></div>');
                  // If {var} is set in array, replace it
                  /** @deprecated */
                  if (maxOptionsArr[2]) {
                    maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                    maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                  }

                  $option.prop('selected', false);

                  that.$menu.append($notify);

                  if (maxOptions && maxReached) {
                    $notify.append($('<div>' + maxTxt + '</div>'));
                    that.$element.trigger('maxReached.bs.select');
                  }

                  if (maxOptionsGrp && maxReachedGrp) {
                    $notify.append($('<div>' + maxTxtGrp + '</div>'));
                    that.$element.trigger('maxReachedGrp.bs.select');
                  }

                  setTimeout(function () {
                    that.setSelected(clickedIndex, false);
                  }, 10);

                  $notify.delay(750).fadeOut(300, function () {
                    $(this).remove();
                  });
                }
              }
            }
          }

          if (!that.multiple) {
            that.$button.focus();
          } else if (that.options.liveSearch) {
            that.$searchbox.focus();
          }

          // Trigger select 'change'
          if ((prevValue != that.$element.val() && that.multiple) || (prevIndex != that.$element.prop('selectedIndex') && !that.multiple)) {
            that.$element.change();
          }
        }
      });

      this.$menu.on('click', 'li.disabled a, .popover-title, .popover-title :not(.close)', function (e) {
        if (e.target == this) {
          e.preventDefault();
          e.stopPropagation();
          if (!that.options.liveSearch) {
            that.$button.focus();
          } else {
            that.$searchbox.focus();
          }
        }
      });

      this.$menu.on('click', 'li.divider, li.dropdown-header', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!that.options.liveSearch) {
          that.$button.focus();
        } else {
          that.$searchbox.focus();
        }
      });

      this.$menu.on('click', '.popover-title .close', function () {
        that.$button.focus();
      });

      this.$searchbox.on('click', function (e) {
        e.stopPropagation();
      });


      this.$menu.on('click', '.actions-btn', function (e) {
        if (that.options.liveSearch) {
          that.$searchbox.focus();
        } else {
          that.$button.focus();
        }

        e.preventDefault();
        e.stopPropagation();

        if ($(this).is('.bs-select-all')) {
          that.selectAll();
        } else {
          that.deselectAll();
        }
        that.$element.change();
      });

      this.$element.change(function () {
        that.render(false);
      });
    },

    liveSearchListener: function () {
      var that = this,
          no_results = $('<li class="no-results"></li>');

      this.$newElement.on('click.dropdown.data-api touchstart.dropdown.data-api', function () {
        that.$menu.find('.active').removeClass('active');
        if (!!that.$searchbox.val()) {
          that.$searchbox.val('');
          that.$lis.not('.is-hidden').removeClass('hide');
          if (!!no_results.parent().length) no_results.remove();
        }
        if (!that.multiple) that.$menu.find('.selected').addClass('active');
        setTimeout(function () {
          that.$searchbox.focus();
        }, 10);
      });

      this.$searchbox.on('click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api', function (e) {
        e.stopPropagation();
      });

      this.$searchbox.on('input propertychange', function () {
        if (that.$searchbox.val()) {

          if (that.options.searchAccentInsensitive) {
            that.$lis.not('.is-hidden').removeClass('hide').find('a').not(':aicontains(' + normalizeToBase(that.$searchbox.val()) + ')').parent().addClass('hide');
          } else {
            that.$lis.not('.is-hidden').removeClass('hide').find('a').not(':icontains(' + that.$searchbox.val() + ')').parent().addClass('hide');
          }

          if (!that.$menu.find('li').filter(':visible:not(.no-results)').length) {
            if (!!no_results.parent().length) no_results.remove();
            no_results.html(that.options.noneResultsText + ' "' + htmlEscape(that.$searchbox.val()) + '"').show();
            that.$menu.find('li').last().after(no_results);
          } else if (!!no_results.parent().length) {
            no_results.remove();
          }

        } else {
          that.$lis.not('.is-hidden').removeClass('hide');
          if (!!no_results.parent().length) no_results.remove();
        }

        that.$menu.find('li.active').removeClass('active');
        that.$menu.find('li').filter(':visible:not(.divider)').eq(0).addClass('active').find('a').focus();
        $(this).focus();
      });
    },

    val: function (value) {
      if (typeof value !== 'undefined') {
        this.$element.val(value);
        this.render();

        return this.$element;
      } else {
        return this.$element.val();
      }
    },

    selectAll: function () {
      this.findLis();
      this.$lis.not('.divider').not('.disabled').not('.selected').filter(':visible').find('a').click();
    },

    deselectAll: function () {
      this.findLis();
      this.$lis.not('.divider').not('.disabled').filter('.selected').filter(':visible').find('a').click();
    },

    keydown: function (e) {
      var $this = $(this),
          $parent = ($this.is('input')) ? $this.parent().parent() : $this.parent(),
          $items,
          that = $parent.data('this'),
          index,
          next,
          first,
          last,
          prev,
          nextPrev,
          prevIndex,
          isActive,
          keyCodeMap = {
            32: ' ',
            48: '0',
            49: '1',
            50: '2',
            51: '3',
            52: '4',
            53: '5',
            54: '6',
            55: '7',
            56: '8',
            57: '9',
            59: ';',
            65: 'a',
            66: 'b',
            67: 'c',
            68: 'd',
            69: 'e',
            70: 'f',
            71: 'g',
            72: 'h',
            73: 'i',
            74: 'j',
            75: 'k',
            76: 'l',
            77: 'm',
            78: 'n',
            79: 'o',
            80: 'p',
            81: 'q',
            82: 'r',
            83: 's',
            84: 't',
            85: 'u',
            86: 'v',
            87: 'w',
            88: 'x',
            89: 'y',
            90: 'z',
            96: '0',
            97: '1',
            98: '2',
            99: '3',
            100: '4',
            101: '5',
            102: '6',
            103: '7',
            104: '8',
            105: '9'
          };

      if (that.options.liveSearch) $parent = $this.parent().parent();

      if (that.options.container) $parent = that.$menu;

      $items = $('[role=menu] li a', $parent);

      isActive = that.$menu.parent().hasClass('open');

      if (!isActive && /([0-9]|[A-z])/.test(String.fromCharCode(e.keyCode))) {
        if (!that.options.container) {
          that.setSize();
          that.$menu.parent().addClass('open');
          isActive = true;
        } else {
          that.$newElement.trigger('click');
        }
        that.$searchbox.focus();
      }

      if (that.options.liveSearch) {
        if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && that.$menu.find('.active').length === 0) {
          e.preventDefault();
          that.$menu.parent().removeClass('open');
          that.$button.focus();
        }
        $items = $('[role=menu] li:not(.divider):not(.dropdown-header):visible', $parent);
        if (!$this.val() && !/(38|40)/.test(e.keyCode.toString(10))) {
          if ($items.filter('.active').length === 0) {
            if (that.options.searchAccentInsensitive) {
              $items = that.$newElement.find('li').filter(':aicontains(' + normalizeToBase(keyCodeMap[e.keyCode]) + ')');
            } else {
              $items = that.$newElement.find('li').filter(':icontains(' + keyCodeMap[e.keyCode] + ')');
            }
          }
        }
      }

      if (!$items.length) return;

      if (/(38|40)/.test(e.keyCode.toString(10))) {
        index = $items.index($items.filter(':focus'));
        first = $items.parent(':not(.disabled):visible').first().index();
        last = $items.parent(':not(.disabled):visible').last().index();
        next = $items.eq(index).parent().nextAll(':not(.disabled):visible').eq(0).index();
        prev = $items.eq(index).parent().prevAll(':not(.disabled):visible').eq(0).index();
        nextPrev = $items.eq(next).parent().prevAll(':not(.disabled):visible').eq(0).index();

        if (that.options.liveSearch) {
          $items.each(function (i) {
            if ($(this).is(':not(.disabled)')) {
              $(this).data('index', i);
            }
          });
          index = $items.index($items.filter('.active'));
          first = $items.filter(':not(.disabled):visible').first().data('index');
          last = $items.filter(':not(.disabled):visible').last().data('index');
          next = $items.eq(index).nextAll(':not(.disabled):visible').eq(0).data('index');
          prev = $items.eq(index).prevAll(':not(.disabled):visible').eq(0).data('index');
          nextPrev = $items.eq(next).prevAll(':not(.disabled):visible').eq(0).data('index');
        }

        prevIndex = $this.data('prevIndex');

        if (e.keyCode == 38) {
          if (that.options.liveSearch) index -= 1;
          if (index != nextPrev && index > prev) index = prev;
          if (index < first) index = first;
          if (index == prevIndex) index = last;
        }

        if (e.keyCode == 40) {
          if (that.options.liveSearch) index += 1;
          if (index == -1) index = 0;
          if (index != nextPrev && index < next) index = next;
          if (index > last) index = last;
          if (index == prevIndex) index = first;
        }

        $this.data('prevIndex', index);

        if (!that.options.liveSearch) {
          $items.eq(index).focus();
        } else {
          e.preventDefault();
          if (!$this.is('.dropdown-toggle')) {
            $items.removeClass('active');
            $items.eq(index).addClass('active').find('a').focus();
            $this.focus();
          }
        }

      } else if (!$this.is('input')) {
        var keyIndex = [],
            count,
            prevKey;

        $items.each(function () {
          if ($(this).parent().is(':not(.disabled)')) {
            if ($.trim($(this).text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode]) {
              keyIndex.push($(this).parent().index());
            }
          }
        });

        count = $(document).data('keycount');
        count++;
        $(document).data('keycount', count);

        prevKey = $.trim($(':focus').text().toLowerCase()).substring(0, 1);

        if (prevKey != keyCodeMap[e.keyCode]) {
          count = 1;
          $(document).data('keycount', count);
        } else if (count >= keyIndex.length) {
          $(document).data('keycount', 0);
          if (count > keyIndex.length) count = 1;
        }

        $items.eq(keyIndex[count - 1]).focus();
      }

      // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
      if ((/(13|32)/.test(e.keyCode.toString(10)) || (/(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab)) && isActive) {
        if (!/(32)/.test(e.keyCode.toString(10))) e.preventDefault();
        if (!that.options.liveSearch) {
          $(':focus').click();
        } else if (!/(32)/.test(e.keyCode.toString(10))) {
          that.$menu.find('.active a').click();
          $this.focus();
        }
        $(document).data('keycount', 0);
      }

      if ((/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch)) || (/(27)/.test(e.keyCode.toString(10)) && !isActive)) {
        that.$menu.parent().removeClass('open');
        that.$button.focus();
      }
    },

    mobile: function () {
      this.$element.addClass('mobile-device').appendTo(this.$newElement);
      if (this.options.container) this.$menu.hide();
    },

    refresh: function () {
      this.$lis = null;
      this.reloadLi();
      this.render();
      this.setWidth();
      this.setStyle();
      this.checkDisabled();
      this.liHeight();
    },

    update: function () {
      this.reloadLi();
      this.setWidth();
      this.setStyle();
      this.checkDisabled();
      this.liHeight();
    },

    hide: function () {
      this.$newElement.hide();
    },

    show: function () {
      this.$newElement.show();
    },

    remove: function () {
      this.$newElement.remove();
      this.$element.remove();
    }
  };

  // SELECTPICKER PLUGIN DEFINITION
  // ==============================
  function Plugin(option, event) {
    // get the args of the outer function..
    var args = arguments;
    // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
    // to get lost
    //noinspection JSDuplicatedDeclaration
    var _option = option,
        option = args[0],
        event = args[1];
    [].shift.apply(args);

    // This fixes a bug in the js implementation on android 2.3 #715
    if (typeof option == 'undefined') {
      option = _option;
    }

    var value;
    var chain = this.each(function () {
      var $this = $(this);
      if ($this.is('select')) {
        var data = $this.data('selectpicker'),
            options = typeof option == 'object' && option;

        if (!data) {
          var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
          $this.data('selectpicker', (data = new Selectpicker(this, config, event)));
        } else if (options) {
          for (var i in options) {
            if (options.hasOwnProperty(i)) {
              data.options[i] = options[i];
            }
          }
        }

        if (typeof option == 'string') {
          if (data[option] instanceof Function) {
            value = data[option].apply(data, args);
          } else {
            value = data.options[option];
          }
        }
      }
    });

    if (typeof value !== 'undefined') {
      //noinspection JSUnusedAssignment
      return value;
    } else {
      return chain;
    }
  }

  var old = $.fn.selectpicker;
  $.fn.selectpicker = Plugin;
  $.fn.selectpicker.Constructor = Selectpicker;

  // SELECTPICKER NO CONFLICT
  // ========================
  $.fn.selectpicker.noConflict = function () {
    $.fn.selectpicker = old;
    return this;
  };

  $(document)
      .data('keycount', 0)
      .on('keydown', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input', Selectpicker.prototype.keydown)
      .on('focusin.modal', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input', function (e) {
        e.stopPropagation();
      });

  // SELECTPICKER DATA-API
  // =====================
  $(window).on('load.bs.select.data-api', function () {
    $('.selectpicker').each(function () {
      var $selectpicker = $(this);
      Plugin.call($selectpicker, $selectpicker.data());
    })
  });
})(jQuery);
;
/*!
 * Simple jQuery Equal Heights
 *
 * Copyright (c) 2013 Matt Banks
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 1.5.1
 */
(function($) {

    $.fn.equalHeights = function() {
        var maxHeight = 0,
            $this = $(this);

        $this.each( function() {
            $(this).css('height','auto'); // Hack, added by Sergey Kudryashov 14.03.2016 #19335
            var height = $(this).innerHeight();
            if ( height > maxHeight ) { maxHeight = height; }
        });

        return $this.css('height', maxHeight);
    };

    // auto-initialize plugin
    $('[data-equal]').each(function(){
        var $this = $(this),
            target = $this.data('equal');
        $this.find(target).equalHeights();
    });

})(jQuery);;
/*
 *  Project: prettyCheckable
 *  Description: jQuery plugin to replace checkboxes and radios for custom images
 *  Author: Arthur Gouveia
 *  License: Licensed under the MIT License
 */
/* global jQuery:true, ko:true */
;(function ( $, window, document, undefined ) {
    'use strict';

    var pluginName = 'prettyCheckable',
        dataPlugin = 'plugin_' + pluginName,
        defaults = {
            label: '',
            labelPosition: 'right',
            customClass: '',
            color: 'blue'
        };

    var addCheckableEvents = function (element) {

        if (window.ko) {

            $(element).on('change', function(e) {

                e.preventDefault();

                //only changes from knockout model
                if (e.originalEvent === undefined) {

                    var clickedParent = $(this).closest('.clearfix'),
                        fakeCheckable = $(clickedParent).find('a:first'),
                        isChecked = fakeCheckable.hasClass('checked');

                    if (isChecked === true) {

                        fakeCheckable.addClass('checked');

                    } else {

                        fakeCheckable.removeClass('checked');

                    }

                }

            });

        }

        element.find('a:first, label').on('touchstart click', function(e){

            e.preventDefault();

            var clickedParent = $(this).closest('.clearfix'),
                input = clickedParent.find('input'),
                fakeCheckable = clickedParent.find('a:first');

            if (fakeCheckable.hasClass('disabled') === true) {

                return;

            }

            if (input.prop('type') === 'radio') {

                $('input[name="' + input.attr('name') + '"]').each(function(index, el){

                    $(el).prop('checked', false).parent().find('a:first').removeClass('checked');

                });

            }

            if (window.ko) {

                ko.utils.triggerEvent(input[0], 'click');

            } else {

                if (input.prop('checked')) {

                    input.prop('checked', false).change();

                } else {

                    input.prop('checked', true).change();

                }

            }

            fakeCheckable.toggleClass('checked');

        });

        element.find('a:first').on('keyup', function(e){

            if (e.keyCode === 32) {

                $(this).click();

            }

        });

    };

    var Plugin = function ( element ) {
        this.element = element;
        this.options = $.extend( {}, defaults );
    };

    Plugin.prototype = {

        init: function ( options ) {

            $.extend( this.options, options );

            var el = $(this.element);

            el.parent().addClass('has-pretty-child');

            el.css('display', 'none');

            var classType = el.data('type') !== undefined ? el.data('type') : el.attr('type');

            var label = null,
                elLabelId = el.attr('id');

            if (elLabelId !== undefined) {

                var elLabel = $('label[for=' + elLabelId + ']');

                if (elLabel.length > 0) {

                    label = elLabel.text();

                    elLabel.remove();

                }

            }

            if (this.options.label === '') {

                this.options.label = label;

            }

            label = el.data('label') !== undefined ? el.data('label') : this.options.label;

            var labelPosition = el.data('labelposition') !== undefined ? 'label' + el.data('labelposition') : 'label' + this.options.labelPosition;

            var customClass = el.data('customclass') !== undefined ? el.data('customclass') : this.options.customClass;

            var color =  el.data('color') !== undefined ? el.data('color') : this.options.color;

            var disabled = el.prop('disabled') === true ? 'disabled' : '';

            var containerClasses = ['pretty' + classType, labelPosition, customClass, color].join(' ');

            el.wrap('<div class="clearfix ' + containerClasses + '"></div>').parent().html();

            var dom = [];
            var isChecked = el.prop('checked') ? 'checked' : '';

            if (labelPosition === 'labelright') {

                dom.push('<a href="#" class="' + isChecked + ' ' + disabled + '"></a>');
                dom.push('<label for="' + el.attr('id') + '">' + label + '</label>');

            } else {

                dom.push('<label for="' + el.attr('id') + '">' + label + '</label>');
                dom.push('<a href="#" class="' + isChecked + ' ' + disabled + '"></a>');

            }

            el.parent().append(dom.join('\n'));
            addCheckableEvents(el.parent());

        },

        check: function () {

            if ($(this.element).prop('type') === 'radio') {

                $('input[name="' + $(this.element).attr('name') + '"]').each(function(index, el){

                    $(el).prop('checked', false).attr('checked', false).parent().find('a:first').removeClass('checked');

                });

            }

            $(this.element).prop('checked', true).attr('checked', true).parent().find('a:first').addClass('checked');

        },

        uncheck: function () {

            $(this.element).prop('checked', false).attr('checked', false).parent().find('a:first').removeClass('checked');

        },

        enable: function () {

            $(this.element).removeAttr('disabled').parent().find('a:first').removeClass('disabled');

        },

        disable: function () {

            $(this.element).attr('disabled', 'disabled').parent().find('a:first').addClass('disabled');

        },

        destroy: function () {

            var el = $(this.element),
                clonedEl = el.clone(),
                label = null,
                elLabelId = el.attr('id');

            if (elLabelId !== undefined) {

                var elLabel = $('label[for=' + elLabelId + ']');

                if (elLabel.length > 0) {

                    elLabel.insertBefore(el.parent());

                }

            }

            clonedEl.removeAttr('style').insertAfter(elLabel);

            el.parent().remove();

        }

    };

    $.fn[ pluginName ] = function ( arg ) {

        var args, instance;

        if (!( this.data( dataPlugin ) instanceof Plugin )) {

            this.data( dataPlugin, new Plugin( this ) );

        }

        instance = this.data( dataPlugin );

        instance.element = this;

        if (typeof arg === 'undefined' || typeof arg === 'object') {

            if ( typeof instance.init === 'function' ) {
                instance.init( arg );
            }

        } else if ( typeof arg === 'string' && typeof instance[arg] === 'function' ) {

            args = Array.prototype.slice.call( arguments, 1 );

            return instance[arg].apply( instance, args );

        } else {

            $.error('Method ' + arg + ' does not exist on jQuery.' + pluginName);

        }
    };

}(jQuery, window, document));;
/*!
 * jQuery.scrollTo
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @projectDescription Easy element scrolling using jQuery.
 * @author Ariel Flesler
 * @version 1.4.13
 */
;(function (define) {
	'use strict';

	define(['jquery'], function ($) {

		var $scrollTo = $.scrollTo = function( target, duration, settings ) {
			return $(window).scrollTo( target, duration, settings );
		};

		$scrollTo.defaults = {
			axis:'xy',
			duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
			limit:true
		};

		// Returns the element that needs to be animated to scroll the window.
		// Kept for backwards compatibility (specially for localScroll & serialScroll)
		$scrollTo.window = function( scope ) {
			return $(window)._scrollable();
		};

		// Hack, hack, hack :)
		// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
		$.fn._scrollable = function() {
			return this.map(function() {
				var elem = this,
					isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

					if (!isWin)
						return elem;

				var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;

				return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
					doc.body :
					doc.documentElement;
			});
		};

		$.fn.scrollTo = function( target, duration, settings ) {
			if (typeof duration == 'object') {
				settings = duration;
				duration = 0;
			}
			if (typeof settings == 'function')
				settings = { onAfter:settings };

			if (target == 'max')
				target = 9e9;

			settings = $.extend( {}, $scrollTo.defaults, settings );
			// Speed is still recognized for backwards compatibility
			duration = duration || settings.duration;
			// Make sure the settings are given right
			settings.queue = settings.queue && settings.axis.length > 1;

			if (settings.queue)
				// Let's keep the overall duration
				duration /= 2;
			settings.offset = both( settings.offset );
			settings.over = both( settings.over );

			return this._scrollable().each(function() {
				// Null target yields nothing, just like jQuery does
				if (target == null) return;

				var elem = this,
					$elem = $(elem),
					targ = target, toff, attr = {},
					win = $elem.is('html,body');

				switch (typeof targ) {
					// A number will pass the regex
					case 'number':
					case 'string':
						if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
							targ = both( targ );
							// We are done
							break;
						}
						// Relative/Absolute selector, no break!
						targ = win ? $(targ) : $(targ, this);
						if (!targ.length) return;
					case 'object':
						// DOMElement / jQuery
						if (targ.is || targ.style)
							// Get the real position of the target
							toff = (targ = $(targ)).offset();
				}

				var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;

				$.each( settings.axis.split(''), function( i, axis ) {
					var Pos	= axis == 'x' ? 'Left' : 'Top',
						pos = Pos.toLowerCase(),
						key = 'scroll' + Pos,
						old = elem[key],
						max = $scrollTo.max(elem, axis);

					if (toff) {// jQuery / DOMElement
						attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

						// If it's a dom element, reduce the margin
						if (settings.margin) {
							attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
							attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
						}

						attr[key] += offset[pos] || 0;

						if(settings.over[pos])
							// Scroll to a fraction of its width/height
							attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
					} else {
						var val = targ[pos];
						// Handle percentage values
						attr[key] = val.slice && val.slice(-1) == '%' ?
							parseFloat(val) / 100 * max
							: val;
					}

					// Number or 'number'
					if (settings.limit && /^\d+$/.test(attr[key]))
						// Check the limits
						attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

					// Queueing axes
					if (!i && settings.queue) {
						// Don't waste time animating, if there's no need.
						if (old != attr[key])
							// Intermediate animation
							animate( settings.onAfterFirst );
						// Don't animate this axis again in the next iteration.
						delete attr[key];
					}
				});

				animate( settings.onAfter );

				function animate( callback ) {
					$elem.animate( attr, duration, settings.easing, callback && function() {
						callback.call(this, targ, settings);
					});
				}
			}).end();
		};

		// Max scrolling position, works on quirks mode
		// It only fails (not too badly) on IE, quirks mode.
		$scrollTo.max = function( elem, axis ) {
			var Dim = axis == 'x' ? 'Width' : 'Height',
				scroll = 'scroll'+Dim;

			if (!$(elem).is('html,body'))
				return elem[scroll] - $(elem)[Dim.toLowerCase()]();

			var size = 'client' + Dim,
				html = elem.ownerDocument.documentElement,
				body = elem.ownerDocument.body;

			return Math.max( html[scroll], body[scroll] ) - Math.min( html[size]  , body[size]   );
		};

		function both( val ) {
			return $.isFunction(val) || typeof val == 'object' ? val : { top:val, left:val };
		}

		// AMD requirement
		return $scrollTo;
	})
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
	if (typeof module !== 'undefined' && module.exports) {
		// Node
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}));
;
(function($){

// https://github.com/hongymagic/jQuery.serializeObject
$.fn.serializeObject = function () {
  "use strict";
  var a = {}, b = function (b, c) {
      var d = a[c.name];
      "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
  };
  return $.each(this.serializeArray(), b), a
};


})(jQuery);
(function($){

$.extend({

    utils: {

        /**
         * Wrapper for the jQuery.ajax function
         * @param url Target URL
         * @param data POST data
         * @param success Function to be called on success
         * @param error Function to be called on error
         */

        ajax: function( url, data, success, error )
        {

            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function( event ) {
                    if( typeof success == 'function' )
                        success( event );
                },
                error: function ( event ) {
                    if( typeof error == 'function' )
                        error( event );
                }
            });

        },


        /**
         * Append the form data from the current step to the right column, located
         * in the last step (#continue_reg - /registration/regtpl_cy).
         * Used at the end of the first and second step of the registration process
         */

        add_right_column_params: function( data )
        {
            var value;

            for ( var id in data ) {

                value = data[id];

                if( id == 'residence_country' ) {
                    value = $.utils.get_country_name_by_id( value );
                }

                if( $( '#text_' + id ).size() > 0 )
                    $( '#text_' + id ).html( value ).parent().show();

                if( $( '#right_' + id ).size() > 0 )
                    $( '#right_' + id ).val( value );

            }

        },

        /**
         * Add an option to a select
         * @return void
         */

        add_option: function( value, name, target )
        {
            target.append( '<option value="' + value + '">' + name + '</option>' );
        },

        /**
         * Check if a date is valid
         * @param day
         * @param month
         * @param year
         * @return boolean
         */

        is_valid_date: function( day, month, year )
        {
            var date = new Date( year, month, day );
            return date.getDate() === day && date.getMonth() === month && date.getFullYear() === year;
        },

        /**
         * Get the reg-type on the registration page
         * @return string
         */

        get_registration_type: function(){

            var a = location.href.match( /\?.*reg-type=([^&]*)/ );
            if ( a && a.length == 2 )
                return a[1];
            return '';
        },

		// returns cookieswith name or undefined
		getCookie: function(name) {
		  var matches = document.cookie.match(new RegExp(
		    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		  ));
		  return matches ? decodeURIComponent(matches[1]) : undefined;
		},

		// set cookie with name and value
		// options - cookies object (expires, path, domain, secure)
		setCookie: function(name, value, options) {
		  options = options || {};

		  var expires = options.expires;

		  if (typeof expires == "number" && expires) {
		    var d = new Date();
		    d.setTime(d.getTime() + expires*1000);
		    expires = options.expires = d;
		  }
		  if (expires && expires.toUTCString) { 
		  	options.expires = expires.toUTCString();
		  }

		  value = encodeURIComponent(value);

		  var updatedCookie = name + "=" + value;

		  for(var propName in options) {
		    updatedCookie += "; " + propName;
		    var propValue = options[propName];    
		    if (propValue !== true) { 
		      updatedCookie += "=" + propValue;
		     }
		  }

		  document.cookie = updatedCookie;
		},

		// delete cookie name
		deleteCookie: function(name) {
		  setCookie(name, "", { expires: -1 })
		},

		serializeForm: function(f){
			/* Get input values from form */
    		values = f.serializeArray();

		    /* Because serializeArray() ignores unset checkboxes and radio buttons: */
		    values = values.concat(
		            f.find('input[type=checkbox]:not(:checked)').map(
		                    function() {
		                        return {"name": this.name, "value": this.value}
		                    }).get()
		    );
		},

		setAuthCookie: function(sid){

			$.utils.setCookie( 'sid', sid, {path: '/', domain: SITE.cdom/*, expires: 60*60*/ } );

		},


		/*isValidURL: function (str) {
		  var pattern = new RegExp('^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$','i');
		  if(!pattern.test(str)) {
		    return false;
		  } else {
		    return true;
		  }
		},*/


	  /**
		* Parse Url
		* @return array(String: path (without right slash), Object: params)
		*         of false
		**/
		parseUrl: function(url){
			try {
				if(!url){
					throw 'No url';
					return false;
				}

	        	// Split url to path and params
	        	var u = url.split('?');

	        	// Trim last slash
	        	var path = u[0].replace(/^\/|\/$/g, '');

	        	// params
	        	var p = (u[1]) ? u[1].split('&') : [];
	        	var params = {};
	        	_.each(p,function(v){

	        		var x = v.split('=');
	        		params[x[0]] = x[1];
	        	});
	        	

	        	return [path, params];
	        }
	        catch(err){
	        	console.log(err);
	        }

		},


		trim: function(str, symbol, direction){

			var str = str || '',
				symbol = symbol || '/', // TODO. Now works only slash (/)
				direction = direction || 'both'; // TODO. Now works only both

			return str.replace(/^\/|\/$/g, '');

		}

    }

});


})(jQuery);
(function($, Backbone){

	/**
	* Buttons with class .btn-switcher will be switch by click in one div container. The active one is not working.
	* @author: Sergey Kudryashov
	*/

	var DataTableView = Backbone.Ribs.View.extend({

		initialize: function(){

			this.btns = this.$el.find('.btn-switcher');

		},

		events: {

			'click a.btn-switcher': function(e){
				e.preventDefault();
				
				if( $(e.target).hasClass('active') ) return false;
 
				this.btns.removeClass('active');
				$(e.target).addClass('active');
			}

		}

	});
	
	$(function(){

		$('.btn-switcher').parent('div').each(function(){
			new DataTableView({el: $(this)});
		});

	})

})(jQuery, Backbone);;
/**
*
* Adding and removing tags programmatically
* Based on jQuery, underscore, backbone, backbone.Ribs
* @Sergey Kudryashov
*
**/

(function ($, Backbone, window) {

	var Tag = Backbone.Model.extend({
            defaults: {
                id: '',
                text: ''
            }

        }),

        Tags = Backbone.Collection.extend({
            model: Tag
        }),

        TagView = Backbone.Ribs.View.extend({
            tagName: 'span',
            className    : 'badge tag badge-yellow',
            id: function(){
            	return  this.model.id
            },
            initialize: function(){
            	this.$el.html(this.model.get('text'));
            }
        });
  

	window.TagsView = Backbone.Ribs.View.extend({


		bindings: {
            '.tag-line': {
                collection: {
                    col: 'tags',
                    view: 'tagView'
                }
            }
        },
        tagView: TagView,


		initialize: function () {

			var self = this;

			this.tagLine = this.$el.find('.tag-line');

			this.tags = new Tags();

			this.$el.find('input:checkbox').each(function(){

				self.toggleTag($(this));

			});
	
		},

		events: {

			'click .tag': function(e){
				
				e.preventDefault();	
				this.removeTag($(e.currentTarget).attr('id'));
			},

			'change input:checkbox': function(e){
				
				e.preventDefault();	
				this.toggleTag($(e.currentTarget));
			},

			'change .tags-list': function(e){

				e.preventDefault();	
				this.addTag($(e.currentTarget).val(), $(e.currentTarget).val());
			}

		},

		toggleTag: function(el){

			if(el.is(':checked')){
				this.addTag(el.attr('name'),  el.siblings('label').html());
			}else{
				this.removeTag(el.attr('name'));
			}

		},

		addTag: function(id, text){

			this.tags.add( new Tag({id: id, text: text}));

			var chk = this.$el.find(':checkbox[name='+id+']');

			if(chk.length && !chk.is(':checked')) this.$el.find(':checkbox[name='+id+']').prettyCheckable('check');

			var sbx = this.$el.find('.tags-list').first();
			sbx.find('option:selected').attr('disabled',true);

			sbx.val('').selectpicker('refresh');

		},

		removeTag: function(id){

			this.tags.remove(this.tags.get(id));
			var chk = this.$el.find(':checkbox[name='+id+']');
			if(chk.is(':checked')) this.$el.find(':checkbox[name='+id+']').prettyCheckable('uncheck');
			var sbx = this.$el.find('.tags-list').first();
			sbx.find('option[value='+id+']').attr('disabled',false);

			sbx.selectpicker('refresh');

		}

	});

})(window.jQuery, Backbone, window);
;
(function($,Backbone, window){

	/**
	* Custom modal block builder
	* Can work with cookie, can be not opened if your_cookie=false
	* Don't use fade background
	*
	* Api parameters:
	*
	* cookie: name of cookie or false
	* cookieLife, sec, number
	* sendCookieInt, sec, number
	* afterOpen, function
	* afterClose, function
	* delay, sec, number
	* animation: 'fade' or false
	*
	* Based on jQuery, Underscore, Backbone
	* @author: Sergey Kudryashov
	*/
	window.CustomModal = Backbone.View.extend({

		status: true,
		cookieLife: 20,
		sendCookieInt: 10,
		delay: 0,
		animation: false,

		apiParameters: ['cookieLife','sendCookieInt', 'afterOpen', 'afterClose', 'delay', 'animation'],

		initialize: function(options){

			_.each(options, function(v,k){

				if(_.contains(this.apiParameters, k)) this[k] = v;

			},this);
			// console.log('Initialize with '+options.cookie);
			if(options.cookie)
				this.openWithCookie(options.cookie);
			else
				this.open(this.delay);

		},
		
		openWithCookie: function(c){

			this.cookieName = c;
			var cook = $.utils.getCookie(this.cookieName);
//-------------------------------------------------------------
//Never ever use switch for boolean, I can bite
			// switch(cook){
	        //   case false:
	        //     this.status = false;
	        //     break;
	        //   case undefined:
	        //   case true:
	        //   default:
	        //     this.status = true;
	        //     break;
	        // }
//-------------------------------------------------------------
			if(cook === undefined) cook = true;
			this.status = cook;
            // console.log('Nedded cookie for '+this.cookieName);
            // console.log("Cooke is "+cook);
            // console.log("Status after cookie get is "+this.status);
            this.sendCookie();
    		// this.counter();
            // console.log('Type of '+ typeof this.status);
    		if(this.status === 'true' || this.status === true) {
                // console.log('I am opening but why ???');
    			this.open(this.delay);
            }
			else { this.close({tempo:500, delay:0}); return this; }
		},

		events: {

		  'click .close': 'close',
		  'click .ok-btn': 'close'

		},

		open: function(delay){

			var self = this,
				delay = delay || 0;

			setTimeout(function() {

				switch(self.animation){
					case 'fade':
						var method = 'fadeIn';
						break;
					case 'slide':
						var method = 'slideDown';
						break;
					default:
						var method = 'show';
				}
				self.$el[method]();
				self.afterOpen();

			}, delay*1000);
	      
		},

		afterOpen: function(){},

		close: function(o){
            // console.log('I am a closing event');
			o.tempo = o.tempo || 500;
			o.delay = o.delay || 0;

			var self = this;
			this.status = false;
			this.sendCookie();
			// console.log('Self is ',self);
			setTimeout(function() {

				self.$el.fadeOut(o.tempo);
				self.afterClose();

			}, o.delay*1000);

		},
		afterClose: function(){},

		sendCookie: function(){
            // console.log("status of event is "+ this.status + "for "+this.cookieName);
			var now = new Date();
			var time = now.getTime();
			time += this.cookieLife * 1000;
			now.setTime(time);
            // console.log("Cookie is " + this.cookieName + " equals " + $.utils.getCookie(this.cookieName));
			$.utils.setCookie(this.cookieName, this.status, {expires: now.toUTCString(), path:'/'});
            try{
            	document.cookie = this.cookieName + "="+this.status+"; path=/";
            }catch(e){
            	alert(e);
			}
            return this;
		},
//---------------------------------------
//what for ?
		counter: function(){

			var self = this;
			setTimeout(function() {
			    self.sendCookie();
			    self.counter();
			}, self.sendCookieInt*1000);

		}
//----------------------------------------
	});

})(jQuery,Backbone, window);;
/*! noUiSlider - 7.0.10 - 2014-12-27 14:50:47 */

!function(a){"use strict";function b(a,b){return Math.round(a/b)*b}function c(a){return"number"==typeof a&&!isNaN(a)&&isFinite(a)}function d(a){var b=Math.pow(10,7);return Number((Math.round(a*b)/b).toFixed(7))}function e(a,b,c){a.addClass(b),setTimeout(function(){a.removeClass(b)},c)}function f(a){return Math.max(Math.min(a,100),0)}function g(b){return a.isArray(b)?b:[b]}function h(a){var b=a.split(".");return b.length>1?b[1].length:0}function i(a,b){return 100/(b-a)}function j(a,b){return 100*b/(a[1]-a[0])}function k(a,b){return j(a,a[0]<0?b+Math.abs(a[0]):b-a[0])}function l(a,b){return b*(a[1]-a[0])/100+a[0]}function m(a,b){for(var c=1;a>=b[c];)c+=1;return c}function n(a,b,c){if(c>=a.slice(-1)[0])return 100;var d,e,f,g,h=m(c,a);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],f+k([d,e],c)/i(f,g)}function o(a,b,c){if(c>=100)return a.slice(-1)[0];var d,e,f,g,h=m(c,b);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],l([d,e],(c-f)*i(f,g))}function p(a,c,d,e){if(100===e)return e;var f,g,h=m(e,a);return d?(f=a[h-1],g=a[h],e-f>(g-f)/2?g:f):c[h-1]?a[h-1]+b(e-a[h-1],c[h-1]):e}function q(a,b,d){var e;if("number"==typeof b&&(b=[b]),"[object Array]"!==Object.prototype.toString.call(b))throw new Error("noUiSlider: 'range' contains invalid value.");if(e="min"===a?0:"max"===a?100:parseFloat(a),!c(e)||!c(b[0]))throw new Error("noUiSlider: 'range' value isn't numeric.");d.xPct.push(e),d.xVal.push(b[0]),e?d.xSteps.push(isNaN(b[1])?!1:b[1]):isNaN(b[1])||(d.xSteps[0]=b[1])}function r(a,b,c){return b?void(c.xSteps[a]=j([c.xVal[a],c.xVal[a+1]],b)/i(c.xPct[a],c.xPct[a+1])):!0}function s(a,b,c,d){this.xPct=[],this.xVal=[],this.xSteps=[d||!1],this.xNumSteps=[!1],this.snap=b,this.direction=c;var e,f=[];for(e in a)a.hasOwnProperty(e)&&f.push([a[e],e]);for(f.sort(function(a,b){return a[0]-b[0]}),e=0;e<f.length;e++)q(f[e][1],f[e][0],this);for(this.xNumSteps=this.xSteps.slice(0),e=0;e<this.xNumSteps.length;e++)r(e,this.xNumSteps[e],this)}function t(a,b){if(!c(b))throw new Error("noUiSlider: 'step' is not numeric.");a.singleStep=b}function u(b,c){if("object"!=typeof c||a.isArray(c))throw new Error("noUiSlider: 'range' is not an object.");if(void 0===c.min||void 0===c.max)throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");b.spectrum=new s(c,b.snap,b.dir,b.singleStep)}function v(b,c){if(c=g(c),!a.isArray(c)||!c.length||c.length>2)throw new Error("noUiSlider: 'start' option is incorrect.");b.handles=c.length,b.start=c}function w(a,b){if(a.snap=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'snap' option must be a boolean.")}function x(a,b){if(a.animate=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'animate' option must be a boolean.")}function y(a,b){if("lower"===b&&1===a.handles)a.connect=1;else if("upper"===b&&1===a.handles)a.connect=2;else if(b===!0&&2===a.handles)a.connect=3;else{if(b!==!1)throw new Error("noUiSlider: 'connect' option doesn't match handle count.");a.connect=0}}function z(a,b){switch(b){case"horizontal":a.ort=0;break;case"vertical":a.ort=1;break;default:throw new Error("noUiSlider: 'orientation' option is invalid.")}}function A(a,b){if(!c(b))throw new Error("noUiSlider: 'margin' option must be numeric.");if(a.margin=a.spectrum.getMargin(b),!a.margin)throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")}function B(a,b){if(!c(b))throw new Error("noUiSlider: 'limit' option must be numeric.");if(a.limit=a.spectrum.getMargin(b),!a.limit)throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.")}function C(a,b){switch(b){case"ltr":a.dir=0;break;case"rtl":a.dir=1,a.connect=[0,2,1,3][a.connect];break;default:throw new Error("noUiSlider: 'direction' option was not recognized.")}}function D(a,b){if("string"!=typeof b)throw new Error("noUiSlider: 'behaviour' must be a string containing options.");var c=b.indexOf("tap")>=0,d=b.indexOf("drag")>=0,e=b.indexOf("fixed")>=0,f=b.indexOf("snap")>=0;a.events={tap:c||f,drag:d,fixed:e,snap:f}}function E(a,b){if(a.format=b,"function"==typeof b.to&&"function"==typeof b.from)return!0;throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")}function F(b){var c,d={margin:0,limit:0,animate:!0,format:V};return c={step:{r:!1,t:t},start:{r:!0,t:v},connect:{r:!0,t:y},direction:{r:!0,t:C},snap:{r:!1,t:w},animate:{r:!1,t:x},range:{r:!0,t:u},orientation:{r:!1,t:z},margin:{r:!1,t:A},limit:{r:!1,t:B},behaviour:{r:!0,t:D},format:{r:!1,t:E}},b=a.extend({connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal"},b),a.each(c,function(a,c){if(void 0===b[a]){if(c.r)throw new Error("noUiSlider: '"+a+"' is required.");return!0}c.t(d,b[a])}),d.style=d.ort?"top":"left",d}function G(a,b,c){var d=a+b[0],e=a+b[1];return c?(0>d&&(e+=Math.abs(d)),e>100&&(d-=e-100),[f(d),f(e)]):[d,e]}function H(a){a.preventDefault();var b,c,d=0===a.type.indexOf("touch"),e=0===a.type.indexOf("mouse"),f=0===a.type.indexOf("pointer"),g=a;return 0===a.type.indexOf("MSPointer")&&(f=!0),a.originalEvent&&(a=a.originalEvent),d&&(b=a.changedTouches[0].pageX,c=a.changedTouches[0].pageY),(e||f)&&(f||void 0!==window.pageXOffset||(window.pageXOffset=document.documentElement.scrollLeft,window.pageYOffset=document.documentElement.scrollTop),b=a.clientX+window.pageXOffset,c=a.clientY+window.pageYOffset),g.points=[b,c],g.cursor=e,g}function I(b,c){var d=a("<div><div/></div>").addClass(U[2]),e=["-lower","-upper"];return b&&e.reverse(),d.children().addClass(U[3]+" "+U[3]+e[c]),d}function J(a,b,c){switch(a){case 1:b.addClass(U[7]),c[0].addClass(U[6]);break;case 3:c[1].addClass(U[6]);case 2:c[0].addClass(U[7]);case 0:b.addClass(U[6])}}function K(a,b,c){var d,e=[];for(d=0;a>d;d+=1)e.push(I(b,d).appendTo(c));return e}function L(b,c,d){return d.addClass([U[0],U[8+b],U[4+c]].join(" ")),a("<div/>").appendTo(d).addClass(U[1])}function M(b,c,d){function i(){return C[["width","height"][c.ort]]()}function j(a){var b,c=[E.val()];for(b=0;b<a.length;b+=1)E.trigger(a[b],c)}function k(a){return 1===a.length?a[0]:c.dir?a.reverse():a}function l(a){return function(b,c){E.val([a?null:c,a?c:null],!0)}}function m(b){var c=a.inArray(b,N);E[0].linkAPI&&E[0].linkAPI[b]&&E[0].linkAPI[b].change(M[c],D[c].children(),E)}function n(b,d){var e=a.inArray(b,N);return d&&d.appendTo(D[e].children()),c.dir&&c.handles>1&&(e=1===e?0:1),l(e)}function o(){var a,b;for(a=0;a<N.length;a+=1)this.linkAPI&&this.linkAPI[b=N[a]]&&this.linkAPI[b].reconfirm(b)}function p(a,b,d,e){return a=a.replace(/\s/g,S+" ")+S,b.on(a,function(a){return E.attr("disabled")?!1:E.hasClass(U[14])?!1:(a=H(a),a.calcPoint=a.points[c.ort],void d(a,e))})}function q(a,b){var c,d=b.handles||D,e=!1,f=100*(a.calcPoint-b.start)/i(),g=d[0][0]!==D[0][0]?1:0;c=G(f,b.positions,d.length>1),e=v(d[0],c[g],1===d.length),d.length>1&&(e=v(d[1],c[g?0:1],!1)||e),e&&j(["slide"])}function r(b){a("."+U[15]).removeClass(U[15]),b.cursor&&a("body").css("cursor","").off(S),Q.off(S),E.removeClass(U[12]),j(["set","change"])}function s(b,c){1===c.handles.length&&c.handles[0].children().addClass(U[15]),b.stopPropagation(),p(T.move,Q,q,{start:b.calcPoint,handles:c.handles,positions:[F[0],F[D.length-1]]}),p(T.end,Q,r,null),b.cursor&&(a("body").css("cursor",a(b.target).css("cursor")),D.length>1&&E.addClass(U[12]),a("body").on("selectstart"+S,!1))}function t(b){var d,f=b.calcPoint,g=0;b.stopPropagation(),a.each(D,function(){g+=this.offset()[c.style]}),g=g/2>f||1===D.length?0:1,f-=C.offset()[c.style],d=100*f/i(),c.events.snap||e(E,U[14],300),v(D[g],d),j(["slide","set","change"]),c.events.snap&&s(b,{handles:[D[g]]})}function u(a){var b,c;if(!a.fixed)for(b=0;b<D.length;b+=1)p(T.start,D[b].children(),s,{handles:[D[b]]});a.tap&&p(T.start,C,t,{handles:D}),a.drag&&(c=C.find("."+U[7]).addClass(U[10]),a.fixed&&(c=c.add(C.children().not(c).children())),p(T.start,c,s,{handles:D}))}function v(a,b,d){var e=a[0]!==D[0][0]?1:0,g=F[0]+c.margin,h=F[1]-c.margin,i=F[0]+c.limit,j=F[1]-c.limit;return D.length>1&&(b=e?Math.max(b,g):Math.min(b,h)),d!==!1&&c.limit&&D.length>1&&(b=e?Math.min(b,i):Math.max(b,j)),b=I.getStep(b),b=f(parseFloat(b.toFixed(7))),b===F[e]?!1:(a.css(c.style,b+"%"),a.is(":first-child")&&a.toggleClass(U[17],b>50),F[e]=b,M[e]=I.fromStepping(b),m(N[e]),!0)}function w(a,b){var d,e,f;for(c.limit&&(a+=1),d=0;a>d;d+=1)e=d%2,f=b[e],null!==f&&f!==!1&&("number"==typeof f&&(f=String(f)),f=c.format.from(f),(f===!1||isNaN(f)||v(D[e],I.toStepping(f),d===3-c.dir)===!1)&&m(N[e]))}function x(a){if(E[0].LinkIsEmitting)return this;var b,d=g(a);return c.dir&&c.handles>1&&d.reverse(),c.animate&&-1!==F[0]&&e(E,U[14],300),b=D.length>1?3:1,1===d.length&&(b=1),w(b,d),j(["set"]),this}function y(){var a,b=[];for(a=0;a<c.handles;a+=1)b[a]=c.format.to(M[a]);return k(b)}function z(){return a(this).off(S).removeClass(U.join(" ")).empty(),delete this.LinkUpdate,delete this.LinkConfirm,delete this.LinkDefaultFormatter,delete this.LinkDefaultFlag,delete this.reappend,delete this.vGet,delete this.vSet,delete this.getCurrentStep,delete this.getInfo,delete this.destroy,d}function A(){var b=a.map(F,function(a,b){var c=I.getApplicableStep(a),d=h(String(c[2])),e=M[b],f=100===a?null:c[2],g=Number((e-c[2]).toFixed(d)),i=0===a?null:g>=c[1]?c[2]:c[0]||!1;return[[i,f]]});return k(b)}function B(){return d}var C,D,E=a(b),F=[-1,-1],I=c.spectrum,M=[],N=["lower","upper"].slice(0,c.handles);if(c.dir&&N.reverse(),b.LinkUpdate=m,b.LinkConfirm=n,b.LinkDefaultFormatter=c.format,b.LinkDefaultFlag="lower",b.reappend=o,E.hasClass(U[0]))throw new Error("Slider was already initialized.");C=L(c.dir,c.ort,E),D=K(c.handles,c.dir,C),J(c.connect,E,D),u(c.events),b.vSet=x,b.vGet=y,b.destroy=z,b.getCurrentStep=A,b.getOriginalOptions=B,b.getInfo=function(){return[I,c.style,c.ort]},E.val(c.start)}function N(a){var b=F(a,this);return this.each(function(){M(this,b,a)})}function O(b){return this.each(function(){if(!this.destroy)return void a(this).noUiSlider(b);var c=a(this).val(),d=this.destroy(),e=a.extend({},d,b);a(this).noUiSlider(e),this.reappend(),d.start===e.start&&a(this).val(c)})}function P(){return this[0][arguments.length?"vSet":"vGet"].apply(this[0],arguments)}var Q=a(document),R=a.fn.val,S=".nui",T=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},U=["noUi-target","noUi-base","noUi-origin","noUi-handle","noUi-horizontal","noUi-vertical","noUi-background","noUi-connect","noUi-ltr","noUi-rtl","noUi-dragable","","noUi-state-drag","","noUi-state-tap","noUi-active","","noUi-stacking"];s.prototype.getMargin=function(a){return 2===this.xPct.length?j(this.xVal,a):!1},s.prototype.toStepping=function(a){return a=n(this.xVal,this.xPct,a),this.direction&&(a=100-a),a},s.prototype.fromStepping=function(a){return this.direction&&(a=100-a),d(o(this.xVal,this.xPct,a))},s.prototype.getStep=function(a){return this.direction&&(a=100-a),a=p(this.xPct,this.xSteps,this.snap,a),this.direction&&(a=100-a),a},s.prototype.getApplicableStep=function(a){var b=m(a,this.xPct),c=100===a?2:1;return[this.xNumSteps[b-2],this.xVal[b-c],this.xNumSteps[b-c]]},s.prototype.convert=function(a){return this.getStep(this.toStepping(a))};var V={to:function(a){return a.toFixed(2)},from:Number};a.fn.val=function(b){function c(a){return a.hasClass(U[0])?P:R}if(!arguments.length){var d=a(this[0]);return c(d).call(d)}var e=a.isFunction(b);return this.each(function(d){var f=b,g=a(this);e&&(f=b.call(this,d,g.val())),c(g).call(g,f)})},a.fn.noUiSlider=function(a,b){switch(a){case"step":return this[0].getCurrentStep();case"options":return this[0].getOriginalOptions()}return(b?O:N).call(this,a)}}(window.jQuery||window.Zepto);;
/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isLowIE=b.isIE8=document.all&&!document.addEventListener,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",c.mainEl&&c.mainEl.length?b.ev=c.mainEl.eq(0):b.ev=d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b.st.autoFocusLast&&b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),f?b.currTemplate[d]=a(f):b.currTemplate[d]=!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(c,d){if(void 0===d||d===!1)return!0;if(e=c.split("_"),e.length>1){var f=b.find(p+"-"+e[0]);if(f.length>0){var g=e[1];"replaceWith"===g?f[0]!==d[0]&&f.replaceWith(d):"img"===g?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(p+"-"+c).html(d)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery";return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s);e.click(function(){b.prev()}),f.click(function(){b.next()}),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),A()});;
(function ($, SITE) {
    $(function() {

        var zopim_chat_link = 'javascript:void($zopim.livechat.window.openPopout())';

        window.openHookedChat = function(){

        };

        var live_help = SITE.live_help;

        $('body').prepend(
            '<div class="live-chat-main-container">' +
                '<div class="proactive-chat-container">' +
                    '<img src="/sites/all/themes/fxtm/i/proactive-chat-img.png">' +
                    '<h3 class="color-orange mb30">'+Drupal.t('Do you need help?')+'</h3>' +
                    '<div>' +
                        '<button class="btn btn-orange btn-lg mr10 open-chat chatbot">'+Drupal.t('YES')+'</button>' +
                        '<button class="btn btn-lg color-orange close-proactive">'+Drupal.t('NO')+'</button>' +
                    '</div>' +
                '</div>' +
                '<div id="lhc_status_container">' +
                    '<a id="online-icon" class="status-icon chat icon-bubbles" data-toggle="modal" data-target="#messengers_modal_popup" ></a>' +
                '</div>' +
            '</div>');

        $('body').on('click',  function() {
            loadZopimScript();
        })
    });

    $(window).load(function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $(".zopim").addClass("hideZopim");
        }
    });

    window.detectCountryForChatBot = function(title) {
        var country = GEOIP.country;

        switch (country) {
            case 'CA': case 'AU': case 'PH': case 'MS': case 'TZ': case 'BD': case 'PK': case 'LK': case 'NG':
            case 'DZ': case 'BH': case 'DJ': case 'EG': case 'IQ': case 'IL': case 'JO': case 'LB': case 'LY': case 'MR': case 'MA': case 'OM': case 'PS':
            case 'QA': case 'SA': case 'SS': case 'SY': case 'TN': case 'AE': case 'YE': case 'AO': case 'BJ': case 'BW': case 'BF': case 'BI': case 'CM':
            case 'CV': case 'CF': case 'TD': case 'KM': case 'CG': case 'CI': case 'GQ': case 'ER': case 'ET':
            case 'GA': case 'GM': case 'GH': case 'GN': case 'GW': case 'GY': case 'KE': case 'LS': case 'LR': case 'MG': case 'MW': case 'ML': case 'MZ':
            case 'NA': case 'NE': case 'RE': case 'RW': case 'ST': case 'SN': case 'SL': case 'SO': case 'ZA': case 'SZ': case 'CD': case 'TG': case 'UG':
            case 'EH': case 'ZM': case 'ZW':
                jQuery('.chatbot').addClass('agent-launcher');
                break;
            default:
                onZopimChatOpen(title);
                break;
        }
    }

    $(document).on('click', '#liveChatButton', function(e) {
        detectCountryForChatBot('');
        $('#messengers_modal_popup').modal('toggle');
    });

    var langs_map = {
       
        "ar": "العربية",
        "default": "Please select language",
        "aff_dep": "Affiliate Queries",
        "ib_dep": "IB Queries"
    };

    var site_version_map = {
        "global": "",
        'eu': "*",
        'uk': "-",
        'gb': "-"
    };

    var site_lang = SITE.lang;
    var site_version = SITE.version;
    var pref_department = site_version_map[site_version] + '' + langs_map[site_lang];

    var connected = false;
    var isZopimLoaded = false;

    function loadZopimScript() {
        if (isZopimLoaded) {
            return;
        }
        var z = $zopim = function (c) {
            z._.push(c)
        }, $ = z.s =
            document.createElement('script'), e = document.getElementsByTagName('script')[0];
        z.set = function (o) {
            z.set._.push(o)
        };
        z._ = [];
        z.set._ = [];
        $.async = !0;
        $.setAttribute("charset", "utf-8");
        if(site_version == 'global') {
            $.src = "https://v2.zopim.com/?4Jnf6zF23la2mSsXajYjEc9Z5E80uUPR";
        } else {
            $.src = "https://v2.zopim.com/?4bkluwojfkxVNoQcM0TsninwNGczGM5q";
        }
        z.t = +new Date;
        $.type = "text/javascript";
        e.parentNode.insertBefore($, e);
        // close chat window, because it's opened by default immediately after load.
        $zopim(function() {
            $zopim.livechat.window.hide();
        });
        isZopimLoaded = true;
    }

    function zopimInit(proactive){
        $zopim(function() {

            //$zopim.livechat.clearAll();

            if(SITE.dir == 'rtl') {
                $zopim.livechat.window.setPosition('bl');
            }

            log("Chat site lang: ",  site_lang);
            $zopim.livechat.set({
                language: site_lang
            });

            proactive = proactive || '';

            if(site_version == 'global') {
                $zopim.livechat.addTags("FT-Global", proactive);
            } else if(site_version == 'eu') {
                $zopim.livechat.addTags("Forextime(EU)", proactive);
            } else {
                $zopim.livechat.addTags("Forextime(UK)", proactive);
            }

            if(site_lang == 'zh') {
                $zopim.livechat.setLanguage('zh_CN');
            }
            if(site_lang == 'hk') {
                $zopim.livechat.setLanguage('zh_TW');
            }

            $zopim.livechat.departments.setLabel(Drupal.t('Language'));

            $zopim.livechat.setOnConnected(function() {
                log("Chat connected");
                var all_online_deps = $zopim.livechat.departments.getAllDepartments()
                    .filter(function(i) {return i.status == 'online'})
                    .map(function(i) {return i.name});

                var all_ft_deps = $zopim.livechat.departments.getAllDepartments()
                    .filter(function(i) {return i.name.substring(0, 1) != '*' && i.name.substring(0, 1) != '-' && i.name.substring(0, 1) != '#'})
                    .map(function(i) {return i.name});

                var all_eu_deps = $zopim.livechat.departments.getAllDepartments()
                    .filter(function(i) {return i.name.substring(0, 1) == '*'})
                    .map(function(i) {return i.name});

                var all_uk_deps = $zopim.livechat.departments.getAllDepartments()
                    .filter(function(i) {return i.name.substring(0, 1) == '-'})
                    .map(function(i) {return i.name});

                if(all_online_deps.indexOf(pref_department) != -1) {
                    $zopim.livechat.departments.setVisitorDepartment(pref_department);
                } else {
                    $zopim.livechat.departments.setVisitorDepartment(site_version_map[site_version] + langs_map['en']);
                }

                // Departments for FTG
                if(site_version == 'global') {
                    if(site_lang != 'en') {
                        all_ft_deps.splice(all_ft_deps.indexOf(site_version_map[site_version] + '' + langs_map['default']), 1);
                    }
                    all_ft_deps.splice(all_ft_deps.indexOf(langs_map['aff_dep']), 1);
                    all_ft_deps.splice(all_ft_deps.indexOf(langs_map['ib_dep']), 1);
                    $zopim.livechat.departments.filter.apply($zopim.livechat.departments, all_ft_deps);
                }
                // Departments for EU
                else if(site_version == 'eu') {
                    if(site_lang != 'en') {
                        all_eu_deps.splice(all_eu_deps.indexOf(site_version_map[site_version] + '' + langs_map['default']), 1);
                    }
                    if(site_lang == 'hk') {
                        $zopim.livechat.departments.setVisitorDepartment(site_version_map[site_version] + langs_map['zh']);
                    }
                    $zopim.livechat.departments.filter.apply($zopim.livechat.departments, all_eu_deps);
                }
                // Departments for GB or UK
                else {
                    if(site_lang != 'en') {
                        all_uk_deps.splice(all_uk_deps.indexOf(site_version_map[site_version] + '' + langs_map['default']), 1);
                    }
                    if(site_lang == 'hk') {
                        $zopim.livechat.departments.setVisitorDepartment(site_version_map[site_version] + langs_map['zh']);
                    }
                    $zopim.livechat.departments.filter.apply($zopim.livechat.departments, all_uk_deps);
                }
                if(site_lang == 'en') {
                    $zopim.livechat.departments.setVisitorDepartment(site_version_map[site_version] + '' + langs_map['default']);
                }
                connected = true;
                popOut();
            });

        });
    }

    var firstTime = 1;
    function popOut(){
        $zopim.livechat.window.show();
        if(firstTime) {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                window._paq.push(['trackEvent', 'liveChat', 'liveChat - mobile']);
            } else {
                window._paq.push(['trackEvent', 'liveChat', 'liveChat - desktop']);
            }
            firstTime = 0;
        }
    }

    function openZopimChat(proactive) {
        // console.log("Proactive is ", proactive);
        // console.log("connected is ", connected);
        //clicked = true;
        if(connected){
            popOut();
        } else {
            zopimInit(proactive);
        }
    }

    window.onZopimChatOpen  = function(proactive) {
        loadZopimScript();
        openZopimChat(proactive);
    };

})(jQuery, SITE);;
(function ($) {

    function setSubMenuPositions() {

        // make asynchronously to avoid delays for DOM rebuilding
        setTimeout(function () {

            if (!$('#nav-line .level-1').is(":visible")) return;
            var f = (SITE.lang == 'ur') ? false : true;
            $('#nav-line .level-1').each(function () {
                var x = $(this);
                var dropMenu = x.find(".drop");
                var eltOffset = $('body').hasClass('rtl')
                    ? x.parent().outerWidth() - x.position().left - x.outerWidth()
                    : x.position().left;
                var maxContainerWidth = x.closest('.nav').width() - eltOffset;
                dropMenu.toggleClass('pull-in-the-end', dropMenu.outerWidth() >= maxContainerWidth);
            });
        }, 300);
    }

    $(function () {

        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (!jQuery.browser.mobile) {
            jQuery(".bfh-languages option").each(function() {
                jQuery(this).removeAttr('title');
            });
        }

        var sidebar = $(".sidebar-wrapper");
        $("#page-content-wrapper").on('click touchstart', function (e) {
            if (!$(e.target).closest(".sidebar-wrapper").length) {
                if($('#wrapper.toggled').length){
                    $("#wrapper").removeClass("toggled");
                    $('html, body').css({
                        'height': '',
                        'overflow': ''
                    });
                    e.preventDefault();
                }
            }
        });

        // Remove br from the menu list on mobile
        var removeBr = jQuery('.sidebar-wrapper .level-1 .dropdown-toggle');
        removeBr.find('br').remove();

        //stops the event from being taken by DOM
        $('#nav-line').click(function (e) {
            e.stopPropagation();
        });

        //clicking on humburger button it shows the menu
        $("#menu-toggle, .sidebar-toggle-btn").on('click', function (e) {
            //alert('a')
            e.preventDefault();
           /// alert('b')
            e.stopPropagation();
            //alert('c')
            $("#wrapper").addClass("toggled");
            $('.sidebar-wrapper .level-1').has('.active').addClass('open');

            if (isMobile) {
                console.log('View is mobile!');
                $('html, body').css({
                    'height': '100%',
                    'overflow': 'hidden',
                    'position': 'relative'
                });
            }

            if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && SITE.version != 'uk') {
                $('.sidebar-wrapper .bootstrap-select ul.dropdown-menu').addClass('device-ios');
            }

        });

        $('.sidebar-header .close').on('click', function(e) {
            $("#wrapper").removeClass("toggled");

                $('html, body').css({
                    'height': '',
                    'overflow': ''
                });
            e.preventDefault();
        });

        setSubMenuPositions();

        //Manages how the menu and header behaves.
        function MenuHandling() {
            var widthScreen = $(window).width();
            var HEADER_WRAPPER_SCROLLED_CLS = 'scrolled';
            var SCROLLED_STATE_BORDER = 114;
            var headerWrapper = $('.header-wrapper');

            $(window).on('scroll load resize touchmove touchstart', function () {
                var elt = $(this);
                if (elt.scrollTop() >= SCROLLED_STATE_BORDER) {
                    headerWrapper.addClass(HEADER_WRAPPER_SCROLLED_CLS);
                } else {
                    headerWrapper.removeClass(HEADER_WRAPPER_SCROLLED_CLS);
                }
            });

            //Initial hiding of items
            $(".affix-top").hide();
            $(".affix").hide();
            
            //when on mobile resolution we dont show the sticky menu
            var lastScrollTop = 0;
            $(window).on('scroll load resize', function () {
                var currentScrollTop = $(this).scrollTop();

                if ($(this).scrollTop() >= 49 && widthScreen <= 640 && currentScrollTop > lastScrollTop) {
                    $(".affix").stop().hide();
                } else {
                    $(".affix-top").stop().show();
                    $(".affix").stop().show();
                }
                lastScrollTop = currentScrollTop;
            });

            //moves the menu for the mobile navigation to the wrapper level
            $(".sidebar-wrapper").appendTo("#wrapper");

            //on page load or window resize place the menu on the right position.
            $(window).on('resize', function () {
                setSubMenuPositions();
            });
        }

        //executes the function
        MenuHandling();

        // Footer menu for mobile
        if(isMobile) {
            $('.footer-nav .level-1').on('click', function() {
                //$('.menu_level_1').hide();
                $(this).find('.menu_level_1').toggle();
            });
        }
        $('.footer-nav .level-1').has('.active').find('.menu_level_1').show();
    });



    $(".navbar-nav .drop-down").each(function (a) {
        // console.log(typeof ($(this).attr('data-country')));
        var _drop = $(this);
        $(this).find("ul.extra").each(function () {
            if ('undefined' != typeof ($(this).attr('data-country')) && GEOIP.country == $(this).attr('data-country')) {
                _drop.find('ul.extra').hide();
                $(this).show();
            }
        });
    });

})(jQuery);
;
(function($){

	$(function(){

		function BaseMenu(){

			var self = this;
			self.width = $(window).width();
			var separator = 992;
			var nav = $('#nav');
			var dropDown = nav.find('.drop-down');

			

			this.newWidth = function(w){
				self.width = w;
				if(separator > self.width){
					nav.addClass('mobile');
				}else{
					nav.removeClass('mobile');
				}

			}

			dropDown.on({
	            mouseenter: function () {
	            	if(nav.hasClass('mobile') ) return;

	                dropDown.removeClass('open');
	                dropDown.find('.dropdown-menu').stop(1,1).hide();
	                $(this).find('.dropdown-menu').show();
	            },
	            mouseleave: function () {
	            	if(nav.hasClass('mobile') ) return;

	                $(this).find('.dropdown-menu').delay(200).fadeOut(300);
	            }
	        });

	        

			/*dropDown.on('click', function () {
	            dropDown.removeClass('open');
	            dropDown.find('.dropdown-menu').hide();
	            $(this).find('.dropdown-menu').show();
	        });*/

	        this.newWidth(this.width);



			

	        

	        /*$('.drop-down').on('touchcancel', function () {
	            alert('can');
	            $('.drop-down').removeClass('open');
	        });

	        $('.drop-down').on('touchleave', function () {
	            alert('leave');
	            $('.drop-down').removeClass('open');
	        });*/

		}

		//var baseMenu = new BaseMenu();
		//window.onresize = function(event) {
    		//baseMenu.newWidth($(window).width());
		//};


	});	

})(jQuery);;
/**
 * Created by Eugene.Karpov on 4/7/2016.
 */
(function (Backbone, $, window) {

    var defaultParams = {
        greyIconCls: 'rating-widget-grey-icons',
        colorIconCls: 'rating-widget-color-icons',
        scale: 5
    };

    var RatingWidget = Backbone.View.extend({
        className: 'rating-widget',
        initialize: function (params) {

            this._params = _.extend({}, defaultParams, params);
            // console.log('Rating widget online');
            var ratingTemplate = $('<div/>').addClass(this._params.greyIconCls).append(
                $('<div/>').addClass(this._params.colorIconCls).css({
                    width: (this._params.value * 100 / this._params.scale) + '%'
                })
            );


            this.$el.html('').append(ratingTemplate);
        }
    });

    window.RatingWidget = RatingWidget;

})(Backbone, jQuery, window);;
/**
 * Created by Eugene.Karpov on 3/10/2017.
 */
(function (window, $, Backbone, undefined) {

    var TPL_PARTS = {
        PREV: 'prev',
        FIRST: 'first',
        EMPTY: 'empty',
        NUMS: 'nums',
        LAST: 'last',
        NEXT: 'next'
    }

    var defaultParams = {
        pagesCount: null,
        numBtnsLength: 4,
        currentPage: 1,
        prevText: '<',
        nextText: '>',
        firstText: '|<',
        lastText: '>|',
        emptyText: '...',
        template: [
            TPL_PARTS.PREV, TPL_PARTS.NUMS, TPL_PARTS.NEXT
        ],
        showFirstAndLastNumAlways: true,
        containerCls: 'pagination',
        btnCls: 'pagination_button',
        activeCls: 'active',
        disabledCls: 'disabled'
    }

    var PaginationWidget = Backbone.Ribs.View.extend({
        className: 'pagination',
        _currentPage: null,
        _pagesCount: null,
        _linksContainer: null,
        _callbacks: [],
        events: {
            'click ul > li > a': function (e) {
                e.stopPropagation();
                e.preventDefault();
                var a = $(e.target);
                var li = a.closest('li');
                if (!li.hasClass(this._params.disabledCls)) {
                    var pageNum = a.attr('pageNum');
                    switch (pageNum) {
                        case TPL_PARTS.PREV:
                            pageNum = this._currentPage - 1;
                        case TPL_PARTS.NEXT:
                            pageNum = !isNaN(pageNum) ? pageNum : (this._currentPage + 1);
                        default:
                            pageNum = parseInt(pageNum) || 1;
                            this._currentPage = pageNum;
                            for (var i = 0; i < this._callbacks.length; ++i) {
                                this._callbacks[i].call(undefined, pageNum);
                            }
                            this.renderBtns();
                    }
                } 
            }
        },
        initialize: function (params) {
            var self = this;
            this._params = $.extend({}, defaultParams, params);
            this._currentPage = this._params.currentPage;
            this._pagesCount = this._params.pagesCount;
            this._linksContainer = $('<ul>').addClass(this._params.containerCls);
            this.$el.append(this._linksContainer);
            this.renderBtns();
            if ('ontouchstart' in document) {
                // Addfix sticky hover on some touch devices (IOS)
                this._linksContainer.addClass('is-touch');
            }
        },
        listen: function (callback) {
            this._callbacks.push(callback);
            var self = this;
            return function () {
                var ix = self._callbacks.indexOf(callback);
                if (ix > -1) {
                    this._callbacks.splice(ix);
                }
            }
        },
        setCurrentPage: function(page) {
            this._currentPage = page;
        },
        setPagesCount: function(pagesCount) {
            this._pagesCount = pagesCount;
        },
        renderBtns: function () {
            var links = [];
            var numsLength = this._pagesCount > this._params.numBtnsLength
                ? this._params.numBtnsLength
                : this._pagesCount;
            if (numsLength <= 1) {
                this.$el.hide();
                return;
            }
            this.$el.show();
            for (var i = 0; i < this._params.template.length; ++i) {
                var partName = this._params.template[i];
                var text = null;
                var cls = null;
                switch (partName) {
                    case TPL_PARTS.PREV:
                        text = this._params.prevText;
                        cls = this._currentPage === 1 ? this._params.disabledCls : '';
                    case TPL_PARTS.NEXT:
                        text = text || this._params.nextText;
                        if (cls === null) {
                            cls = this._currentPage === this._pagesCount ? this._params.disabledCls : '';
                        }
                    case TPL_PARTS.FIRST:
                        text = text || this._params.firstText;
                    case TPL_PARTS.LAST:
                        text = text || this._params.lastText;
                        links.push(this._createBtn({
                            goto: partName,
                            label: text,
                            cls: cls
                        }));
                        break;
                    case TPL_PARTS.NUMS:
                        var diff = Math.floor(numsLength / 2);

                        // second and penult nums
                        var startNum = this._currentPage - diff;
                        var endNum = this._currentPage + diff;
                        if (startNum < 1) {
                            startNum = 1;
                            endNum = startNum + numsLength - 1;
                        } else if (endNum > (this._pagesCount)) {
                            endNum = this._pagesCount;
                            startNum = endNum - numsLength + 1;
                        }

                        while (numsLength > 0) {
                            var num = startNum++;
                            links.push(this._createBtn({
                                goto: num, label: num, cls: this._currentPage === num ? this._params.activeCls : ''
                            }));
                            --numsLength;
                        }
                }
            }
            this._linksContainer.empty().append(links);
        },
        _createBtn: function (opts) {
            var btn = $('<li/>').addClass(this._params.btnCls);
            btn.addClass(opts.cls);
            var link = $('<a/>').attr({
                href: '#',
                pageNum: opts.goto
            }).text(opts.label || opts.goto);
            btn.append(link);
            return btn;
        }
    });

    $.extend(PaginationWidget, TPL_PARTS);

    window.PaginationWidget = PaginationWidget;

})(window, jQuery, Backbone, undefined);;
(function($){
$(function () {

	// Extend the callbacks to work with Bootstrap, as used in this example
	  // See: http://thedersen.com/projects/backbone-validation/#configuration/callbacks

	Backbone.Validation.configure({
	    forceUpdate: true
	});
	_.extend(Backbone.Validation.callbacks, {
	  valid: function (view, attr, selector) {
		var $el = (view!==false) ? view.$('[name=' + attr + ']') : $('[name=' + attr + ']'),
			$group = $el.closest('.form-group');

		if($group.hasClass('freeze')) return;

		$group.removeClass('has-error').addClass('has-success');
		$group.find('.help-block').html('').addClass('hidden');
		$group.find('.glyphicon.form-control-feedback').removeClass('icon-x').addClass('icon-check');
	  },
	  invalid: function (view, attr, error, selector) {
  		var $el = (view!==false) ? view.$('[name=' + attr + ']') : $('[name=' + attr + ']'),
        	$group = $el.closest('.form-group');
        
		$group.removeClass('has-success').addClass('has-error');
		if(_.isString(error)) $group.find('.help-block').html(error).removeClass('hidden');
		$group.find('.glyphicon.form-control-feedback').removeClass('icon-check').addClass('icon-x');
	  },
	  basic: function(view, attr){
		var $el = view.$('[name=' + attr + ']'),
			$group = $el.closest('.form-group');

		$group.removeClass('has-error').removeClass('has-success');
		$group.find('.help-block').html('').addClass('hidden');
		$group.find('.glyphicon.form-control-feedback').removeClass('icon-x').removeClass('icon-check');
	  }

	});

	_.extend(Backbone.Validation.validators, {

	  /**
	  * Check birthday fields for all filling and 18+
	  * There is fourth common field added for check if three rest fields are filled correctly
	  */
	  birthday: function(value, attr, customValue, model) {

	  	if( !value )
	  		return;

	  	var d = model.get('birth_date_d'),
	  		m = model.get('birth_date_m'),
	  		y = model.get('birth_date_y');

	  	// If one or more fields haven't filled - do not validate 
	  	if( _.isUndefined(d) || _.isUndefined(m) || _.isUndefined(y) )
	  		return;

	  	var messages = window.messages || {};

	  	// if one or more fields filled incorrectly - validate this as false
	  	if( !d || !m || !y ){
	  		model.set(customValue, '');
	  		Backbone.Validation.callbacks.invalid( false, customValue, messages.error.required );
	  		return;
	  	}

  		var birthDate = new Date(y,m,d);
  		var tempDate = new Date(birthDate.getFullYear()+18, birthDate.getMonth()-1, birthDate.getDate() +1);

  		// if less than 18 - set validation false and show under18 message
  		if (tempDate > new Date()) {
			model.set(customValue, '');
			Backbone.Validation.callbacks.invalid( false, customValue, messages.error.under18 );
	  		return;
	    }

	    // if OK -validate and render result.
	    model.set( customValue, [ d, m, y ].join('.'));
	    var method = model.isValid( customValue ) ? 'valid' : 'invalid';
	    Backbone.Validation.callbacks[method](false, customValue,  messages.error.required);

	  },

	  maxLengthNoSpace: function(value, attr, maxLength, model) {
        if (!_.isString(value) || value.replace(/ /g, '').length > maxLength) {
          return this.format(Backbone.Validation.messages.maxLength, this.formatLabel(attr, model), maxLength);
        }
      },
      minLengthNoSpace: function(value, attr, minLength, model) {
        if (!_.isString(value) || value.replace(/ /g, '').length < minLength) {
          return this.format(Backbone.Validation.messages.minLength, this.formatLabel(attr, model), minLength);
        }
      }

	});

	// Extend patterns
	_.extend(Backbone.Validation.patterns, {
		phone: /^[-\d\s]*$/,
		letters_china: /^[a-zA-Z\s]+$|^[\u4e00-\u9eff\s]+$/,
		name: /^[a-zA-Z-\s]*$/,
		latin: /^[a-zA-z0-9\-\s]+$/,
		manager_name: /^[A-z0-9\_\s]+$/,
		latin_china: /^[a-zA-z0-9\-\s]+$|^[\u4e00-\u9eff0-90-9\-\s]+$/,
		zip: /^[a-zA-Z0-9\-\s,./]+$/,
        address: /^[a-zA-Z0-9\-\s,./]+$/,
		address_china: /^[a-zA-z0-9\u4e00-\u9fff\-\s,./\uFF0C\u3002]+$/,
		latin_symbols: /^[0-9A-Za-z#$%@!,*'`.:;\\\-"+^\/\s]*$/,
		latin_china_symbols: /^[0-9A-Za-z\u4e00-\u9fff#$%@!,*'`.:;\\\-"+^\/\s]*$/
	});


	// Extend messages
	if( !_.isUndefined(window.messages) && !_.isUndefined(window.messages.error) ){
		_.extend(Backbone.Validation.messages, window.messages.error);
	}

	

});

})(jQuery);
;
function getUrlParams(prop) {
    var params = {};
    var search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
    var definitions = search.split('&');

    definitions.forEach(function (val, key) {
        var parts = val.split('=', 2);
        params[parts[0]] = parts[1];
    });

    return (prop && prop in params) ? params[prop] : false;
}

(function ($, Drupal) {

    /**
     * Fix sidebar
     */
    window.fixedSideBar = function () {

        var summaryContainer = $('aside');
        var summary = $('.aside-container');
        var content = $('.content-page').closest('.col-md-9');
        summary.width('');
        var footer = $('footer');

        if ($.browser.mobile || $(window).width() < 992 || !summary.length || (content.height() - 200) < summary.height() || summary.hasClass('no-position-fixed')) {
            summary.removeClass('affix');
            $('.nav-wrapper').off('.affix');
            return;

        }
        summary.width(summaryContainer.width());
        summary.affix({
            offset: {
                top: (summaryContainer.offset().top) ? summaryContainer.offset().top - 70 : 300,
                bottom: footer.outerHeight(true)
            }
        });

    };

    /**
     * Overflow-x Scroll tables on mobile devices
     */
    window.responsiveTable = function (arr) {

        $.each(arr, function (k, v) {

            if (!$(v).length) return;

            var container = $(v).parent('div');
            container.addClass('table-responsive');
            $(v).addClass('table').css('table-layout', 'auto');

        });

    };

    var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    function siteVersionForProactiveChat() {
        if (SITE.version !== 'global') {
            return 'EU';
        } else {
            return 'GLOBAL';
        }
    }

    if (window.location.hash === '#regform') scroll(0,0);
    setTimeout( function() { scroll(0,0); }, 1);

    $(function () {

        var isOperaMini = (navigator.userAgent.indexOf('Opera Mini') > -1);
        var isOperaMobi = (navigator.userAgent.indexOf('Opera Mobi') > -1);

        if (isOperaMini || isOperaMobi) {
            $('.proactive-chat-container').remove();
        }

        // For admins only
        $('.tabs.primary a').each(function () {
            var myClass = $(this).text().toLowerCase().replace('(active tab)', '');
            $(this).addClass(myClass).attr('title', myClass);
        });

        var urlLastPath = window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));

        function proactiveChatTrigger(time) {
            setTimeout(function () {
                $('.proactive-chat-container').addClass('active');
                if (isMobileDevice) {
                    window._paq.push(['trackEvent', 'Proactive chat Popup triggered - mobile', urlLastPath, siteVersionForProactiveChat()]);
                } else {
                    window._paq.push(['trackEvent', 'Proactive chat Popup triggered - desktop', urlLastPath, siteVersionForProactiveChat()]);
                }

            }, time);
        }

        /* ------------- START: Proactive Chat Trigger ---------------- */
        if (window.location.href.indexOf("fxtm-faq") > -1) {
            proactiveChatTrigger(45000);
        } else if (window.location.href.indexOf("comparison") > -1) {
            proactiveChatTrigger(60000);

            var targetOffset = $(".note").offset().top - 300;
            var $w = $(window).scroll(function () {
                if ($w.scrollTop() > targetOffset) {
                    proactiveChatTrigger(100);
                }
            })
        }
        /* ------------- END: Proactive Chat Trigger ----------------- */

        $('.proactive-chat-container .open-chat').on('click', function () {
            $('.proactive-chat-container').removeClass('active');
            setTimeout(function () {
                $('.proactive-chat-container').remove()
            }, 500);
            if (isMobileDevice) {
                window._paq.push(['trackEvent', 'Proactive chat initiated - mobile', urlLastPath, siteVersionForProactiveChat()]);
            } else {
                window._paq.push(['trackEvent', 'Proactive chat initiated - desktop', urlLastPath, siteVersionForProactiveChat()]);
            }
            // onZopimChatOpen();
            detectCountryForChatBot('Proactive Chat');
        });

        $('.proactive-chat-container .close-proactive').on('click', function () {
            $('.proactive-chat-container').removeClass('active');
            setTimeout(function () {
                $('.proactive-chat-container').remove()
            }, 500);
            if (isMobileDevice) {
                window._paq.push(['trackEvent', 'Proactive chat declined - mobile', urlLastPath, siteVersionForProactiveChat()]);
            } else {
                window._paq.push(['trackEvent', 'Proactive chat declined - desktop', urlLastPath, siteVersionForProactiveChat()]);
            }
        });

        function openMessengersInfo() {
            $('.messengerInfoBlock').css('display', 'block');
            $('#messengers_modal_popup .modal-body').addClass('modalBodyMobile');
        }

        $('.chat').on('click', function () {
            $('.messengerInfoBlock').css('display', 'none');
        });

        $('.inform-chat').on('click', function () {
            $('#wrapper').removeClass('toggled');
        });

        var messengers_modal_popup;
        messengers_modal_popup = $('#messengers_modal_popup');
        messengers_modal_popup.on('hidden.bs.modal', function () {
            $('ul.popup-messengers li').removeClass('active');
            $('.messengerInfoBlock').css('display', 'none');
            $('.thanks').css('display', 'none');
            $('#messengers_modal_popup .modal-body').removeClass('modalBodyMobile');
            $('.modal').css('overflow-y', 'hidden');
        });

        $('.popup-messengers').on('click', function () {
            $('.modal').css('overflow-y', 'scroll');
        });

        messengers_modal_popup.on('show.bs.modal', function () {
            $('.tabbable').css('display', 'block');
        });

        // WhatsApp
        $('.whatsapp').on('click', function () {
            if (SITE.version === 'global') {
                $('.global-phone').html(Drupal.t('+447593962656, +447763675259'));
            }
            $('.appType').html(Drupal.t('Open Whatsapp.'));
            $('.point3').html(Drupal.t('Click the "New Chat" icon in the top right corner.'));
            $('.point4').html(Drupal.t('Select the FXTM number you added in step 1.'));
            $('.fb-hide').show();
            $('.fb-show').hide();

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                setTimeout(function () {
                    openMessengersInfo();
                }, 2000);
                switch (SITE.version) {
                    case 'global':
                        document.location = 'https://api.whatsapp.com/send?phone=447593962656';
                        break;
                    case 'eu':
                        document.location = 'https://api.whatsapp.com/send?phone=35796931572';
                        break;
                    case 'uk':
                        document.location = 'https://api.whatsapp.com/send?phone=447395261391';
                        break;
                }

                $('#messengers_modal_popup').modal('hide');
            } else {
                openMessengersInfo();
            }
        });

        // Viber
        $('.viber').on('click', function () {
            openMessengersInfo();
            if (SITE.version === 'global') {
                $('.global-phone').html(Drupal.t('+447593612469'));
            }
            $('.appType').html(Drupal.t('Open Viber.'));
            $('.point3').html(Drupal.t('Click on "Contacts".'));
            $('.point4').html(Drupal.t('Select the FXTM number you added in step 1.'));
            $('.fb-hide').show();
            $('.fb-show').hide();
        });

        // WeChat
        $('.wechat').on('click', function () {
            if (window.innerWidth < 768) {
                $('body').append(_.template($('#wechat-qr-code-modal-template').html()));
                setTimeout(function () {
                    $('#wechat-popup-qr-img').modal('show');
                    $('.messengerInfoBlock').css('display', 'none');
                }, 0);
            } else {
                openMessengersInfo();
            }

        });

        // Telegram
        $('.telegram').on('click', function () {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                setTimeout(function () {
                    $('.messengerInfoBlock').css('display', 'block');
                }, 2000);

                switch (SITE.version) {
                    case 'global':
                        document.location = 'https://t.me/FXTMftg_bot';
                        break;
                    case 'eu':
                        document.location = 'https://t.me/FXTMusr_bot';
                        break;
                    case 'uk':
                        document.location = 'https://t.me/UKFXTM_bot';
                        break;
                }
                $('#messengers_modal_popup').modal('hide');
            } else {
                openMessengersInfo();
            }
        });

        // Callback
        $('.call-back').on('click', function () {
            openMessengersInfo();
        });

        // Facebook
        $('.fb').on('click', function () {
            openMessengersInfo();

            $('.appType').html(Drupal.t('Open Messenger.'));
            $('.point3').html(Drupal.t('Find FXTM by searching on the top search bar.'));
            $('.point4').html(Drupal.t('Start chatting!'));
            $('.fb-hide').hide();
            $('.fb-show').show();
        });

        /*if(window.location.hash == '#chat-with-us') {
            location.href = document.location.href.replace('#','?');
        }*/
        if (window.location.href.indexOf('#chat-with-us') !== -1) {
            $('#messengers_modal_popup').modal('show');
        }

        if (window.location.href.indexOf('?chat-with-us=callback') !== -1) {
            $('#messengers_modal_popup').modal('show');
            $('.popup-messengers a[href="#third"]').tab('show');
            openMessengersInfo();
        }

        $('.qq-icon').on('click', function () {
            window.open(
                'http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA0NDA1NV8yNjAwOTlfNDAwNjExMTI2Nl8',
                '_blank'
            );
            $('#messengers_modal_popup').modal('hide');
        });

        /* ------------- CALLBACK: WEEKEND ------------- */
        var day = window.GEOIP.serverDay;
        var time = window.GEOIP.serverTime;
        var isWeekend = day === 6 || day === 7;

        if ((SITE.version === 'eu' || SITE.version === 'uk') && (time >= 8 && time <= 20) && !isWeekend) {
            $('.working-days-block').show();
            $('.weekend-block').hide();
        } else if (SITE.version === 'global' && !isWeekend) {
            $('.working-days-block').show();
            $('.weekend-block').hide();
        } else {
            $('.weekend-block').show();
            $('.working-days-block').hide();
        }
        /* ------------- CALLBACK: WEEKEND ------------- */

        //LAZYLOADER PLUGIN FOR INSTRUCTION GO TO: http://www.appelsiini.net/projects/lazyload
        //enables the placeholder for javascript enabled browsers
        $("img.lazy").show().lazyload();

        $("img.lazy").lazyload({
            threshold: 1000,
            effect: "fadeIn"
        });

        //Script that converts ul to a dropdown. To enable it use the class convert-to-Mobile. We use this only if user is on ipad or mobile resolution.

        $('ul.convert-to-Mobile').each(function () {
            var select = $(document.createElement('select')).insertBefore($(this).hide());
            $('>li', this).each(function () {
                var ahref = $(this).children('a'),
                    target = ahref.attr('target'),
                    option = $(document.createElement('option'))
                        .appendTo(select)
                        .val(ahref.attr('href'))
                        .html(ahref.html())
                        .click(function () {
                            if (option.val().length === 0) return;
                            if (target === '_blank') {
                                window.open(ahref.attr('href'));
                            } else {
                                window.location.href = ahref.attr('href');
                            }
                        });
                if (ahref.attr('class') === 'dlspb-selected') {
                    option.attr('selected', 'selected');
                }
            });
        });

        //change the arrows on arrowed unorderd lists for ARABIC only!
        if (SITE.dir === "rtl") {
            $(".list-arrowed > li:before").css("content", "\e633");
        }

        function defineTdsColspan() {
            $('td[colspan][colspan-all]:visible').each(function () {
                var td = $(this);
                var colspan = td.closest('table').find('thead:first').find('tr:first').find('>td:visible,>th:visible').length;
                td.attr('colspan', colspan);
            });
        }

        defineTdsColspan();

        var resizeOrLoadTimeoutId = null;
        //we do equalHeights only tablets and dektops. NOT MOBILE OR ANY BROWSER LESS THAN 640px!
        // Also add on css property with height:auto !important; for each class you mention here in a media query sm screens.
        $(window).on('resize load', function () {
            if (resizeOrLoadTimeoutId) {
                clearTimeout(resizeOrLoadTimeoutId);
            }
            resizeOrLoadTimeoutId = setTimeout(function () {
                log('resizeee');
                if ($(window).width() > 640) {
                    // reset height
                    var market_analysis_list = $('.market-analysis-and-videos-list .row');
                    market_analysis_list.css({
                        height: 'auto'
                    });
                    market_analysis_list.equalHeights();
                    var content_block = $('.content-block');
                    $('.market-analysis-and-videos-list h6').equalHeights();
                    $('.company-news-and-education h3').equalHeights();
                    content_block.find('h3.h4').equalHeights();
                    content_block.find('.block-inner-gray').equalHeights();
                    $('.promo-block').find('.promo-content').equalHeights();
                    $('.block-container').find('.block').equalHeights();
                    $('.account-block').find('ul').equalHeights();
                    $('.block.block-why-fxtm').equalHeights();
                    $('.office-container').find('.office-block').equalHeights();
                    $('.block-faq').equalHeights();
                    $('.news-block').find('.news-block-inner').equalHeights();
                    //$('.markets-articles').find('.top-article-container').equalHeights();
                    $('.market-forecast > div').equalHeights();
                    $('.cd-timeline-content').each(function () {
                        $(this).find('.cd-equal').equalHeights();
                    });
                    // store the currently selected tab in the hash value
                    $("ul.nav-tabs > li > a").on("shown.bs.tab", function () {
                        $('.news-block').equalHeights();
                        $('.promo-block').find('.promo-content').equalHeights();
                        $('#tab-events .promo-block').find('.promo-content').css('height', 'auto').equalHeights();
                    });
                    //default:
                    $('.equalheight').equalHeights();
                    $('.equalheight-container').each(function () {
                        $(this).find('.equalheight-item').equalHeights();
                    }).removeClass('invisible');

                    $('.news-container').each(function () {
                        $(this).find('.news-block').equalHeights();
                    }).removeClass('invisible');
                } else {
                    $('.equalheight-container').removeClass('invisible');
                    $('.news-container').removeClass('invisible');
                }

                defineTdsColspan();
            }, 300);
        });


        /**
         * responsibility for next tables:
         * add here table id/class
         * needs DIV element around table
         */
        var respoTables = ['#fxst-calendartable'];
        window.responsiveTable(respoTables);

        // Economic calendar
        if ($('.economic-calendar-container').length) {
            function waitForEC() {
                setTimeout(function () {

                    if ($('#fxst-calendartable').length)
                        responsiveTable(respoTables);
                    else {
                        log('economic cal', 'wait');
                        waitForEC();
                    }
                }, 2000);
            }

            waitForEC();

        }

        $(document).ready(function () {
            var timerId = setInterval(function () {
                if ($(document).find('#ec_grid .fxst-lang-ae').length) {
                    $(document).find('#ec_grid .fxst-lang-ae').removeClass('fxst-lang-ae').addClass('table-responsive');
                    $(document).find('#fxst-calendartable').addClass('table').css('table-layout', 'auto');
                    clearInterval(timerId);
                }
            }, 500);
        });

        /**
         * Converting UNIXSTAMP to hours, minutes, seconds
         */
        window.secondsToTime = function (x) {

            var tempTime = moment.duration(x * 1000),
                days = tempTime.days(),
                hours = tempTime.hours();

            //hours += tempTime.days() * 24;
            //hours += tempTime.months() * tempTime.days() * 24;
            //return (tempTime.hours() ? hours + 'h:' : '') + tempTime.minutes() + 'm' + ((!tempTime.hours()) ? ':' + (tempTime.seconds() + 's') : '');

            return (tempTime.days() ? days + 'd:' : '') + (tempTime.hours() ? hours + 'h:' : '') + tempTime.minutes() + 'm' + ((!tempTime.hours()) ? ':' + (tempTime.seconds() + 's') : '');

        };

        $('.selectpicker').selectpicker({
            dropupAuto: false
        });

        $('.b-tooltip').tooltip();
        $('[data-toggle="tooltip"]').tooltip();

        if (!SITE.isIeLte9) {
            $('input.prettyCheckable').each(function () {
                $(this).prettyCheckable();
            });
        }

        $('.carousel').carousel({
            interval: 10000
        });

        $('#test-form').on('submit', function () {
            log($(this).find('select').val());
        });

        $('.carousel-big').find('.item').first().addClass('active');

        // Currency ticker
        var ticker = $('#currency-ticker');
        if (ticker.size() > 0)
            ticker.ticker();


        // Lightboxes
        // $(document).delegate('*[data-toggle="lightbox"]', 'click', function (event) {
        //     event.preventDefault();
        //     $(this).ekkoLightbox();
        // });

        // Language and version switcher
        $('.select-region, .bfh-languages, .bhf-regions, .bfh-regions').selectpicker();


        $('.widget-dropdown select').selectpicker({
            noneSelectedText: ''
        });

        var regionPopup = true;

        $('.select-region').on('change', function (e) {
            e.preventDefault();
            if (!regionPopup) {
                regionPopup = true;
                return;
            }

            var x = $(this);
            var version = (SITE.version !== 'global') ? ['eu', $('option.option_site_version_eu').attr('value')] : ['global', $('option.option_site_version_global').attr('value')];

            $('#modal').html(_.template($('#switch-company-popup').html(), {
                url: x.val(),
                version: version[0]
            })).modal().on('hidden.bs.modal', function () {
                $('.select-region').selectpicker('val', version[1]);
            });

            return false;

        });

        var languageLink;
        var _switcher_lang_links = $('.bfh-languages a');
        if (_switcher_lang_links.length > 0 && $('.bfh-languages a[href*="#not_found"]').length === _switcher_lang_links.length) {
            var _a = $('.bfh-languages a[data-lang="en"]');
            languageLink = _a.val();
            _a.attr('href', (languageLink || '').replace('#not_found', ''));
        }

        $('.bfh-regions').on('change', function (e) {
            e.preventDefault();
            var sel = $(this), _url = window.location.href;
            var version = SITE.version;

            switch (sel.val()) {
                case 'uk':
                    _url = _url.replace('/eu/', '/uk/');
                    if (/\/eu$/i.test(_url) || /\/eu\?.*/.test(_url)) {
                        _url = _url.replace('/eu', '/uk');
                    }
                    break;
                case 'eu':
                    _url = _url.replace('/uk/', '/eu/');
                    if (/\/uk$/i.test(_url) || /\/uk\?.*/.test(_url)) {
                        _url = _url.replace('/uk', '/eu');
                    }
                    break;
            }

            $('#modal').html(_.template($('#switch-entity-popup').html(), {
                url: _url,
                version: version
            })).modal({
                keyboard: false
            }).on('hidden.bs.modal', function () {});
        });

        _switcher_lang_links.on('click', function (e) {
            var clickedNode = $(this);
            var language = clickedNode.attr('data-lang');

            if (-1 !== clickedNode.attr('href').indexOf('#not_found')) {
                e.preventDefault();

                var url = Drupal.settings.basePath;
                if (SITE.version !== 'global') {
                    url += SITE.version + '/';
                }

                $('#modal').html(_.template($('#link-not-found-popup').html(), {
                    text: Drupal.t('This page is not currently available in your selected language. You can either stay on this page in the current language or access the homepage in your selected language.'),
                    btn_cancel_text: Drupal.t('Stay on this page'),
                    btn_continue_text: Drupal.t('Visit the homepage'),
                    btn_continue_url: url
                })).modal().on('hidden.bs.modal', function () {
                    // do something;
                });
                return false;
            }

            $.utils.setCookie('lang', language, {path: '/'});
        });

        $('a[href$="#not_found"]').on('click', function (e) {
            e.preventDefault();

            var url = $(this).attr('href');
            url = url.replace('#not_found', '');
            url = url.replace('/' + SITE.lang + '/', '/');

            $('#modal').html(_.template($('#link-not-found-popup').html(), {
                text: Drupal.t('This page is not currently available in the language you were using. Would you like to continue in English?'),
                btn_cancel_text: Drupal.t('Stay on the page'),
                btn_continue_text: Drupal.t('Continue in English'),
                btn_continue_url: url
            })).modal();
            return false;
        });

        // Scroll To anchor
        $('.scroll li a, a.scroll, sup a').on('click', function () {

            var target = $($(this).attr('href'));
            if (target.length) {
                $('body').scrollTo(target.offset().top - 60, 400);
                if ($(this).attr('href') === '#regform') $('#regform').find('#name').focus();
            }

            return false;

        });

        function scrolToRegForm(distance) {
            var regform = $("#regform");
            if (regform.length) {
                $('html, body').animate({
                    scrollTop: regform.offset().top - distance
                }, 400);
            }
        }

        $('a.scroll').on('click', function () {
            scrolToRegForm(100);
        });

        // Mobile Menu "Open account" button and Header "Open account" button
        $('.mobile_menu_open_account_btn, .open-live-account-btn').on('click', function() {
            if(window.location.pathname.indexOf('copy-trading') > -1 || window.location.pathname.indexOf('become-a-strategy-manager') > -1) {
                $("#wrapper").removeClass("toggled");
                $('html, body').css({
                    'height': '',
                    'overflow': ''
                });
                scrolToRegForm(100);
            } else {
                window.location.href = reg_btn_url;
            }
        });

        $(window).load(function() {
            if(window.location.hash === '#regform') {
                scrolToRegForm(100);
            }
        });

        // Don't click on disabled tabs
        $('.tabbable .nav-tabs li.disabled a').on('click', function () {
            return false;
        });

        var searchTrigger = $('.search-trigger');
        var searchField = searchTrigger.siblings('.search');
        searchTrigger.on('click', function (e) {
            searchField.toggleClass('showed');
            searchField.hasClass('showed') && searchField.focus();
            e.stopPropagation();
        });
        searchField.on('click', function (e) {
            e.stopPropagation();
        });
        $('body').on('click', function () {
            searchTrigger.siblings('.search').removeClass('showed');
        });

        $('.block.block-why-fxtm').on('click', function () {
            if ($(this).find('a.btn').length)
                window.location = $(this).find('a.btn').attr('href');
        });


        $("#live_chat_block button").click(function () {
            window.open(SITE.prefix + 'chat', '', 'scrollbars=yes,width=800,height=600');
        });

        // Fixed straight after homepage redesign
        $('.languages-dropdown-container.region-switcher').toggle(window.GEOIP && !window.GEOIP.isEu);

        // var news_announce = $('.news-announce');
        // if (news_announce.length) news_announce.dotdotdot({wrap: 'letter'});

        // Don't jump to anchor on tab press
        $('.nav-tabs.linked-tabs').on('click', 'a', function () {
            var scrollV
                , scrollH
                , $this = $(this)
                , href = $this.attr('href');
            $this
                .siblings()
                .removeClass('selected')
                .end()
                .addClass('selected');

            scrollV = document.body.scrollTop;
            scrollH = document.body.scrollLeft;
            location.hash = href;
            document.body.scrollTop = scrollV;
            document.body.scrollLeft = scrollH;

        });

        // on load of the page: switch to the currently selected tab
        var hash = window.location.hash;
        $('.nav-tabs a[href="' + hash + '"]').tab('show');

        // Pager switch pages in it's tab of tabmenu
        $('.tab-pane').find('.pagination').each(function () {
            var id = $(this).closest('.tab-pane').attr('id');
            $(this).find('li').not('.active').find('a').each(function () {
                $(this).attr('href', $(this).attr('href') + '#' + id);
            });
        });


        fixedSideBar();
        $(window).on('resize', fixedSideBar);

        function showApplyButton() {
            $('#apply-button').show();
            $('#apply-checkbox').hide();
        }

        $('#apply-job-application').on('change', function () {
            showApplyButton();
        });

        /**
         * Show Wechat qrcode popup for china segment
         * Just for desktop resolution
         */
        var chat = $('#wechat-popup');
        if (chat.length) {

            var chatContainer = $('.wechat-popup-container');
            var weChatPopup = new CustomModal({
                el: chatContainer,
                cookie: 'wechat',
                delay: 2,
                animation: 'fade'
            });

            $('.iconel').on('click', function () {
                var offSet = $(this).offset();
                chatContainer.css({
                    left: offSet.left,
                    top: offSet.top,
                    right: 'auto'
                });
                weChatPopup.open();
            });
            chatContainer.on('mouseleave', function () {
                weChatPopup.close({tempo: 'slow', delay: 1});
            });
        }

        /**
         * Mobile Size view btn creation
         * Get "view" from cookie
         */
        if (!_.isUndefined($.utils.getCookie('view')) && $.utils.getCookie('view') === 'full')
            $('.mobile-view-btn').removeClass('hidden');


        /**
         * Risk warning block
         * Doesn't work on:
         * - mobile version
         * - second step of registration
         */
        var riskWarning;
        riskWarning = $('#risk_warning');
        var riskWarningHeight = riskWarning.outerHeight() + 10;
        if (_.isUndefined(window.regStep2)) {
            new CustomModal({
                el: $('#risk_warning'),
                cookie: 'risk_warning',
                cookieLife: 10,
                sendCookieInt: 5,
                afterOpen: function () {
                    $('#lhc_status_container').css('bottom', riskWarningHeight);
                    $('.scroll-top-wrapper').css('bottom', riskWarningHeight);
                    //$('.pugh-icon').css('bottom', riskWarningHeight);
                },
                afterClose: function () {
                    $('#lhc_status_container').css('bottom', '10px');
                    $('.scroll-top-wrapper').css('bottom', '10px');
                    //$('.pugh-icon').css('bottom', '10px');
                }
            });
        }

        /**
         * Cookie policy block
         * Works only for EU
         */
        if (SITE.version !== 'global') {
            new CustomModal({
                el: $('#cookie_policy'),
                cookie: 'cookie_policy',
                cookieLife: 3600 * 24 * 365,
                animation: 'slide'
            });
        }

        /**
         * open news details in forex-news-timeline
         */
        if (location.pathname.indexOf('market-analysis/forex-news-timeline') >= 0) {
            var link = $('a[href="' + location.hash + '-details"]').click();

            $('html,body').animate({scrollTop: link});
        }

        if (-1 !== location.pathname.indexOf('sponsorship/beyond-the-track') && -1 !== location.href.indexOf('item=')) {
            var _item = getUrlParams('item');
            // var heightTop = $('.sticky-navbar').height();
            if (_item) {
                if (_item.match('#')) {
                    _item = _item.split('#')[0];
                }
                if ($('div.post-' + _item).length) {
                    $('html, body').animate({
                        scrollTop: $('div.post-' + _item).offset().top - 100
                    }, 400);
                }
            }
        }

        if ($(window).width() < 768) {
            $('.faq-desktop').remove();
        }

    });

    $('a.open-video').on("click", function () {

        var _src = $(this).attr('data-href');
        var itemHeight = $(this).height();
        var itemWidth = $(this).width();

        if (-1 === $.inArray(SITE.lang, ['zh', 'hk'])) {
            $('.yt_player_iframe').each(function () {
                this.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*')
            });
        }

        $(this).find('img').eq(0).replaceWith('<iframe class="yt_player_iframe" allow="autoplay" allowfullscreen="" allowscriptaccess="always" frameborder="0" height="'+itemHeight+'" width="'+itemWidth+'" src="' + _src + '"></iframe>');
        $(this).height(itemHeight);
        $(this).width(itemWidth);

    });

    /*Valery Rozov banner on homepage : start */

    //$(window).load(function () {
    function Rozov() {
        $('#vr-banner-inner .mountains').animate({
            bottom: 0
        }, 600);

        $('#vr-carousel-home').animate({
            top: 0
        }, {
            duration: 1000,
            complete: function () {
                $('#rozov-img').animate({left: '30%', top: '+=25px'}, 1000);

                if (SITE.dir === 'rtl') {
                    $('#rozov-img-rtl').animate({right: '30%', top: '+=25px'}, 1000);
                }
            }
        });

        $('#rozov-img').on('click', function () {
            $(this).animate({
                left: '+=2900',
                top: '+=750'
            }, 1200);
            var url = window.location = $(this).href;
            setTimeout(url, 2000);
        });
        $('#rozov-img-rtl').on('click', function () {
            $(this).animate({
                right: '+=2900',
                top: '+=750'
            }, 1200);
            var url = window.location = $(this).href;
            setTimeout(url, 2000);
        });

    }

    setTimeout(Rozov(), 500);
    //);
    /*Valery Rozov banner on homepage : send */

    // gallery videos:
    if ($('#vrVideoCarousel').length) {
        $('#vrVideoCarousel').carousel('pause');

        $('#vrVideoCarousel a.carousel-control, #vrVideoCarousel .carousel-indicators').on('click', function () {
            if (-1 === $.inArray(SITE.lang, ['zh', 'hk'])) {
                $('#videos iframe').each(function () {
                    // this.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
                    this.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                });
            }
        });
    }

    var currentVideoSrc = $('#vrVideoCarousel .active #currentVideo').attr('src');
    var currentVideoIframe = '<iframe width="560" height="315" src="' + currentVideoSrc + '" frameborder="0" allowfullscreen></iframe>';
    $('#videoEmbedCodeField').html(currentVideoIframe);

    $('#vrVideoCarousel').bind('slid.bs.carousel', function () {
        currentVideoSrc = $('#vrVideoCarousel .active #currentVideo').attr('src');
        currentVideoIframe = '<iframe width="560" height="315" src="' + currentVideoSrc + '" frameborder="0" allowfullscreen></iframe>';
        $('#videoEmbedCodeField').html(currentVideoIframe);
    });

    // communication with My
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + '://' + window.location.host;
    }

    window.addEventListener('message', function (event) {

        var loactionPath = location.pathname.replace(/^\/eu/, '').replace(/^\/uk/, '');

        if (event.data === 'eu') {
            window.location.href = '/eu' + loactionPath + location.search;
        } else if (event.data === 'global') {
            window.location.href = loactionPath + location.search;
        } else if (event.data === 'uk') {
            window.location.href = '/uk' + loactionPath + location.search;
        }
    }, false);

    var body;
    body = $('body');
    $('[toggle-btn-for]').each(function () {
        var target = $(this);
        var selectorToToggle = target.attr('toggle-btn-for');
        var eltToToggle = $(selectorToToggle);
        target.removeClass('toggle-btn-shown');
        eltToToggle.hide();

        target.on('click', function (e) {
            e.preventDefault();
            if (eltToToggle.is(':visible')) {
                target.removeClass('toggle-btn-shown');
                body.removeClass('toggle-content-opened');
            } else {
                target.addClass('toggle-btn-shown');
                if (eltToToggle.css('position') === 'fixed') {
                    body.addClass('toggle-content-opened');
                }
            }
            eltToToggle.slideToggle();
        });
    });


    // Popup for images
    $('.image-popups').each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            type: "image",
            removalDelay: 500,
            tLoading: Drupal.t('Loading...'),
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1],
                tCounter: Drupal.t('%curr% of %total%')
            },
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?rel=0&amp;showinfo=0'
                    }
                },
                srcAction: 'iframe_src'
            },
            callbacks: {
                beforeOpen: function () {
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            midClick: true
        });
    });

    if (jQuery(".webinars-tabs").length) {
        if (1 === jQuery(".webinars-tabs .nav-tabs li a").length) {
            jQuery(".webinars-tabs .tab-content .tab-pane:first").addClass('active');
        }
    }

    Drupal.t('Days');
    Drupal.t('Hours');
    Drupal.t('Minutes');
    Drupal.t('Seconds');

    /* !responsiveiframe.js */
    /* ---------------------------------------------------------------------- */
    function adjustIframes() {
        $('.social-facebook iframe').each(function () {
            var
                $this       = $(this),
                proportion  = $this.data( 'proportion' ),
                w           = $this.attr('width'),
                actual_w    = $this.width();

            if (!proportion) {
                proportion = $this.attr('height') / w;
                $this.data('proportion', proportion);
            }

            if (actual_w !== w) {
                $this.css('height', Math.round(actual_w * proportion) + 'px');
            }
        });
    }

    $(window).on('resize load', adjustIframes);

    jQuery(document).ready(function ($) {
        $(window).on('resize load', adjustIframes);
        adjustIframes();
    });

    /* Slider with thumb */
    /* ---------------------------------------------------------------------- */
    $('.slider-with-thumb').carousel({
        interval: 10000
    });

    function processImg(img) {
        var cssCls = img.prop('height') / img.prop('width') > 1.25 ? 'slide-align-by-height' : 'slide-align-by-width';
        img.addClass(cssCls);
    }

    $('.thumbcarousel .item').each(function () {
        var itemToClone = $(this);

        for (var i = 1; i < 4; i++) {
            itemToClone = itemToClone.next();

            if (!itemToClone.length) {
                itemToClone = $(this).siblings(':first');
            }
            itemToClone.children(':first-child').clone()
                .addClass("cloneditem-" + (i))
                .appendTo($(this));
        }
    });

    $('.slider-with-thumb img').each(function () {
        processImg($(this));
    });

    $(function () {

        var navheight = $("#main-scroll").height();

        $('a.scroll').on('click', function (e) {
            e.preventDefault();
            var top = $(this.hash).offset().top - navheight - 50;
            if ($(this.hash).length) {
                $('html,body').animate({scrollTop: top});
            }
        });
    });

    /* ------------- SHOW ME HOW MODAL VIDEO ---------------- */
    $(function () {
        var showMeHowVideoLink;
        var iframeSrc = $('#show_me_how_popup .modal-body iframe');

        $(".show-me-how .btn").on('click', function () {
            $(this).each(function () {
                showMeHowVideoLink = $(this).attr('href');
            });
        });
        $(function () {
            if ($(".tabbable.webinars-tabs").length) {
                if (1 === $(".webinars-tabs .nav-tabs li a").length) {
                    $(".webinars-tabs .nav-tabs li").css("pointer-events", "none");
                }
            }
        });

        var show_me_how_popup = $('#show_me_how_popup');
        show_me_how_popup.on('show.bs.modal', function () {
            iframeSrc.attr('src', showMeHowVideoLink + '?rel=0&amp;showinfo=0');
        });
        show_me_how_popup.on('hidden.bs.modal', function () {
            iframeSrc.attr('src', '');
        });
    });
    /* ------------- END: SHOW ME HOW MODAL VIDEO ---------------- */

    /* ------------- START: FOOTNOTE-LINKS ---------------- */
    $('sup a').on('click', function (e) {

        if (this.hash !== "") {
            e.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 500);
        }
    });
    /* ------------- END: FOOTNOTE-LINKS ---------------- */

    /*---------------Lewis Pugh Logo Animation ------------*/
    $(document).ready(function ($) {
        //set animation timing
        var animationDelay = 5000,
            //loading bar effect
            barAnimationDelay = 3800,
            barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
            //letters effect
            lettersDelay = 50,
            //type effect
            typeLettersDelay = 150,
            selectionDuration = 500,
            typeAnimationDelay = selectionDuration + 800,
            //clip effect
            revealDuration = 600,
            revealAnimationDelay = 4000;

        initHeadline();


        function initHeadline() {
            //insert <i> element for each letter of a changing word
            singleLetters($('.cd-headline-spec.letters').find('b'));
            //initialise headline animation
            animateHeadline($('.cd-headline-spec'));
        }

        function singleLetters($words) {
            $words.each(function () {
                var word = $(this),
                    letters = word.text().split(''),
                    selected = word.hasClass('is-visible');
                for (var i in letters) {
                    if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                    letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
                }
                var newLetters = letters.join('');
                word.html(newLetters);
            });
        }

        function animateHeadline($headlines) {
            var duration = animationDelay;
            $headlines.each(function () {
                var headline = $(this);

                if (headline.hasClass('loading-bar')) {
                    duration = barAnimationDelay;
                    setTimeout(function () {
                        headline.find('.cd-words-wrapper').addClass('is-loading')
                    }, barWaiting);
                } else if (headline.hasClass('clip')) {
                    var spanWrapper = headline.find('.cd-words-wrapper'),
                        newWidth = spanWrapper.width() + 10;
                    spanWrapper.css('width', newWidth);
                } else if (!headline.hasClass('type')) {
                    //assign to .cd-words-wrapper the width of its longest word
                    var words = headline.find('.cd-words-wrapper b'),
                        width = 0;
                    words.each(function () {
                        var wordWidth = $(this).width();
                        if (wordWidth > width) width = wordWidth;
                    });
                    headline.find('.cd-words-wrapper').css('width', width);
                }

                //trigger animation
                setTimeout(function () {
                    hideWord(headline.find('.is-visible').eq(0))
                }, duration);
            });
        }

        function hideWord($word) {
            var nextWord = takeNext($word);

            if ($word.parents('.cd-headline-spec').hasClass('type')) {
                var parentSpan = $word.parent('.cd-words-wrapper');
                parentSpan.addClass('selected').removeClass('waiting');
                setTimeout(function () {
                    parentSpan.removeClass('selected');
                    $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
                }, selectionDuration);
                setTimeout(function () {
                    showWord(nextWord, typeLettersDelay)
                }, typeAnimationDelay);

            } else if ($word.parents('.cd-headline-spec').hasClass('letters')) {
                var bool = ($word.children('i').length >= nextWord.children('i').length);
                hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
                showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

            } else if ($word.parents('.cd-headline-spec').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({
                    width: '2px'
                }, revealDuration, function () {
                    switchWord($word, nextWord);
                    showWord(nextWord);
                });

            } else if ($word.parents('.cd-headline-spec').hasClass('loading-bar')) {
                $word.parents('.cd-words-wrapper').removeClass('is-loading');
                switchWord($word, nextWord);
                setTimeout(function () {
                    hideWord(nextWord)
                }, barAnimationDelay);
                setTimeout(function () {
                    $word.parents('.cd-words-wrapper').addClass('is-loading')
                }, barWaiting);

            } else {
                switchWord($word, nextWord);
                setTimeout(function () {
                    hideWord(nextWord)
                }, animationDelay);
            }
        }

        function showWord($word, $duration) {
            if ($word.parents('.cd-headline-spec').hasClass('type')) {
                showLetter($word.find('i').eq(0), $word, false, $duration);
                $word.addClass('is-visible').removeClass('is-hidden');

            } else if ($word.parents('.cd-headline-spec').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({
                    'width': $word.width() + 10
                }, revealDuration, function () {
                    setTimeout(function () {
                        hideWord($word)
                    }, revealAnimationDelay);
                });
            }
        }

        function hideLetter($letter, $word, $bool, $duration) {
            $letter.removeClass('in').addClass('out');

            if (!$letter.is(':last-child')) {
                setTimeout(function () {
                    hideLetter($letter.next(), $word, $bool, $duration);
                }, $duration);
            } else if ($bool) {
                setTimeout(function () {
                    hideWord(takeNext($word))
                }, animationDelay);
            }

            if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
                var nextWord = takeNext($word);
                switchWord($word, nextWord);
            }
        }

        function showLetter($letter, $word, $bool, $duration) {
            $letter.addClass('in').removeClass('out');

            if (!$letter.is(':last-child')) {
                setTimeout(function () {
                    showLetter($letter.next(), $word, $bool, $duration);
                }, $duration);
            } else {
                if ($word.parents('.cd-headline-spec').hasClass('type')) {
                    setTimeout(function () {
                        $word.parents('.cd-words-wrapper').addClass('waiting');
                    }, 200);
                }
                if (!$bool) {
                    setTimeout(function () {
                        hideWord($word)
                    }, animationDelay)
                }
            }
        }

        function takeNext($word) {
            return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
        }

        function switchWord($oldWord, $newWord) {
            $oldWord.removeClass('is-visible').addClass('is-hidden');
            $newWord.removeClass('is-hidden').addClass('is-visible');
        }
    });
    /*---------------END: Lewis Pugh Logo Animation ------------*/

    $(function () {
        $('.extra a').each(function () {
            if ($(this).attr('href') === window.location.pathname) {
                $(this).parent().addClass('is-selected');
            }

            $(this).on('click', function () {
                if (isMobileDevice) {
                    window._paq.push(['trackEvent', 'Menu promo block - mobile', window.location.pathname, siteVersionForProactiveChat()]);
                } else {
                    window._paq.push(['trackEvent', 'Menu promo block - desktop', window.location.pathname, siteVersionForProactiveChat()]);
                }
            });
        });
        $('.extra-promo-block a').each(function () {
            if ($(this).attr('href') === window.location.pathname + window.location.search) {
                $(this).parent().addClass('is-selected');
            }
        });
    });

    if (SITE.version !== 'global') {
        $('.region-content-before').addClass('mobile-margin-top');
    }

    /*-------------------Scroll To The Top--------------------------*/
    $(function () {

        $(document).on('scroll', function () {

            if ($(window).scrollTop() > 100) {
                $('.scroll-top-wrapper').addClass('show');
            } else {
                $('.scroll-top-wrapper').removeClass('show');
            }
        });

        $('.scroll-top-wrapper').on('click', scrollToTop);
    });

    function scrollToTop() {
        verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
        offset = $('body').offset();
        offsetTop = offset.top;
        $('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
    }

    /*-------------------END: Scroll To The Top--------------------------*/

    /*------------------- Glossary letters Scroll -----------------------*/
    function glossaryLettersScroll() {
        $('.glossary_pagination a').click(function(){

            $(".active").removeClass("active");
            $(this).closest('li').addClass("active");
            var theClass = $(this).attr("class");
            $('.'+theClass).parent('li').addClass('active');

            var nav = $( $(this).attr('href') );
            if(nav.length) {
                $('html, body').stop().animate({
                    scrollTop: nav.offset().top - 130
                }, 400);
            }

            return false;
        });
    }
    glossaryLettersScroll();

    $("#top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    $('.glossary_categories').on('change', function() {
        var val = $(this).val();
        var selected_cat = $('.glossary_item.category-' + val);
        var items = $('.glossary_item');

        $(items).hide();
        $(items).parents('.row').hide();

        if(val){
            $(selected_cat).show();
            $(selected_cat).parents('.row').show();
        } else {
            // Show all categories if select default
            $(items).show();
            $(items).parents('.row').show();
        }
    });

    /*-------------------END: Glossary letters Scroll--------------------------*/

    $('select').each(function () {
        var select = $(this);
        var selectedValue = select.find('option[selected]').val();

        if (selectedValue) {
            select.val(selectedValue);
        } else {
            select.prop('selectedIndex', 0);
        }
    });

})(jQuery, Drupal);
;
(function($, SITE) {
    $(function() {
        $('.contact-phone').text(SITE.phones[GEOIP.country] || SITE.phones['default']);
    });
})(jQuery, SITE);;
/*!
 * jQuery Smart Banner
 * Copyright (c) 2012 Arnold Daniels <arnold@jasny.net>
 * Based on 'jQuery Smart Web App Banner' by Kurt Zenisek @ kzeni.com
 */
(function(root, factory) {
  if (typeof define == 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(root.jQuery);
  }
})(this, function($) {
  var UA = navigator.userAgent;
  var isEdge = /Edge/i.test(UA);
  var isChinese = window.SITE.lang == 'zh' || window.SITE.lang == 'zh-hant';

  var SmartBanner = function(options) {
    // Get the original margin-top of the HTML element so we can take that into account.
    this.origHtmlMargin = parseFloat($('html').css('margin-top'));
    this.options = $.extend({}, $.smartbanner.defaults, options);

    // Check if it's already a standalone web app or running within a webui view of an app (not mobile safari).
    var standalone = navigator.standalone;

    // Detect banner type (iOS or Android).
    if (this.options.force) {
      this.type = this.options.force;
    }
    else if (UA.match(/Windows Phone/i) !== null && UA.match(/Edge|Touch/i) !== null) {
      this.type = 'windows';
    }
    else if (UA.match(/iPhone|iPod/i) !== null || (UA.match(/iPad/) && this.options.iOSUniversalApp)) {
      /*if (UA.match(/Safari/i) !== null &&
          (UA.match(/CriOS/i) !== null ||
            window.Number(UA.substr(UA.indexOf('OS ') + 3, 3).replace('_', '.')) < 6)) {*/
        // Check webview and native smart banner support (iOS 6+).
        this.type = 'ios';
      //}
    }
    else if (UA.match(/\bSilk\/(.*\bMobile Safari\b)?/) || UA.match(/\bKF\w/) || UA.match('Kindle Fire')) {
      this.type = 'kindle';
    }
    else if (UA.match(/Android/i) !== null) {
      this.type = 'android';
    }
    // Don't show banner if device isn't iOS or Android, website is loaded in app or user dismissed banner.
    if (!this.type || standalone || this.getCookie('sb-closed') || this.getCookie('sb-installed')) {
      return;
    }
    // Calculate scale.
    this.scale = this.options.scale == 'auto' ? $(window).width() / window.screen.width : this.options.scale;
    if (this.scale < 1) {
      this.scale = 1;
    }
    // Get info from meta data.
    var meta = $(
      this.type == 'android'
        ? 'meta[name="google-play-app"]'
        : (this.type == 'ios'
            ? 'meta[name="apple-itunes-app"]'
            : (this.type == 'kindle'
                ? 'meta[name="kindle-fire-app"]'
                : 'meta[name="msApplication-ID"]'
              )
          )
    );

    if (!meta.length) {
      return;
    }
    // For Windows Store apps, get the PackageFamilyName for protocol launch.
    if (this.type == 'windows') {
      if (isEdge) {
        this.appId = $('meta[name="msApplication-PackageEdgeName"]').attr('content');
      }
      if (!this.appId) {
        this.appId = $('meta[name="msApplication-PackageFamilyName"]').attr('content');
      }
    }
    else {
      // Try to pull the appId out of the meta tag and store the result.
      var parsedMetaContent = /app-id=([^\s,]+)/.exec(meta.attr('content'));
      if (parsedMetaContent) {
        this.appId = parsedMetaContent[1];
      } else {
        return;
      }
    }
    this.title = this.options.title
      ? this.options.title
      : (meta.data('title') || $('title').text().replace(/\s*[|\-·].*$/, ''));

    this.author = this.options.author
      ? this.options.author
      : (meta.data('author') || ($('meta[name="author"]').length ? $('meta[name="author"]').attr('content') : window.location.hostname));

    this.iconUrl = meta.data('icon-url');
    this.price = meta.data('price');

    // Set default onInstall callback if not set in options.
    if (typeof this.options.onInstall == 'function') {
      this.options.onInstall = this.options.onInstall;
    } else {
      this.options.onInstall = function() {};
    }

    if (isChinese && this.type == 'android') {
      this.options.button = Drupal.t('DOWNLOAD');
      this.options.url = 'http://www.forextime.com/data/blocks/app/forextime.apk';
    }

    // Set default onClose callback if not set in options.
    if (typeof this.options.onClose == 'function') {
      this.options.onClose = this.options.onClose;
    } else {
      this.options.onClose = function() {};
    }
    // Create banner.
    this.create();
    this.show();
    this.listen();
  };

  SmartBanner.prototype = {

    constructor: SmartBanner,

    create: function() {
      var iconURL;
      var price = this.price || this.options.price;

      var link = this.options.url || (function() {
        switch (this.type) {
          case 'android':
            return 'market://details?id=';
          case 'kindle':
            return 'amzn://apps/android?asin=';
          case 'windows':
            return isEdge
              ? 'ms-windows-store://pdp/?productid='
              : 'ms-windows-store:navigate?appid=';
        }
        return 'https://itunes.apple.com/' + this.options.appStoreLanguage + '/app/id';
      }.call(this) + this.appId);

      var inStore = !price ? '' : (function() {
        var result = price + ' - ';
        switch (this.type) {
          case 'android':
            return isChinese
                ? this.options.price + ''
                : result + this.options.inGooglePlay;
          case 'kindle':
            return result + this.options.inAmazonAppStore;
          case 'windows':
            return result + this.options.inWindowsStore;
        }
        return result + this.options.inAppStore
      }.call(this));

      var gloss = this.options.iconGloss == null
        ? (this.type=='ios')
        : this.options.iconGloss;

      if (this.type == 'android' && this.options.GooglePlayParams) {
        link += '&referrer=' + this.options.GooglePlayParams;
      }
      var banner = (
        '<div id="smartbanner" class="' + this.type + '">' +
          '<div class="sb-container">' +
            '<a href="#" class="sb-close">&times;</a>' +
            '<span class="sb-icon"></span>' +
            '<div class="sb-info">' +
              '<strong>' + this.title + '</strong>' +
              '<span>' + this.author + '</span>' +
              '<span>' + inStore + '</span>' +
            '</div>' +
            '<a href="' + link + '" class="sb-button">' +
              '<span>' + this.options.button + '</span>' +
            '</a>' +
          '</div>' +
        '</div>'
      );
      if (this.options.layer) {
        $(this.options.appendToSelector).append(banner);
      } else {
        $(this.options.appendToSelector).prepend(banner);
      }
      if (this.options.icon) {
        iconURL = this.options.icon;
      } else if(this.iconUrl) {
        iconURL = this.iconUrl;
      } else if ($('link[rel="apple-touch-icon-precomposed"]').length > 0) {
        iconURL = $('link[rel="apple-touch-icon-precomposed"]').attr('href');
        if (this.options.iconGloss == null) {
          gloss = false;
        }
      } else if ($('link[rel="apple-touch-icon"]').length > 0) {
        iconURL = $('link[rel="apple-touch-icon"]').attr('href');
      } else if ($('meta[name="msApplication-TileImage"]').length > 0) {
        iconURL = $('meta[name="msApplication-TileImage"]').attr('content');
      } else if ($('meta[name="msapplication-TileImage"]').length > 0) {
        // Redundant because ms docs show two case usages.
        iconURL = $('meta[name="msapplication-TileImage"]').attr('content');
      }
      if (iconURL) {
        $('#smartbanner .sb-icon').css('background-image', 'url(' + iconURL + ')');
        if (gloss) {
          $('#smartbanner .sb-icon').addClass('gloss');
        }
      } else{
        $('#smartbanner').addClass('no-icon');
      }
      this.bannerHeight = $('#smartbanner').outerHeight() + 2;

      if (this.scale > 1) {
        $('#smartbanner')
          .css('top', parseFloat($('#smartbanner').css('top')) * this.scale)
          .css('height', parseFloat($('#smartbanner').css('height')) * this.scale)
          .hide();
        $('#smartbanner .sb-container')
          .css('-webkit-transform', 'scale(' + this.scale + ')')
          .css('-msie-transform', 'scale(' + this.scale + ')')
          .css('-moz-transform', 'scale(' + this.scale + ')')
          .css('width', $(window).width() / this.scale);
      }
      $('#smartbanner')
        .css('position', this.options.layer ? 'absolute' : 'static');
    },

    listen: function() {
      $('#smartbanner .sb-close').on('click', $.proxy(this.close, this));
      $('#smartbanner .sb-button').on('click', $.proxy(this.install, this));
    },

    show: function(callback) {
      var banner = $('#smartbanner');
      banner.stop();

      if (this.options.layer) {
        banner
          .animate({ top: 0, display: 'block' }, this.options.speedIn)
          .addClass('shown')
          .show();
        $(this.pushSelector)
          .animate({
            paddingTop: this.origHtmlMargin + (this.bannerHeight * this.scale)
          }, this.options.speedIn, 'swing', callback);
      }
      else {
        if ($.support.transition) {
          banner.animate({ top: 0 }, this.options.speedIn).addClass('shown');
          var transitionCallback = function() {
            $('html').removeClass('sb-animation');
            if (callback) {
              callback();
            }
          };
          $(this.pushSelector)
            .addClass('sb-animation')
            .one($.support.transition.end, transitionCallback)
            .emulateTransitionEnd(this.options.speedIn)
            .css('margin-top', this.origHtmlMargin + (this.bannerHeight * this.scale));
        }
        else {
          banner
            .slideDown(this.options.speedIn)
            .addClass('shown');
        }
      }
    },

    hide: function(callback) {
      var banner = $('#smartbanner');
      banner.stop();

      if (this.options.layer) {
        banner.animate({
          top: -1 * this.bannerHeight * this.scale,
          display: 'block'
        }, this.options.speedIn)
        .removeClass('shown');

        $(this.pushSelector)
          .animate({
            paddingTop: this.origHtmlMargin
          }, this.options.speedIn, 'swing', callback);
      }
      else {
        if ($.support.transition) {
          if (this.type !== 'android') {
            banner
              .css('top', -1 * this.bannerHeight * this.scale)
              .removeClass('shown');
          }
          else {
            banner
              .css({display:'none'})
              .removeClass('shown');
          }
          var transitionCallback = function() {
            $('html').removeClass('sb-animation');
            if (callback) {
              callback();
            }
          };
          $(this.pushSelector)
            .addClass('sb-animation')
            .one($.support.transition.end, transitionCallback)
            .emulateTransitionEnd(this.options.speedOut)
            .css('margin-top', this.origHtmlMargin);
        }
        else {
          banner.slideUp(this.options.speedOut).removeClass('shown');
        }
      }
    },

    close: function(e) {
      e.preventDefault();
      this.hide();
      this.setCookie('sb-closed', 'true', this.options.daysHidden);
      this.options.onClose(e);
    },

    install: function(e) {
      if (this.options.hideOnInstall) {
        this.hide();
      }
      this.setCookie('sb-installed', 'true', this.options.daysReminder);
      this.options.onInstall(e);
    },

    setCookie: function(name, value, exdays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + exdays);
      value = encodeURI(value) + ((exdays == null) ? '' : '; expires=' + exdate.toUTCString());
      document.cookie = name + '=' + value + '; path=/;';
    },

    getCookie: function(name) {
      var i, x, y, ARRcookies = document.cookie.split(';');
      for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, '');
        if (x == name) {
          return decodeURI(y);
        }
      }
      return null;
    },

    // Demo only.
    switchType: function() {
      var that = this;

      this.hide(function() {
        that.type = that.type == 'android' ? 'ios' : 'android';
        var meta = $(that.type == 'android' ? 'meta[name="google-play-app"]' : 'meta[name="apple-itunes-app"]').attr('content');
        that.appId = /app-id=([^\s,]+)/.exec(meta)[1];

        $('#smartbanner').detach();
        that.create();
        that.show();
      });
    }
  };

  $.smartbanner = function(option) {
    var $window = $(window);
    var data = $window.data('smartbanner');
    var options = typeof option == 'object' && option;
    if (!data) {
      $window.data('smartbanner', (data = new SmartBanner(options)));
    }
    if (typeof option == 'string') {
      data[option]();
    }
  };

  // override these globally if you like (they are all optional)
    if ( !(/(iPad|iPhone|iPod).*OS [6-7].*AppleWebKit.*Mobile.*Safari/.test(navigator.userAgent)) ) {
        $.smartbanner.defaults = {
            title: null, // What the title of the app should be in the banner (defaults to <title>)
            author: null, // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
            price: Drupal.t('FREE'), // Price of the app
            appStoreLanguage: 'us', // Language code for App Store
            inAppStore: Drupal.t('On the App Store'), // Text of price for iOS
            inGooglePlay: Drupal.t('In Google Play'), // Text of price for Android
            inAmazonAppStore: Drupal.t('In the Amazon Appstore'),
            inWindowsStore: Drupal.t('In the Windows Store'), //Text of price for Windows
            GooglePlayParams: null, // Aditional parameters for the market
            icon: null, // The URL of the icon (defaults to <meta name="apple-touch-icon">)
            iconGloss: null, // Force gloss effect for iOS even for precomposed
            button: Drupal.t('VIEW'), // Text for the install button
            url: null, // The URL for the button. Keep null if you want the button to link to the app store.
            scale: 'auto', // Scale based on viewport size (set to 1 to disable)
            speedIn: 300, // Show animation speed of the banner
            speedOut: 400, // Close animation speed of the banner
            daysHidden: 15, // Duration to hide the banner after being closed (0 = always show banner)
            daysReminder: 90, // Duration to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
            force: null, // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
            hideOnInstall: true, // Hide the banner after "VIEW" is clicked.
            layer: false, // Display as overlay layer or slide down the page
            iOSUniversalApp: true, // If the iOS App is a universal app for both iPad and iPhone, display Smart Banner to iPad users, too.
            appendToSelector: 'body', //Append the banner to a specific selector
            pushSelector: 'html' // What element is going to push the site content down; this is where the banner append animation will start.
        };
    }

  $.smartbanner.Constructor = SmartBanner;

  // ============================================================
  // Bootstrap transition
  // Copyright 2011-2014 Twitter, Inc.
  // Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)

  function transitionEnd () {
    var el = document.createElement('smartbanner');

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {end: transEndEventNames[name]};
      }
    }
    // Explicit for ie8.
    return false;
  }
  if ($.support.transition !== undefined) {
    // Prevent conflict with Twitter Bootstrap.
    return;
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function(duration) {
    var called = false, $el = this;
    $(this).one($.support.transition.end, function() {
      called = true;
    });
    var callback = function() {
      if (!called) {
        $($el).trigger($.support.transition.end);
      }
    };
    setTimeout(callback, duration);
    return this;
  };

  $(function() {
    $.support.transition = transitionEnd();
  });
  // ============================================================
});
;
/**
 * Created by Sergey.Kudryashov on 5/9/2017.
 */

(function($, Drupal){
    
    $(function(){
        
        

        function isLocalStorageNameSupported()
        {
            var testKey = 'test', storage = window.localStorage;
            try
            {
                storage.setItem(testKey, '1');
                storage.removeItem(testKey);
                return true;
            }
            catch (error)
            {
                console.warn('LocalStorage is not supported');
                return false;
            }
        }

        function setLocalStorageItem(cookieName, hits){
            if(isLocalStorageNameSupported()){
                localStorage.setItem(cookieName, hits);
            }

        }

        // TRACK USER's PATH
        function trackUsersPath(){

            log('track user', $.utils.getCookie('trackUserPath') || 'no');



            var cookieName = 'hits';
            var path = window.document.location.pathname;
            var hits = localStorage.getItem(cookieName);

            log('hits', hits);

            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 1000 * 86000 * 45;
            now.setTime(expireTime);

            if(hits){
                hits += '|' + Math.floor((time) / 1000) + ':' + path;
            }else{
                hits = Math.floor((time) / 1000) + ':' + path;
            }

            setLocalStorageItem(cookieName, hits);

        }
        trackUsersPath();

        function clearUsersPath(){
            var cookieName = 'hits';
            setLocalStorageItem(cookieName, '');
        }

        function sendUserPathWithPostMessage(){

            var cookieName = 'hits';
            var path = localStorage.getItem(cookieName);

            window.iframeWin = document.getElementById("registration-step1-widget-iframe").contentWindow,
                src = $('#registration-step1-widget-iframe').attr('src').split('?');

            iframeWin.postMessage({event: 'sendUserPath', action: path}, src[0]);
        }

        window.getUserPath = function(){

            var cookieName = 'hits';
            return localStorage.getItem(cookieName);

        };

        window.clearUserPath = function(){

            clearUsersPath();

        };

        window.addEventListener("message", function(evt){



            var data = evt.data;
            if (data) {
                if (data == 'widgetIsReady') {
                    sendUserPathWithPostMessage();
                }

                if (data == 'clearUserPath') {
                    clearUsersPath();
                }
            }
        }, false);

        
    });
    
})(jQuery, Drupal);;
(function ($, Drupal) {

$(function () {

    Backbone.Validation.configure({
        forceUpdate: true
    });

    _.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');

            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
        },
        invalid: function (view, attr, error, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');

            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
        }
    });

    var CallBackModel = Backbone.Model.extend({
        validation: {
            first_name: {
                required: true,
                pattern: /^[a-zA-Z-\s]{1,50}$/,
                msg: Drupal.t('Name is invalid')
            },
            email: {
                required: true,
                pattern: 'email'
            },
            phone: {
                required: true,
                minLength: 9,
                maxLength: 31,
                pattern: /^\+?([0-9]{9,31})$/
            }
        }
    });

    var CallBackForm = Backbone.View.extend({
        events: {
            'click #callBackSubmitButton': function (e) {
                e.preventDefault();
                this.callBack();
            },
            'click #captcha-refresh': function(e){
                e.preventDefault();
                this.callBack(true);
            },
            'change #residence_country': function(e) {
                if($(e.currentTarget).find('option:selected').data('tel') == 0) {
                    if($('body').hasClass('rtl')) {
                        $('#phone').css('direction', 'rtl');
                    }
                    $('#phone').val('').attr('disabled', true);
                } else {
                    $('#phone').attr('disabled', false);
                    if($('body').hasClass('rtl')) {
                        $('#phone').css('direction', 'ltr');
                    }
                    this.addCountryCode($(e.currentTarget).find('option:selected').data('tel'));
                }
            }
        },

        bindings: {
            '[name=first_name]': {
                observe: 'first_name',
                setOptions: {
                    validate: true
                }
            },
            '[name=email]': {
                observe: 'email',
                setOptions: {
                    validate: true
                }
            },
            '[name=phone]': {
                observe: 'phone',
                setOptions: {
                    validate: true
                }
            }
        },

        // Adding country code to #phone field
        addCountryCode: function (v) {
            v = v || '';
            $('#phone').val('+' + v);
        },

        initialize: function () {
            Backbone.Validation.bind(this);
        },

        render: function() {
            this.stickit();
            return this;
        },

        callBack: function (captcha) {
            var data = this.$el.serializeObject();

            var x = this;

            var successCallbackText = Drupal.t('We received your initial request, a member of our Customer Support team will call you shortly.');
            var errorCallbackText = Drupal.t('You have reached the maximum number of requests. You can still contact us via another communication channel or make a new call-back request in an hour.');
            var errorCallbackPreviousRequestText = Drupal.t('All lines are busy at the moment, a member of our Customer Support team will call you within 10 minutes.');

            this.model.set(data);
            log('callBack send data', data);
            if(this.model.isValid(true)) {

                $('#callBackSubmitButton').addClass('loading').attr('disabled', true);
                $.ajax({
                    url: "/js/fxtm_core/callback",
                    dataType: 'json',
                    type: "POST",
                    data: 'company=' + data.company + '&phone=' + data.phone + '&first_name=' + data.first_name + '&language=' + data.language + '&email=' + data.email + '&action=' + (captcha ? 'captcha' : 'callback') + (data.captcha ? ('&captcha_code=' + data.captcha + '&captcha_sid=' + x.captchaSid) : ''),
                    // data: 'phone=+3809761486821&name=John&language=ko&email=test@test1.cm&company=1&action=callback&captcha_sid=2&captcha_code=pzhb4',
                    // data: 'action=captcha',
                    success: function(res){
                        if(res.errors && res.errors.status == 422) {
                            if(res.errors.validation_messages.email.emailAddressInvalid) {
                                $('.email-error').html(res.errors.validation_messages.email.emailAddressInvalid).removeClass('hidden').css('color', 'red');
                            } else {
                                $('.tabbable').hide();
                                $('.thanks').show();
                                $('.success-callback').hide();
                                if(res.errors.validation_messages.form && res.errors.validation_messages.form.previous_request) {
                                    $('.valid-error').show().html(errorCallbackPreviousRequestText);
                                } else {
                                    $('.valid-error').show().html(errorCallbackText);
                                }
                            }
                        } else if(res.data && res.data.captcha) {
                            x.captchaSid = res.data.captcha.sid;
                            $('.captcha-block').html('<div id="callback_captcha_inner"><p>'+Drupal.t('Please enter the letters and numbers you see in the box below.')+
                                '</p><div class="captcha-inner"></div><img style="width: 40%;height: 50px;float: left;" class="form-control" src="'+res.data.captcha.url+'" alt=""><a id="captcha-refresh" class="btn color-salad captcha-refresh icon-spin m0" href="#" style="width: 19%;padding-top: 12px;"></a><input type="text" name="captcha" class="form-control" style="width: 40%;height: 50px;float: right;"></div>');
                        } else {
                            $('.tabbable').hide();
                            $('.thanks').show();
                            $('.success-callback').show().html(successCallbackText);
                            $('.valid-error').hide();
                            $('#callback_captcha_inner').remove();
                        }
                        $('#callBackSubmitButton').removeClass('loading').attr('disabled', false);
                    },
                    error: function(res) {
                        $('#callBackSubmitButton').removeClass('loading').attr('disabled', false);
                    }
                });
            }
        },

        remove: function() {
            Backbone.Validation.unbind(this);
            return Backbone.View.prototype.remove.apply(this, arguments);
        }
    });

    $(function () {
        var view = new CallBackForm({
            el: 'form',
            model: new CallBackModel()
        });
        view.render();
    });

    // https://github.com/hongymagic/jQuery.serializeObject
    $.fn.serializeObject = function () {
        "use strict";
        var a = {}, b = function (b, c) {
            var d = a[c.name];
            "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
        };
        return $.each(this.serializeArray(), b), a
    };

});

})(jQuery, Drupal);;
(function($){

window.widgetTools = function(widget){


	/** Send event to PIWIK 
	 * Exclude from forextime.com
	 */
	if('undefined' != typeof Drupal.settings.fxtm_widget && Drupal.settings.fxtm_widget.referer.indexOf('//www.forextime.com') == -1)
		_paq.push(['trackEvent', 'WidgetExecuted', Drupal.settings.fxtm_widget.widget_type + '_' + Drupal.settings.fxtm_widget.widget_theme, Drupal.settings.fxtm_widget.referer]);


	var x = this;
	x.w = widget;
	x.popup = x.w.find('.widget-popup');

	x.w.find('.widget-info').on('click', function(){
		x.popup.stop().fadeIn();
	});	
	x.w.find('.widget-popup-close').on('click', function(){
		x.popup.stop().fadeOut();
	});


}

})(jQuery);;
