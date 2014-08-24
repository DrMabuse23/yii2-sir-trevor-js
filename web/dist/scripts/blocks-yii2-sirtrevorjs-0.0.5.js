/**
 * Created by pascal on 20.07.14.
 */

/*
 An example of a SirTrevor.Block
 --
 Author: C J Bell @ madebymany
 */

SirTrevor.Blocks.Code = (function(){

    return SirTrevor.Block.extend({

        // String; Names the block
        // Note – please use underscores when naming
        // Eg example_block should be ExampleBlock
        type: 'code',

        // Function; the title displayed in the toolbar
        // Can return a translated string (if required)
        title: function() {
            return i18n.t('blocks:code:title');
        },
        icon_name: 'code',

        // Boolean; show this blockType of the toolbar
        toolbarEnabled: true,

        // Block Mixins
        // Allow different UI components / methods to be mixed into the block

        // Enable drop functionality on the block
        droppable: false,

        // Enable paste functionality (to paste URLS etc)
        pastable: false,

        // Enable an upload button to be added
        // Mixins Ajaxable automatically
        // Exposes an uploader method
        // Usage: this.uploader(file, success, failure)
        uploadable: false,

        // Enable queued remote fetching
        // Exposes a small wrapper around the $.ajax method
        // Usage: this.fetch(ajaxOptions, success, failure)
        fetchable: false,

        // Add an ajax queue to the block
        // Added to uploadable & fetchable automatically
        ajaxable: false,

        // Overwritable mixin options:
        // --
        drop_options: {
            // String; (can use underscore template tags)
            // Defines the HTML for the dropzone template
            html: "<div class='st-block__dropzone'></div>",
            // Boolean;
            // On re-order, should we re-render this item.
            // Useful for when re-ordering iframes (like Twitter)
            re_render_on_reorder: false
        },

        paste_options: {
            // String; (can use underscore template tags)
            // Defines the HTML for the paste template
            html: "<code><pre class=\"st-paste-block prettyprint linenmus\"></pre></code>"
        },

        upload_options: {
            // String; (can use underscore template tags)
            // Defines the HTML for the upload template
            html: "<input type=\"file\" type=\"st-file-upload\">"
        },

        formattable: true,

        // String or Function; The HTML for the inner portion of the editor block
        // In this example, the editorHTML is an editable input div (like we use for a TextBlock)

        // Classes:
        // st-required   – indicates this input must be present to pass validation
        // st-text-block – gives the block the ability to use the formatting controls

        editorHTML: function() {
            return "<code><pre class='st-text-block prettyprint linenmus' contenteditable='true'></pre></code>";
        },

        // Element shorthands
        // --
        // this.$el
        // this.el
        // this.$inner                  (the inner container for the block)
        // this.$editor                 (contains all the UI inputs for the block)
        // this.$inputs                 (contains all the UI inputs for blocks that are uploadable / droppable / pastable)
        // this.getTextBlock()          (shorthand for this.$el.find('.st-text-block'))
        // this.$(selector)             (shorthand for this.$el.find(selector))

        // Validations
        // --
        // Required fields (with .st-required class) always get validted
        // Called using the validateField method
        // Set a data-st-name="Field Name" on your required inputs to use it in the validation fail message

        // Array; defines custom validator methods to call
        validations: ['myCustomValidator'],

        // Example custom validator
        myCustomValidator: function() {
            var field = this.$('.a-field');

            if (field.val() === 'herp derp') {
                this.setError(field, "A validation fail message");
            }
        },

        // Function; Executed on render of the block if some data is provided.
        // LoadData gives us a means to convert JSON data into the editor dom
        // In this example we convert the text from markdown to HTML and show it inside the element
        loadData: function(data){
            this.getTextBlock().html(SirTrevor.toHTML(data.text, this.type));
        },

        // Function; Executed on save of the block, once the block is validated
        // toData expects a way for the block to be transformed from inputs into structured data
        // The default toData function provides a pretty comprehensive way of turning data into JSON
        // In this example we take the text data and save it to the data object on the block
        toData: function(){
            var dataObj = {};

            var content = this.getTextBlock().html();
            if (content.length > 0) {
                dataObj.text = SirTrevor.toMarkdown(content, this.type);
            }

            this.setData(dataObj);
        },

        // Function; Returns true or false whether there is data in the block
        isEmpty: function() {
            return _.isEmpty(this.saveAndGetData()); // Default implementation
        },

        // Other data functions
        // --
        // getData            – returns the data in the store
        // save               - Invokes the toData method
        // saveAndReturnData  - Saves and returns the entire store
        // saveAndGetData     - Save and only return the data part of the store


        // Function; Hook executed at the end of the block rendering method.
        // Useful for initialising extra pieces of UI or binding extra events.
        // In this example we add an extra button, just because.
        onBlockRender: function() {

//            this.$editor.append($('<button>', {
//                click: function() {
//                    alert('Yo dawg, you clicked my button');
//                }
//            }));
        },

        // Function; Optional hook method executed before the rendering of a block
        // Beware, $el and any shorthand element variables won't be setup here.
        beforeBlockRender: function() {},

        // Function; Executed once content has been dropped onto the dropzone of this block
        // Only required if you have enabled dropping and have provided a dropzone for this block
        // Always is passed the ev.transferData object from the drop
        // Please see the image block (https://github.com/madebymany/sir-trevor-js/blob/master/src/blocks/image.js) for an example
        onDrop: function(transferData) {},

        // Function; executed once content has been pasted into a pastable block
        // See the tweet block as an example (https://github.com/madebymany/sir-trevor-js/blob/master/src/blocks/tweet.js)
        onContentPasted: function(event) {},

        // Block level messages
        // --
        // addMessage(msg, additionalClass)
        // Adds a new message onto the block

        // resetMessages()
        // Clears all existing messages

        // Helper methods
        // --
        // loading()
        // ready()
        // hasTextBlock()
        // remove()

        // Function; Any extra markdown parsing can be defined in here.
        // Returns; String (Required)
        toMarkdown: function(markdown) {
            return markdown.replace(/^(.+)$/mg,"> $1");
        },

        // Function; Any extra HTML parsing can be defined in here.
        // Returns; String (Required)
        toHTML: function(html) {
            return html;
        }
    });

})();
/**
 * Created by pascal on 20.07.14.
 */
SirTrevor.Blocks.Columns = (function() {
    return SirTrevor.Block.extend({
        type: "Columns",
        title: function() { return i18n.t('blocks:columns:title'); },
        icon_name: 'columns',

        columns_presets: {
            'columns-6-6': [6,6],
            'columns-3-9': [3,9],
            'columns-9-3': [9,3],
            'columns-4-8': [4,8],
            'columns-8-4': [8,4],
            'columns-4-4-4': [4,4,4],
            'columns-3-6-3': [3,6,3],
            'columns-3-3-3-3': [3,3,3,3]
        },

        controllable: true,

        constructor: function(data, instance_id, sirTrevor) {
            SirTrevor.Block.apply(this, arguments);
        },

        beforeBlockRender: function() {
            this.controls = {
                'twocolumns': this.changeColumnsHandler('columns-6-6'),
                'threecolumns': this.changeColumnsHandler('columns-4-4-4'),
                'onetwocolumns': this.changeColumnsHandler('columns-4-8'),
                'twoonecolumns': this.changeColumnsHandler('columns-8-4'),
                'fourcolumns': this.changeColumnsHandler('columns-3-3-3-3'),
                'onethreecolumns': this.changeColumnsHandler('columns-3-9'),
                'threeonecolumns': this.changeColumnsHandler('columns-9-3'),
                'onetwoonecolumns': this.changeColumnsHandler('columns-3-6-3')
            };
        },

        changeColumnsHandler: function(preset) {
            var self = this;
            return function() { self.changeColumns(preset, false) };
        },

        changeColumns: function(preset) {
            if (this.columns_preset != preset)
            {
                this.applyColumns(preset);
            }
        },

        editorHTML: function() {
            return _.template(
                '<div class="columns-row" id="<%= blockID %>-columns-row" style="overflow: auto"/>'
                , {blockID: this.blockID})
        },

        _setBlockInner: function() {
            SirTrevor.Block.prototype._setBlockInner.apply(this, arguments);
            this.applyColumns('columns-6-6', true); /* default */
        },

        applyColumns: function(preset, initial)
        {
            var self = this;
            var columns_config = this.columns_presets[preset];

            var $to_delete = this.getColumns(':gt('+(columns_config.length-1)+')');
            // if there are unneeded columns
            if ($to_delete.length > 0) {
                // ask confirmation only if there are nested blocks
                if ($to_delete.children('.st-block').length > 0)
                {
                    var txt = $to_delete.length == 1 ? 'column' : ($to_delete.length + ' columns');
                    if (!confirm('This action will delete last ' + txt + '. Do you really want to proceed?')) {
                        return; // interrupt if "Cancel" is pressed
                    }
                }
                $to_delete.each(function() {
                    var $this = $(this);
                    // destroy nested blocks properly
                    $this.children('.st-block').each(function() {
                        self.sirTrevor.removeBlock(this.getAttribute('id'));
                    });
                    // destroy column itself
                    $this.trigger('destroy').remove();
                });
            }

            // apply new configuration
            var total_width = _.reduce(columns_config, function(total, width){ return total+width; }, 0);
            var $row = this.$('.columns-row');

            _.each(columns_config, function(ratio, i) {
                var width = Math.round(ratio*1000*100/total_width)/1000;

                var $column = self.getColumn(i);
                if ($column.length == 0) {
                    $column = $('<div class="column" style="float: left; "></div>');
                    var plus = new SirTrevor.FloatingBlockControls($column, self.instanceID);
                    self.listenTo(plus, 'showBlockControls', self.sirTrevor.showBlockControls);
                    $column.prepend(plus.render().$el);
                    $row.append($column);
                }

                $column.css('width', width+'%');
            });

            this.$('.st-block-control-ui-btn').removeClass('active')
                .filter('[data-icon='+preset+']').addClass('active');

            this.columns_preset = preset;

            if (!initial) this.trigger('block:columns:change');
        },

        onBlockRender: function() {
            this.$('.st-block-control-ui-btn').filter('[data-icon='+this.columns_preset+']').addClass('active');
        },

        getRow: function() {
            if (this.$row) return this.$row;
            return this.$row = this.$('#'+this.blockID+'-columns-row');
        },

        getColumns: function(filter) {
            return this.getRow().children(filter);
        },

        getColumn: function(index) {
            return this.getRow().children(':eq('+index+')');
        },

        toData: function() {
            var self = this;
            var column_config = this.columns_presets[this.columns_preset];
            var dataObj = { columns: [], preset: this.columns_preset };

            this.getColumns().each(function(i) {
                var blocksData = [];
                $(this).children('.st-block').each(function(){
                    var block = self.sirTrevor.findBlockById(this.getAttribute('id'));
                    blocksData.push(block.saveAndReturnData());
                });

                dataObj.columns.push({
                    width: column_config[i],
                    blocks: blocksData
                });
            });

            this.setData(dataObj);
        },

        loadData: function(data)
        {
            if (data.preset) {
                this.applyColumns(data.preset, true);
            }

            var columns_data = (data.columns || []);
            for (var i=0; i<columns_data.length; i++)
            {
                var $block = null;
                var $column = this.getColumn(i);
                for (var j=0; j<columns_data[i].blocks.length; j++) {
                    var block = columns_data[i].blocks[j];
                    $block = this.sirTrevor.createBlock(block.type, block.data, $block ? $block.$el : $column.children('.st-block-controls__top'));
                }
            }
        },

        _initUIComponents: function() {
            SirTrevor.Block.prototype._initUIComponents.apply(this, arguments);
        },

        performValidations: function() {
            // nothing
        }
    });
})();
/**
 * Created by pascal on 20.07.14.
 */
/*
 An example of a SirTrevor.Block
 --
 Author: C J Bell @ madebymany
 */

SirTrevor.Blocks.Gallery = (function(){

    return SirTrevor.Block.extend({

        // String; Names the block
        // Note – please use underscores when naming
        // Eg example_block should be ExampleBlock
        type: 'gallery',

        // Function; the title displayed in the toolbar
        // Can return a translated string (if required)
        title: function() {
            return i18n.t('blocks:gallery:title');
//            return "Media";
        },

        // Boolean; show this blockType of the toolbar
        toolbarEnabled: true,

        // Block Mixins
        // Allow different UI components / methods to be mixed into the block

        // Enable drop functionality on the block
        droppable: true,

        // Enable paste functionality (to paste URLS etc)
        pastable: false,

        // Enable an upload button to be added
        // Mixins Ajaxable automatically
        // Exposes an uploader method
        // Usage: this.uploader(file, success, failure)
        uploadable: false,

        // Enable queued remote fetching
        // Exposes a small wrapper around the $.ajax method
        // Usage: this.fetch(ajaxOptions, success, failure)
        fetchable: false,

        // Add an ajax queue to the block
        // Added to uploadable & fetchable automatically
        ajaxable: false,

        // Overwritable mixin options:
        // --
        drop_options: {
            // String; (can use underscore template tags)
            // Defines the HTML for the dropzone template
            //html: "<div class='st-block__dropzone'></div>",
            // Boolean;
            // On re-order, should we re-render this item.
            // Useful for when re-ordering iframes (like Twitter)
            re_render_on_reorder: false
        },

        paste_options: {
            // String; (can use underscore template tags)
            // Defines the HTML for the paste template
            html: "<input type=\"text\" class=\"st-paste-block\">"
        },

        upload_options: {
            // String; (can use underscore template tags)
            // Defines the HTML for the upload template
            html: "<input type=\"file\" type=\"st-file-upload\">"
        },

        formattable: false,

        // String or Function; The HTML for the inner portion of the editor block
        // In this example, the editorHTML is an editable input div (like we use for a TextBlock)

        // Classes:
        // st-required   – indicates this input must be present to pass validation
        // st-text-block – gives the block the ability to use the formatting controls

        editorHTML: function() {
            return "<div class='st-gallery-editor'></div>"
        },

        // Element shorthands
        // --
        // this.$el
        // this.el
        // this.$inner                  (the inner container for the block)
        // this.$editor                 (contains all the UI inputs for the block)
        // this.$inputs                 (contains all the UI inputs for blocks that are uploadable / droppable / pastable)
        // this.getTextBlock()          (shorthand for this.$el.find('.st-text-block'))
        // this.$(selector)             (shorthand for this.$el.find(selector))

        // Validations
        // --
        // Required fields (with .st-required class) always get validted
        // Called using the validateField method
        // Set a data-st-name="Field Name" on your required inputs to use it in the validation fail message

        // Array; defines custom validator methods to call
        // validations: ['myCustomValidator'],

        // // Example custom validator
        // myCustomValidator: function() {
        //   var field = this.$('.a-field');

        //   if (field.val() === 'herp derp') {
        //     this.setError(field, "A validation fail message");
        //   }
        // },

        // Function; Executed on render of the block if some data is provided.
        // LoadData gives us a means to convert JSON data into the editor dom
        // In this example we convert the text from markdown to HTML and show it inside the element
        loadData: function(data){
            var sir = this
            gallery = this.$("div.st-gallery-editor");
            gallery.html("");
            if (data && data.length > 0) {
                _.each(data, sir.appendImageToGallery, this);
            }
            this.$inputs.show();
            if (data.length >= 1){
                this.$editor.show();
            }
        },

        // Function; Executed on save of the block, once the block is validated
        // toData expects a way for the block to be transformed from inputs into structured data
        // The default toData function provides a pretty comprehensive way of turning data into JSON
        // In this example we take the text data and save it to the data object on the block
        // toData: function(){
        //   // return true;
        //   // var dataObj = {};

        //   // var content = this.getTextBlock().html();
        //   // if (content.length > 0) {
        //   //   dataObj.text = SirTrevor.toMarkdown(content, this.type);
        //   // }

        //   // this.setData(dataObj);
        // },

        // Function; Returns true or false whether there is data in the block
        isEmpty: function() {
            return _.isEmpty(this.saveAndGetData()); // Default implementation
        },

        // Other data functions
        // --
        // getData            – returns the data in the store
        // save               - Invokes the toData method
        // saveAndReturnData  - Saves and returns the entire store
        // saveAndGetData     - Save and only return the data part of the store


        // Function; Hook executed at the end of the block rendering method.
        // Useful for initialising extra pieces of UI or binding extra events.
        // In this example we add an extra button, just because.
        onBlockRender: function() {
            //console.log(this.getData());
            this.$inputs.append("<div class='st-gallery-browser'></div>");
            browser = this.$("div.st-gallery-browser");
            this.fetchGallery(browser);
            // this.$editor.append($('<button>', {
            //   click: function() {
            //     alert('Yo dawg, you clicked my button');
            //   }
            // }));
        },

        // Function; Optional hook method executed before the rendering of a block
        // Beware, $el and any shorthand element variables won't be setup here.
        beforeBlockRender: function() {},

        // Function; Executed once content has been dropped onto the dropzone of this block
        // Only required if you have enabled dropping and have provided a dropzone for this block
        // Always is passed the ev.transferData object from the drop
        // Please see the image block (https://github.com/madebymany/sir-trevor-js/blob/master/src/blocks/image.js) for an example
        onDrop: function(transferData) {
            var sir = this;
            transferData.items[0].getAsString(function(e){
                sir.addImage(e, sir);
            });
        },

        addImage: function(image, sir) {
            if (sir.isEmpty()){
                new_data = [JSON.parse(image)];
            } else {
                new_data = _.toArray(sir.getData());
                new_data.push(JSON.parse(image));
            }
            sir.setData(new_data);
            sir.loadData(new_data);
        },

        // Function; executed once content has been pasted into a pastable block
        // See the tweet block as an example (https://github.com/madebymany/sir-trevor-js/blob/master/src/blocks/tweet.js)
        onContentPasted: function(event) {},

        // Block level messages
        // --
        // addMessage(msg, additionalClass)
        // Adds a new message onto the block

        // resetMessages()
        // Clears all existing messages

        // Helper methods
        // --
        // loading()
        // ready()
        // hasTextBlock()
        // remove()

        // Function; Any extra markdown parsing can be defined in here.
        // Returns; String (Required)
        toMarkdown: function(markdown) {
            return markdown.replace(/^(.+)$/mg,"> $1");
        },

        // Function; Any extra HTML parsing can be defined in here.
        // Returns; String (Required)
        // toHTML: function(html) {
        //   return html;
        // },

        fetchGallery: function(gallery){
            var sir = this;
            $.get("http://api.pr.co/v1/pressrooms/sterkonline.pr.co/images?limit=6", function(response){
                response["data"].forEach(function(image){
                    sir.appendImage(gallery, image["sizes"]["large"]["url"], image["sizes"]["original"]["url"]);
                });
            });
        },

        appendImage: function(gallery, url, download){
            thumbnail = $('<div>', {draggable: "true",class: 'thumbnail_wrap', data: {url:url, download: download }}).appendTo(gallery);
            image = $('<img>', {draggable: "false",class: 'thumbnail', src: url}).appendTo(thumbnail);
        },

        appendImageToGallery: function(image){
            gallery = this.$("div.st-gallery-editor");
            thumbnail = $('<div>', {draggable: "true",class: 'thumbnail_wrap', data: {url:image.url, download: image.download }}).appendTo(gallery);
            image = $('<img>', {draggable: "false",class: 'thumbnail', src: image.url}).appendTo(thumbnail);
        }
    });

})();


// Adds a Caption Field to the Image Block
(function ($){
	SirTrevor.Blocks.Image = SirTrevor.Block.extend({

		type: "image",
		title: function() { return 'Image' },

		droppable: true,
		uploadable: true,

		icon_name: 'image',

		loadData: function(data){
            this.$editor.html($('<img>', { src: data.file.url })).show();
		  this.$editor.append($('<input>', {type: 'text', class: 'st-input-string js-caption-input', name: 'text', placeholder: 'Caption', style: 'width: 100%; margin-top:10px; text-align: center;', value: data.text}));
		},

		onBlockRender: function(){
		  /* Setup the upload button */
		  this.$inputs.find('button').bind('click', function(ev){ ev.preventDefault(); });
		  this.$inputs.find('input').on('change', _.bind(function(ev){
		    this.onDrop(ev.currentTarget);
		  }, this));
		},

        onUploadError : function(jqXHR){
            this.addMessage(jqXHR.statusText);
            this.addMessage(i18n.t('blocks:image:upload_error'));
            this.ready();
        },

		onDrop: function(transferData){
		  var file = transferData.files[0],
		      urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

		  // Handle one upload at a time
		  if (/image/.test(file.type)) {
		    this.loading();
		    // Show this image on here
		    this.$inputs.hide();
		    this.loadData({file: {url: urlAPI.createObjectURL(file)}});

		    this.uploader(
		      file,
		      function(data) {
		        this.setData(data);
                this.addMessage('File uploaded.');
		        this.ready();
		      },
              this.onUploadError
		    );
		  }
		}
	});
}(jQuery));
/*
 * Extended Image Block
 * 2014 Ændrew Rininsland <aendrew.rininsland@the-times.co.uk>
 * Based on neyre/sir-trevor-wp's ImageCaption.js block.
 */
SirTrevor.Blocks.ImageExtended = SirTrevor.Blocks.Image.extend({

    type: "image_extended",
    title: function() { return i18n.t('blocks:image:title'); },

    droppable: true,
    uploadable: true,

    icon_name: 'image',

    loadData: function(data){
        // Create our image tag
        this.$editor.html($('<img>', { src: data.file.url })).show();
        this.$editor.append($('<input>', {type: 'text', class: 'st-input-string js-caption-input', name: 'caption', placeholder: 'Caption', style: 'width: 100%; margin-top:10px; text-align: center;', value: data.caption}));
        this.$editor.append($('<input>', {type: 'text', class: 'st-input-string js-source-input', name: 'source', placeholder: 'Source', style: 'width: 100%; margin-top:10px; text-align: center;', value: data.source}));
        this.$editor.append($('<label for="js-lightbox-input">Lightbox?</label>'));
        this.$editor.append($('<input>', {type: 'checkbox', class: 'st-input-boolean js-lightbox-input', name: 'lightbox', style: '', value: data.lightbox}));
        this.$editor.append($('<label for="js-stretch-input">Stretch?</label>'));
        this.$editor.append($('<input>', {type: 'checkbox', class: 'st-input-boolean js-stretch-input', name: 'stretch', style: '', value: data.stretch}));
    },

    onBlockRender: function(){
        /* Setup the upload button */
        this.$inputs.find('button').bind('click', function(ev){ ev.preventDefault(); });
        this.$inputs.find('input').on('change', _.bind(function(ev){
            this.onDrop(ev.currentTarget);
        }, this));
    },

    onDrop: function(transferData){
        var file = transferData.files[0],
            urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

        // Handle one upload at a time
        if (/image/.test(file.type)) {
            this.loading();
            // Show this image on here
            this.$inputs.hide();
            this.loadData({file: {url: urlAPI.createObjectURL(file)}});

            this.uploader(
                file,
                function(data) {
                    this.setData(data);
                    this.ready();
                },
                function(error){
                    this.addMessage(i18n.t('blocks:image:upload_error'));
                    this.ready();
                }
            );
        }
    }

});